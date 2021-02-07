import { ipcRenderer } from 'electron';

interface PetalMaker {
    makePetals?: boolean;
    petalMaker?: () => void;
}

const win = window as PetalMaker;
const period = 10;
const freq = 1/period;
const fallTime = 10;
const fps = 100;

win.petalMaker = (): void => {
    if (!win.makePetals) {
        return;
    }
    const petal = document.createElement('img');
    petal.src = 'petal.png';
    petal.classList.add('petal');
    document.body.appendChild(petal);

    let t = 0;
    let top = 0;
    const L = Math.random() * (50 - 20) + 20;
    const next = Math.random() * (8000 - 2000) + 2000;
    const xOff = Math.random() * (50 - 20) + 20;
    const faller = window.setInterval(() => {
        const x = L*Math.cos(2*Math.PI*t*(period * Math.PI / 96));
        const y = Math.sqrt((L*L) - (x*x)) / 2;
        const th = Math.asin(x/L);
        petal.style.left = `${xOff + x}vw`;
        petal.style.top = `${top + y}vh`;
        petal.style.transform = `rotate(${Math.PI / 2 - th/2}rad)`
        t += 1/fps;
        top = (t / fallTime)*90;
        if ((top + y) > 90) {
            window.clearInterval(faller);
            petal.classList.add('transparent');
            window.setTimeout(() => petal.remove(), 10000);
        }
    }, 1000 / fps);
    if (win.makePetals) {
        window.setTimeout(() => win.petalMaker(), next);
    }
}

window.onkeypress = (ev: KeyboardEvent) => {
    if (ev.key === 'a') {
        ipcRenderer.send('ontop');
    } else if (ev.key === 'q') {
        ipcRenderer.send('quit');
    } else if (ev.key === 'p') {
        console.log(win.makePetals)
        if (win.makePetals === undefined || !win.makePetals) {
            win.makePetals = true;
            win.petalMaker?.();
        } else {
            win.makePetals = false;
        }
    }
}