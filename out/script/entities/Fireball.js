define(["require", "exports", "core/Entities", "core/Entity", "core/Readout"], function (require, exports, Entities_1, Entity_1, Readout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Fireball extends Entity_1.Entity {
        constructor() {
            super(...arguments);
            this.type = Entities_1.EntityType.Fireball;
            this.damageType = [Entity_1.DamageType.Fire];
            this.damageAmount = 2;
            this.maxHealth = 20;
            this.allegiance = Entity_1.Allegiance.EvilWizard;
            this.showDamage = false;
        }
        getBlocker(position) {
            const blocker = super.getBlocker(position);
            if (blocker instanceof Entity_1.Entity) {
                return;
            }
            return blocker;
        }
        onBlocked(tileBlocker) {
            this.onDestroy();
        }
        onNoMovementQueued() {
            this.onDestroy();
            return;
        }
        onDestroy() {
            this.api.removeEntity(this);
        }
        update(time) {
            if (time.isNewTick) {
                this.damageAmount += 2;
            }
            if (time.canTick || time.isNewTick) {
                const entity = this.api.getEntityAt(this.getOffsetPosition(), [this], true);
                if (entity && entity.state != Entity_1.EntityState.Dead && entity.type != Entities_1.EntityType.Fireball) {
                    const damageResult = this.fight(entity);
                    this.damage(Entity_1.DamageType.Fire, Infinity);
                    this.api.readout.showDamageResult(damageResult, Readout_1.MessageType.Fight);
                }
            }
            super.update(time);
        }
        getAnimationFrame(time) {
            return Math.floor(time.tickPercent * 2) % 2;
        }
    }
    exports.Fireball = Fireball;
});
