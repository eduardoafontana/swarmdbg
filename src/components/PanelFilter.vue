<template>
  <div>
    <DropdownFilter title="Tasks / Projects" :items="itemsTaskProject" :preLoad="selectedItemsTaskProject" @selectedItemsChange="changeTaskProject" :loading="loading"></DropdownFilter>
    <DropdownFilter title="Users" :items="itemsUser" :preLoad="selectedItemsUser" @selectedItemsChange="changeUser" :loading="loading"></DropdownFilter>
    <DropdownFilter title="Sessions" :items="itemsSession" :preLoad="selectedItemsSession" @selectedItemsChange="changeSession" :loading="loading"></DropdownFilter>

    <TreeFilter title="Sessions" :items="itemsTreeSession" :loading="loadingTree" @selectedItemsChange="changeTreeSession"></TreeFilter>
  </div>
</template>

<script>
import DropdownFilter from './DropdownFilter.vue'
import serverApi from '../modules/server-api.js'
import eventBus from "../modules/event-bus.js";
import TreeFilter from './TreeFilter.vue'
import uuidV1 from 'uuid/v1';

export default {
  name: 'PanelFilter',
  props: {
    msg: String
  },
  components: {
    DropdownFilter,
    TreeFilter
  },
  data() {
    return {
      itemsTreeSession: [],
      itemsTaskProject: [],
      itemsUser: [],
      itemsSession: [],
      selectedItemsTaskProject : [],
      selectedItemsUser : [],
      selectedItemsSession : [],
      selectedItemsTreeSession : [],
      loading: true,
      loadingTree: true,
    };
  },
  mounted () {
      serverApi.getTaskProjectDataFilterFromServer().then(data => (
        this.itemsTaskProject = data.map(item => ({ uid: item.taskName, title: item.taskName, subtitle: item.projectName })),
        this.loading = false,

        this.loadTreeTaskProject(data)
      ));
  },
  methods: {
    loadTreeTaskProject: function(data) {
        this.itemsTreeSession = data.map(item => ({ id: uuidV1(), name: item.taskName, subtitle: item.projectName, children: [] })),
        this.loadTreeUser();
    },
    loadTreeUser: function(){
        this.itemsTreeSession.forEach((taskProjectItem) => {
          var dataFilterUser = [{ taskName: taskProjectItem.name, projectName: taskProjectItem.subtitle }];

          serverApi.getUserDataFilteFromServer(dataFilterUser).then(data => (
            taskProjectItem.children = data.map(item => ({ id: uuidV1(), name: item.userName, taskName: item.taskName, projectName: item.projectName, children: [] })),
            this.loadTreeSession(taskProjectItem.children)
          ));
        })
    },
    loadTreeSession: function(children){
      children.forEach((userItem) => {
        var dataFilterSession = [{ userName: userItem.name, taskName: userItem.taskName, projectName: userItem.projectName }];
        
        serverApi.getSessionDataFilteFromServer(dataFilterSession).then(data => (
            userItem.children = data.map(item => ({ id: item.sessionId, name: item.name })),
            this.loadingTree = false
        ));
      })
    },
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
    },
    changeTreeSession: function(params) {
      this.selectedItemsTreeSession = params;

      eventBus.$emit('selectedSessionChangedEvent', this.selectedItemsTreeSession.map(value => ({ id: value })));
    }
  },
}
</script>

<style scoped>

</style>
