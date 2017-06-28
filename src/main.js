import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './App.vue'

window.axios = axios

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')