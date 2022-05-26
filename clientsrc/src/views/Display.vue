<template>
  <div class="display container-fluid">
    <mole v-if="isMole" :playerData="getPlayersArray" />
    <cyberPunk v-else/>
  </div>
</template>


<script>
import cyberPunk from "../components/Cyberpunk.vue";
import mole from "../components/Mole.vue";

export default {
  name: "Display",
  data() {
    return {
      isMole: this.$store.state.mole
    };
  },

  mounted() {
    this.$store.dispatch("getPlayer")
  },

  computed: {
    getPlayersArray() {
      return this.$store.state.allPlayers
    },
    getCurrentHacker() {
      return this.$store.state.hackerIdentity
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