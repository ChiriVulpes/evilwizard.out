define(["require", "exports", "util/Vector"], function (require, exports, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Canvas {
        constructor(id) {
            this.images = {};
            this.scale = 3;
            this.canvasElement = document.getElementById(id);
            this.reestablishContext();
            window.addEventListener("resize", () => this.reestablishContext());
        }
        set viewportPosition(position) {
            this.viewport.position.x = Math.floor(position.x * 16) * this.scale - Math.floor(this.viewport.size.x / 2);
            this.viewport.position.y = Math.floor(position.y * 16) * this.scale - Math.floor(this.viewport.size.y / 2);
        }
        async loadImages(imageEnum, location, except) {
            const promises = [];
            const keys = Object.keys(imageEnum).length / 2;
            for (let i = 0; i < keys; i++) {
                if (except && except.includes(i)) {
                    continue;
                }
                const imageName = this.getImageName(imageEnum[i], location);
                this.images[imageName] = new Image();
                promises.push(new Promise(r => this.images[imageName].onload = r));
                this.images[imageName].src = `./static/img/${imageName}.png`;
            }
            return Promise.all(promises);
        }
        getImageName(image, location) {
            return `${location}/${image.toLowerCase()}`;
        }
        clear() {
            this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
        drawSubTiles(imageName, drawPosition, subtiles) {
            const image = this.images[imageName];
            this.drawImageViewport(image, drawPosition.x * 16, drawPosition.y * 16, this.getImagePosition(image, subtiles.upLeft, 8), Vector_1.Vector(8));
            this.drawImageViewport(image, drawPosition.x * 16 + 8, drawPosition.y * 16, this.getImagePosition(image, subtiles.upRight, 8), Vector_1.Vector(8));
            this.drawImageViewport(image, drawPosition.x * 16, drawPosition.y * 16 + 8, this.getImagePosition(image, subtiles.downLeft, 8), Vector_1.Vector(8));
            this.drawImageViewport(image, drawPosition.x * 16 + 8, drawPosition.y * 16 + 8, this.getImagePosition(image, subtiles.downRight, 8), Vector_1.Vector(8));
        }
        drawFrame(imageName, animation, frame, position) {
            const image = this.images[imageName];
            this.drawImageViewport(image, position.x * 16, position.y * 16, {
                x: frame * 16,
                y: animation * 16,
            }, Vector_1.Vector(16));
        }
        isPositionVisible(x, y) {
            const s = 16 * this.scale;
            return x * s + s >= this.viewport.position.x && x * s < this.viewport.position.x + this.viewport.size.x &&
                y * s + s >= this.viewport.position.y && y * s < this.viewport.position.y + this.viewport.size.y;
        }
        getScreenPosition(position) {
            return Vector_1.Vector(position.x * 16 * this.scale - this.viewport.position.x, position.y * 16 * this.scale - this.viewport.position.y);
        }
        getImagePosition(img, tile, size) {
            return {
                x: (tile % (img.width / size)) * size,
                y: Math.floor(tile / (img.width / size)) * size,
            };
        }
        drawImageViewport(img, drawX, drawY, imgPosition, imgSize) {
            this.context.drawImage(img, imgPosition.x, imgPosition.y, imgSize.x, imgSize.y, Math.floor(drawX) * this.scale - this.viewport.position.x, Math.floor(drawY) * this.scale - this.viewport.position.y, imgSize.x * this.scale, imgSize.y * this.scale);
        }
        reestablishContext() {
            this.canvasElement.width = window.innerWidth;
            this.canvasElement.height = window.innerHeight;
            this.context = this.canvasElement.getContext("2d");
            this.context.imageSmoothingEnabled = false;
            this.viewport = {
                position: Vector_1.Vector.Zero(),
                size: Vector_1.Vector(window.innerWidth, window.innerHeight),
            };
        }
    }
    exports.Canvas = Canvas;
});
