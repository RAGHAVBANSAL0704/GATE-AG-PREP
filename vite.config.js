import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function devSaveQuestionPlugin() {
  return {
    name: 'dev-save-question-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-question', (req, res) => {
        // 1. Enforce POST method
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        // 2. Enforce local loopback access only
        const remoteIp = req.socket?.remoteAddress || req.connection?.remoteAddress || '';
        const host = req.headers.host || '';
        const isLoopback = 
          remoteIp === '127.0.0.1' || 
          remoteIp === '::1' || 
          remoteIp === '::ffff:127.0.0.1' ||
          host.startsWith('localhost') || 
          host.startsWith('127.0.0.1');

        if (!isLoopback) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Forbidden: dev endpoint restricted to local loopback' }));
          return;
        }

        // 3. Receive body with size limit (max 500 KB)
        let body = '';
        let size = 0;
        const MAX_SIZE = 500 * 1024;

        req.on('data', chunk => {
          size += chunk.length;
          if (size > MAX_SIZE) {
            res.statusCode = 413;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Payload Too Large' }));
            req.destroy();
            return;
          }
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            if (!body) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Empty payload' }));
              return;
            }

            const { questionId, updatedQuestion } = JSON.parse(body);

            // 4. Validate Question ID format (prevent path traversal / injection)
            if (!questionId || typeof questionId !== 'string' || !/^[A-Za-z0-9_#-]+$/.test(questionId)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid questionId identifier format' }));
              return;
            }

            if (!updatedQuestion || typeof updatedQuestion !== 'object') {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid updatedQuestion object' }));
              return;
            }

            const dataDir = path.resolve(__dirname, 'src/data');

            // 5. Handle Custom Mock files (GATE_2027_MOCK_01_Q01 -> custom_mock_2027_01.json)
            if (questionId.startsWith('GATE_2027_MOCK_')) {
              const match = questionId.match(/MOCK_(\d+)/);
              if (match) {
                const mockNum = String(parseInt(match[1], 10)).padStart(2, '0');
                const targetFile = `custom_mock_2027_${mockNum}.json`;
                const jsonPath = path.join(dataDir, targetFile);

                // Verify path stays within src/data
                if (jsonPath.startsWith(dataDir) && fs.existsSync(jsonPath)) {
                  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                  data.questions = data.questions.map(q => q.id === questionId ? updatedQuestion : q);
                  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true, file: targetFile }));
                  return;
                }
              }
            }
            
            // 6. Default to PYQ questions.json
            const pyqPath = path.join(dataDir, 'questions.json');
            if (fs.existsSync(pyqPath)) {
              const pyqData = JSON.parse(fs.readFileSync(pyqPath, 'utf8'));
              const updatedPyqs = pyqData.map(q => q.id === questionId ? updatedQuestion : q);
              fs.writeFileSync(pyqPath, JSON.stringify(updatedPyqs, null, 2), 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, file: 'questions.json' }));
            } else {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'questions.json not found' }));
            }
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === 'serve' ? [devSaveQuestionPlugin()] : [])
  ],
  base: './',
  server: {
    port: 3000,
    host: true
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/data/custom_mock_')) return 'dataset-custom-mocks';
          if (id.includes('/data/mock_papers.json')) return 'dataset-pyq-mocks';
          if (id.includes('/data/questions.json')) return 'dataset-questions-archive';
          if (id.includes('node_modules')) {
            if (id.includes('katex')) return 'vendor-katex';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            return 'vendor-libs';
          }
        }
      }
    }
  }
}))

