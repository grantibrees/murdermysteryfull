<template>
  <div class="">
    <h1 class="">CYBERPUNK VIEW</h1>
    <p>You are {{ playerData.firstName }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Cyberpunk",

  props: ["playerData"]
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>