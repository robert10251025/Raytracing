export default class Ray {
    constructor(id, x, y, dx, dy) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    draw(c, len) {
        c.beginPath();
        c.strokeStyle = '#ffffff';
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + this.dx * len, this.y + this.dy * len);
        c.stroke();
    }
}
