import * as PIXI from "pixi.js"

export class KnobSpinner {
    view: HTMLCanvasElement;
    pixiApp: PIXI.Application;

    private stage = new PIXI.Container();
    private outerCircle: PIXI.Graphics;
    private arc = new PIXI.Graphics();
    private cx = 0;
    private  cy = 0;
    private radius = 55;
    private dragging = false;
    private startAngle = 0;
    private renderer = PIXI.autoDetectRenderer();
    private heartRate = "";
    

    constructor(width: number, height: number, colour: number) {
        this.pixiApp = new PIXI.Application({
            width: width,
            height: height,
            transparent: true
        });
        this.view = this.pixiApp.view;
        this.pixiApp.stage.pivot.x = 0.5;
        this.pixiApp.stage.pivot.y = 0.5;
        this.pixiApp.stage.rotation = -Math.PI/2;
        this.outerCircle = new PIXI.Graphics();
        this.outerCircle.beginFill(0xFFFFFF);
        
        this.outerCircle.drawCircle(this.cx, this.cy, this.radius);

        (document.getElementById('heartRateCount') as HTMLDivElement).innerHTML = this.heartRate + "Current Heart Rate 1";
        this.outerCircle.endFill();
        this.pixiApp.stage.addChild(this.outerCircle);

        this.arc = new PIXI.Graphics();
        this.arc.lineStyle(16, 0xadd8e6);
        this.arc.moveTo(this.radius,0);
        this.arc.arc(0,0,55,this.startAngle,0.5);
        this.pixiApp.stage.addChild(this.arc);
        this.pixiApp.stage.x = this.pixiApp.view.width/2;
        this.pixiApp.stage.y = this.pixiApp.view.height/2;
        this.pixiApp.stage.interactive = true;
        this.pixiApp.stage.on('mousedown',(e) =>{
            this.dragging = true;
        }) 
        this.pixiApp.stage.on('mouseup',(e) =>{
                this.dragging = false;
                (document.getElementById('heartRateCount') as HTMLDivElement).innerHTML = this.heartRate;
        });
        this.pixiApp.stage.on('mouseupoutside',(e) =>{
            this.dragging = false;
            (document.getElementById('heartRateCount') as HTMLDivElement).innerHTML = this.heartRate;
        });

        this.pixiApp.stage.on('mousemove',(event) =>{
            
            if(this.dragging) {
                const p = event.data.getLocalPosition(this.outerCircle.parent);
                const angle = Math.atan2(p.y, p.x);
                this.heartRate = this.getHeartRateNumber(angle)!;
                (document.getElementById('heartRateCount') as HTMLDivElement).innerHTML = this.heartRate;
                this.arc.clear();
                this.arc.lineStyle(15, 0xadd8e6); // width, color, alpha
                this.arc.moveTo(this.radius,0);
                this.arc.arc(this.cx, this.cy, this.radius, 0, angle);
                this.renderer.render(this.stage);
            }
            else
            {
                (document.getElementById('heartRateCount') as HTMLDivElement).innerHTML = this.heartRate;
            }
        });
        this.stage.addChild(this.pixiApp.stage);
        this.renderer.render(this.stage);
    }

    getHeartRateNumber(currentNumber:number){
        console.log("old " + currentNumber);
        currentNumber = Number(parseFloat(currentNumber.toString()).toFixed(1));
        console.log("new " + currentNumber);
        if(currentNumber >= 0 && currentNumber <= 0.5)
        {
            return "Current Heart Rate 1"
        }

        if(currentNumber >= 0.6 && currentNumber <= 1)
        {
            return "Current Heart Rate 2"
        }

        if(currentNumber >= 1.1 && currentNumber <= 1.5)
        {
            return "Current Heart Rate 3"
        }

        if(currentNumber >= 1.6 && currentNumber <= 2)
        {
            return "Current Heart Rate 4"
        }

        if(currentNumber >= 2.1 && currentNumber <= 2.5)
        {
            return "Current Heart Rate 5"
        }

        if(currentNumber >=2.6 && currentNumber <= 3)
        {
            return "Current Heart Rate 6"
        }

        if((currentNumber >= -3.0 && currentNumber <= -2.5) || (currentNumber == -3.1 || currentNumber == 3.1))
        {
            return "Current Heart Rate 7"
        }

        if(currentNumber >= -2.4 && currentNumber <= -2)
        {
            return "Current Heart Rate 8"
        }

        if(currentNumber >= -1.9 && currentNumber <= -1.5)
        {
            return "Current Heart Rate 9"
        }

        if(currentNumber >= -1.4 && currentNumber <= -1)
        {
            return "Current Heart Rate 10"
        }

        if(currentNumber >= -0.9 && currentNumber <= -0.5)
        {
            return "Current Heart Rate 11"
        }

        if(currentNumber >= -0.4 && currentNumber <= -0.1)
        {
            return "Current Heart Rate 12"
        }     
    }
}