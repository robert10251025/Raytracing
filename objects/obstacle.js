export class Rectangle {
    constructor(id, x1, y1, x2, y2, color, w) {
        this.id = id;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.w = w;
        this.a = (this.y2 - this.y1) / (this.x2 - this.x1);
        this.b = this.y2 - this.a * this.x2;
        this.path = new Path2D();
    }

    drawRectLine(c) {
        c.save();
        c.strokeStyle = this.color;
        c.lineWidth = this.w;
        this.path.moveTo(this.x1, this.y1);
        this.path.lineTo(this.x2, this.y2);
        c.stroke(this.path);
        c.restore();
    }

    // draw(c, x = null, y = null, w = null, h = null) {
    //     c.beginPath();
    //     c.rect(x ? x : this.x, y ? y : this.y, w ? w : this.w, h ? h : this.h);
    //     c.fillStyle = this.color;
    //     c.fill();
    // }
}

export class Circle {
    constructor(id, x, y, r, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    // some methods like draw
}
