import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i <= 0) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function desktopEnvPath() {
  const platform = process.platform;
  if (platform === 'win32') {
    return join(process.env.APPDATA || join(homedir(), 'AppData', 'Roaming'), 'bizsim', 'bizsim.env');
  }
  if (platform === 'darwin') {
    return join(homedir(), 'Library', 'Application Support', 'bizsim', 'bizsim.env');
  }
  return join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), 'bizsim', 'bizsim.env');
}

const fileEnv = {
  ...loadEnvFile(join(ROOT, '.env')),
  ...loadEnvFile(desktopEnvPath()),
};

function env(key, fallback = '') {
  return process.env[key] ?? fileEnv[key] ?? fallback;
}

export const config = {
  port: Number(env('PORT', '8787')) || 8787,
  root: ROOT,
  dataDir: env('BIZSIM_DATA_DIR', join(ROOT, 'server', 'data')),
  corsOrigins: env('CORS_ORIGINS', '*').split(',').map((s) => s.trim()).filter(Boolean),
  secUserAgent: env('SEC_USER_AGENT', 'BIZSIM research bot contact@example.com'),
  llm: {
    provider: env('LLM_PROVIDER', ''),
    anthropicKey: env('ANTHROPIC_API_KEY', ''),
    openaiKey: env('OPENAI_API_KEY', ''),
    geminiKey: env('GEMINI_API_KEY', ''),
    anthropicModel: env('ANTHROPIC_MODEL', 'claude-sonnet-4-5'),
    openaiModel: env('OPENAI_MODEL', 'gpt-4o-mini'),
    geminiModel: env('GEMINI_MODEL', ''),
    openaiBaseUrl: env('OPENAI_BASE_URL', 'https://api.openai.com/v1'),
  },
  images: {
    provider: env('IMAGE_PROVIDER', ''),
    geminiImageModel: env('GEMINI_IMAGE_MODEL', ''),
    openaiImageModel: env('OPENAI_IMAGE_MODEL', 'gpt-image-1'),
  },
};

export default config;
