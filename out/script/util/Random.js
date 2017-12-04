define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Random(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return min + Math.random() * (max - min);
    }
    exports.Random = Random;
    (function (Random) {
        function int(min, max) {
            if (max === undefined) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min));
        }
        Random.int = int;
        function chance(c) {
            return Math.random() <= c;
        }
        Random.chance = chance;
        /**
         * Must be an enum with auto-assigned numeric values
         */
        function enumMember(e) {
            return Random.int(Object.keys(e).length / 2);
        }
        Random.enumMember = enumMember;
    })(Random = exports.Random || (exports.Random = {}));
});
