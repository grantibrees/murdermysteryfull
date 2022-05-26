<template>
  <div class="Welcome container-fluid">
    <dropDown :players="players"/>
  </div>
</template>


<script>
import dropDown from "../components/DropDown";
// update to pull list of players from back-end
import json from "../rawdata/rawPlayerDataTest.json";

export default {
  name: "Welcome",
  data() {
    return {
      players: json.players,
    };
  },
  
  mounted() {
    this.$store.dispatch("getAllPlayers");
  },

  components: {
      dropDown
  }
};
</script>


<style scoped>
</style>