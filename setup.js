#!/usr/bin/env node
'use strict';

/**
 * DAVEX-ULTRA Setup Script
 * Run: node setup.js
 * Creates required directories and validates environment.
 */

const fs = require('fs');
const path = require('path');

const dirs = [
  'data',
  'tmp',
  'tmp/antidelete',
  'logs',
];

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  DAVEX-ULTRA v3.0.0 — Setup');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Create directories
for (const dir of dirs) {
  const full = path.join(__dirname, dir);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
    console.log(`✅ Created: ${dir}/`);
  } else {
    console.log(`✔  Exists:  ${dir}/`);
  }
}

// Create .env if not exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  const envTemplate = `# DAVEX-ULTRA Environment Variables
# Copy this file and fill in your values.

# Required: Your WhatsApp session (base64 encoded)
SESSION_ID=JUNE-MD:~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUhaMmF1cFNRTmhlUTJpOXBBWm5zZUEwVmplelFCSlZ6c0RPbVpSZEgwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidFFzQ2Y1SHJDMHlvV1czcDFjaHRUOTNuL1dpRXBJL2RUWlVOOGlkeW9RZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTml5T2hmRCtvTGFQQytDZTBzVEx3bGRYMjdUckhYMDh5RGY0SVc1dUZ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJydDlBRlpkcWJQLytTSUJZcVhWWjFSb2dyVWxqQ21FTDNHS0FtTEFaR0FvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJDZmlrclVWNEx2eFBKaml3Wm1VKzU4VVJlR3VIYjZzS2pYay9GM1ZhWGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9UcTM1NTZ3SDBDYXNSVnFCQkt5VDlFS2Y5TnZzL1dlOVhJVElCR0ZxMWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUNqN1FVa2FObndtcjRaeGx6enBzOHVJUHJlTmVHUkMvaEQzaXVaSm5YQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiazlVSWlCSGdZWitmMVNyOVRoZnZLOFpPVUtSOWxuZWc2cTlOcnRyODVtVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlpWTAyd2trYklMVmdZRVNUM2owYjNrYTk1N0ZjWVRGVllXZnFzTU5qOFJTeFIxbm5jbTdjVXc1QXNuVURNRFd5MHBVSTFsb0Fwc3BpUEhCWWtxSGhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiI0WTJCZ2dTc3JpYzlHdlR2Y1AxK1N5K01aQjUrdUVhOXZsNVhURk1UV1hnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTU0NDc0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNUE0NTkxRjRBODRENjEwQzdFRkEwRjAyNURBNTBERCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzc4MzM2NzgzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODk1NDQ3NDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTU1NDAzNTE1QUE1OEFBRjQ2QzBCNjQ5NDI4Qzc3REYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc3ODMzNjc4M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg5NTQ0NzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1RTkzQkJFRjhBNDRGNzMwMjM5RkQwMzFGNTA2OTQ1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NzgzMzY3ODR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4OTU0NDc0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNTk1RkQ3NzU1RDFFNjI2RDU0RTdBMzIzM0VBOUI2RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzc4MzM2Nzg1fV0sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjMsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p2Y2hhZ0JFUHVIL2M4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJPaWxUdGNFeEpGaG5tQjd2M2lMMUlDbEwyMDZ2SC9iRGdXTHd2LzFkVWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImROeWtROFNFaWNyMWthaGpDUnd4R3JZNm1zWU40WHFHdE9xWC9xZHdMQzF0aWVmVmJQVkpmV0RFMWtxa1RQbFZRRlNQb01EdGY5MVBPNkRBTnd3UERBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIzbnFrSXVoTUZXRlI4dkhqL2hMaklDWnZMdkxObmZXMzJLcTN3d2NZUzJoZUJpSlNTNHFEcEduVU1sQjZWbmwvYnVDUzMwWk9OYjdCaGVXQnNCMmpndz09In0sIm1lIjp7ImlkIjoiMjYzNzg5NTQ0NzQzOjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QgPCdkKfwnZCo8J2Qp/CdkLLwnZCm8J2QqPCdkK7wnZCsIPCdkIDwnZCiIPCdkJUyIiwibGlkIjoiMjE5MDk1MjU3NjQxMDkyOjZAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTU0NDc0Mzo2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVUb3BVN1hCTVNSWVo1Z2U3OTRpOVNBcFM5dE9yeC8ydzRGaThMLzlYVkgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBa0lFZ2dJIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc3ODMzNjc4MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGMVEifQ==

# Bot settings (all optional — have defaults)
BOT_NAME=𝐀𝐧𝐨𝐧𝐲𝐦𝐨𝐮𝐬 𝐀𝐢 𝐕2
BOT_OWNER=𝐙𝐮𝐤𝐚
OWNER_NUMBER=263789544743
PREFIX=.
MODE=public
PACKNAME=𝐀𝐧𝐨𝐧𝐲𝐦𝐨𝐮𝐬 𝐀𝐢 𝐕2
TIMEZONE=Africa/Nairobi

# Optional: PostgreSQL database URL (leave empty to use SQLite)
DATABASE_URL=

# Optional: API Keys
GEMINI_API_KEY=
OPENAI_API_KEY=
`;
  fs.writeFileSync(envPath, envTemplate);
  console.log('\n✅ Created .env template — fill in your SESSION_ID and other values.');
} else {
  console.log('\n✔  .env already exists.');
}

// Check for Node version
const [major] = process.versions.node.split('.').map(Number);
if (major < 18) {
  console.error(`\n❌ Node.js v${process.versions.node} is too old. Minimum required: v18.0.0`);
  process.exit(1);
}
console.log(`\n✅ Node.js v${process.versions.node} — OK`);

// Check for required dependencies
const requiredModules = ['@whiskeysockets/baileys', 'better-sqlite3', 'express', 'pino', 'chalk'];
let missingModules = [];
for (const mod of requiredModules) {
  try {
    require.resolve(mod);
  } catch {
    missingModules.push(mod);
  }
}

if (missingModules.length > 0) {
  console.error(`\n❌ Missing modules: ${missingModules.join(', ')}`);
  console.error('   Run: npm install');
  process.exit(1);
}
console.log('✅ Core dependencies — OK');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  Setup complete! Start options:');
console.log('');
console.log('  node index.js          — Direct start');
console.log('  npm run pm2:start      — PM2 managed');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
