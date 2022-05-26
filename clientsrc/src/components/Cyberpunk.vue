<template>
  <div class="">
    <h1 class="">CYBERPUNK VIEW</h1>
    <p>You are {{ firstName }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Cyberpunk",

  props: ["firstName"]
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>