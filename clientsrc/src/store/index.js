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
    // player info
    firstName: "",
    lastName: "",
    hackerName: "",
    phoneNum: 0,
    id: 0,
    identity1: "",
    identity2: "",
    isAPossibleMole: false,
    mole: false,
    sympathist: false,
    funFact: "",
    dataLeak: "",
    roundQcount: 0,
    roundQright: 0,
    roundQwrong: 0,
    gameQcount: 0,
    gameQright: 0,
    gameQwrong: 0
  },
  mutations: {
    setAllPlayers(state, allPlayers) {
      state.allPlayers = allPlayers;
    },
    setPlayer(state, player) {
      state.player = player,
      state.firstName = player.firstName,
      state.lastName = player.lastName,
      state.hackerName = player.hackerName,
      state.phoneNum = player.phoneNum,
      state.id = player.id,
      state.identity1 = player.identity1,
      state.identity2 = player.identity2,
      state.isAPossibleMole = player.isAPossibleMole,
      state.mole = player.mole,
      state.sympathist = player.sympathist,
      state.funFact = player.funFact,
      state.dataLeak = player.dataLeak,
      state.roundQcount = player.roundQcount,
      state.roundQright = player.roundQright,
      state.roundQwrong = player.roundQwrong,
      state.gameQcount = player.gameQcount,
      state.gameQright = player.gameQright,
      state.gameQwrong = player.gameQwrong
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

    async setPlayer({ commit }, hackerName) {
      try {
        let res = await api.get("/players/" + hackerName)
        console.log(res.data);
        commit("setPlayer", res.data);
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
  },

  modules: {
  },
});
