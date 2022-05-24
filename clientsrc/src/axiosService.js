import Axios from "axios"
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'
export const loginApi = Axios.create({
  baseURL: base + "login/",
  timeout: 3000,
  withCredentials: true
})
export const api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})



