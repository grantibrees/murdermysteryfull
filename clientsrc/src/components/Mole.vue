<template>
  <div class="">
    <h1 class="">MOLE VIEW</h1>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Text from "../rawdata/text.json";

export default {
  name: "Mole",
  data () {
    return {
      text: Text.moleText,
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