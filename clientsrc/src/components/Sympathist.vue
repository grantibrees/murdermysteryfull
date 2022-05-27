<template>
  <div class="">
    <h1 class="">SYMPATHIST VIEW</h1>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import text from "../rawdata/text.json";

export default {
  name: "Sympathist",
  data () {
    return {
      text: text.sympathistText,
    }
  },

};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>