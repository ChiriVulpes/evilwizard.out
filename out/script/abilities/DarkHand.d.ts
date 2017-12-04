import { Ability, AbilityType } from "core/Ability";
export declare class DarkHand extends Ability {
    type: AbilityType;
    cost: number;
    onUse(): boolean;
}
