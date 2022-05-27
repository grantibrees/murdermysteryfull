<template>
  <div class="">
    <h1 class="">SYMPATHIST VIEW</h1>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Text from "../rawdata/text.json";

export default {
  name: "Sympathist",
  data () {
    return {
      text: Text.sympathistText,
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