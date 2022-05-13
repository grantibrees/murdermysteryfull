import Vue from 'vue'
import Vuex from 'vuex'
import { api, loginApi } from "../axiosService"
import store from "."
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)


export default {
  actions: {
    async createSession({ commit }, sessionData) {
      try {
        // console.log(sessionData)
        await api.post("session/post", sessionData)
        commit("setActiveSession", sessionData)
        router.push({ name: 'SessionUniqueHost', params: { code: sessionData.sessionCode } })
      } catch (error) {
        console.error(error)
      }

    },

    async joinSessionHost({ commit, dispatch }, sessionCode) {
      try {
        let res = await api.get("session/" + sessionCode)
        commit("setActiveSession", res.data[0])
        if (res.data[0].queue[0]) {
          commit("setActiveSong", res.data[0].queue[0])
        }
        router.push({ name: 'SessionUniqueHost', params: { code: sessionCode } })
        dispatch("loadFromSave")
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The Session Does Not Exist!',
        })

      }
    },

    async joinSessionVisitor({ commit, dispatch }, sessionCode) {
      try {
        let res = await api.get("session/" + sessionCode)
        commit("setActiveSession", res.data[0])
        if (res.data[0].queue[0]) {
          commit("setActiveSong", res.data[0].queue[0])
        }
        router.push({ name: 'SessionUniqueVisitor', params: { code: sessionCode } })
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The Session Does Not Exist!',
        })

      }
    }
  }
}