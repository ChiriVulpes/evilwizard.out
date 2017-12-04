import { EntityType } from "core/Entities";
import { DamageType, Entity } from "core/Entity";
import { SoundType } from "core/Sound";
import { TileType } from "core/Tiles";
import { TimeManager } from "util/TimeManager";
export declare class Frog extends Entity {
    type: EntityType;
    magic: number;
    maxHealth: number;
    resistances: DamageType[];
    weaknesses: DamageType[];
    damageType: DamageType[];
    damageAmount: number;
    hasBeenAttacked: boolean;
    stepSound: SoundType;
    onDamage(amt: number): number;
    onBlocked(tileBlocker: Entity | TileType, force?: boolean): void;
    update(time: TimeManager): void;
}
