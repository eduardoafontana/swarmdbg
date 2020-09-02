<template>
  <div class="divFrame">
    <b>Panel View</b>
    <vue-friendly-iframe :src='fileIframe' name="myIFrame"></vue-friendly-iframe>
  </div>
</template>

<script>
import Vue from 'vue'
import dataControl from '../modules/data-control.js'

import VueFriendlyIframe from 'vue-friendly-iframe';

Vue.use(VueFriendlyIframe);

export default {
  name: 'PanelView',
  props: {
    msg: String,
  },
  data(){
    return {
      fileIframe : 'view/start.html',
    };
  },
  components: {

  },
  mounted(){

    adjustmentWidthHeightIframe();
    window.dataControl = dataControl;

    function adjustmentWidthHeightIframe(){
      if(document.getElementsByTagName("iframe").length === 0)
        return;

      var iframe = document.getElementsByTagName("iframe")[0];
      iframe.width = '100%';
      iframe.height = '100%';
    }
  },
  methods: {

  },
  watch: {
    
  },
  activated(){

  }
}
</script>

<style scoped>
.divFrame, 
.vue-friendly-iframe {
  width: 100%;
  height: 100%;
}
</style>
