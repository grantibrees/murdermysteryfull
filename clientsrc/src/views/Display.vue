<template>
  <div class="textdisplay container-fluid">
  </div>
</template>


<script>
import dropDown from "../components/DropDown";
import json from "../../../server/utilities/RawPlayerDataTest.json";

export default {
  name: "Welcome",
  data() {
    return {
      players: json.players,
    };
  },

  mounted() {
    console.log("BALLS");
  },

  components: {
      dropDown
  }
};
</script>


<style scoped>
</style>