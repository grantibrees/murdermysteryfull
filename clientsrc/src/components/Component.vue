<template>
  <div class="">
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "FileName" /*  */,
  data() {
    /* Data binding. */
    return {
      // currentState: {},
    };
  },

  watch: {
    // playing: function () {
    //   this.playpause();
    // },
  },
  mounted() {
  } /* Runs functions on startup */,

  computed: {
    // activeSession() {
    //   return this.$store.state.activeSession;
    },
    // playing() {
    //   return this.$store.state.playing;
    // },
   /* Pulls values from the store. Always the value of the method that's in it. The live value. Constant value, has to have a return in it, it's a getter. It's like a listener, listening to the state. It gets the state.
      cars() {
      return this.store.state.cars;
  */
  async mounted() {
    // await this.initiatePlayer();
  },
  methods: {

    // play() {
    //   this.$store.dispatch("playCurrentSong");
    // },
    // playpause() {
    //   this.spotifySDK.togglePlay().then(() => {
    //     console.log("Toggled playback!");
    //   });
    // },

  },
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>