<template>
  <div class="">
    <h1 class="">CYBERPUNK VIEW</h1>
    <p>You are {{ player.firstName }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Cyberpunk",
  data() {
    return {
        player: this.$store.state.player,
    }
  },

  mounted() {
      this.$store.dispatch("getPlayer", this.$store.state.hackerName)
  }
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>