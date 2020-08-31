<template>
  <div>
    <b>Panel View</b>
    <div id="viewFrame"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import view from '../../public/view/view.js'
import dataControl from '../../public/view/data-control.js'

export default {
  name: 'PanelView',
  props: {
    msg: String
  },
  components: {  
  },
  mounted(){
    var scaling = "viewFrame";
    var color = window.zim.light;
    var outerColor = window.zim.darker;

    window.frame = new window.zim.Frame({ scaling, color, outerColor });
    window.frame.on("ready", function () {

        var stage = window.frame.stage;
        // var stageW = window.frame.width;
        // var stageH = window.frame.height;

        window.frame.outerColor = '#444';
        window.frame.color = '#ddd';

        view.initView();

        var selectedSessions = [
            { "id": "3b92a648-7cfc-4277-82cc-5fab885b61bc" }
        ];

        dataControl.getDataFromServer(selectedSessions).then(function (dataFromServer) {
            dataControl.data = dataFromServer;

            //loadView();
        });

        view.sliderZoom.on("change", function () {
             view.container.sca(2 * view.sliderZoom.currentValue, view.sliderZoom.currentValue);
        });

        view.container.loc(450, 400);

        stage.update();
    });

    Vue.prototype.$frame = window.frame;
  },
  methods: {

  },
  activated(){

  }
}
</script>

<style scoped>
#viewFrame {
  height: 100%;
}

</style>
