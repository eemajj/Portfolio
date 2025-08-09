#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

console.log('\n🚀 Starting Portfolio Development Server...\n');

// Start the React development server
const reactProcess = spawn('npm', ['start'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  cwd: process.cwd()
});

let serverReady = false;
let hasErrors = false;

// Handle stdout
reactProcess.stdout.on('data', (data) => {
  const output = data.toString();
  
  if (output.includes('webpack compiled')) {
    if (output.includes('with errors')) {
      console.log('❌ Compilation failed with errors');
      hasErrors = true;
    } else if (output.includes('with warnings')) {
      console.log('⚠️  Compilation successful with warnings');
      if (!serverReady) {
        console.log('✅ Development server is ready!');
        console.log('🌐 Open http://localhost:3000 to view your portfolio');
        serverReady = true;
      }
    } else {
      console.log('✅ Compilation successful!');
      if (!serverReady) {
        console.log('✅ Development server is ready!');
        console.log('🌐 Open http://localhost:3000 to view your portfolio');
        serverReady = true;
      }
    }
  } else if (output.includes('Starting the development server')) {
    console.log('⏳ Starting development server...');
  } else if (output.includes('Local:')) {
    console.log('🌐 Server running on http://localhost:3000');
    if (!hasErrors) {
      console.log('✅ Portfolio is ready to view!');
      serverReady = true;
    }
  }
  
  // Pass through all output
  process.stdout.write(output);
});

// Handle stderr
reactProcess.stderr.on('data', (data) => {
  const output = data.toString();
  
  if (output.includes('Failed to compile')) {
    console.log('❌ Compilation failed');
    hasErrors = true;
  }
  
  // Pass through all error output
  process.stderr.write(output);
});

// Handle process exit
reactProcess.on('close', (code) => {
  console.log(`\n🛑 Development server stopped with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping development server...');
  reactProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Stopping development server...');
  reactProcess.kill('SIGTERM');
});