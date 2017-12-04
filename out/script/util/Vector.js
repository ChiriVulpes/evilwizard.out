define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Vector(x, y) {
        if (typeof x == "object") {
            y = x.y;
            x = x.x;
        }
        else if (y === undefined) {
            y = x;
        }
        return { x, y };
    }
    exports.Vector = Vector;
    (function (Vector) {
        function Zero() {
            return Vector(0);
        }
        Vector.Zero = Zero;
        function One() {
            return Vector(1);
        }
        Vector.One = One;
    })(Vector = exports.Vector || (exports.Vector = {}));
});
