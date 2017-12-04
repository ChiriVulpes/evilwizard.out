define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TimeManager {
        constructor() {
            this.tickLength = 10;
        }
        get realTime() {
            return this._realTime;
        }
        get isNewTick() {
            return this._isNewTick;
        }
        get tick() {
            return this._tick;
        }
        get canTick() {
            return this.tickTime == 0 && !this.timeout;
        }
        get tickPercent() {
            return 1 - this.tickTime / this.tickLength;
        }
        nextTick() {
            this._isNewTick = true;
            this.tickTime = this.tickLength;
        }
        reset() {
            this._tick = 0;
            this._realTime = Date.now();
            this.tickTime = 0;
        }
        update() {
            this._realTime = Date.now();
            if (this.tickTime) {
                this.tickTime--;
                this._isNewTick = false;
            }
            else if (this.timeout) {
                this.timeout--;
            }
        }
    }
    exports.TimeManager = TimeManager;
});
