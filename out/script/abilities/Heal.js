define(["require", "exports", "core/Ability", "core/Readout", "util/Random"], function (require, exports, Ability_1, Readout_1, Random_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Heal extends Ability_1.Ability {
        constructor() {
            super(...arguments);
            this.type = Ability_1.AbilityType.Heal;
            this.cost = 8;
        }
        canUse() {
            return super.canUse() && this.api.player.health < this.api.player.maxHealth;
        }
        onUse() {
            const amt = Random_1.Random(this.api.player.maxHealth / 5, Math.floor(this.api.player.maxHealth / 4));
            this.api.player.health += amt;
            if (this.api.player.health > this.api.player.maxHealth) {
                this.api.player.health = this.api.player.maxHealth;
            }
            this.api.readout.showNumber(Readout_1.MessageType.Heal, amt, this.api.canvas.getScreenPosition(this.api.player.position));
            this.api.readout.showMessage(Readout_1.MessageType.Heal, `You regained ${amt.toFixed(1)} health.`);
            return true;
        }
    }
    exports.Heal = Heal;
});
