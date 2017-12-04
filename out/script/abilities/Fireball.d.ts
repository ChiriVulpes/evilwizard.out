import { Ability, AbilityType } from "core/Ability";
export declare class Fireball extends Ability {
    type: AbilityType;
    cost: number;
    private position?;
    private tileBlocker?;
    canUse(): boolean;
    onUse(): void;
}
