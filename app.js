// ------------------------- IMPORTS  ---------------------------
import { Rectangle } from './objects/obstacle.js';
import { Circle } from './objects/obstacle.js';
import LightSource from './objects/light.js';
import Scene from './objects/scene.js';
import Ray from './objects/ray.js';

// ----------------------  DOM ELEMENTS -------------------------
const canvasList = document.querySelector('#shapes');
/** @type {CanvasRenderingContext2D} */
const cL = canvasList.getContext('2d');
const canvasListWidth = (canvasList.width = 200);

const mainCanvas = document.querySelector('#raytracing');
mainCanvas.width = mainCanvas.clientWidth;
mainCanvas.height = mainCanvas.clientHeight;

mainCanvas.addEventListener('click', (e) => {
    scene.lights.forEach((light) => {
        const sum = (e.clientX - light.x) ** 2 + (e.clientY - light.y) ** 2;
        if (sum <= light.r) {
            light.isActive = !light.isActive;
            scene.lights.forEach((light2) => {
                if (light2 != light) {
                    light2.isActive = false;
                }
            });
        }
    });
});

mainCanvas.addEventListener('pointermove', (e) => {
    newPosX = e.clientX;
    newPosY = e.clientY;
});

const c = mainCanvas.getContext('2d');

const buttonAdd = document.querySelector('#buttons button:first-of-type');
buttonAdd.onclick = async () => {
    const result = await showModal();
    if (result === '0') {
        const light = new LightSource(
            Math.random().toString(36).slice(2),
            Math.random() * mainCanvas.width,
            Math.random() * mainCanvas.height,
            20,
            200,
            '#ffffff',
        );

        scene.addLight(light);
        scene.addRaysToArray(light);
    } else if (result === '1') {
    } else if (result === '2') {
    } else if (result === '3') {
    }
};

// --------------------  CONSTS AND VARIABLES  -----------------
const scene = new Scene();
let newPosX = null;
let newPosY = null;

// --------------------  LOGIC  -----------------
function showModal() {
    return new Promise((resolve) => {
        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');

        const buttons = modal.querySelectorAll('button');

        buttons.forEach((btn) => {
            btn.onclick = () => {
                modal.classList.add('hidden');
                resolve(btn.dataset.value);
            };
        });
    });
}

// --------------------  MAIN LOOP  -----------------
function animate() {
    c.clearRect(0, 0, mainCanvas.clientWidth, mainCanvas.clientHeight);
    c.fillStyle = '#000000';
    c.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
    scene.update(newPosX, newPosY);
    scene.render(c, mainCanvas.width, mainCanvas.height);
    requestAnimationFrame(animate);
}

animate();
