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
      <h1>Round {{ roundNumber }}</h1>
    </div>
    <div>
      <b-button @click="nextPhase" variant="outline-primary"
        >Phase Start</b-button
      >
      <h1>Phase {{ phaseNumber }}</h1>
    </div>
  </div>
</template>


<script>
export default {
  name: "Admin",

  data() {
    return {
      roundNumber: this.$store.state.game.currentRoundNumber,
      phaseNumber: this.$store.state.game.currentPhaseNumber,
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
      return this.$store.state.game.currentRoundNumber;
    },
    currentPhaseNumber() {
      return this.$store.state.game.currentPhaseNumber;
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
      this.$store.dispatch("nextPhase", this.roundNumber, this.phaseNumber);
    },
  },
};
</script>


<style scoped>
.success {
  variant: "success";
}
</style>