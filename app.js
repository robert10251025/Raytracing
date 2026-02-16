// ----------------------  DOM ELEMENTS -------------------------
const canvasList = document.querySelector('#shapes');
/** @type {CanvasRenderingContext2D} */
const cL = canvasList.getContext('2d');
const canvasListWidth = (canvasList.width = 200);

const mainCanvas = document.querySelector('#raytracing');
const c = mainCanvas.getContext('2d');

const buttonAdd = document.querySelector('#buttons button:first-of-type');
buttonAdd.onclick = async () => {
    const result = await showModal();
    console.log('wybrano: ', result);
};

// --------------------  CONSTS AND VARIABLES  -----------------
const shapesList = [];

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
