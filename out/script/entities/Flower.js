define(["require", "exports", "core/Entities", "core/Entity", "core/Sound", "util/Random"], function (require, exports, Entities_1, Entity_1, Sound_1, Random_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Flower extends Entity_1.Entity {
        constructor() {
            super(...arguments);
            this.type = Entities_1.EntityType.Flower;
            this.magic = 1;
            this.maxHealth = 5;
            this.resistances = [Entity_1.DamageType.Earth, Entity_1.DamageType.Light, Entity_1.DamageType.Water];
            this.weaknesses = [Entity_1.DamageType.Fire, Entity_1.DamageType.Dark, Entity_1.DamageType.Physical];
            this.damageType = [Entity_1.DamageType.Physical];
            this.damageAmount = 1;
            this.stepSound = Sound_1.SoundType.FlowerStep;
        }
        update(time) {
            if (this.state != Entity_1.EntityState.Dead) {
                if (Random_1.Random.chance(0.9)) {
                    this.resetMovementQueue();
                }
                else {
                    this.wander();
                }
            }
            super.update(time);
        }
    }
    exports.Flower = Flower;
});
