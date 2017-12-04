export declare class Game {
    private isRunning;
    private _paused;
    paused: boolean;
    private gameObjects;
    private canvas;
    private time;
    private world;
    private dungeonGenerator;
    start(): void;
    load(): Promise<void>;
    private stop();
    private loop();
    private update();
    private render();
    private newLevel();
}
