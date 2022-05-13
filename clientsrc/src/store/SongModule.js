import Vue from "vue";
import Vuex from "vuex";
import store from ".";
import { api, spotifySongApi } from "../axiosService";

Vue.use(Vuex);

export default {
  actions: {
    async playCurrentSong({ commit, dispatch, state }, songRequest) {
      console.log(store.state.activeSong.uri);
      try {
        await spotifySongApi.put(
          "play?device_id=" + store.state.hostDeviceId,
          { uris: [store.state.activeSong.uri] },
          {
            headers: {
              Authorization: "Bearer " + store.state.hostTokens.accessToken,
            },
          }
        );
        clearInterval(store.state.track);
        store.state.trackBallPos = 95
        store.state.songPos = 0
        store.state.track = setInterval((() => {
          if (store.state.playing) {
            store.state.songPos += 1000;
            store.state.trackBallPos = Math.abs(
              (store.state.songPos / store.state.activeSong.trackLength) * 90 - 95
            );
          }
        }), 1000);
        console.log("interval started")
      } catch (error) {
        console.error(error);
      }
    },

    async addToQueue({ commit, dispatch }, payload) {
      try {
        let res = await api.put("session/" + payload.sessionCode, payload);
        // console.log(res);
        dispatch("getActiveSong", payload);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFromQueue({ commit, dispatch }, payload) {
      try {
        let res = api.delete(
          "session/" + payload.sessionCode + "/" + payload.uri
        );
      } catch (error) {
        console.error(error);
      }
    },
    async getQueue({ commit, dispatch }, payload) {
      try {
        let res = await api.get("session/" + payload.sessionCode);
        // console.log("got Queue", res.data[0]);
        commit("setQueue", res.data[0].queue);
      } catch (error) {
        console.error(error);
      }
    },

    getActiveSong({ commit, dispatch }, song) {
      if (store.state.activeSong == "no active song") {
        commit("setActiveSong", song);
        dispatch("playCurrentSong");
        api.delete(
          "session/" + store.state.activeSession.sessionCode + "/" + song.uri
        );
        store.state.activeSession.queue
          .sort((a, b) => b.score - a.score)
          .splice(0, 1);
        dispatch("updateActiveSong", song);
      }
    },

    changeSong({ commit, dispatch }) {
      store.state.activeSong = "no active song";
      dispatch(
        "getActiveSong",
        store.state.activeSession.queue.sort((a, b) => b.score - a.score)[0]
      );
    },

    updateSongScore({ commit, dispatch, state }, songRequest) {
      api.put(
        "session/" + songRequest.songData.sessionCode + "/" + songRequest.uri,
        songRequest.songData
      );
      if (songRequest.direction == "up") {
        commit("songUpVoted", songRequest.uri);
      } else if (songRequest.direction == "down") {
        commit("songDownVoted", songRequest.uri);
      }
      dispatch("saveToLocal");
    },

    async updateActiveSong({ commit, dispatch, state }, song) {
      try {
        let res = await api.put(
          "session/" + song.sessionCode + "/" + song.uri + "/" + "active",
          song
        );
        console.log("updatedActiveSong worked?", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async findActiveSong({ commit, dispatch, state }, code) {
      try {
        let res = await api.get("session/" + code + "/find");
        debugger;
        // console.log("foundActiveSong", res.data.data[0].activeSong[0]);
        commit("setActiveSong", res.data.data[0].activeSong[0]);
        // console.log("current song", this.state.activeSong);
      } catch (error) {
        console.error(error);
      }
    },
    trackBallMove({ commit, dispatch, state }) {
      console.log("interval")
      state.songPos += 3000;
      state.trackBallPos = Math.abs(
        (state.songPos / state.activeSong.trackLength) * 90 - 95
      );
    }

  },
};
