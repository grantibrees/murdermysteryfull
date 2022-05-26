<template>
  <div class="host-component">
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "FileName" /*  */,
  data() {
    /* Data binding. */
    return {
      something: {},
    };
  },

  mounted() {
    this.checkForActiveSong();
  } /* Runs functions or sets vars on startup */,

  computed: {
    accessToken() {
      return this.$store.state.hostTokens.accessToken;
    }
  } /* Pulls values from the store. Always the value of the method that's in it. The live value. Constant value, has to have a return in it, it's a getter. It's like a listener, listening to the state. It gets the state.
      cars() {
      return this.store.state.cars;
  */,


  methods: {
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
  }, /* Functions and functionality that make the component work
  */

};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>