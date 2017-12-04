define(["require", "exports", "core/Ability", "core/Entity", "core/Readout", "core/Sound"], function (require, exports, Ability_1, Entity_1, Readout_1, Sound_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Eraser extends Ability_1.Ability {
        constructor() {
            super(...arguments);
            this.type = Ability_1.AbilityType.Eraser;
            this.cost = 200;
            this.used = false;
        }
        canUse() {
            return !this.used;
        }
        onUse() {
            this.used = true;
            for (const entity of this.api.entities) {
                entity.state = Entity_1.EntityState.Dead;
            }
            this.api.player.state = Entity_1.EntityState.Alive;
            this.api.readout.showMessage(Readout_1.MessageType.Bad, "All plants and creatures fall to the ground limp.");
            this.api.readout.showMessage(Readout_1.MessageType.Bad, "Nothing is left.");
            this.api.readout.disableMessages();
            this.api.sounds.play(Sound_1.SoundType.GameOver);
            document.body.style.setProperty("--creepiness", `${1}`);
            return true;
        }
    }
    exports.Eraser = Eraser;
});
