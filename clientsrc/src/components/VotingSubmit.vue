<template>
  <div class="votingSubmit">
    <p>You have this many votes to spend: {{ votingPower }} </p>
    <p>How many votes are you willing to spend?</p>
    <p>{{ votes }}</p>
    <b-button @click="decrement">-</b-button> 
    <b-button @click="increment">+</b-button> 
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "VotingSubmit",

  data() {
    return {
      votingPower: this.totalVotes,
      votes: 0
    }
  },

  // mounted() {
  //   this.votingPower = this.totalVotes;
  //   this.votes = 0;
  // },

  computed: {
    getTotalVotes() {
      for (let i = 0; i < this.$store.state.gameData.identitiesList; i++) {
        if (this.$store.state.gameData.identitiesList[i].identityName == this.identityName) {
          return this.$store.state.gameData.identitiesList[i].totalVoteCount;
        }
      }

    }
  },

  methods: {
    increment() {
      if (this.votingPower > 0) {
        this.votingPower--;
        this.votes++
      }
    },

    decrement() {
      if (this.votes > 0) {
        this.votingPower++;
        this.votes--;
      }
    },
  },
  props: ["totalVotes"]
}
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>