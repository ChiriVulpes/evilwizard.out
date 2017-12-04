define(["require", "exports", "core/Api", "core/Entities", "core/Readout", "util/GameObject", "util/Random", "util/Vector"], function (require, exports, Api_1, Entities_1, Readout_1, GameObject_1, Random_1, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CritType;
    (function (CritType) {
        CritType[CritType["None"] = 0] = "None";
        CritType[CritType["Fail"] = 1] = "Fail";
        CritType[CritType["Success"] = 2] = "Success";
    })(CritType = exports.CritType || (exports.CritType = {}));
    var DamageType;
    (function (DamageType) {
        DamageType[DamageType["Physical"] = 0] = "Physical";
        DamageType[DamageType["Fire"] = 1] = "Fire";
        DamageType[DamageType["Light"] = 2] = "Light";
        DamageType[DamageType["Dark"] = 3] = "Dark";
        DamageType[DamageType["Earth"] = 4] = "Earth";
        DamageType[DamageType["Water"] = 5] = "Water";
    })(DamageType = exports.DamageType || (exports.DamageType = {}));
    var Allegiance;
    (function (Allegiance) {
        Allegiance[Allegiance["EvilWizard"] = 0] = "EvilWizard";
        Allegiance[Allegiance["Nature"] = 1] = "Nature";
    })(Allegiance = exports.Allegiance || (exports.Allegiance = {}));
    var EntityState;
    (function (EntityState) {
        EntityState[EntityState["Alive"] = 0] = "Alive";
        EntityState[EntityState["Dead"] = 1] = "Dead";
    })(EntityState = exports.EntityState || (exports.EntityState = {}));
    var EntityBaseAnimation;
    (function (EntityBaseAnimation) {
        EntityBaseAnimation[EntityBaseAnimation["Down"] = 0] = "Down";
        EntityBaseAnimation[EntityBaseAnimation["Up"] = 1] = "Up";
        EntityBaseAnimation[EntityBaseAnimation["Right"] = 2] = "Right";
        EntityBaseAnimation[EntityBaseAnimation["Left"] = 3] = "Left";
    })(EntityBaseAnimation = exports.EntityBaseAnimation || (exports.EntityBaseAnimation = {}));
    class Entity extends GameObject_1.GameObject {
        constructor() {
            super(...arguments);
            this.resistances = [];
            this.weaknesses = [];
            this.allegiance = Allegiance.Nature;
            this.showDamage = true;
            this.animation = EntityBaseAnimation.Down;
            this.movementQueue = [];
            this.direction = Api_1.Direction.Down;
            this.state = EntityState.Alive;
        }
        resetMovementQueue() {
            this.movementQueue = [];
        }
        resetMovement() {
            this.movement = undefined;
            this.movementQueue = [];
        }
        getBlocker(position) {
            return this.api.getTileBlocker(position, [this]);
        }
        move(direction, current = false) {
            if (current) {
                this.movement = direction;
            }
            else {
                this.movementQueue = [direction];
            }
        }
        moveTowards(entity) {
            const distX = entity.position.x - this.position.x;
            const distY = entity.position.y - this.position.y;
            let direction;
            if (Math.abs(distX) > Math.abs(distY)) {
                direction = distX < 0 ? Api_1.Direction.Left : Api_1.Direction.Right;
            }
            else {
                direction = distY < 0 ? Api_1.Direction.Up : Api_1.Direction.Down;
            }
            this.move(direction);
        }
        wander(current = false) {
            this.move(Random_1.Random.int(4), current);
        }
        fight(entity) {
            return Object.assign({}, entity.damage(this.damageType, this.damageAmount), { source: this.type });
        }
        damage(damageTypes, amt) {
            if (!Array.isArray(damageTypes)) {
                damageTypes = [damageTypes];
            }
            let effectiveness = 0;
            for (const damageType of damageTypes) {
                if (this.weaknesses.includes(damageType)) {
                    effectiveness += 0.1;
                }
                else if (this.resistances.includes(damageType)) {
                    effectiveness -= 0.1;
                }
            }
            let potency = 0.5 + effectiveness;
            let crit = CritType.None;
            // crit success
            if (Random_1.Random.chance(0.1)) {
                potency += 0.2;
                crit = CritType.Success;
            }
            // crit fail
            if (Random_1.Random.chance(0.1)) {
                potency -= 0.2;
                crit = CritType.Fail;
            }
            amt *= potency;
            amt = this.onDamage(amt);
            return {
                target: this.type,
                amt,
                effectiveness,
                crit,
            };
        }
        getNearest(type, within = Infinity) {
            let entityDistance = Infinity;
            let nearest;
            for (const entity of this.api.entities) {
                if (entity.type != type) {
                    continue;
                }
                const dist = Math.avg(Math.abs(entity.position.x - this.position.x), Math.abs(entity.position.y - this.position.y));
                if (dist < entityDistance && dist <= within) {
                    nearest = entity;
                    entityDistance = dist;
                }
            }
            return nearest;
        }
        distanceTo(entity) {
            return Math.avg(Math.abs(entity.position.x - this.position.x), Math.abs(entity.position.y - this.position.y));
        }
        update(time) {
            if (time.canTick || time.isNewTick) {
                if (this.movement !== undefined) {
                    this.position = this.getOffsetPosition();
                    this.movement = undefined;
                }
                else if (this.attack !== undefined) {
                    this.attack = undefined;
                }
            }
            if (time.isNewTick) {
                if (this.movementQueue.length > 0) {
                    this.movement = this.movementQueue.shift();
                }
                else {
                    this.movement = this.onNoMovementQueued();
                }
                let tries = 0;
                while (this.movement !== undefined && tries < 3) {
                    tries++;
                    this.direction = this.movement;
                    const tileBlocker = this.getBlocker(this.getOffsetPosition());
                    if (tileBlocker !== undefined) {
                        this.onBlocked(tileBlocker, tries == 3);
                    }
                }
                if (this.movement !== undefined) {
                    this.onStartMove(this.movement);
                    if (this.stepSound !== undefined && Random_1.Random.chance(0.1) && this.distanceTo(this.api.player) < 10) {
                        this.api.sounds.play(this.stepSound);
                    }
                }
                if (this.attack !== undefined) {
                    this.onStartAttack(this.attack);
                }
            }
        }
        render(time, canvas) {
            const imageName = canvas.getImageName(Entities_1.EntityType[this.type], "entity");
            canvas.drawFrame(imageName, this.animation, this.getAnimationFrame(time), this.getAnimationPosition(time.tickPercent));
        }
        getAnimationPosition(percent = 1) {
            if (this.movement === undefined) {
                return this.getOffsetPosition(this.attack, (0.5 - Math.abs(percent - 0.5)) * 0.5);
            }
            return this.getOffsetPosition(undefined, percent);
        }
        getOffsetPosition(movement = this.movement, percent = 1) {
            const result = Vector_1.Vector(this.position);
            if (movement == Api_1.Direction.Up) {
                result.y -= percent;
            }
            else if (movement == Api_1.Direction.Down) {
                result.y += percent;
            }
            else if (movement == Api_1.Direction.Left) {
                result.x -= percent;
            }
            else if (movement == Api_1.Direction.Right) {
                result.x += percent;
            }
            return result;
        }
        blocksTile(tile) {
            let movement = this.movement;
            if (movement === undefined) {
                movement = this.movementQueue[0];
            }
            const position = this.getOffsetPosition(movement);
            return (position.x == tile.x && position.y == tile.y) ||
                (this.position.x == tile.x && this.position.y == tile.y);
        }
        getAnimationFrame(time) {
            return this.state === EntityState.Dead ? 3 :
                this.movement !== undefined ? 1 + Math.floor(time.tickPercent * 2) % 2 : 0;
        }
        onStartMove(direction) {
            this.animation = direction;
        }
        onStartAttack(direction) {
            this.animation = direction;
        }
        onDestroy() {
            this.state = EntityState.Dead;
        }
        onBlocked(tileBlocker, force = false) {
            if (tileBlocker instanceof Entity && this.allegiance != tileBlocker.allegiance) {
                this.attack = this.movement;
                const damageResult = this.fight(tileBlocker);
                if (tileBlocker.showDamage) {
                    this.onShowFightResult(damageResult);
                }
            }
            this.resetMovement();
        }
        onShowFightResult(damageResult) {
            this.api.readout.showDamageResult(damageResult);
        }
        onNoMovementQueued() {
            return;
        }
        onDamage(amt) {
            this.health -= amt;
            if (this.showDamage) {
                this.api.readout.showNumber(Readout_1.MessageType.Damage, -amt, this.api.canvas.getScreenPosition(this.position));
            }
            if (this.health <= 0) {
                this.onDestroy();
            }
            return amt;
        }
    }
    exports.Entity = Entity;
});
