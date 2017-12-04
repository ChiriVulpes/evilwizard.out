define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Controls {
        start() {
            this.handlers = {};
            this.states = {};
            this.listener = event => {
                const pressName = event instanceof MouseEvent ? `Mouse${event.button}` : event.code;
                if (event.type.endsWith("up")) {
                    delete this.states[pressName];
                }
                else {
                    this.states[pressName] = true;
                    if (this.handlers[pressName]) {
                        for (const handler of this.handlers[pressName]) {
                            handler();
                        }
                    }
                }
            };
            document.addEventListener("mousedown", this.listener);
            document.addEventListener("keydown", this.listener);
            document.addEventListener("mouseup", this.listener);
            document.addEventListener("keyup", this.listener);
        }
        stop() {
            document.removeEventListener("mousedown", this.listener);
            document.removeEventListener("keydown", this.listener);
            document.removeEventListener("mouseup", this.listener);
            document.removeEventListener("keyup", this.listener);
        }
        onDown(press, cb) {
            this.handlers[press].push(cb);
        }
        isDown(press) {
            return !!this.states[press];
        }
    }
    exports.Controls = Controls;
});
