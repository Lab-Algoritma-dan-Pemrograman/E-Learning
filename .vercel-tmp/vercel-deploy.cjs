#!/usr/bin/env node
/**
 * Vercel CLI Deployment Script (Cross-Platform)
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const isWindows = os.platform() === 'win32';
const ALLOWED_COMMANDS = new Set(['vercel', 'npm', 'pnpm', 'yarn']);

function log(msg) { console.error(msg); }

function commandExists(cmd) {
  if (!ALLOWED_COMMANDS.has(cmd)) throw new Error(`Command not in whitelist: ${cmd}`);
  try {
    if (isWindows) {
      return spawnSync('where', [cmd], { stdio: 'ignore' }).status === 0;
    } else {
      return spawnSync('sh', ['-c', `command -v "$1"`, '--', cmd], { stdio: 'ignore' }).status === 0;
    }
  } catch { return false; }
}

function getCommandOutput(cmd, args) {
  try {
    const result = spawnSync(cmd, args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'], shell: isWindows });
    return result.status === 0 ? (result.stdout || '').trim() : null;
  } catch { return null; }
}

function parseArgs(args) {
  const result = { projectPath: '.', prod: true, yes: false, skipBuild: false };
  for (const arg of args) {
    if (arg === '--prod') result.prod = true;
    else if (arg === '--yes' || arg === '-y') result.yes = true;
    else if (arg === '--skip-build') result.skipBuild = true;
    else if (!arg.startsWith('-')) result.projectPath = arg;
  }
  return result;
}

function checkVercelInstalled() {
  if (!commandExists('vercel')) { log('Error: Vercel CLI is not installed'); process.exit(1); }
  log(`Vercel CLI version: ${getCommandOutput('vercel', ['--version']) || 'unknown'}`);
}

function checkLoginStatus() {
  log('Checking login status...');
  try {
    const result = spawnSync('vercel', ['whoami'], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], shell: isWindows });
    const output = (result.stdout || '').trim();
    if (result.status === 0 && output && !output.includes('Error') && !output.includes('not logged in')) {
      log(`Logged in as: ${output}`);
      return true;
    }
  } catch {}
  return false;
}

function doDeploy(projectPath, options) {
  log(''); log('Starting deployment...'); log('');
  const args = [];
  if (options.yes) args.push('--yes');
  if (options.prod) { args.push('--prod'); log('Deployment environment: Production'); }
  log(`Executing: vercel ${args.join(' ')}`); log('');
  log('========================================');
  try {
    const result = spawnSync('vercel', args, {
      cwd: projectPath, encoding: 'utf8', stdio: ['inherit', 'pipe', 'pipe'],
      timeout: 300000, shell: isWindows
    });
    const output = (result.stdout || '') + (result.stderr || '');
    log(output);
    if (result.status !== 0) throw new Error('Deployment command failed');
    const aliasedMatch = output.match(/Aliased:\s*(https:\/\/[a-zA-Z0-9.-]+\.vercel\.app)/i);
    const deploymentMatch = output.match(/Production:\s*(https:\/\/[a-zA-Z0-9.-]+\.vercel\.app)/i);
    const finalUrl = aliasedMatch?.[1] || deploymentMatch?.[1] || null;
    log(''); log('========================================'); log('Deployment successful!'); log('========================================'); log('');
    if (finalUrl) {
      log(`Your site is live! Visit: ${finalUrl}`);
      console.log(JSON.stringify({ status: 'success', url: finalUrl }));
    } else {
      console.log(JSON.stringify({ status: 'success', message: 'Deployment successful' }));
    }
  } catch (error) {
    log(error.message || ''); log(''); log('Deployment failed'); process.exit(1);
  }
}

function main() {
  log('========================================'); log('Vercel CLI Project Deployment'); log('========================================'); log('');
  const options = parseArgs(process.argv.slice(2));
  checkVercelInstalled(); log('');
  if (!checkLoginStatus()) { log(''); log('Error: Not logged in'); process.exit(1); }
  log('');
  const absPath = path.resolve(options.projectPath);
  log(`Project path: ${absPath}`);
  doDeploy(absPath, options);
}
main();
