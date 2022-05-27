<template>
  <div class="Admin container-fluid">
    <b-button variant="outline-primary">Start</b-button>
  </div>
</template>


<script>
export default {
  name: "Admin",

  data () {
    return {
      currentRoundNumber: getCurrentRound,
      currentPhaseNumber: getCurrentPhaseNumber
    }
  },

  mounted() {
  },

  computed: {
    getCurrentRound() {
      return this.$store.state.currentRoundNumber
    },
    getCurrentPhaseNumber() {
      return this.$store.state.currentPhaseNumber
    }

  },

  methods: {
    gameStart(){
      this.$store.dispatch("gameStart")
    }
  },
};
</script>


<style scoped>
  .success {
    variant: "success"
  }
  
</style>