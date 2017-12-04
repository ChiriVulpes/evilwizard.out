define(["require", "exports", "core/Entities", "core/Entity", "core/Sound", "util/Random"], function (require, exports, Entities_1, Entity_1, Sound_1, Random_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Mushroom extends Entity_1.Entity {
        constructor() {
            super(...arguments);
            this.type = Entities_1.EntityType.Mushroom;
            this.magic = 5;
            this.maxHealth = 3;
            this.resistances = [Entity_1.DamageType.Earth, Entity_1.DamageType.Dark];
            this.weaknesses = [Entity_1.DamageType.Fire, Entity_1.DamageType.Light, Entity_1.DamageType.Physical];
            this.damageType = [Entity_1.DamageType.Earth, Entity_1.DamageType.Dark];
            this.damageAmount = 1.5;
            this.stepSound = Sound_1.SoundType.MushroomStep;
        }
        update(time) {
            if (this.state != Entity_1.EntityState.Dead) {
                if (Random_1.Random.chance(0.4)) {
                    this.resetMovementQueue();
                }
                else if (Random_1.Random.chance(0.5)) {
                    this.wander();
                }
                else {
                    const player = this.getNearest(Entities_1.EntityType.EvilWizard, 5);
                    if (player) {
                        this.moveTowards(player);
                    }
                }
            }
            super.update(time);
        }
    }
    exports.Mushroom = Mushroom;
});
