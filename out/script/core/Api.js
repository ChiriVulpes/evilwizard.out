define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Direction;
    (function (Direction) {
        Direction[Direction["Down"] = 0] = "Down";
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Right"] = 2] = "Right";
        Direction[Direction["Left"] = 3] = "Left";
    })(Direction = exports.Direction || (exports.Direction = {}));
    var MagicLevel;
    (function (MagicLevel) {
        MagicLevel[MagicLevel["None"] = 0] = "None";
        MagicLevel[MagicLevel["Level1"] = 1] = "Level1";
        MagicLevel[MagicLevel["Level2"] = 2] = "Level2";
        MagicLevel[MagicLevel["Level3"] = 3] = "Level3";
        MagicLevel[MagicLevel["Level4"] = 4] = "Level4";
    })(MagicLevel = exports.MagicLevel || (exports.MagicLevel = {}));
    exports.magicLevels = {
        [MagicLevel.Level1]: 25,
        [MagicLevel.Level2]: 75,
        [MagicLevel.Level3]: 200,
        [MagicLevel.Level4]: 500,
    };
});
