import { Canvas } from "util/Canvas";
import { TimeManager } from "util/TimeManager";
export declare abstract class GameObject {
    abstract update(time: TimeManager): any;
    abstract render(time: TimeManager, canvas: Canvas): any;
}
