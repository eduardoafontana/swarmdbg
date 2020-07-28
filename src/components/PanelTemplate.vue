<template>
<splitpanes class="default-theme" >
  <pane min-size="10" size="20">
    <div class='drop-zone' @drop='onDrop($event, 0)' @dragover.prevent @dragenter.prevent>
      <div class='drag-el' v-for="item in listOne" :key='item.title' draggable @dragstart='startDrag($event, item)'>
        {{ item.title }}
      </div>
    </div>
  </pane>
  <pane min-size="10">
    <div class='drop-zone' @drop='onDrop($event, 1)' @dragover.prevent @dragenter.prevent>
      <div class='drag-el' v-for="item in listTwo" :key='item.title' draggable @dragstart='startDrag($event, item)'>
        {{ item.title }}
      </div>
    </div>
  </pane>
  <pane min-size="10">
    <div class='drop-zone' @drop='onDrop($event, 2)' @dragover.prevent @dragenter.prevent>
      <div class='drag-el' v-for="item in listThree" :key='item.title' draggable @dragstart='startDrag($event, item)'>
        {{ item.title }}
      </div>
    </div>
  </pane>
</splitpanes>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'PanelTemplate',
  props: {
    msg: String
  },
  components: { 
    Splitpanes, 
    Pane 
  },
  data() {
    return {
      items: [
        {
          id: 0,
          title: 'Item A',
          zoneId: 0
        },
        {
          id: 1,
          title: 'Item B',
          zoneId: 1
        },
        {
          id: 2,
          title: 'Item C',
          zoneId: 2
        }]
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
  .drop-zone {
    background-color: rgb(36, 96, 165);
    padding: 10px;
    height: 100%;
  }

  .drag-el {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 5px;
  }

  .splitpanes__pane { 
    background-color:bisque;
    padding: 5px;
  }
</style>
