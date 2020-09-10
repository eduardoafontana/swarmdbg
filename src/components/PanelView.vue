<template>
  <div class="divFrame">
    <b-button-toolbar>
      <ZoomControl @zoomValChanged="zoomChanged" :zoomObject="zoomElement" />
      <b-button-group class="mx-1">
        <b-button title="Fit Content">
          <b-iconstack font-scale="1.3">
            <b-icon stacked icon="arrows-angle-contract"></b-icon>
            <b-icon stacked icon="arrows-angle-contract" rotate="90"></b-icon>
          </b-iconstack>
        </b-button>
      </b-button-group>

    </b-button-toolbar>
    <vue-friendly-iframe name="viewIFrame" @load="loadView" :script="scripts" width="100%" height="100%"></vue-friendly-iframe>
  </div>
</template>

<script>
import serverApi from '../modules/server-api.js'
import VueFriendlyIframe from './FriendlyIFrame.vue';
import eventBus from "../modules/event-bus.js";
import ZoomControl from "./ZoomControl.vue"

export default {
  name: 'PanelView',
  props: {
    msg: String,
  },
  data(){
    return {
      scripts: ['../zimjs/createjs_doc_1.2.4.js',
                '../zimjs/zim_doc_10.8.0.js', 
                '../view/config.js', 
                '../view/group.js', 
                '../view/file.js', 
                '../view/file-shadow.js', 
                '../view/path.js', 
                '../view/event.js', 
                '../view/view.js',
                '../view/start.js'],
      zoomElement: {}
    };
  },
  components: {
      VueFriendlyIframe,
      ZoomControl
  },
  created() {
    eventBus.$on("selectedSessionChangedEvent", (selectedItemsSession) => {
      window.frames['viewIFrame'].window.loadSession(selectedItemsSession);
    });
  },
  mounted(){
    window.dataControl = serverApi;

    this.zoomElement = { element: window.frames['viewIFrame'] };
  },
  methods: {
    loadView() {
      window.frames['viewIFrame'].window.initCanvasView();
    },
    zoomChanged(val) {
      window.frames['viewIFrame'].window.changeZoom(val);
    }
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

.btn-toolbar {
  padding: 10px;
}

.slider {
  height: 10px;
}
</style>
