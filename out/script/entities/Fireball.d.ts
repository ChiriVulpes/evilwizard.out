import { EntityType } from "core/Entities";
import { Allegiance, DamageType, Entity } from "core/Entity";
import { TileType } from "core/Tiles";
import { TimeManager } from "util/TimeManager";
import { IVector } from "util/Vector";
export declare class Fireball extends Entity {
    type: EntityType;
    damageType: DamageType[];
    damageAmount: number;
    maxHealth: number;
    allegiance: Allegiance;
    showDamage: boolean;
    getBlocker(position: IVector): TileType | undefined;
    onBlocked(tileBlocker: Entity | TileType): void;
    onNoMovementQueued(): undefined;
    onDestroy(): void;
    update(time: TimeManager): void;
    getAnimationFrame(time: TimeManager): number;
}
