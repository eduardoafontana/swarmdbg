<template>
  <div class="d-flex">
    <div class="d-flex-item">
      <span class="title">{{ title }}</span>
      <v-app class="vapp">
         <v-main>
          <div v-if="loading">Loading <b-icon icon="three-dots" animation="cylon"></b-icon></div>
          <v-treeview 
            :items="items"
            :dense="true"
            :selectable="true"
            :activatable="false"
            :hoverable="true"
            :open-on-click="true"
            selected-color="accent"
            color="primary"
            :shaped="false"
            :rounded="false"
          ></v-treeview>
        </v-main>
      </v-app>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default {
  name: 'TreeFilter',
  props: {
    title: String,
    items: Array,
    loading: Boolean
  },
  components: {
  },
  data() {
    return {
      // itemsTaskProject: [],
      // itemsUser: [],
      // itemsSession: [],
      // selectedItemsTaskProject : [],
      // selectedItemsUser : [],
      // selectedItemsSession : [],
    };
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
.d-flex {
  display: flex;
  flex-wrap: wrap;
  float: right;
  margin-top: -480px;
}
.d-flex-item {
  width: 300px;
  padding: 5px;
  border: 1px solid #eaeaea;
  margin: 10px 10px 10px 10px;
  background-color: #eaeaea;
}
.title {
  padding-left: 7px;
}
.vapp {
  background-color: #eaeaea !important;
}
</style>
