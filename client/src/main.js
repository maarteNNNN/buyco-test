import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'

Vue.config.productionTip = false

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
})

Vue.prototype.$http = instance

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
