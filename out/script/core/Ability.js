define(["require", "exports", "core/Readout"], function (require, exports, Readout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbilityType;
    (function (AbilityType) {
        AbilityType[AbilityType["Heal"] = 0] = "Heal";
        AbilityType[AbilityType["DarkHand"] = 1] = "DarkHand";
        AbilityType[AbilityType["Fireball"] = 2] = "Fireball";
        AbilityType[AbilityType["Eraser"] = 3] = "Eraser";
    })(AbilityType = exports.AbilityType || (exports.AbilityType = {}));
    class Ability {
        canUse() {
            return this.cost <= this.api.player.magic;
        }
        use() {
            if (!this.canUse()) {
                return false;
            }
            this.api.readout.showMessage(Readout_1.MessageType.Magic, `You used your ability ${AbilityType[this.type]} for ${this.cost.toFixed(1)} magic.`);
            this.onUse();
            this.api.player.magic -= this.cost;
            const screenPosition = this.api.canvas.getScreenPosition(this.api.player.position);
            this.api.readout.showNumber(Readout_1.MessageType.Magic, -this.cost, {
                x: screenPosition.x,
                y: screenPosition.y - 30,
            });
            return true;
        }
    }
    exports.Ability = Ability;
});
