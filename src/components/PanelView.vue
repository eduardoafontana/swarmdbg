<template>
  <div class="divFrame">
    <vue-friendly-iframe name="viewIFrame" @load="loadView" :script="scripts" width="100%" height="100%"></vue-friendly-iframe>
  </div>
</template>

<script>
import serverApi from '../modules/server-api.js'
import VueFriendlyIframe from './FriendlyIFrame.vue';
import eventBus from "../modules/event-bus.js";

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
                '../view/start.js']
    };
  },
  components: {
      VueFriendlyIframe
  },
  created() {
    eventBus.$on("selectedSessionChangedEvent", (selectedItemsSession) => {
      window.frames['viewIFrame'].window.loadSession(selectedItemsSession);
    });
  },
  mounted(){
    window.dataControl = serverApi;
  },
  methods: {
    loadView() {
      window.frames['viewIFrame'].window.initCanvasView();
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
</style>
