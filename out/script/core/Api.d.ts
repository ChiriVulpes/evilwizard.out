import { Readout } from "core/Readout";
import { Sound } from "core/Sound";
import { TileType } from "core/Tiles";
import { World } from "core/World";
import { Canvas } from "util/Canvas";
import { GameObject } from "util/GameObject";
import { IVector } from "util/Vector";
export interface IApi<Entity = GameObject, Player = GameObject> {
    entities: Entity[];
    world: World;
    readout: Readout;
    canvas: Canvas;
    player: Player;
    playerLevel: number;
    sounds: Sound;
    reset(): void;
    getCorpseAt(position: IVector): Entity | undefined;
    getEntityAt(position: IVector, exclude?: Entity[], offsetPosition?: boolean): Entity | undefined;
    addEntity(entity: Entity, position: IVector): void;
    removeEntity(corpse: Entity): void;
    getTileBlocker(position: IVector, exclude?: Entity[]): Entity | TileType | undefined;
}
export declare enum Direction {
    Down = 0,
    Up = 1,
    Right = 2,
    Left = 3,
}
export declare enum MagicLevel {
    None = 0,
    Level1 = 1,
    Level2 = 2,
    Level3 = 3,
    Level4 = 4,
}
export declare const magicLevels: {
    [key: number]: number;
};
