// ------------------------- IMPORTS  ---------------------------
import { Rectangle } from './objects/obstacle.js';
import { Circle } from './objects/obstacle.js';
import LightSource from './objects/light.js';
import Scene from './objects/scene.js';
import Ray from './objects/ray.js';

// ----------------------  DOM ELEMENTS -------------------------
const canvasList = document.getElementById('shapes');
/** @type {CanvasRenderingContext2D} */
const cL = canvasList.getContext('2d');
const canvasListWidth = (canvasList.width = 200);

const mainCanvas = document.getElementById('raytracing');
mainCanvas.width = mainCanvas.clientWidth;
mainCanvas.height = mainCanvas.clientHeight;

mainCanvas.addEventListener('click', (e) => {
    scene.lights.forEach((light) => {
        const sum = (e.clientX - light.x) ** 2 + (e.clientY - light.y) ** 2;
        if (sum <= light.r) {
            // delete light when delete button is mark and light is clicked
            if (isToDelete) {
                deleteLightWithRays(light);
                return;
            }

            // mark and unmark light
            light.isActive = !light.isActive;

            if (light.isActive === false) {
                light.color = '#ffffff';
                boxOptions.classList.add('hidden');
                activeLight = null;
            } else {
                rayValue.textContent = light.amountRay;
                inputRay.value = light.amountRay;
                boxOptions.classList.remove('hidden');
                activeLight = light;
            }
        }
    });
});

mainCanvas.addEventListener('pointermove', (e) => {
    newPosX = e.clientX;
    newPosY = e.clientY;
});

const c = mainCanvas.getContext('2d');

const addBtn = document.querySelector('#buttons button:first-of-type');
addBtn.onclick = async () => {
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

const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', () => {
    // if there is activeLight, will be deleted
    if (activeLight) {
        const ind = scene.lights.lastIndexOf(activeLight);

        deleteLightWithRays(activeLight);

        activeLight = null;
        boxOptions.classList.add('hidden');
    } else {
        // if there isn't activeLight and user clicked on delete button
        const imgDeleteButton = document.querySelector('#deleteBtn img');
        if (!isToDelete) {
            isToDelete = true;
            imgDeleteButton.src = './assets/trash-red.png';
        } else {
            imgDeleteButton.src = './assets/trash.png';
            isToDelete = false;
        }
    }
});

const shapeOptions = document.getElementById('shape-options');
const boxOptions = document.getElementById('light-options');
const inputRay = document.getElementById('input-ray');
const rayValue = document.getElementById('ray-value');

inputRay.addEventListener('input', (e) => {
    if (!activeLight) return;

    deleteRays(activeLight);

    const val = Number(e.target.value);

    rayValue.textContent = val;
    activeLight.amountRay = val;
    scene.addRaysToArray(activeLight);
});

// --------------------  CONSTS AND VARIABLES  -----------------
const scene = new Scene();
let newPosX = null;
let newPosY = null;
let activeLight = null;
let isToDelete = false;

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

function deleteRays(light) {
    scene.rays = scene.rays.filter((ray) => {
        return ray.id != light.id;
    });
}

function deleteLightWithRays(light) {
    const ind = scene.lights.indexOf(light);
    deleteRays(light);
    scene.lights.splice(ind, 1);
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
