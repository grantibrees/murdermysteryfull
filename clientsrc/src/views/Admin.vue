<template>
  <div class="Admin container-fluid">
    <b-button @click="gameStart" variant="outline-primary">Start</b-button>
  </div>
</template>


<script>
export default {
  name: "Admin",

  data () {
    return {
      // currentRoundNumber: getCurrentRound,
      // currentPhaseNumber: getCurrentPhaseNumber
    }
  },

  mounted() {
    this.$store.dispatch("joinRoom", "murder");
  },

  computed: {
    // getCurrentRound() {
    //   return this.$store.state.currentRoundNumber
    // },
    // getCurrentPhaseNumber() {
    //   return this.$store.state.currentPhaseNumber
    // }

  },

  methods: {
    gameStart(){
      this.$store.dispatch("gameStart", {
        room: "murder"
      })
    }
  },
};
</script>


<style scoped>
  .success {
    variant: "success"
  }
  
</style>