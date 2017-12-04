import { EntityType } from "core/Entities";
import { DamageType, Entity } from "core/Entity";
import { SoundType } from "core/Sound";
import { TimeManager } from "util/TimeManager";
export declare class Flower extends Entity {
    type: EntityType;
    magic: number;
    maxHealth: number;
    resistances: DamageType[];
    weaknesses: DamageType[];
    damageType: DamageType[];
    damageAmount: number;
    stepSound: SoundType;
    update(time: TimeManager): void;
}
