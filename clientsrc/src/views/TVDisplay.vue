<template>
  <div class="display container-fluid">
    <h1>TV VIEW</h1>
  </div>
</template>
<script>

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
  actions: {

  },

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
      if (state && state != this.currentState) {
        this.play()
      } else (state.paused == false && state.position > 1000); {
        this.changingTrack = false;
      }
    },
    moveFoodItemToTracker() {
      this.$store.dispatch("moveFoodItemToTracker", { data: this.foodData, type: "common" })
    },
  }, /* Functions and functionality that make the component work. Commit and Dispatch here. 
  Commit sets things to the State, while Dispatch calls a function that contacts the server*/
  

   components: {}
    /* Pulls a components file as a child to reference. ÷*/,

  props: [
    "carData",
  ] /* More like a parameter than anything. Gets passed to a View. In the template in the View will look like :carData="car" or "carData="{keys: values} */,

  
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>