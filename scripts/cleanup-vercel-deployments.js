/**
 * Vercel Deployment Cleanup Tool
 * 
 * Purges old/stale deployments from Vercel to free up deployment storage.
 * 
 * Usage:
 *   VERCEL_TOKEN=your_vercel_token node scripts/cleanup-vercel-deployments.js
 *   or: node scripts/cleanup-vercel-deployments.js <VERCEL_TOKEN>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read project configuration
let projectId = 'prj_l00FJFhOn6tD1sqqDqHxvA87vsIT';
let teamId = 'team_jERPNcIxugfbj9NywLWwXXja';
let projectName = 'gate-ag-prep-web';

const vercelProjectJsonPath = path.resolve(__dirname, '../.vercel/project.json');
if (fs.existsSync(vercelProjectJsonPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(vercelProjectJsonPath, 'utf8'));
    if (config.projectId) projectId = config.projectId;
    if (config.orgId) teamId = config.orgId;
    if (config.projectName) projectName = config.projectName;
  } catch (e) {
    // fallback to defaults
  }
}

// Retrieve token from argument, env, or .env.local
let token = process.argv[2] || process.env.VERCEL_TOKEN || process.env.VERCEL_AUTH_TOKEN;

if (!token) {
  const envLocalPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    const match = envContent.match(/VERCEL_TOKEN=(.+)/) || envContent.match(/VERCEL_AUTH_TOKEN=(.+)/);
    if (match) token = match[1].trim().replace(/['"]/g, '');
  }
}

async function main() {
  console.log('\n======================================================');
  console.log('🚀 VERCEL DEPLOYMENT STORAGE CLEANUP ASSISTANT');
  console.log('======================================================');
  console.log(`Target Project: ${projectName} (${projectId})`);
  console.log(`Team/Org ID:    ${teamId}`);
  console.log('------------------------------------------------------');

  if (!token) {
    console.log('\n⚠️  NO VERCEL TOKEN PROVIDED.\n');
    console.log('To clean up deployments automatically via this script:');
    console.log('1. Go to https://vercel.com/account/tokens and generate a token.');
    console.log('2. Run: VERCEL_TOKEN="your_token_here" npm run clean:vercel\n');
    console.log('------------------------------------------------------');
    console.log('Alternatively, solve this directly in 1 minute via:');
    console.log('A) VERCEL CLI:');
    console.log('   npx vercel rm gate-ag-prep-web --safe -y');
    console.log('\nB) VERCEL WEB DASHBOARD (Recommended permanent fix):');
    console.log('   1. Open https://vercel.com/dashboard');
    console.log('   2. Click on project "gate-ag-prep-web" -> Settings -> Deployment Retention.');
    console.log('   3. Set Preview Deployment Retention to "7 days" or "14 days".');
    console.log('   4. Go to the "Deployments" tab, select older deployments, and click Delete.');
    console.log('======================================================\n');
    return;
  }

  try {
    console.log('\n🔍 Fetching deployments from Vercel API...');
    const url = `https://api.vercel.com/v6/deployments?projectId=${projectId}&teamId=${teamId}&limit=100`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`❌ Vercel API error (${res.status}):`, errText);
      return;
    }

    const data = await res.json();
    const deployments = data.deployments || [];
    console.log(`Found ${deployments.length} deployments.`);

    if (deployments.length === 0) {
      console.log('✅ No deployments found to delete.');
      return;
    }

    // Keep the latest 1 production/ready deployment, mark the rest for deletion
    const readyDeployments = deployments.filter(d => d.state === 'READY');
    const latestProdId = readyDeployments.length > 0 ? readyDeployments[0].uid : null;

    const toDelete = deployments.filter(d => d.uid !== latestProdId);
    console.log(`\nPreserving latest active deployment: ${latestProdId}`);
    console.log(`Deployments scheduled for deletion: ${toDelete.length}`);

    let deletedCount = 0;
    for (const dep of toDelete) {
      process.stdout.write(`Deleting ${dep.uid} (${dep.url || dep.state})... `);
      const delUrl = `https://api.vercel.com/v13/deployments/${dep.uid}?teamId=${teamId}`;
      const delRes = await fetch(delUrl, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (delRes.ok) {
        console.log('✅ Deleted');
        deletedCount++;
      } else {
        console.log(`⚠️ Status ${delRes.status}`);
      }
    }

    console.log(`\n🎉 Successfully deleted ${deletedCount} deployments!`);
    console.log('Your Vercel deployment storage limit has been freed up.\n');
  } catch (err) {
    console.error('❌ Error during cleanup:', err.message);
  }
}

main();
