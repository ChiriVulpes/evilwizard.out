define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TileType;
    (function (TileType) {
        TileType[TileType["None"] = 0] = "None";
        TileType[TileType["Grass"] = 1] = "Grass";
        TileType[TileType["Path"] = 2] = "Path";
    })(TileType = exports.TileType || (exports.TileType = {}));
    var Tile;
    (function (Tile) {
        function isWalkable(tile) {
            return tile != TileType.None;
        }
        Tile.isWalkable = isWalkable;
    })(Tile = exports.Tile || (exports.Tile = {}));
});
