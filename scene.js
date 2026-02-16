export default class Scene {
    constructor() {
        this.obstacles = [];
        this.lights = [];
    }

    addObstacle(o) {
        this.obstacles.push(o);
    }

    addLight(l) {
        this.lights.push(l);
    }
}
