import { World } from "util/World";
export declare class DungeonGenerator {
    private world;
    private rooms;
    generate(world: World): void;
    private addRoom(room);
    private roomIntersects(room);
    private generateRoom();
}
