import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function devSaveQuestionPlugin() {
  return {
    name: 'dev-save-question-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-question', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { questionId, updatedQuestion } = JSON.parse(body);
              
              // Handle Custom Mock files (GATE_2027_MOCK_01_Q01 -> custom_mock_2027_01.json)
              if (questionId && questionId.startsWith('GATE_2027_MOCK_')) {
                const match = questionId.match(/MOCK_(\d+)/);
                if (match) {
                  const mockNum = match[1];
                  const jsonPath = path.join(__dirname, `src/data/custom_mock_2027_${mockNum}.json`);
                  if (fs.existsSync(jsonPath)) {
                    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                    data.questions = data.questions.map(q => q.id === questionId ? updatedQuestion : q);
                    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 200;
                    res.end(JSON.stringify({ success: true, file: `custom_mock_2027_${mockNum}.json` }));
                    return;
                  }
                }
              }
              
              // Default to PYQ questions.json
              const pyqPath = path.join(__dirname, 'src/data/questions.json');
              const pyqData = JSON.parse(fs.readFileSync(pyqPath, 'utf8'));
              const updatedPyqs = pyqData.map(q => q.id === questionId ? updatedQuestion : q);
              fs.writeFileSync(pyqPath, JSON.stringify(updatedPyqs, null, 2), 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, file: 'questions.json' }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), devSaveQuestionPlugin()],
  base: './',
  server: {
    port: 3000,
    host: true
  }
})
