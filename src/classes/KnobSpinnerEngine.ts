import { KnobSpinner } from "./KnobSpinner";

export class KnobSpinnerEngine {

    public createKnob() {
        const spinningKnob = new KnobSpinner(130, 130, 0x00FF00);
        document.getElementById("knobSpinner-container")?.appendChild(spinningKnob.view);
    }
}
