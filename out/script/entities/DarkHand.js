define(["require", "exports", "core/Api", "core/Entities", "core/Entity", "core/Tiles", "util/Random", "util/Vector"], function (require, exports, Api_1, Entities_1, Entity_1, Tiles_1, Random_1, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addDirection(position, direction, amount = 1, existing = false) {
        if (!existing) {
            position = Vector_1.Vector(position);
        }
        if (direction == Api_1.Direction.Up) {
            position.y -= amount;
        }
        else if (direction == Api_1.Direction.Down) {
            position.y += amount;
        }
        else if (direction == Api_1.Direction.Left) {
            position.x -= amount;
        }
        else if (direction == Api_1.Direction.Right) {
            position.x += amount;
        }
        return position;
    }
    function oppositeDirection(direction) {
        switch (direction) {
            case Api_1.Direction.Down: return Api_1.Direction.Up;
            case Api_1.Direction.Up: return Api_1.Direction.Down;
            case Api_1.Direction.Left: return Api_1.Direction.Right;
            case Api_1.Direction.Right: return Api_1.Direction.Left;
        }
    }
    function rotateDirection(direction, clockwise = true) {
        switch (direction) {
            case Api_1.Direction.Down: return clockwise ? Api_1.Direction.Left : Api_1.Direction.Right;
            case Api_1.Direction.Left: return clockwise ? Api_1.Direction.Up : Api_1.Direction.Down;
            case Api_1.Direction.Up: return clockwise ? Api_1.Direction.Right : Api_1.Direction.Left;
            case Api_1.Direction.Right: return clockwise ? Api_1.Direction.Down : Api_1.Direction.Up;
        }
    }
    class DarkHand extends Entity_1.Entity {
        constructor(direction) {
            super();
            this.type = Entities_1.EntityType.DarkHand;
            this.damageType = [Entity_1.DamageType.Dark];
            this.damageAmount = 50;
            this.maxHealth = Infinity;
            this.allegiance = Entity_1.Allegiance.EvilWizard;
            this.showDamage = false;
            this.blockedTiles = [];
            this.initialDirection = direction;
        }
        update(time) {
            if (this.branches === undefined) {
                this.branches = [
                    {
                        position: this.position,
                        direction: this.initialDirection,
                        length: 2,
                    },
                    {
                        position: this.position,
                        direction: oppositeDirection(this.initialDirection),
                        length: 2,
                    },
                ];
                this.updateBlockedTiles();
            }
            if (time.isNewTick) {
                this.grow();
                this.updateBlockedTiles();
                for (const branch of this.branches) {
                    for (let i = 0; i < branch.length; i++) {
                        const position = addDirection(branch.position, branch.direction, i);
                        for (const entity of this.api.entities) {
                            if (entity.position.x == position.x && entity.position.y == position.y &&
                                entity.allegiance != this.allegiance) {
                                if (entity.state != Entity_1.EntityState.Dead && entity.allegiance != this.allegiance) {
                                    this.fight(entity);
                                }
                                if (entity.state == Entity_1.EntityState.Dead) {
                                    this.api.player.stealMagic(entity, this.type);
                                }
                            }
                        }
                    }
                }
            }
        }
        render(time, canvas) {
            const imageName = canvas.getImageName(Entities_1.EntityType[this.type], "entity");
            for (const branch of this.branches) {
                for (let i = 0; i < branch.length; i++) {
                    const position = addDirection(branch.position, branch.direction, i);
                    canvas.drawFrame(imageName, branch.direction, i == branch.length - 1 ? 1 : 0, position);
                }
            }
        }
        blocksTile(tile) {
            return this.blockedTiles.includes(this.api.world.getTileLocation(tile));
        }
        updateBlockedTiles() {
            this.blockedTiles = [];
            for (const branch of this.branches) {
                for (let i = 0; i < branch.length; i++) {
                    const position = addDirection(branch.position, branch.direction, i);
                    this.blockedTiles.push(this.api.world.getTileLocation(position));
                }
            }
        }
        grow() {
            for (const branch of this.branches) {
                if (Random_1.Random.chance(3 / branch.length / this.branches.length / this.branches.length)) {
                    const branchPosition = addDirection(branch.position, branch.direction, branch.length);
                    if (Tiles_1.Tile.isWalkable(this.api.world.getTile(branchPosition))) {
                        branch.length++;
                    }
                }
                else {
                    if (branch.length > 3 && Random_1.Random.chance(0.2 * branch.length / this.branches.length / this.branches.length)) {
                        const newBranchPosition = addDirection(branch.position, branch.direction, Random_1.Random.int(2, branch.length));
                        const branchSideADirection = rotateDirection(branch.direction);
                        const branchSideBDirection = rotateDirection(branch.direction, false);
                        if (!Tiles_1.Tile.isWalkable(this.api.world.getTile(addDirection(newBranchPosition, branchSideADirection))) ||
                            !Tiles_1.Tile.isWalkable(this.api.world.getTile(addDirection(newBranchPosition, branchSideBDirection)))) {
                            continue;
                        }
                        this.branches.push({
                            position: newBranchPosition,
                            direction: branchSideADirection,
                            length: 2,
                        }, {
                            position: newBranchPosition,
                            direction: branchSideBDirection,
                            length: 2,
                        });
                    }
                }
            }
        }
    }
    exports.DarkHand = DarkHand;
});
