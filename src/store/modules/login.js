import { getBaseUrl, setBaseUrl, removeBaseUrl, setToken, getToken, removeToken, getDataUser, setDataUser, removeDataUser } from '@/localstorage-helper'
import axios from '../../axiosHelper'

const LOGIN = "LOGIN"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGOUT = "LOGOUT"
const POST_TOKEN = "POST_TOKEN"
const TOKEN_VERIFIED = "TOKEN_VERIFIED"
const RESET = "RESET"

const state = {
  hasBaseUrl: !!(getBaseUrl()),
  isLoggedIn: !!(getToken()),
  menu: null,
  dataMenu: null,
  dataUser: getDataUser() || null
}

const mutations = {
  [LOGIN] (state) {
    state.pending = true
  },
  [LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [LOGOUT] (state) {
    state.isLoggedIn = false
  },
  [POST_TOKEN] (state) {
    state.pending = true
  },
  [TOKEN_VERIFIED] (state) {
    state.pending = false
    state.hasBaseUrl = true
  },
  [LOGOUT] (state) {
    state.isLoggedIn = false
  },
  setDataMenu (state, dataMenu) {
    state.dataMenu = dataMenu
  }
}
const actions = {
  getUrl ({ commit }, url) {
    commit(POST_TOKEN) // show spinner
    setBaseUrl(url)
    commit(TOKEN_VERIFIED)
  },
  reset ({ commit }) {
    removeBaseUrl()
    removeToken()
    removeDataUser()
    state.dataMenu = null
    state.dataUser = null
    commit(RESET)
  },
  login ({ commit, state }, token) {
   
    // commit(LOGIN) // show spinner
    // state.dataUser = token
    // console.log(token)
    setToken(token)
    // setDataUser(JSON.stringify(token.dataUser))
    commit(LOGIN_SUCCESS)
  },
  logout ({ commit }) {
    removeToken()
    commit(LOGOUT)
    // delete axios.defaults.headers['X-Auth-Token']
  },
  getMenuFromAjax ({ commit }) {
    axios.get("/adminmenu/get_child")
      .then(res => {
        let ajaxMenu = res.data.content
        commit("setDataMenu", ajaxMenu.map(el => el.modul))
      })
      .catch(err => {
        console.log(err)
      });
  }
}

export default {
  namespaced: true,
  strict: true,
  state,
  mutations,
  actions
}
