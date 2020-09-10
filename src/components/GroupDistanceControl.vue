<template>
  <div>
      <b-button-group class="mx-1">
        <b-button title="- Distance" v-on:click="distanceOut"><b-icon icon="align-start"></b-icon></b-button>
        <b-button disabled >
          <b-form-input number id="range-1" type="range" :min="sliderMin" :max="sliderMax" :step="stepVal" class="slider" v-model="sliderVal"></b-form-input>
        </b-button>
        <b-button title="+ Distance" v-on:click="distanceIn"><b-icon icon="align-end"></b-icon></b-button>
      </b-button-group>
  </div>
</template>

<script>
export default {
  name: 'GroupDistanceControl',
  props: {
  },
  data(){
    return {
        sliderVal: 15,
        stepVal: 1,
        sliderMax: 35,
        sliderMin: 1
    };
  },
  components: {
  },
  methods: {
    distanceIn() {
        let value = Number((this.sliderVal + this.stepVal).toFixed(1));
        if(value > this.sliderMax)
            return;

        this.sliderVal = value;
    },
    distanceOut() {
        let value = Number((this.sliderVal - this.stepVal).toFixed(1));

        if(value < this.sliderMin)
            return;

        this.sliderVal = value;
    }
  },
  watch: {
    sliderVal() {
        this.$emit('groupDistanceValChanged', this.sliderVal);
    }
  }
}
</script>

<style scoped>
.slider {
  height: 10px;
}
</style>