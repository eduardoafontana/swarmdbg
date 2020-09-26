<template>
  <div>
    <b-card no-body>
      <b-tabs card small pills>
        <b-tab active>
          <template v-slot:title>
            <b-icon icon="list-nested" font-scale="2"></b-icon>
          </template>
          <b-card-text>
            <TreeFilter title="Sessions" :items="itemsTreeSession" :loading="loadingTree" @selectedItemsChange="changeTreeSession"></TreeFilter>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon icon="border-style" font-scale="2"></b-icon>
          </template>
          <b-card-text>
            <DropdownFilter title="Tasks / Projects" :items="itemsTaskProject" :preLoad="selectedItemsTaskProject" @selectedItemsChange="changeTaskProject" :loading="loading"></DropdownFilter>
            <DropdownFilter title="Users" :items="itemsUser" :preLoad="selectedItemsUser" @selectedItemsChange="changeUser" :loading="loading"></DropdownFilter>
            <DropdownFilter title="Sessions" :items="itemsSession" :preLoad="selectedItemsSession" @selectedItemsChange="changeSession" :loading="loading"></DropdownFilter>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
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

<style>
.card-header {
  padding-top: 0.75rem !important;
  padding-left: 1.25rem !important;
  padding-right: 0.75rem !important;
  padding-bottom: 0rem !important;
}
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  background-color: #6c757d !important;
}
.nav-link {
  padding-top: 0.35rem !important;
  padding-right: 0.5rem !important;
  padding-bottom: 0.35rem !important;
  padding-left: 0.5rem !important;

  color: #6c757d;
}
.nav-link:hover {
  color: #fff;
}
</style>

<style scoped>
.card-body {
  padding: 0px;
  background-color: #29292D;
}
.card {
  background-color: #29292D;
}
</style>
