import Vue from "vue";
import Vuex from "vuex";
import {
  api
} from "../axiosService";
import router from "../router";
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
    stateUpdate: ""

  },
  mutations: {
    setAllPlayers(state, allPlayers) {
      state.allPlayers = allPlayers;
    },
    setPlayer(state, player) {
      state.player = player;
    },
    setHackerName(state, name) {
      state.player.hackerName = name;
    },
    stateUpdate(state, update) {
      state.stateUpdate = update;
    }
  },
  /* Actions live in the store, they do the work of talking to the back-end, but it's also where logic happens*/
  actions: {
    //GAME
    async gameStart({ commit, dispatch }, room) {
      try {
        //tells server to start game, set mole
        let res = await api.put("game/start", room);
        // console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    },

    async sympathistOffer() { },

    //ROUND


    //PLAYERS
    async getAllPlayers({ commit }) {
      try {
        let res = await api.get("/players")
        commit("setAllPlayers", res.data);
      } catch (err) {
        console.log(err)
      }
    },

    async getPlayer({ commit, dispatch }, hackerName) {
      try {
        let res = await api.get("/players/" + hackerName)
        dispatch("setHackerNameCookie", hackerName)
        commit("setPlayer", res.data);
      } catch (err) {
        console.log(err)
      }
    },

    async moleAlert({ commit, dispatch }, payload){
      try {
        let moleName = payload.hackerName
        // console.log(payload)
        if (this.state.player.hackerName == moleName) {
          console.log(this.state.player.hackerName + " is the mole")
          commit("stateUpdate", "mole")
          commit("setPlayer", payload)
        } else {
          console.log(this.state.player.hackerName + " is NOT the mole")
          commit("stateUpdate", "mole")
        
        }
      } catch (error) {
        console.error(error)
      }

    },


    // in case a player leaves the browser
    async setHackerNameCookie({ commit }, hackerName) {
      const d = new Date();
      d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = "hackerName=" + hackerName + ";" + expires + ";path=/";
    },

    async checkForPlayer({ commit, dispatch }) {
      let c = document.cookie.indexOf('hackerName=');
      if (c != -1) {
        dispatch("getHackerNameCookie")
        dispatch("getPlayer", this.state.player.hackerName)
        if (router.currentRoute.name != 'Display')
          router.push({ name: 'Display' })
      }
    },

    async getHackerNameCookie({ commit, dispatch }) {
      let name = "hackerName=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          let hackerName = c.substring(name.length, c.length)
          commit("setHackerName", hackerName)
        }
      }
      return "";
    }

  },

  modules: {
    socketStore,
  },
});
