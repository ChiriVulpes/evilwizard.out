import { Tile } from "Tiles";
import { Canvas } from "util/Canvas";
import { IVector } from "util/Vector";
export declare class World {
    tiles: Tile[];
    mappings: number[];
    size: IVector;
    constructor(size?: IVector);
    clear(): void;
    remap(): void;
    render(canvas: Canvas): void;
    getTile(x: number, y: number): Tile;
    getTile(position: IVector): Tile;
    getTile(x: number | IVector, y?: number): Tile;
    setTile(position: IVector, tile: Tile): void;
    private getSubTiles(mapping);
    private getUpLeft(mapping);
    private getUpRight(mapping);
    private getDownLeft(mapping);
    private getDownRight(mapping);
    private getTileMapping(x, y);
    private getTileMapping(position);
    private getTileLocation(x, y?);
}
