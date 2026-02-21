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
            light.isActive = !light.isActive;

            if (light.isActive === false) {
                light.color = '#ffffff';
                boxOptions.classList.add('hidden');
            } else {
                rayValue.textContent = light.amountRay;
                inputRay.value = light.amountRay;
                boxOptions.classList.remove('hidden');
                editLightOption(light);
            }

            // it's never happend now, but when i add list of object it will be useful
            // scene.lights.forEach((light2) => {
            //     if (light2 != light) {
            //         light2.isActive = false;
            //         light2.color = '#ffffff';
            //     }
            // });
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

const deleteBtn = document.querySelector('#buttons button:nth-of-type(2)');
deleteBtn.addEventListener('click', () => {
    const activeLight = scene.lights.filter((light) => {
        return light.isActive;
    });
    if (activeLight[0]) {
        const ind = scene.lights.lastIndexOf(activeLight[0]);

        // delete rays of deleted light
        deleteRays(activeLight[0]);

        // delete active light
        scene.lights.splice(ind, 1);

        boxOptions.classList.add('hidden');
    }
});

const shapeOptions = document.getElementById('shape-options');
const boxOptions = document.getElementById('light-options');
const inputRay = document.getElementById('input-ray');
const rayValue = document.getElementById('ray-value');

// inputRay.addEventListener('input', (e) => {

// })

// --------------------  CONSTS AND VARIABLES  -----------------
const scene = new Scene();
let newPosX = null;
let newPosY = null;
let activeL = null;

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

function editLightOption(light) {
    inputRay.addEventListener('input', (e) => {
        if (light.isActive) {
            deleteRays(light);

            // ERROR: when i delete light and his rays, when i change amount of ray in second light, then deleted rays appers

            rayValue.textContent = e.target.value;
            light.amountRay = e.target.value;
            scene.addRaysToArray(light);
        }
    });

    // TODO: radius length and color
}

function deleteRays(light) {
    scene.rays = scene.rays.filter((ray) => {
        return ray.id != light.id;
    });

    // const raysToDelete = scene.rays.filter((ray) => {
    //     return ray.id === light.id;
    // });

    // if (raysToDelete.length > 0) {
    //     raysToDelete.forEach((ray) => {
    //         const ind = scene.rays.indexOf(ray);
    //         scene.rays.splice(ind, 1);
    //     });
    // }
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
