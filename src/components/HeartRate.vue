<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./HeartRate.css" scoped></style>
<template src="./HeartRate.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { WaveFormEngine } from '../classes/WaveFormEngine';
import { KnobSpinnerEngine } from '../classes/KnobSpinnerEngine';

export default defineComponent({
  name: 'HeartRate',
  data(){
    return {
      appWaveForm: new WaveFormEngine(),
      appKnobSpinner: new KnobSpinnerEngine(),
      heartRate: 0
    }
  },
  props: {
    msg: String
  },
  mounted(){
    this.appWaveForm.addWaveforms(78);
    this.appWaveForm.start();

    this.appKnobSpinner.createKnob();
  },
   methods: {
    inputHeartRate(){
      this.appWaveForm.stop();
    }
  }
});
</script>