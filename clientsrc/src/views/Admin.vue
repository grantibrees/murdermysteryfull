<template>
  <div class="Admin container-fluid">
    <div>
      <b-button
        v-if="stateUpdate == ''"
        @click="gameStart"
        variant="outline-primary"
        >Start</b-button
      >
    </div>
    <div>
      <b-button @click="beginRound" variant="outline-primary"
        >Round Start</b-button
      >
      <h1>Round {{ currentRoundNumber }}</h1>
    </div>
    <div>
      <b-button @click="nextPhase" variant="outline-primary"
        >Phase Start</b-button
      >
      <h1>Phase {{ currentPhaseNumber }}</h1>
    </div>
  </div>
</template>


<script>
export default {
  name: "Admin",

  data() {
    return {
      gameData: {}
      // roundNumber: currentRoundNumber,
      // phaseNumber: currentPhaseNumber,
    };
  },

  mounted() {
    this.$store.dispatch("joinRoom", "murder");
    this.$store.dispatch("setHackerNameCookie", "admin");
  },

  computed: {
    stateUpdate() {
      return this.$store.state.stateUpdate;
    },
    currentRoundNumber() {
      return this.$store.state.gameData.currentRoundNumber;
    },
    currentPhaseNumber() {
      return this.$store.state.gameData.currentPhaseNumber;
    },
  },

  methods: {
    gameStart() {
      this.$store.dispatch("gameStart", {
        room: "murder",
      });
    },
    beginRound() {
      this.$store.dispatch("beginRound");
    },
    nextPhase() {
      this.$store.dispatch("nextPhase");
    },
  },
};
</script>


<style scoped>
.success {
  variant: "success";
}
</style>