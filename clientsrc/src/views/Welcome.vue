<template>
  <div class="Welcome container-fluid">
    <dropDown :players="players"/>
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

  components: {
      dropDown
  }
};
</script>


<style scoped>
</style>