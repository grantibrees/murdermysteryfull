<template>
  <div class="">
    <h1 class="">MOLE VIEW</h1>
    <p>{{ text[0] }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import text from "../rawdata/text.json";

export default {
  name: "Mole",
  data () {
    return {
      text: text.moleText,
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