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
    if (loved.length <= 5) {
      if (loved.length) {
        // loved.find((element, index) => {
        //   if(element.id == item.id){
        //     loved.splice(index, 1)
        //     setLove(JSON.stringify(state.love))
        //   }
        // })
        for (let i = 0; i < loved.length; i++) {
          if (loved[i].id == item.id) {
            loved.splice(i, 1)
            setLove(JSON.stringify(state.love))
            return
          }
        }
        loved.push(item)
        setLove(JSON.stringify(state.love))
        Toast.open({
          message: "Property yang anda sukai telah disimpan",
          position: 'is-top',
          queue: false
        });
      }
      else {
        loved.push(item)
        setLove(JSON.stringify(state.love))
        Toast.open({
          message: "Property yang anda sukai telah disimpan",
          position: 'is-top',
          queue: false
        })
        return
      }
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
