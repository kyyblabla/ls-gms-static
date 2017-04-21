import axios from 'axios'
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
  return Promise.reject(err)
})

module.exports = instance

