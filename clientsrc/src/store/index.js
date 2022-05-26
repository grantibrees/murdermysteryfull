import Vue from "vue";
import Vuex from "vuex";
import {
  api
} from "../axiosService";


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    // array of all players
    allPlayers: [],
    // current player object
    player: {},

  },
  mutations: {
    setAllPlayers(state, allPlayers) {
      state.allPlayers = allPlayers;
    },
    setPlayer(state, player) {
      state.player = player;
    },
  },
/* Actions live in the store, they do the work of talking to the back-end, but it's also where logic happens*/
  actions: {
    async getAllPlayers({ commit }) {
      try {
        let res = await api.get("/players")
        commit("setAllPlayers", res.data);
      } catch (err) {
        console.log(err)
      }
    },

    async getPlayer({ commit }, hackerName) {
      try {
        let res = await api.get("/players/" + hackerName)
        commit("setPlayer", res.data);
      } catch (err) {
        console.log(err)
      }
    },
  },
});
