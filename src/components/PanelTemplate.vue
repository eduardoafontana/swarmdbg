<template>
<splitpanes>
  <!-- <pane min-size="10" size="17"> -->
  <pane min-size="10" size="34">
    <div class='drop-zone' @drop='onDrop($event, 0)' @dragover.prevent @dragenter.prevent>
      <div class='drag-el' v-for="item in listOne" :key='item.title' draggable @dragstart='startDrag($event, item)'>
        <div class="panel-head">
          FILTER
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
          VIEW
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
          CODE
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

<style>
    .splitpanes__splitter { 
      background-color: #333642;
      box-sizing: border-box;
      position: relative;
      flex-shrink: 0;
    }

    .splitpanes--vertical > .splitpanes__splitter {
      min-width: 10px;
      margin-left: -1px;
    }

  .splitpanes--vertical > .splitpanes__splitter:after, 
  .splitpanes--vertical > .splitpanes__splitter:before {
      transform: translateY(-50%);
      width: 1px;
      height: 30px;

      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;
      transition: background-color .3s;

      box-sizing: border-box;
    }

    .splitpanes--vertical > .splitpanes__splitter:before {
      margin-left: -2px;
    }

    .splitpanes--vertical > .splitpanes__splitter:after {
      margin-left: 1px;
    }
</style>

<style scoped>
  .drop-zone {
    height: 100%;
  }

  .drag-el {
    background-color: #1D1E22;
    height: 100%;
  }

  .panel-head {
    cursor: move;
    background-color: #1A1B1F;
    
    white-space: nowrap;
    font-weight: bold;
    color: #aaaebc;
    font-size: 16px;
    padding-left: 4px;
    padding-top: 2px;
    padding-bottom: 2px;
    vertical-align: middle
  }

  .panel-content {
    background-color: #29292D;
    height: 100%;
  }
</style>
