<template>
  <div>
    <h1>BALLS</h1>
    <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
    <b-dropdown-item>First Action</b-dropdown-item>
    <b-dropdown-item>Second Action</b-dropdown-item>
    <b-dropdown-item>Third Action</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item active>Active action</b-dropdown-item>
    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "DropDown" /*  */,
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