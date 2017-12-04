define(["require", "exports", "core/Game", "util/Number"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const game = new Game_1.Game();
    game.load().then(() => {
        document.title = "Evil Wizard";
        game.start();
    });
    window.game = game;
});
