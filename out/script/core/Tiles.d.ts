export declare enum TileType {
    None = 0,
    Grass = 1,
    Path = 2,
}
export declare module Tile {
    function isWalkable(tile: TileType): boolean;
}
