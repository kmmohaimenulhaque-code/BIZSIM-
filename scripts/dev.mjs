import { spawn } from 'node:child_process';

const procs = [];

function run(cmd, args, env = {}) {
  const p = spawn(cmd, args, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...env },
  });
  procs.push(p);
  return p;
}

run('node', ['--watch', 'server/src/index.js'], { PORT: '8787' });
run('npx', ['vite', '--config', 'client/vite.config.js'], { PORT: '5173' });

function shutdown() {
  for (const p of procs) {
    try { p.kill('SIGTERM'); } catch {}
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
