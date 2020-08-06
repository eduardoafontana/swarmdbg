<template>
  <div>
    <b>Panel Filter</b>
    <DropdownFilter title="Tasks / Projects" :items="items" :preLoad="selectedItems" @selectedItemsChange="selectedItemsValue" :loading="loading"></DropdownFilter>
  </div>
</template>

<script>
import DropdownFilter from './DropdownFilter.vue'
import axios from 'axios'

export default {
  name: 'PanelFilter',
  props: {
    msg: String
  },
  components: {
    DropdownFilter
  },
  data() {
    return {
      items: [],
      selectedItems : [],
      loading: true
      // selectedItems: [
      //   { uid: 'ID', title: 'Indonesia' },
      //   { uid: 'AU', title: 'Australia' },
      // ],
    };
  },
  mounted () {
    axios.get('http://swarmdbg.azurewebsites.net/api/Visualization/View3dTaskProjectFilter')
      .then(response => (
        this.items = response.data.map(item => ({ uid: item.taskName, title: item.taskName, subtitle: item.projectName })),
        this.loading = false
      ))
  },
  methods: {
    selectedItemsValue: function(params) {
      this.selectedItems = params;
    }
  }
}
</script>

<style scoped>

</style>
