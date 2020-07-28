<template>
  <div id="app">
    <PanelTemplate msg="Test message"/>
  </div>
</template>

<script>
import PanelTemplate from './components/PanelTemplate.vue'

export default {
  name: 'App',
  components: {
    PanelTemplate
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body, #app {
  height: 100%;
  margin: 0px 0px 0px 0px;
}
</style>
