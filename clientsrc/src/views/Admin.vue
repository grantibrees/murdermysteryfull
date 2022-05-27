<template>
  <div class="Admin container-fluid">
    <div>
      <b-button v-if="stateUpdate == ''" @click="gameStart" variant="outline-primary">Start</b-button>
    </div>
    <div>
      <b-button @click="gameStart" variant="outline-primary">Round</b-button>
    </div>
    <div>
      <b-button @click="gameStart" variant="outline-primary">Phase</b-button>
    </div>
  </div>
</template>


<script>
export default {
  name: "Admin",

  data() {
    return {
      // currentRoundNumber: getCurrentRound,
      // currentPhaseNumber: getCurrentPhaseNumber
    };
  },

  mounted() {
    this.$store.dispatch("joinRoom", "murder");
    this.$store.dispatch("setHackerNameCookie", "admin");
  },

  computed: {
    stateUpdate() {
      return this.$store.state.stateUpdate
      },
  },

  methods: {
    gameStart() {
      this.$store.dispatch("gameStart", {
        room: "murder",
      });
    },
  },
};
</script>


<style scoped>
.success {
  variant: "success";
}
</style>