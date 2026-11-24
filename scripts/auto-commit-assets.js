/**
 * Watches src/assets/images and auto-commits + pushes media changes.
 * Usage: npm run watch:assets
 */
const path = require('path');
const { execSync } = require('child_process');
const chokidar = require('chokidar');

const ROOT = path.resolve(__dirname, '..');
const WATCH_DIR = path.join(ROOT, 'src', 'assets', 'images');
const DEBOUNCE_MS = 8000;
const AUTO_PUSH = process.env.AUTO_PUSH !== 'false';

let timer = null;
let pending = new Set();

function log(message) {
  const time = new Date().toLocaleTimeString();
  console.log(`[watch:assets ${time}] ${message}`);
}

function run(command) {
  return execSync(command, {
    cwd: ROOT,
    stdio: 'pipe',
    encoding: 'utf8',
  }).trim();
}

function commitAndPush() {
  try {
    run('git add -- "src/assets/images"');

    const staged = run('git diff --cached --name-only -- "src/assets/images"');
    if (!staged) {
      log('No image changes to commit.');
      pending.clear();
      return;
    }

    const files = staged.split(/\r?\n/).filter(Boolean);
    const message = `Auto-update gallery assets (${files.length} file${files.length === 1 ? '' : 's'}).`;
    run(`git commit -m "${message}"`);
    log(`Committed: ${message}`);

    if (AUTO_PUSH) {
      run('git push origin HEAD');
      log('Pushed to origin. Netlify will redeploy shortly.');
    } else {
      log('Skipped push (AUTO_PUSH=false).');
    }
  } catch (error) {
    const output = [error.stdout, error.stderr, error.message].filter(Boolean).join('\n');
    if (/nothing to commit/i.test(output)) {
      log('Nothing to commit.');
    } else {
      console.error('[watch:assets] Failed:\n' + output);
    }
  } finally {
    pending.clear();
  }
}

function schedule(filePath) {
  const relative = path.relative(ROOT, filePath);
  pending.add(relative);
  log(`Change detected: ${relative}`);

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    log(`Settling done (${pending.size} change${pending.size === 1 ? '' : 's'}). Committing...`);
    commitAndPush();
  }, DEBOUNCE_MS);
}

log(`Watching ${WATCH_DIR}`);
log(`Auto-push is ${AUTO_PUSH ? 'ON' : 'OFF'}. Debounce: ${DEBOUNCE_MS / 1000}s.`);

chokidar
  .watch(WATCH_DIR, {
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 1500, pollInterval: 200 },
  })
  .on('add', schedule)
  .on('change', schedule)
  .on('unlink', schedule)
  .on('error', (error) => console.error('[watch:assets] Watcher error:', error));
