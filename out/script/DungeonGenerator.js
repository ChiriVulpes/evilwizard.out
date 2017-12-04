define(["require", "exports", "util/Random", "util/Tiles", "util/Vector"], function (require, exports, Random, Tiles_1, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function roomIntersects(a, b, padding = 0) {
        return a.position.x + a.size.x + padding > b.position.x && a.position.x - padding < b.position.x + b.size.x &&
            a.position.y + a.size.y + padding > b.position.y && a.position.y - padding < b.position.y + b.size.y;
    }
    class DungeonGenerator {
        constructor() {
            this.rooms = [];
        }
        generate(world) {
            this.world = world;
            this.rooms = [];
            world.clear();
            const firstRoom = this.generateRoom();
            firstRoom.position = Vector_1.Vector(Math.floor(world.size.x / 2 - firstRoom.size.x / 2), Math.floor(world.size.y / 2 - firstRoom.size.y / 2));
            this.addRoom(firstRoom);
            for (let i = 0; i < 7; i++) {
                let room;
                do {
                    room = this.generateRoom();
                } while (this.roomIntersects(room));
                this.addRoom(room);
            }
            world.remap();
        }
        addRoom(room) {
            this.rooms.push(room);
            for (let y = room.position.y; y < room.position.y + room.size.y; y++) {
                for (let x = room.position.x; x < room.position.x + room.size.x; x++) {
                    this.world.setTile(Vector_1.Vector(x, y), Tiles_1.Tile.Grass);
                }
            }
        }
        roomIntersects(room) {
            for (const existingRoom of this.rooms) {
                if (roomIntersects(room, existingRoom, 1)) {
                    return true;
                }
            }
            return false;
        }
        generateRoom() {
            const size = Vector_1.Vector(Random.int(5, 10), Random.int(5, 10));
            const position = Vector_1.Vector(Random.int(0, this.world.size.x - size.x), Random.int(0, this.world.size.y - size.y));
            return { size, position };
        }
    }
    exports.DungeonGenerator = DungeonGenerator;
});
