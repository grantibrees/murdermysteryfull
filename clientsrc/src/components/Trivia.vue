<template>
  <div class="">
    <h1>Trivia</h1>
        <p>{{ phase1Data.questions[question].category }}</p>
        <p>{{ phase1Data.qestions[question].question }}</p>
        <b-button @click="confirmPopUp(i)" 
        v-for="i in randomizeTriviaAnswers(phase1Data.questions[question].correct_answer, phase1Data.questions[question].incorrect_answers)" 
        :key="i" >
        {{ i }}
        </b-button>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Trivia",

  data () {
    return {
      question: 0
    }
  },

  computed: {
  },

  methods: {
    randomizeTriviaAnswers(correctAnswer, incorrectAnswer) {
      let array = [...incorrectAnswer, correctAnswer];
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    },
    confirmPopUp(triviaChoice) {
      Swal.fire({
        title: triviaChoice,
        text: "Is this your final answer?",
        showCancelButton: true,
        confirmButtonText: "y35, 1 4m very $m4rt",
        cancelButtonText: "NAH I WANT TO PICK ANOTHER",
      }).then((result) => {
        if (result.isConfirmed) {
            this.$store.commit("updateRoundQcount")
          if (this.phase1Data.questions[this.question].correct_answer == triviaChoice) {
            // socket player state
            this.$store.commit("updateRoundQright")
            Swal.fire({
              icon: "success",
              title: "Correct!",
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: "error",
              title: "Incorrect",
              showConfirmButton: false,
              timer: 1500
            })
            this.$store.commit("updateRoundQwrong")
          }
          // check if last question in the array
          if (this.question < this.phase1Data.questions.length - 1) {
            this.question++;
          } else {
            Swal.fire({
              title: "Wow, that was a lot of questions and you reached the end... huh",
              text: "Good Job?",
              showConfirmButton: false
            })
          }
          // check if answer is correct
        } else if (result.isDismissed) {
          return
        }
      });
    },
     
  },

  props: ["phase1Data"]
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>