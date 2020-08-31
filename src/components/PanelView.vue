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
import Group from '../../public/view/group.js'
import File from '../../public/view/file.js'
import FileShadow from '../../public/view/file-shadow.js'
import Path from '../../public/view/path.js'
import Event from '../../public/view/event.js'

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
    // var width = 1024;
    // var height = 768;

    window.frame = new window.zim.Frame({ scaling, color, outerColor, retina: true });
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

            loadView();
        });

        function loadView() {
            window.zim.loop(dataControl.data.groups.length, function (i) {
                new Group(dataControl.data.groups[i].groupId, dataControl.data.groups[i].maxIndexWidthQuantity, dataControl.data.sessions.length);
            });

            window.zim.loop(dataControl.data.sessions.length, function (s) {
                window.zim.loop(dataControl.data.sessions[s].files.length, function (f) {
                    var fileData = dataControl.data.sessions[s].files[f];

                    new File(s, fileData.events.length, fileData.groupId, fileData.groupIndex);

                    new FileShadow(s, fileData.groupId, fileData.groupIndex);

                    window.zim.loop(fileData.events.length, function (e) {
                        new Event(e, f, s, fileData.groupId, fileData.groupIndex);
                    });
                });

                new Path(s);
            });

            stage.update();
        }

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
