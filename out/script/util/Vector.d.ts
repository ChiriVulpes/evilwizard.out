export interface IVector {
    x: number;
    y: number;
}
export declare function Vector(v: IVector): IVector;
export declare function Vector(xy: number): IVector;
export declare function Vector(x: number, y: number): IVector;
export declare module Vector {
    function Zero(): IVector;
    function One(): IVector;
}
