define(["require", "exports", "abilities/DarkHand", "abilities/Eraser", "abilities/Fireball", "abilities/Heal", "core/Ability", "core/Api", "core/Controls", "core/DungeonGenerator", "core/Entities", "core/Entity", "core/Readout", "core/Sound", "core/Tiles", "core/World", "entities/EvilWizard", "util/Canvas", "util/Random", "util/TimeManager", "util/Vector"], function (require, exports, DarkHand_1, Eraser_1, Fireball_1, Heal_1, Ability_1, Api_1, Controls_1, DungeonGenerator_1, Entities_1, Entity_1, Readout_1, Sound_1, Tiles_1, World_1, EvilWizard_1, Canvas_1, Random_1, TimeManager_1, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const levelUpScaryMessages = [
        "You suddenly feel a chill up your spine...",
        "Something feels... off.",
        "Nature abruptly feels more threatening...",
        "You feel a wave of menace from all around you.",
    ];
    class Game {
        constructor() {
            this.canvas = new Canvas_1.Canvas("game");
            this.readout = new Readout_1.Readout();
            this.sounds = new Sound_1.Sound();
            this.isRunning = false;
            this.time = new TimeManager_1.TimeManager();
            this.dungeonGenerator = new DungeonGenerator_1.DungeonGenerator();
            this.controls = new Controls_1.Controls();
        }
        get entities() {
            return this.slicedEntities;
        }
        get paused() {
            return this._paused;
        }
        set paused(paused) {
            this._paused = paused;
        }
        async load() {
            await this.canvas.loadImages(Tiles_1.TileType, "tile", [Tiles_1.TileType.None]);
            await this.canvas.loadImages(Entities_1.EntityType, "entity");
            await this.sounds.load();
        }
        start() {
            this.reset();
            this.controls.start();
            this.loop();
        }
        reset() {
            this.time.reset();
            this.isRunning = true;
            this._entities = [];
            this.world = new World_1.World();
            this.addEntity(this.player = new EvilWizard_1.EvilWizard(), Vector_1.Vector(Math.floor(this.world.size.x / 2), Math.floor(this.world.size.y / 2)));
            this.newLevel();
            this.playerLevel = Api_1.MagicLevel.None;
            this.abilities = [];
            this.readout.reset();
            document.body.style.setProperty("--creepiness", `${0}`);
        }
        stop() {
            this.isRunning = false;
            this.controls.stop();
        }
        getTileBlocker(position, exclude) {
            const tile = this.world.getTile(position);
            if (!Tiles_1.Tile.isWalkable(tile)) {
                return tile;
            }
            for (const entity of this.entities) {
                if (entity.state == Entity_1.EntityState.Dead || (exclude && exclude.includes(entity))) {
                    continue;
                }
                if (entity.blocksTile(position)) {
                    return entity;
                }
            }
        }
        getCorpseAt(position) {
            for (const entity of this.entities) {
                if (entity.state == Entity_1.EntityState.Dead &&
                    entity.position.x == position.x && entity.position.y == position.y) {
                    return entity;
                }
            }
        }
        getEntityAt(position, exclude, offsetPosition = false) {
            for (const entity of this.entities) {
                if (exclude && exclude.includes(entity)) {
                    continue;
                }
                let entityPosition = entity.position;
                if (offsetPosition) {
                    entityPosition = entity.getOffsetPosition();
                }
                if (entityPosition.x == position.x && entityPosition.y == position.y) {
                    return entity;
                }
            }
        }
        addEntity(entity, position) {
            entity.api = this;
            entity.position = position;
            entity.health = entity.maxHealth;
            this._entities.push(entity);
        }
        removeEntity(corpse) {
            const index = this._entities.findIndex(e => e.position.x == corpse.position.x && e.position.y == corpse.position.y && e.type == corpse.type);
            if (index >= 0) {
                this._entities.splice(index, 1);
            }
        }
        loop() {
            if (!this.isRunning) {
                return;
            }
            this.time.update();
            this.update();
            this.render();
            requestAnimationFrame(() => this.loop());
        }
        // tslint:disable-next-line cyclomatic-complexity
        update() {
            if (this.time.canTick && this.player.state != Entity_1.EntityState.Dead) {
                const shift = this.controls.isDown("ShiftLeft");
                if (shift) {
                    if (this.controls.isDown("KeyW")) {
                        this.player.direction = Api_1.Direction.Up;
                    }
                    else if (this.controls.isDown("KeyA")) {
                        this.player.direction = Api_1.Direction.Left;
                    }
                    else if (this.controls.isDown("KeyS")) {
                        this.player.direction = Api_1.Direction.Down;
                    }
                    else if (this.controls.isDown("KeyD")) {
                        this.player.direction = Api_1.Direction.Right;
                    }
                    this.player.animation = this.player.direction;
                }
                else {
                    if (this.controls.isDown("KeyW")) {
                        this.player.move(Api_1.Direction.Up);
                        this.time.nextTick();
                    }
                    else if (this.controls.isDown("KeyA")) {
                        this.player.move(Api_1.Direction.Left);
                        this.time.nextTick();
                    }
                    else if (this.controls.isDown("KeyS")) {
                        this.player.move(Api_1.Direction.Down);
                        this.time.nextTick();
                    }
                    else if (this.controls.isDown("KeyD")) {
                        this.player.move(Api_1.Direction.Right);
                        this.time.nextTick();
                    }
                }
                if (this.controls.isDown("Space")) {
                    this.time.nextTick();
                }
                else if (this.controls.isDown("Digit1") || this.controls.isDown("Numpad1")) {
                    if (this.abilities[0] && this.abilities[0].use()) {
                        this.time.nextTick();
                    }
                }
                else if (this.controls.isDown("Digit2") || this.controls.isDown("Numpad2")) {
                    if (this.abilities[1] && this.abilities[1].use()) {
                        this.time.nextTick();
                    }
                }
                else if (this.controls.isDown("Digit3") || this.controls.isDown("Numpad3")) {
                    if (this.abilities[2] && this.abilities[2].use()) {
                        this.time.nextTick();
                    }
                }
                else if (this.controls.isDown("Digit4") || this.controls.isDown("Numpad4")) {
                    if (this.abilities[3] && this.abilities[3].use()) {
                        this.time.nextTick();
                    }
                }
            }
            this.slicedEntities = this._entities.slice().sort((a, b) => (a.state == Entity_1.EntityState.Dead ? -Infinity : a.position.y) - (b.state == Entity_1.EntityState.Dead ? -Infinity : b.position.y));
            for (const object of this.entities) {
                object.update(this.time);
            }
            this.readout.setMagic(this.player.magic);
            this.readout.setHealth(this.player.health, this.player.maxHealth);
            if (this.player.magic >= Api_1.magicLevels[this.playerLevel + 1]) {
                this.levelUp();
            }
        }
        levelUp() {
            this.readout.showMessage(Readout_1.MessageType.Good, `You are now level ${this.playerLevel + 2}!`);
            this.playerLevel++;
            switch (this.playerLevel) {
                case Api_1.MagicLevel.Level1:
                    this.abilities[0] = new Fireball_1.Fireball();
                    this.abilities[0].api = this;
                    break;
                case Api_1.MagicLevel.Level2:
                    this.abilities[1] = new Heal_1.Heal();
                    this.abilities[1].api = this;
                    break;
                case Api_1.MagicLevel.Level3:
                    this.abilities[2] = new DarkHand_1.DarkHand();
                    this.abilities[2].api = this;
                    break;
                case Api_1.MagicLevel.Level4:
                    this.abilities[3] = new Eraser_1.Eraser();
                    this.abilities[3].api = this;
                    break;
            }
            this.player.maxHealth *= 2;
            this.readout.showMessage(Readout_1.MessageType.Heal, `Your max health is now ${this.player.maxHealth}!`);
            this.readout.setAbilities(this.abilities);
            this.readout.showMessage(Readout_1.MessageType.Magic, `You gained a new ability... ${Ability_1.AbilityType[this.abilities[this.abilities.length - 1].type]}`);
            if (this.playerLevel == Api_1.MagicLevel.Level4) {
                this.readout.showMessage(Readout_1.MessageType.Bad, "You have achieved the power you always desired.");
            }
            else {
                this.readout.showMessage(Readout_1.MessageType.Bad, levelUpScaryMessages[Random_1.Random.int(levelUpScaryMessages.length)]);
            }
            document.body.style.setProperty("--creepiness", `${this.playerLevel / (Object.keys(Api_1.magicLevels).length + 1)}`);
            this.time.timeout = 100;
            this.sounds.play(Sound_1.SoundType.LevelUp);
        }
        render() {
            this.canvas.viewportPosition = this.player.getOffsetPosition(undefined, this.time.tickPercent);
            this.canvas.clear();
            this.world.render(this.canvas);
            for (const object of this.entities) {
                object.render(this.time, this.canvas);
            }
        }
        newLevel() {
            this.dungeonGenerator.generate(this.world);
            for (const room of this.dungeonGenerator.rooms) {
                for (const entity of room.entities) {
                    if (entity.position.x == this.player.position.x && entity.position.y == this.player.position.y) {
                        continue;
                    }
                    entity.api = this;
                    entity.health = entity.maxHealth;
                    this._entities.push(entity);
                }
            }
        }
    }
    exports.Game = Game;
});
