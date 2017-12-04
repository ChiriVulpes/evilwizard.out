define(["require", "exports", "DungeonGenerator", "util/Canvas", "util/Tiles", "util/TimeManager", "util/World"], function (require, exports, DungeonGenerator_1, Canvas_1, Tiles_1, TimeManager_1, World_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor() {
            this.isRunning = false;
            this.gameObjects = [];
            this.canvas = new Canvas_1.Canvas("game");
            this.time = new TimeManager_1.TimeManager();
            this.dungeonGenerator = new DungeonGenerator_1.DungeonGenerator();
        }
        get paused() {
            return this._paused;
        }
        set paused(paused) {
            this._paused = paused;
        }
        start() {
            this.time.reset();
            this.isRunning = true;
            this.world = new World_1.World();
            this.newLevel();
            this.loop();
        }
        async load() {
            await this.canvas.loadImages(Tiles_1.Tile, "tile", [Tiles_1.Tile.None]);
        }
        stop() {
            this.isRunning = false;
        }
        loop() {
            if (!this.isRunning) {
                return;
            }
            this.time.tick++;
            this.update();
            this.render();
            requestAnimationFrame(() => this.loop());
        }
        update() {
            for (const object of this.gameObjects) {
                object.update(this.time);
            }
        }
        render() {
            this.world.render(this.canvas);
            for (const object of this.gameObjects) {
                object.render(this.time, this.canvas);
            }
        }
        newLevel() {
            this.dungeonGenerator.generate(this.world);
        }
    }
    exports.Game = Game;
});
