define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SoundType;
    (function (SoundType) {
        SoundType[SoundType["WizardStep"] = 0] = "WizardStep";
        SoundType[SoundType["FlowerStep"] = 1] = "FlowerStep";
        SoundType[SoundType["FrogStep"] = 2] = "FrogStep";
        SoundType[SoundType["MushroomStep"] = 3] = "MushroomStep";
        SoundType[SoundType["Pickup"] = 4] = "Pickup";
        SoundType[SoundType["GameOver"] = 5] = "GameOver";
        SoundType[SoundType["LevelUp"] = 6] = "LevelUp";
    })(SoundType = exports.SoundType || (exports.SoundType = {}));
    class Sound {
        constructor() {
            this.sounds = {};
        }
        async load() {
            const soundsLength = Object.keys(SoundType).length / 2;
            const promises = [];
            for (let i = 0; i < soundsLength; i++) {
                this.sounds[i] = [];
                for (let c = 0; c < 5; c++) {
                    this.sounds[i].push(new Audio(`./static/sound/${SoundType[i].toLowerCase()}.mp3`));
                    promises.push(new Promise(r => this.sounds[i][c].oncanplay = r));
                }
            }
            return Promise.all(promises);
        }
        play(soundType) {
            for (const sound of this.sounds[soundType]) {
                if (sound.paused || sound.ended) {
                    sound.play();
                    return;
                }
            }
        }
    }
    exports.Sound = Sound;
});
