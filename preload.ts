import { ipcRenderer } from 'electron';

window.onkeypress = (ev: KeyboardEvent) => {
    if (ev.key === 'a') {
        ipcRenderer.send('ontop');
    } else if (ev.key === 'q') {
        ipcRenderer.send('quit');
    }
}