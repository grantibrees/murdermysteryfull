import io from "socket.io-client";

let socket = {};

export const socketStore = {
  actions: {
    initializeSocket({ commit, dispatch }) {
      socket = io(
        window.location.host.includes("localhost") ? "//localhost:3000/" : "/"
      );
      socket.on("CONNECTED", (data) => {
        console.log(data.message + " Lets HACK THE PLANET");
      });

      // registers event listeners for emits from socketservice
      socket.on("gameStart", (payload) => {
        // console.log("worked", payload);
        dispatch("moleAlert", payload);
      });

      socket.on("roundStart", (payload) => {
        // console.log("worked", payload);
        dispatch("roundTrigger", payload);
      });

      socket.on("phaseStart", (payload) => {
        // console.log("worked", payload);
        dispatch("phaseTrigger", payload);
      });

    },
    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "joinRoom", data: roomName });
      console.log("room Joined", roomName);
    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "leaveRoom", data: roomName });
    },
  },
};
