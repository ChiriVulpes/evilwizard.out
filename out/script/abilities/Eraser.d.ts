import { Ability, AbilityType } from "core/Ability";
export declare class Eraser extends Ability {
    type: AbilityType;
    cost: number;
    used: boolean;
    canUse(): boolean;
    onUse(): boolean;
}
