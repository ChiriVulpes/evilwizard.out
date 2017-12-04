export declare function Random(max: number): number;
export declare function Random(min: number, max: number): number;
export declare module Random {
    function int(max: number): number;
    function int(min: number, max: number): number;
    function chance(c: number): boolean;
    /**
     * Must be an enum with auto-assigned numeric values
     */
    function enumMember<T extends number = number>(e: any): T;
}
