<template>
  <div class="display container-fluid">
    <mole v-if="isMole"/>
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

  components: {
      cyberPunk,
      mole
  }
};
</script>


<style scoped>
</style>