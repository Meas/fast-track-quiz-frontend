import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios'
import App from './App.vue'

Vue.config.productionTip = false

let instance = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000,
});

Vue.prototype.$http = instance;

new Vue({
  render: h => h(App),
}).$mount('#app')
