define(["require", "exports", "core/Ability", "core/Entities", "core/Entity", "entities/Fireball"], function (require, exports, Ability_1, Entities_1, Entity_1, Fireball_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Fireball extends Ability_1.Ability {
        constructor() {
            super(...arguments);
            this.type = Ability_1.AbilityType.Fireball;
            this.cost = 4;
        }
        canUse() {
            if (!super.canUse()) {
                return false;
            }
            this.position = this.api.player.getOffsetPosition(this.api.player.direction);
            const tileBlocker = this.api.getTileBlocker(this.position);
            if (tileBlocker) {
                if (tileBlocker instanceof Entity_1.Entity) {
                    if (tileBlocker.type != Entities_1.EntityType.Fireball && tileBlocker.state != Entity_1.EntityState.Dead) {
                        this.tileBlocker = tileBlocker;
                    }
                }
                else {
                    return false;
                }
            }
            return true;
        }
        onUse() {
            if (this.tileBlocker) {
                const damageResult = this.tileBlocker.damage(Entity_1.DamageType.Fire, 2);
                this.api.readout.showDamageResult(Object.assign({}, damageResult, { source: Entities_1.EntityType.Fireball }));
                delete this.tileBlocker;
            }
            const entity = new Fireball_1.Fireball();
            entity.onStartMove(this.api.player.direction);
            entity.movementQueue = Array(10).fill(this.api.player.direction);
            this.api.addEntity(entity, this.position);
            delete this.position;
        }
    }
    exports.Fireball = Fireball;
});
