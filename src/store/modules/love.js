import { getLove, setLove } from '@/localstorage-helper'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import { ToastProgrammatic as Toast } from 'buefy'
import { removeLove } from '../../localstorage-helper'


const state = {
  love: getLove() ? JSON.parse(getLove()) : [],
}

const mutations = {
  setLoveItem(state, item) {
    if (state.love.length <= 5) {
      state.love.push(item)
      setLove(JSON.stringify(state.love))

      Toast.open({
        message: "Property yang anda sukai telah disimpan",
        position: 'is-top',
        queue: false
      });
    } else {
      Snackbar.open({
        message: "Jumlah like anda mencapai batas maksimum<br/><small>Hapus sebagian untuk melanjutkan<small/>",
        position: 'is-bottom-right',
        type: 'is-danger',
        queue: false
      });
    }
  },
  delLoveItem(state, index) {
      state.love.splice(index, 1)
      setLove(JSON.stringify(state.love))
  },
  delAll(state) {
    removeLove()
    state.love = getLove() ? JSON.parse(getLove()) : []
  },

}


export default {
  namespaced: true,
  strict: true,
  state,
  mutations
}
