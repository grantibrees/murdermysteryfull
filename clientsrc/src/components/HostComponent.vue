<template>
  <div class="host-component font-site col-12">
    <div class="row align-items-center my-4">
      <div class="col-8">
        <h5 class="rm-my">
          Session Code:
          <span class="text-primary">{{activeSession.sessionCode}}</span>
        </h5>
      </div>
      <div class="col-2">
        <i @click="shareSessionCode()" class="far fa-share-square"></i>
      </div>

      <div class="col-2">
        <i class="fas fa-cog"></i>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "FileName" /*  */,
  data() {
    /* Data binding. */
    return {
      deviceId: this.$store.state.hostDeviceId,
      changingTrack: false,
      currentState: {},
      spotifySDK: {},
    };
  },

  watch: {
    playing: function () {
      this.playpause();
    },
  },
  mounted() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // You can now initialize Spotify.Player and use the SDK
    };
    // console.log("hostComponent loaded");
    this.checkForActiveSong();
  } /* Runs functions on startup */,
  computed: {
    accessToken() {
      return this.$store.state.hostTokens.accessToken;
    },
    activeSession() {
      return this.$store.state.activeSession;
    },
    playing() {
      return this.$store.state.playing;
    },
  } /* Pulls values from the store. Always the value of the method that's in it. The live value. Constant value, has to have a return in it, it's a getter. It's like a listener, listening to the state. It gets the state.
      cars() {
      return this.store.state.cars;
  */,
  async mounted() {
    await this.initiatePlayer();
  },
  methods: {
    shareSessionCode() {
      let copytext = "";
      if (window.location.host.includes("localhost")) {
        copytext =
          "http://localhost:8080/#/session/" + this.activeSession.sessionCode;
      } else {
        copytext =
          "https://songscoop.herokuapp.com/#/session/" +
          this.activeSession.sessionCode;
      }
      console.log(copytext);
      navigator.clipboard.writeText(copytext);
      Swal.fire({
        position: "top-end",
        title: "<span class='text-info'>Session Has Been Copied!</span>",
        showConfirmButton: false,
        timer: 1500,
        background: "#f66599",
      });
    },
    waitForSpotifyWebPlaybackSDKToLoad: async function () {
      return new Promise((resolve) => {
        if (window.Spotify) {
          resolve(window.Spotify);
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify);
          };
        }
      });
    },
    initiatePlayer: async function () {
      await this.accessToken;
      const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad();
      this.spotifySDK = new Player({
        name: "Song Scoop",
        volume: 1.0,
        getOAuthToken: (callback) => {
          callback(this.accessToken);
        },
      });
      console.log(JSON.stringify(this.spotifySDK));
      // Error handling
      this.spotifySDK.addListener("initialization_error", ({ message }) => {
        console.log("Initialization_error: " + message);
      });
      this.spotifySDK.addListener("authentication_error", ({ message }) => {
        console.log("Authentication_error: " + message);
      });
      this.spotifySDK.addListener("account_error", ({ message }) => {
        console.log("Account_error: " + message);
      });
      this.spotifySDK.addListener("playback_error", ({ message }) => {
        console.log("Playback_error: " + message);
      });
      // Playback status updates
      this.spotifySDK.addListener("player_state_changed", (state) => {
        console.log("state Changed", state);
        this.changeSong(state);
      });
      // Ready
      this.spotifySDK.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device Id: ", device_id);
        this.$store.dispatch("getDeviceId", device_id);
      });
      // Not Ready
      this.spotifySDK.addListener("not_ready", ({ device_id }) => {
        console.log("Not ready with device Id: ", device_id);
      });
      this.spotifySDK.connect();
    },
    play() {
      this.$store.dispatch("playCurrentSong");
    },
    playpause() {
      this.spotifySDK.togglePlay().then(() => {
        console.log("Toggled playback!");
      });
    },
    changeSong(state) {
      console.log(state);
      if (
        state &&
        state != this.currentState &&
        state.paused &&
        this.changingTrack == false &&
        state.position === 0
      ) {
        console.log("Track ended");
        this.changingTrack = true;
        this.currentState = state;
        this.$store.dispatch("changeSong");
      } else if (state.paused == false && state.position > 1000) {
        this.changingTrack = false;
      }
    },
  },
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>