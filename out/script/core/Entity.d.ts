import { Direction, IApi } from "core/Api";
import { EntityType } from "core/Entities";
import { SoundType } from "core/Sound";
import { TileType } from "core/Tiles";
import { Canvas } from "util/Canvas";
import { GameObject } from "util/GameObject";
import { TimeManager } from "util/TimeManager";
import { IVector } from "util/Vector";
export interface IDamageResult {
    source: EntityType;
    target: EntityType;
    amt: number;
    effectiveness: number;
    crit: CritType;
}
export declare enum CritType {
    None = 0,
    Fail = 1,
    Success = 2,
}
export declare enum DamageType {
    Physical = 0,
    Fire = 1,
    Light = 2,
    Dark = 3,
    Earth = 4,
    Water = 5,
}
export declare enum Allegiance {
    EvilWizard = 0,
    Nature = 1,
}
export declare enum EntityState {
    Alive = 0,
    Dead = 1,
}
export declare enum EntityBaseAnimation {
    Down = 0,
    Up = 1,
    Right = 2,
    Left = 3,
}
export declare abstract class Entity<Animation extends number = EntityBaseAnimation> extends GameObject {
    type: EntityType;
    magic: number;
    maxHealth: number;
    resistances: DamageType[];
    weaknesses: DamageType[];
    allegiance: Allegiance;
    damageType: DamageType[];
    damageAmount: number;
    showDamage: boolean;
    stepSound: SoundType;
    health: number;
    position: IVector;
    animation: Animation;
    movementQueue: Array<Direction | undefined>;
    movement?: Direction;
    attack?: Direction;
    direction: Direction;
    state: EntityState;
    api: IApi<Entity, Entity>;
    resetMovementQueue(): void;
    resetMovement(): void;
    getBlocker(position: IVector): Entity | TileType | undefined;
    move(direction: Direction, current?: boolean): void;
    moveTowards(entity: Entity): void;
    wander(current?: boolean): void;
    fight(entity: Entity): IDamageResult;
    damage(damageTypes: DamageType | DamageType[], amt: number): Partial<IDamageResult>;
    getNearest(type: EntityType, within?: number): Entity<EntityBaseAnimation> | undefined;
    distanceTo(entity: Entity): number;
    update(time: TimeManager): void;
    render(time: TimeManager, canvas: Canvas): void;
    getAnimationPosition(percent?: number): IVector;
    getOffsetPosition(movement?: Direction | undefined, percent?: number): IVector;
    blocksTile(tile: IVector): boolean;
    getAnimationFrame(time: TimeManager): number;
    onStartMove(direction: Direction): void;
    onStartAttack(direction: Direction): void;
    onDestroy(): void;
    onBlocked(tileBlocker: Entity | TileType, force?: boolean): void;
    onShowFightResult(damageResult: IDamageResult): void;
    onNoMovementQueued(): Direction | undefined;
    onDamage(amt: number): number;
}
