import { WaveForms } from "./WaveForms";

export const pixelsPerSecond = 130;
const TIME_BETWEEN_TICK = (1.0 / pixelsPerSecond) * 1000; // (1 / pixel per second) * millisecond

export class WaveFormEngine {
    
    firstRun: boolean = true;
    lastTick: number = 0;
    running: boolean = false;
    animationId: number = 0;
    waveforms: WaveForms[] = [];

    public addWaveforms(heartRate:number) {
        const numOfWaveforms = 3;
        for(let i = 0; i < numOfWaveforms; i++) {
            const waveform = new WaveForms(800, 100, 0x00FF00, heartRate);
            document.getElementById("waveforms-container")?.appendChild(waveform.view);
            this.waveforms.push(waveform);
        }
    }

    start() {
        if (this.animationId === 0) {
            this.running = true;
            this.timerTick(performance.now());
        }
    }
    
    stop() {
        if (this.animationId !== 0) {
            window.cancelAnimationFrame(this.animationId);
            this.animationId = 0;
        }
        this.running = false;
    }
    
    timerTick = (time: number) => {
        // start the timer for the next animation loop
        this.animationId = window.requestAnimationFrame(this.timerTick);
    
        const now = performance.now();
        if(now - this.lastTick > 1000) {
            this.lastTick = now;
        }

        while (this.lastTick + TIME_BETWEEN_TICK < now) {
            this.updateTick();
            this.lastTick += TIME_BETWEEN_TICK;
        }
        
        //To screen!
        this.draw();
    }

    updateTick() {
        this.waveforms.forEach((waveform) => waveform.update());
    }

    draw() {
        this.waveforms.forEach((waveform) => waveform.draw());
    }
}