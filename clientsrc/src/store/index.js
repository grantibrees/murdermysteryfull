import Vue from "vue";
import Vuex from "vuex";
import {
  api
} from "../axiosService";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    player: "",
    mole: false
  },
  mutations: {
    setPlayer(state, player) {
      state.player = player;
    }
  },
  actions: {

    async setPlayer({ commit }, player) {
      try {
        commit("setPlayer", player);
      } catch (err) {
        console.log(err)
      }
    }
    // resetBearer() {
    //   api.defaults.headers.authorization = "";
    //   hostTokensApi.defaults.headers.authorization = "";
    // },

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
