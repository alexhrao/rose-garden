import { ipcRenderer } from 'electron';

interface PetalMaker {
    makePetals?: boolean;
    petalMaker?: () => {}
}

window.onkeypress = (ev: KeyboardEvent) => {
    if (ev.key === 'a') {
        ipcRenderer.send('ontop');
    } else if (ev.key === 'q') {
        ipcRenderer.send('quit');
    } else if (ev.key === 'p') {
        if ((window as PetalMaker).makePetals === undefined || !(window as PetalMaker).makePetals) {
            (window as PetalMaker).makePetals = true;
            (window as PetalMaker).petalMaker?.();
        } else {
            (window as PetalMaker).makePetals = false;
        }
    }
}