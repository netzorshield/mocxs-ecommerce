// Node.js launcher script - can be converted to EXE using pkg
const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('\n========================================');
console.log('  MOCXS E-commerce - Auto Start');
console.log('========================================\n');

// Check if Node.js is available
exec('node --version', (error, stdout) => {
  if (error) {
    console.error('[ERROR] Node.js is not installed!');
    console.error('Please install Node.js from: https://nodejs.org/');
    console.error('\nPress any key to exit...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
    return;
  }

  console.log(`[OK] Node.js: ${stdout.trim()}`);

  // Change to script directory
  process.chdir(__dirname);

  // Check and install dependencies
  console.log('\n[1/3] Checking dependencies...\n');

  if (!fs.existsSync('node_modules')) {
    console.log('Installing root dependencies...');
    exec('npm install', (error) => {
      if (error) {
        console.error('Failed to install root dependencies');
        return;
      }
      checkFrontendDeps();
    });
  } else {
    checkFrontendDeps();
  }
});

function checkFrontendDeps() {
  if (!fs.existsSync('frontend/node_modules')) {
    console.log('Installing frontend dependencies...');
    exec('cd frontend && npm install', (error) => {
      if (error) {
        console.error('Failed to install frontend dependencies');
        return;
      }
      checkBackendDeps();
    });
  } else {
    checkBackendDeps();
  }
}

function checkBackendDeps() {
  if (!fs.existsSync('backend/node_modules')) {
    console.log('Installing backend dependencies...');
    exec('cd backend && npm install', (error) => {
      if (error) {
        console.error('Failed to install backend dependencies');
        return;
      }
      startServers();
    });
  } else {
    startServers();
  }
}

function startServers() {
  console.log('\n[2/3] Starting servers...\n');
  console.log('Backend:  http://localhost:5000');
  console.log('Frontend: http://localhost:3000');
  console.log('\nOpening browser in 5 seconds...\n');

  // Open browser after 5 seconds
  setTimeout(() => {
    const platform = process.platform;
    let command;
    
    if (platform === 'win32') {
      command = 'start http://localhost:3000';
    } else if (platform === 'darwin') {
      command = 'open http://localhost:3000';
    } else {
      command = 'xdg-open http://localhost:3000';
    }
    
    exec(command);
  }, 5000);

  // Start servers using npm run dev
  console.log('[3/3] Launching servers...\n');
  console.log('Press Ctrl+C to stop servers\n');
  
  const serverProcess = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  });

  serverProcess.on('error', (error) => {
    console.error('Failed to start servers:', error);
    console.log('\nTry running manually:');
    console.log('  Window 1: cd backend && npm run dev');
    console.log('  Window 2: cd frontend && npm run dev');
  });

  // Handle exit
  process.on('SIGINT', () => {
    console.log('\n\nStopping servers...');
    serverProcess.kill();
    process.exit(0);
  });
}












