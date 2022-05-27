<template>
  <div class="">
    <h1 class="">CYBERPUNK VIEW</h1>
    <p>Hello {{ firstName }}</p>
    <p>{{ textArray[page] }}</p>
    <b-button @click="regressDialogue">Back</b-button> 
    <b-button @click="advanceDialogue">Forward</b-button> 
  </div>
</template>

<script>
import Swal from "sweetalert2";
import text from "../rawdata/text.json";

export default {
  name: "Cyberpunk",

  data () {
    return {
      page: 0,
      textArray: text.cyberpunkText,
    }
  },

  methods: {
    regressDialogue() {
      if (this.page > 0) {
        this.page--;
      }
    },

    advanceDialogue() {
      if (this.page < (text.cyberpunkText).length - 1) {
        this.page++;
      } else {
        Swal.fire({
          title: 'You reached the end',
          text: 'r U DONE?',
          showCancelButton: true,
          confirmButtonText: 'y35, 1 can read',
          cancelButtonText: 'wait, I think I missed something',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'GOOD',
              showConfirmButton: false,
              timer: 3000
            }).then(() => {
              //this.$store.dispatch("getPlayer", hackerName);
              //this.$router.push({ name: "Display" });
            })
          } else if (result.isDismissed) {
            Swal.fire({
              title: 'OKK THINK ABOUT IT FOR A LITTLE THEN',
              showConfirmButton: false,
              timer: 4500
            }).then(() => {this.page = 0})
          }
        })       
      }
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