import { Ability } from "core/Ability";
import { EntityType } from "core/Entities";
import { IDamageResult } from "core/Entity";
import { IVector } from "util/Vector";
export declare enum MessageType {
    Damage = 0,
    Magic = 1,
    Heal = 2,
    Fight = 3,
    Good = 4,
    Bad = 5,
}
export declare class Readout {
    private messagesEnabled;
    reset(): void;
    setMagic(amt: number): void;
    setHealth(health: number, maxHealth: number): void;
    setAbilities(abilities: Ability[]): void;
    showNumber(type: MessageType, amt: number, position: IVector): void;
    showMessage(type: MessageType, text: string): void;
    disableMessages(): void;
    showDamageResult(damageResult: IDamageResult, type?: MessageType): void;
    getName(entityType: EntityType, shouldCapitalize?: boolean): string;
    private getText(type, text);
}
