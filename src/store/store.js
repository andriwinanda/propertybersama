import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import love from './modules/love'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    login,
    love
  }
 
})
