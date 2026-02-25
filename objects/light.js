import Ray from './ray.js';
export default class LightSource {
    constructor(id, x, y, r, amountRay, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.amountRay = amountRay;
        this.color = color;
        this.isActive = false;
        this.xList = null;
        this.yList = null;
        this.rList = null;
    }

    // some methods
    draw(c, x = null, y = null, r = null, color = null) {
        c.beginPath();
        c.fillStyle = color ? color : this.color;
        c.arc(x ? x : this.x, y ? y : this.y, r ? r : this.r, 0, 2 * Math.PI);
        c.fill();

        // this.createRays();

        // c.strokeStyle = this.color;
        // this.rays.forEach((ray) => {
        //     ray.draw(c);
        // });
    }
}
