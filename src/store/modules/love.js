import { getLove, setLove } from '@/localstorage-helper'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import { ToastProgrammatic as Toast } from 'buefy'
import { removeLove } from '../../localstorage-helper'


const state = {
  love: getLove() ? JSON.parse(getLove()) : [],
}

const mutations = {
  setLoveItem(state, item) {
    let loved = state.love
    for (let i = 0; i < loved.length; i++) {
      if (loved[i].id == item.id) {
        console.log('kena')
        loved.splice(i, 1)
        setLove(JSON.stringify(state.love))
        return
      }
    } 
    if (loved.length <= 5) {
      loved.push(item)
      setLove(JSON.stringify(state.love))
    }
    else {
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
