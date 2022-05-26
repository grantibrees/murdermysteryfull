<template>
  <div class="display container-fluid">
    <h1>DISPLAY VIEW</h1>
    <mole v-if="isMole" />
    <cyberPunk v-else :firstName="getFirstName" />
  </div>
</template>


<script>
import cyberPunk from "../components/Cyberpunk.vue";
import mole from "../components/Mole.vue";

export default {
  name: "Display",

  data() {
    return {
      isMole: this.isMole
    }
  },

  computed: {
    isMole() {
      return this.$store.state.player.mole
    },

    getFirstName() {
      return this.$store.state.player.firstName
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