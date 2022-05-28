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
    gameData: {
      roundData: [],
      currentRoundNumber: 0,
      currentPhaseNumber: 1,
      //playersDisplayList and identitiesList are for the Display view.
      //these will act a lot like the Queue in the capstone project.
      playersDisplayList: [
        { 
          firstName: "Grant",
          lastName: "Brees",
          hackerName: "RedDragon31",
          id: 1,
          identity1: "Redeye",
          identity2: "Ghost",
          roundEarnedVotes: 6,
          roundsWithPasses: [1,3],
          roundsWithFails: [2]
        },
        { 
          firstName: "Eman",
          lastName: "Pees",
          hackerName: "YellowMagpie24",
          id: 2,
          identity1: "Redeye",
          identity2: "Cloak",
          roundEarnedVotes: 3,
          roundsWithPasses: [1,3],
          roundsWithFails: [5]
        },
        { 
          firstName: "Grant",
          lastName: "Bees",
          hackerName: "PurpleKoiFish31",
          id: 3,
          identity1: "Glassknife",
          identity2: "Ironwire",
          roundEarnedVotes: 5,
          roundsWithPasses: [1,3],
          roundsWithFails: [3]
        },
      ],
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
      identitiesList: [
        {
          identityName: "Redeye",
          identityOrder: 3,
          totalVoteCount: 5 
        },
        {
          identityName: "Ironwire",
          identityOrder: 1,
          totalVoteCount: 6
        },
        {
          identityName: "Glassknife",
          identityOrder: 2,
          totalVoteCount: 10
        },
        {
          identityName: "Ghost",
          identityOrder: 4,
          totalVoteCount: 13
        },
        {
          identityName: "Cloak",
          identityOrder: 5,
          totalVoteCount: 9
        },
      ],
      // each object in the playersDisplayList array will look like this:
      // identityName: "Redeye",
      // identityOrder: 3,
      // totalVoteCount: 13
    },

    //ROUND
    // each round this object will get updated/overwritten with new data for that specific round
    currentRoundData: {
      roundNumber: 0,
      phase1: {
        timer: 300000,
        triviaQuestions: []
      },
      phase2: {
        timer: 0
      },
    },

    //PLAYERS
    allPlayers: [],
    // current player object
    player: {
      hackerName: "",
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
    },
    setGameData(state, gameData) {
      state.gameData = gameData;
    },
    setCurrentRoundData(state, gameData) {
      state.currentRoundData = gameData;
    },
    updateIdentitesList(state, data){
      state.identitiesList = data;
    },
    updatePlayersDisplayList(state, data){
      state.playersDisplayList = data;
    },
    updateRoundQcount(state){
      state.player.roundQcount ++
      state.player.gameQcount ++
    },
    updateRoundQright(state){
      state.player.roundQright ++
      state.player.gameQright ++
    },
    updateRoundQwrong(state){
      state.player.roundQwrong ++
      state.player.gameQwrong ++
    },
    resetRoundQs(state){
      state.player.roundQcount = 0
      state.player.roundQright = 0
      state.player.roundQwrong = 0
    },
    updateRoundQcount(state){
      state.player.roundQcount ++
    },
    updateRoundQright(state){
      state.player.roundQright ++
    },
    updateRoundQwrong(state){
      state.player.roundQwrong ++
    },
    updateVoteCount(state, object) {
      for (let i = 0; i < state.gameData.identitiesList.length; i++) {
        if (state.gameData.identitiesList[i].identityName == object.identityName) {
          state.gameData.identitiesList[i].totalVoteCount += object.totalVotes;
          break;
        }
      }
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
        // console.log("going on to identityAssign");
        // dispatch("identityAssign")
      } catch (err) {
        console.log(err)
      }
    },
    // async identityAssign({ commit }){
    //   try {
    //     let res = await api.get("players/identity")
    //     console.log(res.data)
    //     console.log("identities set");
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    async beginRound({ commit, dispatch }) {
      try {
        //tells server to start round, phase 1
        let res = await api.get("round/start");
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    },
    async roundTrigger({ commit, dispatch }, payload) {
      let roundIndex = payload.currentRoundNumber-1
      commit("setCurrentRoundData", payload.roundData[roundIndex])
      commit("setGameData", payload)
    },

    async nextPhase({ commit, dispatch }) {
      try {
        let roundNum = this.state.gameData.currentRoundNumber
        let phaseNum = this.state.gameData.currentPhaseNumber
        //tells server to start next phase
        let res = await api.get("round/" + roundNum + "/" + phaseNum);
        // commit("setGameData", res.data)
        console.log("nextPhase working: ");
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    },

    async phaseTrigger({ commit, dispatch }, payload){
      let roundIndex = payload.currentRoundNumber-1
      commit("setGameData", payload)
      commit("setCurrentRoundData", payload.roundData[roundIndex])
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

    async updatePlayer({ commit, dispatch, state}){
      try {
        let res = await api.put("/players/" + state.player.hackerName, state.player)
        commit("setPlayer", res.data);
      } catch (err) {
        console.log(err)
      }
    },

    async moleAlert({ commit, dispatch }, payload) {
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
      let cookie1 = "hackerName=" + hackerName + ";" + expires + ";path=/";
      document.cookie = cookie1 + "; Secure; SameSite=None; path=/";
      console.log("set cookie for " + hackerName);
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
