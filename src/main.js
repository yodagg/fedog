import axios from 'axios'
import App from './App.vue'

window.axios=axios
new Vue({
  el: '#app',
  render: h => h(App)
})
