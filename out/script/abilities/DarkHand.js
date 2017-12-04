define(["require", "exports", "core/Ability", "entities/DarkHand", "util/Vector"], function (require, exports, Ability_1, DarkHand_1, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DarkHand extends Ability_1.Ability {
        constructor() {
            super(...arguments);
            this.type = Ability_1.AbilityType.DarkHand;
            this.cost = 50;
        }
        onUse() {
            this.api.addEntity(new DarkHand_1.DarkHand(this.api.player.direction), Vector_1.Vector(this.api.player.position));
            return true;
        }
    }
    exports.DarkHand = DarkHand;
});
