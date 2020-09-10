<template>
  <div>
      <b-button-group class="mx-1">
        <b-button title="- Zoom" v-on:click="zoomOut"><b-icon icon="zoom-out"></b-icon></b-button>
        <b-button disabled >
          <b-form-input number id="range-1" type="range" :min="sliderMin" :max="sliderMax" :step="stepVal" class="slider" v-model="sliderVal"></b-form-input>
        </b-button>
        <b-button title="+ Zoom" v-on:click="zoomIn"><b-icon icon="zoom-in"></b-icon></b-button>
      </b-button-group>
  </div>
</template>

<script>
export default {
  name: 'ZoomControl',
  props: {
    zoomObject: {
      type: Object,
      required: false,
      default: null
    }
  },
  data(){
    return {
        sliderVal: 1.,
        stepVal: 0.1,
        sliderMax: 5,
        sliderMin: 0.1
    };
  },
  components: {
  },
  methods: {
    zoomIn() {
        let value = Number((this.sliderVal + this.stepVal).toFixed(1));
        if(value > this.sliderMax)
            return;

        this.sliderVal = value;
    },
    zoomOut() {
        let value = Number((this.sliderVal - this.stepVal).toFixed(1));

        if(value < this.sliderMin)
            return;

        this.sliderVal = value;
    },
    onScroll(e) {
      if(e.wheelDelta > 0)
        this.zoomIn();
      else
        this.zoomOut();
    }
  },
  watch: {
    sliderVal() {
        this.$emit('zoomValChanged', this.sliderVal);
    },
    zoomObject() {
      this.zoomObject.element.addEventListener("wheel", this.onScroll);
    }
  }
}
</script>

<style scoped>
.slider {
  height: 10px;
}
</style>