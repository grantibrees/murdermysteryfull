import Vue from "vue";
import Vuex from "vuex";
import {
  api
} from "../axiosService";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    allPlayers: [],
    player: {},
    hackerName: "",
    mole: false
  },
  mutations: {
    setAllPlayers(state, allPlayers) {
      state.allPlayers = allPlayers;
    },
    setPlayer(state, player) {
      state.player = player;
    },
    setHackerName(state, hackerName) {
      state.hackerName = hackerName;
    }
  },
  actions: {
    async setHackerName({ commit }, hackerName) {
      try {
        commit("setHackerName", hackerName);
      } catch (err) {
        console.log(err)
      }
    },

    async getPlayer({ commit }, hackerName) {
      try {
        let res = await api.get("/players/" + hackerName)
        console.log(res.data);
        commit("setPlayer", res.data);
      } catch (err) {
        console.log(err)
      }
    },

    async getAllPlayers({ commit }) {
      try {
        let res = await api.get("/players")
        console.log(res.data);
        commit("setAllPlayers", res.data);
      } catch (err) {
        console.log(err)
      }
    }


    // async getProfile({ commit }) {
    //   try {
    //     let res = await api.get("/profile");
    //     commit("setUser", res.data);
    //     // console.log("profile data", res.data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
  },

  modules: {
    // SessionModule,
    // VisitorModule,
    // SongModule,
    // socketStore,
  },
});
