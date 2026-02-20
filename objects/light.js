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
    }

    // some methods
    draw(c) {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.fill();

        // this.createRays();

        // c.strokeStyle = this.color;
        // this.rays.forEach((ray) => {
        //     ray.draw(c);
        // });
    }
}
