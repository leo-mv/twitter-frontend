import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import router from './router'
import store from './store'
import axios from 'axios'

import {url} from './config/config'
import 'normalize.css'
import './assets/sass/index.sass'

Vue.use(Vuelidate)
Vue.config.productionTip = false

axios.defaults.baseURL = url

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
