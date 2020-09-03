<template>
  <div>
    <b>Panel Filter</b>
    <DropdownFilter title="Tasks / Projects" :items="itemsTaskProject" :preLoad="selectedItemsTaskProject" @selectedItemsChange="changeTaskProject" :loading="loading"></DropdownFilter>
    <DropdownFilter title="Users" :items="itemsUser" :preLoad="selectedItemsUser" @selectedItemsChange="changeUser" :loading="loading"></DropdownFilter>
    <DropdownFilter title="Sessions" :items="itemsSession" :preLoad="selectedItemsSession" @selectedItemsChange="changeSession" :loading="loading"></DropdownFilter>
  </div>
</template>

<script>
import DropdownFilter from './DropdownFilter.vue'
import serverApi from '../modules/server-api.js'
import eventBus from "../modules/event-bus.js";

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
      itemsTaskProject: [],
      itemsUser: [],
      itemsSession: [],
      selectedItemsTaskProject : [],
      selectedItemsUser : [],
      selectedItemsSession : [],
      loading: true
    };
  },
  mounted () {
      serverApi.getTaskProjectDataFilterFromServer().then(data => (
        this.itemsTaskProject = data.map(item => ({ uid: item.taskName, title: item.taskName, subtitle: item.projectName })),
        this.loading = false
      ));
  },
  methods: {
    changeTaskProject: function(params) {
      this.selectedItemsTaskProject = params;

      var dataFilterUser = this.selectedItemsTaskProject.map(item => ({ taskName: item.title, projectName: item.subtitle }));
      this.loading = true;

      serverApi.getUserDataFilteFromServer(dataFilterUser).then(data => (
        this.itemsUser = data.map(item => ({ uid: item.userName, title: item.userName, subtitle: '', taskName: item.taskName, projectName: item.projectName })),
        this.loading = false
      ));
    },
    changeUser: function(params) {
      this.selectedItemsUser = params;

      var dataFilterSession = this.selectedItemsUser.map(item => ({ userName: item.title, taskName: item.taskName, projectName: item.projectName }));
      this.loading = true;

      serverApi.getSessionDataFilteFromServer(dataFilterSession).then(data => (
          //[ {sessionId: "3b92a648-7cfc-4277-82cc-5fab885b61bc", name: "02/08/2020 02:33:03Z", breakpointCount: 0, eventCount: 7} ]
          this.itemsSession = data.map(item => ({ uid: item.sessionId, title: item.name, subtitle: '' })),
          this.loading = false
      ));
    },
    changeSession: function(params) {
      this.selectedItemsSession = params;

      eventBus.$emit('selectedSessionChangedEvent', this.selectedItemsSession.map(item => ({ id: item.uid })));
    }
  }
}
</script>

<style scoped>

</style>
