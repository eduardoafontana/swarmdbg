<template>
<splitpanes class="default-theme">
  <pane min-size="10" size="18">
    <div class='drop-zone' @drop='onDrop($event, 0)' @dragover.prevent @dragenter.prevent>
      <div class='drag-el' v-for="item in listOne" :key='item.title' draggable @dragstart='startDrag($event, item)'>
        <div class="panel-head">
          Panel Head: {{ item.title }} title
        </div>
        <div class="panel-content" @dragstart.prevent draggable="disable">
            <keep-alive>
              <component v-bind:is="item.panel"></component>
            </keep-alive>
        </div>
      </div>
    </div>
  </pane>
  <pane min-size="10">
    <div class='drop-zone' @drop='onDrop($event, 1)' @dragover.prevent @dragenter.prevent>
      <div class='drag-el' v-for="item in listTwo" :key='item.title' draggable @dragstart='startDrag($event, item)'>
        <div class="panel-head">
          Panel Head: {{ item.title }} title
        </div>
        <div class="panel-content" @dragstart.prevent draggable="disable">
          <keep-alive>
            <component v-bind:is="item.panel"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </pane>
  <pane min-size="10">
    <div class='drop-zone' @drop='onDrop($event, 2)' @dragover.prevent @dragenter.prevent>
      <div class='drag-el' v-for="item in listThree" :key='item.title' draggable @dragstart='startDrag($event, item)'>
        <div class="panel-head">
          Panel Head: {{ item.title }} title
        </div>
        <div class="panel-content" @dragstart.prevent draggable="disable">
          <keep-alive>
            <component v-bind:is="item.panel"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </pane>
</splitpanes>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import PanelFilter from './PanelFilter.vue'
import PanelView from './PanelView.vue'
import PanelCode from './PanelCode.vue'

var dataPanels = [
  {
    id: 0,
    title: 'Panel Filter',
    panel: 'PanelFilter',
    zoneId: 0,
    content: null
  },
  {
    id: 1,
    title: 'Panel View',
    panel: 'PanelView',
    zoneId: 1,
    content: null
  },
  {
    id: 2,
    title: 'Panel Code',
    panel: 'PanelCode',
    zoneId: 2,
    content: null
  }
];

export default {
  name: 'PanelTemplate',
  props: {
    msg: String
  },
  components: { 
    Splitpanes, 
    Pane,
    PanelFilter,
    PanelView,
    PanelCode
  },
  data() {
    return {
      items: dataPanels
    }
  },
  computed: {
    listOne () {
      return this.items.filter(item => item.zoneId === 0)
    },
    listTwo () {
      return this.items.filter(item => item.zoneId === 1)
    },
    listThree () {
      return this.items.filter(item => item.zoneId === 2)
    }
  },
  methods: {
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('item', JSON.stringify(item))
    },
    onDrop (evt, zoneId) {
      const item = JSON.parse(evt.dataTransfer.getData('item'))

      if(item.zoneId === zoneId)
        return;

      var obj1 = this.items[item.zoneId];
      var obj2 = this.items[zoneId];

      obj1.zoneId = zoneId;
      obj2.zoneId = item.zoneId;

      this.items[item.zoneId] = obj2;
      this.items[zoneId] = obj1;
    }
  }
}
</script>

<style scoped>
  .splitpanes__pane { 
    background-color:bisque;
    padding: 5px;
  }

  .drop-zone {
    background-color:whitesmoke;
    padding: 5px;
    height: 100%;
  }

  .drag-el {
    background-color: #fff;
    padding: 5px;
    height: 100%;
  }

  .panel-head {
    cursor: move;
  }

  .panel-content {
    background-color: azure;
    height: 100%;
  }
</style>
