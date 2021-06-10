<template>
<div class="flex justify-left bg-blue-900 border-blue-600 border-b p-4 m-4 rounded">
  <div class="text-center px-10 py-2 m-2">
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
  <div class="text-white text-xl text-center px-4 py-2 m-2">
    Clinical Education Technology
  </div>
</div>
<div class="flex justify-left bg-blue-900 border-blue-600 border-b p-4 m-4 rounded">
  <div class="text-white text-xl text-center px-4 py-2 m-2">ECG Scanner</div>
</div>

<div class="bg-blue-900 border-blue-600 border-b p-4 m-4 rounded">
<HeartRate></HeartRate>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  HeartRate  from '../src/components/HeartRate.vue'

export default defineComponent({
  name: 'App',
  components: {
   HeartRate
  }
});
</script>

<style>
#app {
  
}
</style>
