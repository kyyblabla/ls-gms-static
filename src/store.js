import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const COM_SHOW_TOAST = 'COM_SHOW_TOAST'

const state = {
  showToast: false,
  toastType: 'success',
  toastMsg: ''
}

const getters = {
  toastType: state => state.toastType,
  showToast: state => state.showToast,
  toastMsg: state => state.toastMsg
}

const actions = {
  showToast ({commit}, {show, type, message}) {
    commit(COM_SHOW_TOAST, show, type, message)
  }
}

const mutations = {
  [COM_SHOW_TOAST] (state, show, type, message) {
    state.showToast = show
    state.type = type
    state.message = message
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
