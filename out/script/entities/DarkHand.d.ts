import { Direction, IApi } from "core/Api";
import { EntityType } from "core/Entities";
import { Allegiance, DamageType, Entity } from "core/Entity";
import { EvilWizard } from "entities/EvilWizard";
import { Canvas } from "util/Canvas";
import { TimeManager } from "util/TimeManager";
import { IVector } from "util/Vector";
export declare class DarkHand extends Entity {
    type: EntityType;
    damageType: DamageType[];
    damageAmount: number;
    maxHealth: number;
    allegiance: Allegiance;
    showDamage: boolean;
    api: IApi<Entity, EvilWizard>;
    private branches;
    private blockedTiles;
    private initialDirection;
    constructor(direction: Direction);
    update(time: TimeManager): void;
    render(time: TimeManager, canvas: Canvas): void;
    blocksTile(tile: IVector): boolean;
    private updateBlockedTiles();
    private grow();
}
