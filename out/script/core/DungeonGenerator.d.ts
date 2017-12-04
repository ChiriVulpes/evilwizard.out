import { Entity } from "core/Entity";
import { World } from "core/World";
import { IVector } from "util/Vector";
export declare enum RoomType {
    Mushrooms = 0,
    Flowers = 1,
    Nature = 2,
    Frog = 3,
    Swampy = 4,
}
export interface IRoom extends IRoomLayout {
    pathsTo?: IRoom[];
    entities: Entity[];
    type: RoomType;
}
export interface IRoomLayout {
    size: IVector;
    position: IVector;
}
export declare class DungeonGenerator {
    rooms: IRoom[];
    private world;
    generate(world: World): void;
    private generateRooms(count, minSize, maxSize);
    private addPaths();
    private drawPath(start, direction, to);
    private getDirection(position, room);
    private getPathTarget(direction, room);
    private isAtTarget(position, direction, target);
    private isInRoom(position, room);
    private movePositionDirection(position, direction);
    private getPathCornerTarget(direction, to);
    private getRandomEdge(room, side);
    private getNearestRooms(roomA, count);
    private addRoom(roomLayout);
    private spawnEntities(room, entityType, count);
    private spawnEntity(entityType, position);
    private entityAt(entities, position);
    private roomIntersects(room);
    private generateRoom(min, max);
}
