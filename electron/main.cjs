const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow = null;
let serverProcess = null;
const PORT = process.env.PORT || 8787;
const isDev = !app.isPackaged;

function startServer() {
  return new Promise((resolve, reject) => {
    const serverEntry = isDev
      ? path.join(__dirname, '..', 'server', 'src', 'index.js')
      : path.join(process.resourcesPath, 'server', 'src', 'index.js');

    const node = process.execPath;
    serverProcess = spawn(node, [serverEntry], {
      env: { ...process.env, PORT: String(PORT), ELECTRON_RUN: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    serverProcess.stdout.on('data', (d) => process.stdout.write(d));
    serverProcess.stderr.on('data', (d) => process.stderr.write(d));
    serverProcess.on('error', reject);

    const start = Date.now();
    const check = () => {
      http.get(`http://127.0.0.1:${PORT}/api/status`, (res) => {
        if (res.statusCode === 200) resolve();
        else if (Date.now() - start > 20000) reject(new Error('Server start timeout'));
        else setTimeout(check, 200);
      }).on('error', () => {
        if (Date.now() - start > 20000) reject(new Error('Server start timeout'));
        else setTimeout(check, 200);
      });
    };
    setTimeout(check, 300);
  });
}

async function createWindow() {
  try {
    await startServer();
  } catch (e) {
    console.error('Failed to start BIZSIM server', e);
  }

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 900,
    minHeight: 600,
    title: 'BIZSIM',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(`http://127.0.0.1:${PORT}`);
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});
