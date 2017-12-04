import { IApi } from "core/Api";
import { Entity } from "core/Entity";
import { EvilWizard } from "entities/EvilWizard";
export declare enum AbilityType {
    Heal = 0,
    DarkHand = 1,
    Fireball = 2,
    Eraser = 3,
}
export declare abstract class Ability {
    type: AbilityType;
    cost: number;
    api: IApi<Entity, EvilWizard>;
    canUse(): boolean;
    use(): boolean;
    abstract onUse(): any;
}
