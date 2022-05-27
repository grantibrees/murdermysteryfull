<template>
  <div class="display container-fluid">
    <h1>DISPLAY VIEW</h1>
    <mole v-if="moleState" />
    <cyberPunk v-else :firstName="getFirstName" />
  </div>
</template>

<script>
import cyberPunk from "../components/Cyberpunk.vue";
import mole from "../components/Mole.vue";
import dropDown from "../components/DropDown.vue";

export default {
  name: "Display",
  data() {
    return{
      isMole: false
    }
  },

  computed: {
    moleState() {
      return ( this.$store.state.player.mole ? this.isMole = true : this.isMole = false)
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

  async mounted(){
    this.$store.dispatch("checkForPlayer")
    this.$store.dispatch("joinRoom", "murder");
  },

  components: {
      cyberPunk,
      mole
  }
};
</script>


<style scoped>
</style>