define(["require", "exports", "core/Entities", "core/Entity", "core/Sound", "util/Random"], function (require, exports, Entities_1, Entity_1, Sound_1, Random_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Frog extends Entity_1.Entity {
        constructor() {
            super(...arguments);
            this.type = Entities_1.EntityType.Frog;
            this.magic = 15;
            this.maxHealth = 2;
            this.resistances = [Entity_1.DamageType.Earth, Entity_1.DamageType.Water, Entity_1.DamageType.Physical];
            this.weaknesses = [Entity_1.DamageType.Fire, Entity_1.DamageType.Physical];
            this.damageType = [Entity_1.DamageType.Earth, Entity_1.DamageType.Water];
            this.damageAmount = 2;
            this.hasBeenAttacked = false;
            this.stepSound = Sound_1.SoundType.FrogStep;
        }
        onDamage(amt) {
            this.hasBeenAttacked = true;
            return super.onDamage(amt);
        }
        onBlocked(tileBlocker, force = false) {
            if (force) {
                super.onBlocked(tileBlocker);
            }
            else {
                this.wander(true);
            }
        }
        update(time) {
            if (this.state != Entity_1.EntityState.Dead) {
                let player;
                if (this.hasBeenAttacked) {
                    player = this.getNearest(Entities_1.EntityType.EvilWizard, 5);
                }
                if (this.hasBeenAttacked && player) {
                    this.moveTowards(player);
                }
                else {
                    if (Random_1.Random.chance(0.5)) {
                        this.resetMovementQueue();
                    }
                    else {
                        this.wander();
                    }
                }
            }
            super.update(time);
        }
    }
    exports.Frog = Frog;
});
