export declare class TimeManager {
    tickLength: number;
    timeout: number;
    private _isNewTick;
    private tickTime;
    private _realTime;
    private _tick;
    readonly realTime: number;
    readonly isNewTick: boolean;
    readonly tick: number;
    readonly canTick: boolean;
    readonly tickPercent: number;
    nextTick(): void;
    reset(): void;
    update(): void;
}
