define(["require", "exports", "core/Entities", "core/Entity", "core/Readout", "core/Sound", "util/Random"], function (require, exports, Entities_1, Entity_1, Readout_1, Sound_1, Random_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EvilWizard extends Entity_1.Entity {
        constructor() {
            super(...arguments);
            this.type = Entities_1.EntityType.EvilWizard;
            this.magic = 0;
            this.maxHealth = 15;
            this.resistances = [Entity_1.DamageType.Dark, Entity_1.DamageType.Earth, Entity_1.DamageType.Water];
            this.weaknesses = [Entity_1.DamageType.Fire, Entity_1.DamageType.Light];
            this.allegiance = Entity_1.Allegiance.EvilWizard;
            this.damageType = [Entity_1.DamageType.Physical, Entity_1.DamageType.Dark];
            this.damageAmount = 2;
            this.stepSound = Sound_1.SoundType.WizardStep;
        }
        getBlocker(position) {
            const blocker = super.getBlocker(position);
            if (blocker instanceof Entity_1.Entity && blocker.type == Entities_1.EntityType.DarkHand) {
                return;
            }
            return blocker;
        }
        onDamage(amt) {
            const level = this.api.playerLevel + 1;
            amt *= level * level * level;
            super.onDamage(amt);
            return amt;
        }
        update(time) {
            if (this.state != Entity_1.EntityState.Dead) {
                const corpse = this.api.getCorpseAt(this.position);
                if (corpse && corpse.magic) {
                    this.stealMagic(corpse);
                    this.api.sounds.play(Sound_1.SoundType.Pickup);
                }
            }
            super.update(time);
        }
        stealMagic(corpse, source = this.type) {
            const stolenMagic = Random_1.Random(corpse.magic / 2, corpse.magic * 1.5) + this.api.playerLevel * this.api.playerLevel;
            this.magic += stolenMagic;
            this.api.removeEntity(corpse);
            this.api.readout.showNumber(Readout_1.MessageType.Magic, stolenMagic, this.api.canvas.getScreenPosition(this.position));
            this.api.readout.showMessage(Readout_1.MessageType.Magic, `
			${this.api.readout.getName(source, true)} collected ${stolenMagic.toFixed(1)}
			magic from ${this.api.readout.getName(corpse.type)}.
		`);
        }
        onShowFightResult(damageResult) {
            this.api.readout.showDamageResult(damageResult, Readout_1.MessageType.Fight);
        }
        onDestroy() {
            super.onDestroy();
            setTimeout(() => {
                this.api.readout.showMessage(Readout_1.MessageType.Bad, "You were killed! The forest will consume your remains...");
                this.api.sounds.play(Sound_1.SoundType.GameOver);
                setTimeout(() => {
                    this.api.reset();
                }, 5000);
            }, 100);
        }
    }
    exports.EvilWizard = EvilWizard;
});
