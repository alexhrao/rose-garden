import { BrowserWindow, app, ipcMain } from 'electron';
import { join } from 'path';
if (require('electron-squirrel-startup')) {
    app.exit();
} else {
    app.whenReady().then(() => {
        const window = new BrowserWindow({
            transparent: true,
            frame: false,
            width: 500,
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: false,
                preload: join(__dirname, 'preload.js'),
            },
        });
        ipcMain.on('ontop', () => {
            window.setAlwaysOnTop(!window.isAlwaysOnTop(), 'screen-saver');
        });
        ipcMain.on('quit', () => {
            app.exit();
        });
        //window.setIgnoreMouseEvents(true);
        window.loadFile('./index.html');
        window.setAlwaysOnTop(true, 'screen-saver');
    });
}