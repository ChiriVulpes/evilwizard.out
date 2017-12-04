import { TileType } from "core/Tiles";
import { Canvas } from "util/Canvas";
import { IVector } from "util/Vector";
export declare class World {
    tiles: TileType[];
    mappings: number[];
    size: IVector;
    constructor(size?: IVector);
    clear(): void;
    remap(): void;
    render(canvas: Canvas): void;
    getTile(x: number, y: number): TileType;
    getTile(position: IVector): TileType;
    getTile(x: number | IVector, y?: number): TileType;
    setTile(position: IVector, tile: TileType): void;
    getTileLocation(x: number | IVector, y?: number): number;
    private getSubTiles(mapping);
    private getUpLeft(mapping);
    private getUpRight(mapping);
    private getDownLeft(mapping);
    private getDownRight(mapping);
    private getTileMapping(x, y);
    private getTileMapping(position);
}
