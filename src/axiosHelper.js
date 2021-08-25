import axios from 'axios'
import store from './store/store'
import router from './router'
import { getToken, getBaseUrl } from './localstorage-helper'

let myAxios = axios.create();
let token = getToken()

// if (token) {
//   myAxios.defaults.headers.common["Token"] = token;
// }

myAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error) {
    if (!error.response || error.response.status === 500) {
     
    }
    else if (error.response.status === 401) {
      store.dispatch("login/logout")
      router.push('/login')
    } 
  }
  return Promise.reject(error)
})

export default myAxios
