import Vue from "vue";
import Vuex from "vuex";
import {
  api
} from "../axiosService";
import { socketStore } from "./SocketStore";


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    //GAME
    game: {
      roundData: {},
      currentRoundNumber: 0,
      currentPhaseNumber: 0,
      //playersDisplayList and identitiesList are for the Display view.
      //these will act a lot like the Queue in the capstone project.
      playersDisplayList: [],
      // each object in the playersDisplayList array will look like this:
      // firstName: "Grant",
      // lastName: "Brees",
      // hackerName: "RedDragon31",
      // id: 1,
      // identity1: "Redeye",
      // identity2: "Ghost",
      // roundEarnedVotes: 3,
      // roundsWithPasses: [1,3],
      // roundsWithFails: [2]
      identitiesList: [],
      // each object in the playersDisplayList array will look like this:
      // identityName: "Redeye",
      // identityOrder: 3,
      // totalVoteCount: 13
    },

    //ROUND
    // each round this object will get updated/overwritten with new data for that specific round
    round: {
      roundNumber: 0,
      currentPhaseNumber: 0,
      phase1: {
        timer: 0,
        triviaQuestions: []
      },
      phase2: {
        timer: 0
      },
      phase3: {
        timer: 0
      },
    },
    
    //PLAYERS
    allPlayers: [],
    // current player object
    player: {
      isAPossibleMole: false,
      mole: false,
      roundQcount: 0,
      roundQright: 0,
      roundQwrong: 0,
      gameQcount: 0,
      gameQright: 0,
      gameQwrong: 0,
    },

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

    async getGameStart({ commit }) {
      try {
        let res = await api.get("/game/start")
        commit("getGameStart", res.data);
      } catch (err) {
        console.log(err)
      }
    },
  },

  modules: {
    socketStore,
  },
});
