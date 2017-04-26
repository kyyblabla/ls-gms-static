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
  toast: {
    toastType: state => state.toastType,
    showToast: state => state.showToast,
    toastMsg: state => state.toastMsg
  }
}

const actions = {
  showToast ({commit}, action) {
    commit(COM_SHOW_TOAST, action)
  }
}

const mutations = {
  [COM_SHOW_TOAST] (state, {show, type, message}) {
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
