export declare class Controls {
    private listener;
    private handlers;
    private states;
    start(): void;
    stop(): void;
    onDown(press: string, cb: () => any): void;
    isDown(press: string): boolean;
}
