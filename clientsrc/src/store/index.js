import Vue from "vue";
import Vuex from "vuex";
import {
  api,
  hostTokensApi
} from "../axiosService";
import SessionModule from "./SessionModule";
import { socketStore } from "./SocketStore";
import SongModule from "./SongModule";
import VisitorModule from "./VisitorModule";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    spotifyAuthToken: "",
    trackSearchResults: [],
    user: {},
    hostDeviceId: "",
    hostTokens: {
      accessToken: "",
      refreshToken: "",
      expiresIn: "",
    },
    activeSession: {
      queue: [],
      page: true,
    },
    activeSong: "no active song",
    vistorActive: {},
    nextSong: {},
    playing: true,
    songsUpVoted: [],
    songsDownVoted: [],
    songPos: 0,
    trackBallPos: 95,
    track: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSpotifyVisitorAuth(state, spotifyAuthToken) {
      state.spotifyAuthToken = spotifyAuthToken;
    },
    setTrackSearchResults(state, searchResults) {
      searchResults.items.forEach((item) =>
        state.trackSearchResults.push(item)
      );
    },
    updateTrackPage(state, page) {
      state.activeSession.page = page;
    },
    clearTrackSearchResults(state) {
      state.trackSearchResults = [];
    },
    setHostTokens(state, tokens) {
      state.hostTokens.accessToken = tokens.accessToken;
      state.hostTokens.refreshToken = tokens.refreshToken;
      state.hostTokens.expiresIn = tokens.expiresIn;
    },

    setActiveSession(state, sessionData) {
      state.activeSession = sessionData;
    },
    setActiveSong(state, activeSong) {
      state.activeSong = activeSong;
    },
    setVisitorActive(state, visitorActive) {
      state.vistorActive = visitorActive;
    },
    setQueue(state, queue) {
      state.activeSession.queue = queue;
    },
    setNextSong(state, nextSong) {
      state.nextSong = nextSong;
    },
    setDeviceId(state, deviceId) {
      state.hostDeviceId = deviceId;
    },
    songUpVoted(state, songUri) {
      state.songsUpVoted.push(songUri);
    },
    songDownVoted(state, songUri) {
      state.songsDownVoted.push(songUri);
    },
    playpause(state) {
      state.playing = !state.playing;
    },
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
      hostTokensApi.defaults.headers.authorization = bearer;
      // console.log("Set Bearer tokens");
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
      hostTokensApi.defaults.headers.authorization = "";
    },

    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
        // console.log("profile data", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    async getSessionEmail({ dispatch }, code) {
      try {
        let res = await api.get("session/" + code);
        // console.log(res.data[0].creatorEmail);
        return res.data[0].creatorEmail;
      } catch (error) {
        console.error(error);
      }
    },

    setSpotifyHostTokens({ commit, dispatch, state }, tokenData) {
      commit("setHostTokens", tokenData);
      // console.log(" host tokens set to store: ", tokenData);
    },

    async saveSpotifyHostTokens({ commit, dispatch }, tokenData) {
      try {
        let payload = {
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          expiresIn: tokenData.expiresIn,
        };
        // console.log(payload);
        let res = await hostTokensApi.post("tokensave", payload);
        // console.log("host tokens posted to server", res);
      } catch (error) {
        console.error(error);
      }
    },

    async callDownTokens({ commit, dispatch, state }) {
      try {
        let res = await hostTokensApi.get("tokenget");
        commit("setHostTokens", res.data);
        // console.log(res.data);
      } catch (error) {
        // console.log(error);
      }
    },

    getDeviceId({ commit }, deviceId) {
      commit("setDeviceId", deviceId);
    },

    saveToLocal(context) {
      window.localStorage.setItem(
        "Session" + context.state.activeSession.sessionCode,
        JSON.stringify({
          SessionCode: context.state.activeSession.sessionCode,
          songsUpVoted: context.state.songsUpVoted,
          songsDownVoted: context.state.songsDownVoted,
        })
      );
      console.log("Session saved");
    },
    loadFromSave(context) {
      let session = JSON.parse(
        window.localStorage.getItem(
          "Session" + context.state.activeSession.sessionCode
        )
      );

      if (session) {
        context.state.songsUpVoted = session.songsUpVoted;
        context.state.songsDownVoted = session.songsDownVoted;
      }
    },
  },
  modules: {
    SessionModule,
    VisitorModule,
    SongModule,
    socketStore,
  },
});
