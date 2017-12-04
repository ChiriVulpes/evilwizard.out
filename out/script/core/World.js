define(["require", "exports", "core/Tiles", "util/Vector"], function (require, exports, Tiles_1, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TileAdjacent;
    (function (TileAdjacent) {
        TileAdjacent[TileAdjacent["UpLeft"] = 1] = "UpLeft";
        TileAdjacent[TileAdjacent["Up"] = 2] = "Up";
        TileAdjacent[TileAdjacent["UpRight"] = 4] = "UpRight";
        TileAdjacent[TileAdjacent["Left"] = 8] = "Left";
        TileAdjacent[TileAdjacent["Right"] = 16] = "Right";
        TileAdjacent[TileAdjacent["DownLeft"] = 32] = "DownLeft";
        TileAdjacent[TileAdjacent["Down"] = 64] = "Down";
        TileAdjacent[TileAdjacent["DownRight"] = 128] = "DownRight";
    })(TileAdjacent || (TileAdjacent = {}));
    const mappedTiles = [Tiles_1.TileType.Grass, Tiles_1.TileType.Path];
    class World {
        constructor(size = Vector_1.Vector(64)) {
            this.size = size;
            this.tiles = new Array(this.size.x * this.size.y);
            this.mappings = new Array(this.size.x * this.size.y);
            this.clear();
        }
        clear() {
            this.tiles.fill(Tiles_1.TileType.None);
        }
        remap() {
            for (let y = 0; y < this.size.y; y++) {
                for (let x = 0; x < this.size.x; x++) {
                    if (mappedTiles.includes(this.getTile(x, y))) {
                        this.mappings[this.getTileLocation(x, y)] = this.getTileMapping(x, y);
                    }
                }
            }
        }
        render(canvas) {
            for (let y = 0; y < this.size.y; y++) {
                for (let x = 0; x < this.size.x; x++) {
                    if (!canvas.isPositionVisible(x, y)) {
                        continue;
                    }
                    const tile = this.getTile(x, y);
                    if (tile == Tiles_1.TileType.None) {
                        continue;
                    }
                    canvas.drawSubTiles(canvas.getImageName(Tiles_1.TileType[tile], "tile"), Vector_1.Vector(x, y), this.getSubTiles(this.mappings[this.getTileLocation(x, y)]));
                }
            }
        }
        getTile(x, y) {
            const tileLocation = this.getTileLocation(x, y);
            return tileLocation < 0 || tileLocation > this.tiles.length ?
                Tiles_1.TileType.None : this.tiles[tileLocation];
        }
        setTile(position, tile) {
            this.tiles[this.getTileLocation(position)] = tile;
        }
        getTileLocation(x, y) {
            if (typeof x == "object") {
                y = x.y;
                x = x.x;
            }
            if (x > this.size.x || y > this.size.y) {
                return Infinity;
            }
            return y * this.size.x + x;
        }
        getSubTiles(mapping) {
            return {
                upLeft: this.getUpLeft(mapping),
                upRight: this.getUpRight(mapping),
                downLeft: this.getDownLeft(mapping),
                downRight: this.getDownRight(mapping),
            };
        }
        getUpLeft(mapping) {
            if (mapping & TileAdjacent.Up) {
                if (mapping & TileAdjacent.Left) {
                    return mapping & TileAdjacent.UpLeft ? 2 : 4;
                }
                else {
                    return 14;
                }
            }
            else {
                return mapping & TileAdjacent.Left ? 12 : 0;
            }
        }
        getUpRight(mapping) {
            if (mapping & TileAdjacent.Up) {
                if (mapping & TileAdjacent.Right) {
                    return mapping & TileAdjacent.UpRight ? 3 : 5;
                }
                else {
                    return 15;
                }
            }
            else {
                return mapping & TileAdjacent.Right ? 13 : 1;
            }
        }
        getDownLeft(mapping) {
            if (mapping & TileAdjacent.Down) {
                if (mapping & TileAdjacent.Left) {
                    return mapping & TileAdjacent.DownLeft ? 8 : 10;
                }
                else {
                    return 20;
                }
            }
            else {
                return mapping & TileAdjacent.Left ? 18 : 6;
            }
        }
        getDownRight(mapping) {
            if (mapping & TileAdjacent.Down) {
                if (mapping & TileAdjacent.Right) {
                    return mapping & TileAdjacent.DownRight ? 9 : 11;
                }
                else {
                    return 21;
                }
            }
            else {
                return mapping & TileAdjacent.Right ? 19 : 7;
            }
        }
        getTileMapping(x, y = 0) {
            if (typeof x == "object") {
                y = x.y;
                x = x.x;
            }
            const tile = this.getTile(x, y);
            return ((this.getTile(x - 1, y - 1) == tile ? TileAdjacent.UpLeft : 0) |
                (this.getTile(x, y - 1) == tile ? TileAdjacent.Up : 0) |
                (this.getTile(x + 1, y - 1) == tile ? TileAdjacent.UpRight : 0) |
                (this.getTile(x - 1, y) == tile ? TileAdjacent.Left : 0) |
                (this.getTile(x + 1, y) == tile ? TileAdjacent.Right : 0) |
                (this.getTile(x - 1, y + 1) == tile ? TileAdjacent.DownLeft : 0) |
                (this.getTile(x, y + 1) == tile ? TileAdjacent.Down : 0) |
                (this.getTile(x + 1, y + 1) == tile ? TileAdjacent.DownRight : 0));
        }
    }
    exports.World = World;
});
