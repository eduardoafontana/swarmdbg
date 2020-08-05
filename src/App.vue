<template>
  <div id="app">
    <PanelTemplate msg="Test message"/>
  </div>
</template>

<script>
import PanelTemplate from './components/PanelTemplate.vue'

import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export default {
  name: 'App',
  components: {
    PanelTemplate
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body, #app {
  height: 100%;
  margin: 0px 0px 0px 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
}
</style>
