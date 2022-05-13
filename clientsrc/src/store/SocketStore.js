import io from "socket.io-client";

let socket = {};

export const socketStore = {
  actions: {
    initializeSocket({ commit, dispatch }) {
      socket = io(
        window.location.host.includes("localhost") ? "//localhost:3000/" : "/"
      );
      socket.on("CONNECTED", (data) => {
        console.log(data.message + " Let the villany commence");
      });

      //registers event listeners for emits from socketservice
      socket.on("updateQueue", (payload) => {
        // console.log("worked", payload);
        dispatch("getQueue", payload);
      });

      socket.on("songScoreUpdated", (payload) => {
        // console.log("song score updated", payload);
        dispatch("getQueue", payload);
      });
      socket.on("activeSongUpdated", (payload) => {
        // console.log("socket hit", payload.data.activeSong[0]);
        commit("setActiveSong", payload.data.activeSong[0]);
      });
    },
    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "joinRoom", data: roomName });
      // console.log("room Joined", roomName);
    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "leaveRoom", data: roomName });
    },
  },
};
