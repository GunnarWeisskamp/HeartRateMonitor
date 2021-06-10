import * as PIXI from "pixi.js"
import { pixelsPerSecond } from "./WaveFormEngine"

export interface Range {
    max: number;
    min: number;
}

export class WaveForms {
    view: HTMLCanvasElement;
    pixiApp: PIXI.Application;
    
    visible = true;
    height: number;
    colour: number;
    range: Range = {
        max: 100,
        min: 0
    };
    
    private line: PIXI.Graphics;
    private lineData:  Array<number>;
    
    private waveformData: Array<number> = this.sinusData();
    private bar: PIXI.Graphics;

    lineIndex: number = 0;
    currentPoint = 0;
    waveformLength = Math.floor(60 / 90 * pixelsPerSecond); // heart rate is hardcoded to 78

    constructor(width: number, height: number, colour: number, heartRate: number) {
        this.pixiApp = new PIXI.Application({
            width: width,
            height: height,
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio,
            autoDensity: true,
        });
        this.view = this.pixiApp.view;
        
        this.line = new PIXI.Graphics();
        this.pixiApp.stage.addChild(this.line);
        
        this.lineData = Array(Math.floor(width));
        for(let i = 0; i < width; i++) {
            this.lineData[i] = height/2;
        }

        this.bar = new PIXI.Graphics();
        this.pixiApp.stage.addChild(this.bar);

        this.colour = colour;
        this.height = height;
    }
    
    getNextYPos(): number {
        const y = this.waveformData[Math.floor(this.currentPoint / this.waveformLength * (this.waveformData.length-1))];
        this.currentPoint++;
        if(this.currentPoint >= this.waveformLength) {
            this.currentPoint = 0;
        }
        return y;
    }
    
    update() {
        const nextY = this.getNextYPos();
        const nextLineY = this.height * (1 - (nextY - this.range.min) / (this.range.max - this.range.min));
        if(isNaN(nextLineY)) {
            console.log();
        }

        this.lineData[this.lineIndex] =  nextLineY;
        this.lineIndex++;
        if(this.lineIndex >= this.lineData.length) {
            this.lineIndex = 0;
        }
    }

    draw() {
        if (this.visible) {
            this.line.clear();
            this.line.lineStyle(1, this.colour);

            this.line.moveTo(0, this.lineData[0]);
            for (let x = 1; x < this.lineData.length; x++) {
                this.line.lineTo(x, this.lineData[x]);
            }

            this.bar.clear();
            this.bar.beginFill(0x000);
            this.bar.drawRect(this.lineIndex, 0, 10, this.height);
            this.bar.endFill();
        }
    }
    sinusData(): Array<number> {
        return [
            50.19455, 49.80545, 49.80545, 49.80545, 49.80545, 49.80545,
            49.80545, 49.80545, 49.80545, 49.80545, 49.80545, 49.80545,
            49.80545, 49.41634, 49.41634, 49.41634, 49.41634, 49.41634,
            49.02724, 49.02724, 49.02724, 49.02724, 49.02724, 49.02724,
            49.41634, 49.80545, 50.58366, 50.97276, 51.36187, 51.75097,
            52.14008, 52.14008, 52.14008, 51.75097, 51.75097, 50.97276,
            50.58366, 49.41634, 49.02724, 48.63813, 48.24903, 48.24903,
            47.85992, 47.85992, 47.85992, 47.85992, 47.85992, 47.85992,
            47.85992, 47.47082, 47.08171, 46.3035, 45.5253, 47.47082,
            63.81323, 70.42802, 77.43191, 78.21011, 74.70818, 70.03891,
            65.36965, 60.70039, 56.03113, 51.36187, 49.02724, 49.02724,
            49.02724, 49.02724, 49.41634, 49.41634, 49.41634, 49.41634,
            49.41634, 49.80545, 49.80545, 49.80545, 49.80545, 49.80545,
            49.80545, 50.19455, 50.19455, 50.58366, 50.58366, 50.97276,
            51.36187, 52.14008, 52.52918, 53.30739, 53.6965, 54.0856,
            54.86382, 55.25292, 56.03113, 56.42023, 56.80934, 57.19844,
            57.58755, 57.58755, 57.97665, 57.97665, 57.97665, 57.97665,
            57.97665, 57.97665, 57.58755, 57.19844, 56.80934, 56.03113,
            55.64202, 54.47471, 53.6965, 52.52918, 51.75097, 50.97276,
            50.58366, 50.19455, 49.80545, 49.80545, 49.80545, 49.80545,
            49.80545, 49.80545, 49.80545, 49.80545, 49.80545, 49.80545,
            49.80545, 49.80545, 50.19455
        ];
    }
}
    //45.5253
    //61.5
    //78.21011
//     sinusData(): Array<number> {
//         return [
//             50.19455, 49.80545, 49.80545, 49.80545, 49.80545, 49.80545,
//             49.80545, 49.80545, 49.80545, 49.80545, 49.80545, 49.80545,
//             49.80545, 49.41634, 49.41634, 49.41634, 49.41634, 49.41634,
//             49.02724, 49.02724, 49.02724, 49.02724, 49.02724, 49.02724,
//             49.41634, 49.80545, 50.58366, 50.97276, 51.36187, 51.75097,
//             52.14008, 52.14008, 52.14008, 51.75097, 51.75097, 50.97276,
//             50.58366, 49.41634, 49.02724, 48.63813, 48.24903, 48.24903,
//             47.85992, 47.85992, 47.85992, 47.85992, 47.85992, 47.85992,
//             47.85992, 47.47082, 47.08171, 46.3035, 45.5253, 47.47082,
//             63.81323, 70.42802, 77.43191, 78.21011, 74.70818, 70.03891,
//             65.36965, 60.70039, 56.03113, 51.36187, 49.02724, 49.02724,
//             49.02724, 49.02724, 49.41634, 49.41634, 49.41634, 49.41634,
//             49.41634, 49.80545, 49.80545, 49.80545, 49.80545, 49.80545,
//             49.80545, 50.19455, 50.19455, 50.58366, 50.58366, 50.97276,
//             51.36187, 52.14008, 52.52918, 53.30739, 53.6965, 54.0856,
//             54.86382, 55.25292, 56.03113, 56.42023, 56.80934, 57.19844,
//             57.58755, 57.58755, 57.97665, 57.97665, 57.97665, 57.97665,
//             57.97665, 57.97665, 57.58755, 57.19844, 56.80934, 56.03113,
//             55.64202, 54.47471, 53.6965, 52.52918, 51.75097, 50.97276,
//             50.58366, 50.19455, 49.80545, 49.80545, 49.80545, 49.80545,
//             49.80545, 49.80545, 49.80545, 49.80545, 49.80545, 49.80545,
//             49.80545, 49.80545, 50.19455
//         ];
//     }
// }