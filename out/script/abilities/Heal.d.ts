import { Ability, AbilityType } from "core/Ability";
export declare class Heal extends Ability {
    type: AbilityType;
    cost: number;
    canUse(): boolean;
    onUse(): boolean;
}
