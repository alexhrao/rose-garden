import { BrowserWindow, app, ipcMain } from 'electron';
import { join } from 'path';

app.whenReady().then(() => {
    const window = new BrowserWindow({
        transparent: true,
        frame: false,
        width: 500,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            devTools: false,
            preload: join(__dirname, 'preload.js'),
        },
    });
    ipcMain.on('ontop', () => {
        window.setAlwaysOnTop(!window.isAlwaysOnTop(), 'screen-saver');
    });
    //window.setIgnoreMouseEvents(true);
    window.loadFile('./index.html');
    window.setAlwaysOnTop(true, 'screen-saver');
});