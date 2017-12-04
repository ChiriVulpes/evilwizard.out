define(["require", "exports", "core/Api", "core/Entities", "core/Entity", "core/Tiles", "entities/Flower", "entities/Frog", "entities/Mushroom", "util/Random", "util/Vector"], function (require, exports, Api_1, Entities_1, Entity_1, Tiles_1, Flower_1, Frog_1, Mushroom_1, Random_1, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RoomType;
    (function (RoomType) {
        RoomType[RoomType["Mushrooms"] = 0] = "Mushrooms";
        RoomType[RoomType["Flowers"] = 1] = "Flowers";
        RoomType[RoomType["Nature"] = 2] = "Nature";
        RoomType[RoomType["Frog"] = 3] = "Frog";
        RoomType[RoomType["Swampy"] = 4] = "Swampy";
    })(RoomType = exports.RoomType || (exports.RoomType = {}));
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
            const firstRoom = this.generateRoom(10, 15);
            firstRoom.position = Vector_1.Vector(Math.floor(world.size.x / 2 - firstRoom.size.x / 2), Math.floor(world.size.y / 2 - firstRoom.size.y / 2));
            this.addRoom(firstRoom);
            this.generateRooms(5, 8, 15);
            this.generateRooms(15, 5, 7);
            this.addPaths();
            world.remap();
        }
        generateRooms(count, minSize, maxSize) {
            for (let i = 0; i < count; i++) {
                let room;
                let tries = 0;
                do {
                    room = this.generateRoom(minSize, maxSize);
                    tries++;
                    if (tries > 50 && tries % 3 === 0) {
                        minSize = Math.max(5, minSize--);
                        maxSize = Math.max(5, maxSize--);
                    }
                    if (tries > 100) {
                        return;
                    }
                } while (this.roomIntersects(room));
                this.addRoom(room);
            }
        }
        addPaths() {
            for (const room of this.rooms) {
                const nearestRooms = this.getNearestRooms(room, Random_1.Random.int(1, 4));
                for (const nearRoom of nearestRooms) {
                    const start = this.getRandomEdge(room, nearRoom.closestSide);
                    this.drawPath(start, nearRoom.closestSide, nearRoom.room);
                }
            }
        }
        drawPath(start, direction, to) {
            let target = this.getPathCornerTarget(direction, to);
            const pos = Vector_1.Vector(start);
            let tries = 0;
            for (; !this.isAtTarget(pos, direction, target); this.movePositionDirection(pos, direction)) {
                tries++;
                if (tries > 100) {
                    return;
                }
                if (!this.world.getTile(pos)) {
                    this.world.setTile(pos, Tiles_1.TileType.Grass);
                }
            }
            if (this.isInRoom(pos, to)) {
                return;
            }
            direction = this.getDirection(pos, to);
            target = this.getPathTarget(direction, to);
            for (; !this.isAtTarget(pos, direction, target); this.movePositionDirection(pos, direction)) {
                tries++;
                if (tries > 100) {
                    return;
                }
                if (!this.world.getTile(pos)) {
                    this.world.setTile(pos, Tiles_1.TileType.Grass);
                }
            }
        }
        getDirection(position, room) {
            if (position.x >= room.position.x && position.x < room.position.x + room.size.x) {
                return position.y > room.position.y ? Api_1.Direction.Up : Api_1.Direction.Down;
            }
            else {
                return position.x > room.position.x ? Api_1.Direction.Left : Api_1.Direction.Right;
            }
        }
        getPathTarget(direction, room) {
            switch (direction) {
                case Api_1.Direction.Up: return room.position.y + room.size.y - 1;
                case Api_1.Direction.Down: return room.position.y;
                case Api_1.Direction.Left: return room.position.x + room.size.x - 1;
                case Api_1.Direction.Right: return room.position.x;
            }
        }
        isAtTarget(position, direction, target) {
            switch (direction) {
                case Api_1.Direction.Down:
                case Api_1.Direction.Up:
                    return position.y == target;
                case Api_1.Direction.Left:
                case Api_1.Direction.Right:
                    return position.x == target;
            }
        }
        isInRoom(position, room) {
            return position.x >= room.position.x && position.x < room.position.x + room.size.x &&
                position.y >= room.position.y && position.y < room.position.y + room.size.y;
        }
        movePositionDirection(position, direction) {
            if (direction == Api_1.Direction.Up) {
                position.y -= 1;
            }
            else if (direction == Api_1.Direction.Down) {
                position.y += 1;
            }
            else if (direction == Api_1.Direction.Left) {
                position.x -= 1;
            }
            else if (direction == Api_1.Direction.Right) {
                position.x += 1;
            }
        }
        getPathCornerTarget(direction, to) {
            switch (direction) {
                case Api_1.Direction.Down:
                case Api_1.Direction.Up:
                    return to.position.y + Random_1.Random.int(to.size.y);
                case Api_1.Direction.Left:
                case Api_1.Direction.Right:
                    return to.position.x + Random_1.Random.int(to.size.x);
            }
        }
        getRandomEdge(room, side) {
            switch (side) {
                case Api_1.Direction.Down: return Vector_1.Vector(room.position.x + Random_1.Random.int(room.size.x), room.position.y + room.size.y);
                case Api_1.Direction.Left: return Vector_1.Vector(room.position.x, room.position.y + Random_1.Random.int(room.size.y));
                case Api_1.Direction.Right: return Vector_1.Vector(room.position.x + room.size.x, room.position.y + Random_1.Random.int(room.size.y));
                case Api_1.Direction.Up: return Vector_1.Vector(room.position.x + Random_1.Random.int(room.size.x), room.position.y);
            }
        }
        getNearestRooms(roomA, count) {
            const nearestRooms = [];
            for (const room of this.rooms) {
                if (room === roomA) {
                    continue;
                }
                const distanceX = Math.max(Math.abs(room.position.x + room.size.x - roomA.position.x), Math.abs(roomA.position.x + roomA.size.x - room.position.x));
                const distanceY = Math.max(Math.abs(room.position.y + room.size.y - roomA.position.y), Math.abs(roomA.position.y + roomA.size.y - room.position.y));
                nearestRooms.push({
                    room,
                    distance: Math.avg(distanceX, distanceY),
                    closestSide: (distanceX > distanceY ?
                        (room.position.x > roomA.position.x ? Api_1.Direction.Right : Api_1.Direction.Left) : (room.position.y > roomA.position.y ? Api_1.Direction.Down : Api_1.Direction.Up)),
                    distanceX,
                    distanceY,
                });
            }
            nearestRooms.sort((a, b) => a.distance - b.distance).splice(count);
            return nearestRooms;
        }
        addRoom(roomLayout) {
            const roomType = Random_1.Random.enumMember(RoomType);
            const room = Object.assign({}, roomLayout, { type: roomType, entities: [] });
            this.rooms.push(room);
            switch (roomType) {
                case RoomType.Mushrooms:
                    this.spawnEntities(room, Entities_1.EntityType.Mushroom, Random_1.Random.int(1, 6));
                    break;
                case RoomType.Flowers:
                    this.spawnEntities(room, Entities_1.EntityType.Flower, Random_1.Random.int(10, 15));
                    break;
                case RoomType.Frog:
                    this.spawnEntities(room, Entities_1.EntityType.Frog, Random_1.Random.int(1, 5));
                    break;
                case RoomType.Swampy:
                    this.spawnEntities(room, Entities_1.EntityType.Frog, Random_1.Random.int(1, 4));
                    this.spawnEntities(room, Entities_1.EntityType.Mushroom, Random_1.Random.int(1, 4));
                    break;
                case RoomType.Nature:
                    this.spawnEntities(room, Entities_1.EntityType.Mushroom, Random_1.Random.int(1, 4));
                    this.spawnEntities(room, Entities_1.EntityType.Frog, Random_1.Random.int(1, 3));
                    this.spawnEntities(room, Entities_1.EntityType.Flower, Random_1.Random.int(3, 7));
                    break;
            }
            for (let y = room.position.y; y < room.position.y + room.size.y; y++) {
                for (let x = room.position.x; x < room.position.x + room.size.x; x++) {
                    this.world.setTile(Vector_1.Vector(x, y), Tiles_1.TileType.Grass);
                }
            }
        }
        spawnEntities(room, entityType, count) {
            const enemyCount = count;
            for (let i = 0; i < enemyCount; i++) {
                let position;
                do {
                    position = Vector_1.Vector(room.position.x + Random_1.Random.int(room.size.x), room.position.y + Random_1.Random.int(room.size.y));
                } while (this.entityAt(room.entities, position));
                room.entities.push(this.spawnEntity(entityType, position));
            }
        }
        spawnEntity(entityType, position) {
            let entity;
            switch (entityType) {
                case Entities_1.EntityType.Mushroom:
                    entity = new Mushroom_1.Mushroom();
                    break;
                case Entities_1.EntityType.Flower:
                    entity = new Flower_1.Flower();
                    break;
                case Entities_1.EntityType.Frog:
                    entity = new Frog_1.Frog();
                    break;
            }
            entity.position = position;
            return entity;
        }
        entityAt(entities, position) {
            for (const object of entities) {
                if (object instanceof Entity_1.Entity && object.position.x == position.x && object.position.y == position.y) {
                    return object;
                }
            }
            return undefined;
        }
        roomIntersects(room) {
            for (const existingRoom of this.rooms) {
                if (roomIntersects(room, existingRoom, 1)) {
                    return true;
                }
            }
            return false;
        }
        generateRoom(min, max) {
            const size = Vector_1.Vector(Random_1.Random.int(min, max), Random_1.Random.int(min, max));
            const position = Vector_1.Vector(Random_1.Random.int(0, this.world.size.x - size.x), Random_1.Random.int(0, this.world.size.y - size.y));
            return { size, position };
        }
    }
    exports.DungeonGenerator = DungeonGenerator;
});
