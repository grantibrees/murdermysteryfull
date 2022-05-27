<template>
  <div class="">
    <h1 class="">CYBERPUNK VIEW</h1>
    <p>You are {{ firstName }}</p>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Text from "../rawdata/text.json";

export default {
  name: "Cyberpunk",

  data () {
    return {
      text: Text.cyberpunkText,
    }
  },

  props: ["firstName"]
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>