import axios from 'axios'
import Vue from 'vue'
import store from '@/store'

let instance = axios.create({
  baseURL: 'http://localhost:8080'
})

instance.interceptors.request.use(function (config) {
  return config
}, function (err) {
  return Promise.reject(err)
})

instance.interceptors.response.use(function (res) {
  return res
}, function (err) {
  store.dispatch('showToast', {
    show: true,
    type: 'error',
    message: err.message
  })
  return Promise.reject(err)
})

Vue.prototype.$http = instance
