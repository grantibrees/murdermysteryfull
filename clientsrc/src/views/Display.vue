<template v-for="player in getPlayersArray">
  <div class="display container-fluid">
    <h1>DISPLAY VIEW</h1>
    <dropDown v-if="isMole" 
      :playerData="player"
      :key="player.id"
    />
    <mole v-if="isMole" />
    <cyberPunk v-else :firstName="getFirstName" />
  </div>
</template>

<script>
import cyberPunk from "../components/Cyberpunk.vue";
import mole from "../components/Mole.vue";
import dropDown from "../components/DropDown.vue";

export default {
  name: "Display",

  computed: {
    isMole() {
      return this.$store.state.player.mole
    },

    getFirstName() {
      return this.$store.state.player.firstName
    },

    getPlayersArray() {
      return this.$store.state.allPlayers
    },

    getCurrentPhase() {
      return this.$store.state.game.currentRoundNumber
    },

    getCurrentRound() {
      return this.$store.state.game.currentPhaseNumber

    },

    getTimer() {
      if (this.getCurrentPhase === 1) {
        return this.$store.state.round.phase1.timer
      } else if (this.getCurrentPhase === 2) {
        return this.$store.state.round.phase2.timer
      } else if (this.getCurrentPhase === 3) {
        return this.$store.state.round.phase3.timer
      } else {
        return 0
      }
    }

  },

  components: {
      cyberPunk,
      mole
  }
};
</script>


<style scoped>
</style>