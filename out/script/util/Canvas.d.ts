import { IVector } from "util/Vector";
export interface ISubTiles {
    upLeft: number;
    upRight: number;
    downLeft: number;
    downRight: number;
}
export declare class Canvas {
    private canvasElement;
    private context;
    private images;
    private scale;
    private viewport;
    viewportPosition: IVector;
    constructor(id: string);
    loadImages(imageEnum: any, location: string, except?: number[]): Promise<any[]>;
    getImageName(image: string, location: string): string;
    clear(): void;
    drawSubTiles(imageName: string, drawPosition: IVector, subtiles: ISubTiles): void;
    drawFrame(imageName: string, animation: number, frame: number, position: IVector): void;
    isPositionVisible(x: number, y: number): boolean;
    getScreenPosition(position: IVector): IVector;
    private getImagePosition(img, tile, size);
    private drawImageViewport(img, drawX, drawY, imgPosition, imgSize);
    private reestablishContext();
}
