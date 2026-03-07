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

        this.x1List = null;
        this.y1List = null;
        this.x2List = null;
        this.y2List = null;
        this.wList = null;
        this.colorList = null;
        this.pathList = null;
    }

    drawRectLine(
        c,
        x1 = null,
        y1 = null,
        x2 = null,
        y2 = null,
        w = null,
        color = null,
        path = null,
    ) {
        c.save();
        c.strokeStyle = color ? color : this.color;
        c.lineWidth = w ? w : this.w;
        if (path) {
            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.stroke();
        } else {
            this.path.moveTo(x1 ? x1 : this.x1, y1 ? y1 : this.y1);
            this.path.lineTo(x2 ? x2 : this.x2, y2 ? y2 : this.y2);
            c.stroke(this.path);
        }
        c.restore();
    }

    isClicked(xClick, yClick) {
        if (
            xClick < Math.min(this.x1, this.x2) ||
            xClick > Math.max(this.x1, this.x2) ||
            yClick < Math.min(this.y1, this.y2) ||
            yClick > Math.max(this.y1, this.y2)
        ) {
            return false;
        }
        const a2 = -1 / this.a;
        const b2 = yClick - a2 * xClick;

        const xInter = (this.b - b2) / (a2 - this.a);
        const yInter = this.a * xInter + this.b;

        const l = Math.sqrt((xClick - xInter) ** 2 + (yClick - yInter) ** 2);

        return l <= this.w / 2;
    }
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
