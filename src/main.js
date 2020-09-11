import Vue from 'vue'
import App from './App.vue'
import vuetify from './modules/vuetify';

Vue.config.productionTip = false

window.vue = new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
