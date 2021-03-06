// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.scss'
import Buefy from 'buefy'
import axios from './axiosHelper'
import store from './store/store'
Vue.use(Buefy)
Object.defineProperties(Vue.prototype, {
  // Custom header axios
  axios: {
    get() { return axios }
  },
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
