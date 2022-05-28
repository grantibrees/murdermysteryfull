<template>
  <div class="">
    <h1 class="">DA GRID</h1>
    <b-container fluid class="bv-example-row">
        <b-row>
            <b-col>Hacker Alias ("Real" Name)/Identity1/Identity2</b-col>
            <b-col>Identity 1</b-col>
            <b-col>Identity 2</b-col>
            <b-col>The Rounds You Passed</b-col>
            <b-col>The Round You Failed</b-col>
            <b-col>Voting Power</b-col>
        </b-row>
        <div class="w-100"></div>  
        <b-row v-for="player in playersDisplayList" :key="player.id">
            <b-col>{{ player.hackerName }} ({{ player.firstName }})</b-col>
            <b-col>{{ player.identity1 }}</b-col>
            <b-col>{{ player.identity2 }}</b-col>
            <b-col>{{ player.roundsWithPasses }}</b-col>
            <b-col>{{ player.roundsWithFails }}</b-col>
            <b-col>{{ player.roundEarnedVotes }}</b-col>
        </b-row>
    </b-container>

    <b-container class="bv-example-row-2">
        <b-row>
            <b-col>Identity</b-col>
            <b-col>Voting Total</b-col>
        </b-row>
        <div class="w-100"></div>  
        <b-row v-for="identity in sortIdentityList" :key="identity.id">
            <b-col>{{ identity.identityName }}</b-col>
            <b-col>{{ identity.totalVoteCount }}</b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Grid",

  data() {
    return {
      border: 'border',
    };
  },

  computed: {
      sortIdentityList() {
        if (this.identitiesList.length >= 1) {
            let sorted = this.identitiesList.sort(
            (a, b) => b.totalVoteCount - a.totalVoteCount
        );
        return sorted;
        } else {
        return this.identitiesList;
        }
      }
  },

  props: [
    "playersDisplayList",
    "identitiesList"
  ]
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
.border {
    box-shadow: -.5px -.5px 0 .5px rgb(0, 0, 0), inset -1px -1px 0 0 rgb(0, 0, 0);
}
</style>