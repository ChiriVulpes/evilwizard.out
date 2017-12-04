import { EntityType } from "core/Entities";
import { Allegiance, DamageType, Entity, IDamageResult } from "core/Entity";
import { SoundType } from "core/Sound";
import { TileType } from "core/Tiles";
import { TimeManager } from "util/TimeManager";
import { IVector } from "util/Vector";
export declare class EvilWizard extends Entity {
    type: EntityType;
    magic: number;
    maxHealth: number;
    resistances: DamageType[];
    weaknesses: DamageType[];
    allegiance: Allegiance;
    damageType: DamageType[];
    damageAmount: number;
    stepSound: SoundType;
    getBlocker(position: IVector): Entity | TileType | undefined;
    onDamage(amt: number): number;
    update(time: TimeManager): void;
    stealMagic(corpse: Entity, source?: EntityType): void;
    onShowFightResult(damageResult: IDamageResult): void;
    onDestroy(): void;
}
