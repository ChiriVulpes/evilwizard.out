define(["require", "exports", "core/Ability"], function (require, exports, Ability_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Heal extends Ability_1.Ability {
        constructor() {
            super(...arguments);
            this.type = Ability_1.AbilityType.Heal;
        }
    }
    exports.Heal = Heal;
});
