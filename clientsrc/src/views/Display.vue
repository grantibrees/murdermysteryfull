<template>
  <div class="display container-fluid">
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
      return this.$store.state.mole
    },

    getFirstName() {
      return this.$store.state.firstName
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