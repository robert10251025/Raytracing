import Ray from './ray.js';

export default class Scene {
    constructor() {
        this.obstacles = [];
        this.lights = [];
        this.rays = [];
        this.miniLights = [];
    }

    addObstacle(o) {
        this.obstacles.push(o);
    }

    addLight(l) {
        this.lights.push(l);
    }

    addRaysToArray(light) {
        // this.lights.forEach((light) => {
        const angle = (2 * Math.PI) / light.amountRay;
        for (let i = 0; i < light.amountRay; i++) {
            const dx = Math.cos(i * angle);
            const dy = Math.sin(i * angle);

            const ray = new Ray(light.id, light.x, light.y, dx, dy);
            this.rays.push(ray);
        }
        // });
    }

    drawLights(c) {
        if (this.lights.length > 0) {
            this.lights.forEach((light) => {
                light.draw(c);
            });
        }
    }

    drawRays(c, w, h) {
        this.rays.forEach((ray) => {
            const a = ray.dy / ray.dx;
            const b = ray.y - a * ray.x;

            const xStart = (0 - b) / a;
            const yStart = a * 0 + b;

            const xEnd = (h - b) / a;
            const yEnd = a * w + b;

            let l = null;

            // check boundries
            if (ray.dx) {
                if (yEnd <= h) {
                    l = Math.max(Math.sqrt((w - ray.x) ** 2 + (yEnd - ray.y) ** 2), l);
                }
                if (yStart >= 0) {
                    l = Math.max(Math.sqrt((0 - ray.x) ** 2 + (yStart - ray.y) ** 2), l);
                }
                if (xEnd <= w) {
                    l = Math.max(Math.sqrt((xEnd - ray.x) ** 2 + (h - ray.y) ** 2), l);
                }
                if (xStart >= 0) {
                    l = Math.max(Math.sqrt((xStart - ray.x) ** 2 + (0 - ray.y) ** 2), l);
                }
                ray.draw(c, l);
            }

            // check obstacles <---- TODO
            // ---------------------------
        });
    }

    renderMainCanvas(c, width, height) {
        c.clearRect(0, 0, width, height);
        c.fillStyle = '#000000';
        c.fillRect(0, 0, width, height);
        this.drawRays(c, width, height);
        this.drawLights(c);
    }

    update(x, y) {
        // chosing active light
        const activeLight = this.lights.filter((light) => {
            return light.isActive;
        });

        // update position active light
        if (activeLight[0]) {
            activeLight[0].x = x;
            activeLight[0].y = y;
            activeLight[0].color = '#f4f6ccff';

            // update rays of active light
            const lightRays = this.rays.filter((ray) => {
                return ray.id == activeLight[0].id;
            });

            lightRays.forEach((ray) => {
                ray.x = x;
                ray.y = y;
            });
        }
    }

    renderListCanvas(c, width, height) {
        const offsetY = 10;
        c.clearRect(0, 0, width, height);
        c.fillStyle = '#1a1a1a';
        c.fillRect(0, 0, width, height);
        this.lights.forEach((light, ind) => {
            light.xList = width / 2;
            light.yList = 50 * (ind + 1) + offsetY;
            light.rList = 20;
            light.draw(c, light.xList, light.yList, light.rList, light.color);
        });
    }
}
