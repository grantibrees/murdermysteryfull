import Vue from 'vue'
import Vuex from 'vuex'
import { api, loginApi } from "../axiosService"
import store from "."
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)


export default {
  actions: {
    // async createSession({ commit }, sessionData) {
    //   try {
    //     // console.log(sessionData)
    //     await api.post("session/post", sessionData)
    //     commit("setActiveSession", sessionData)
    //     router.push({ name: 'SessionUniqueHost', params: { code: sessionData.sessionCode } })
    //   } catch (error) {
    //     console.error(error)
    //   }

    // },
  }
}