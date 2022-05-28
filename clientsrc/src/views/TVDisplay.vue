<template>
  <div class="display container-fluid">
    <h1>TV VIEW</h1>
    <vac :end-time="new Date().getTime() + getTimer">
      <span
        slot="process"
        slot-scope="{ timeObj }">{{ `Time Left: ${timeObj.m}:${timeObj.s}` }}</span>
      <span slot="finish">Done!</span>
    </vac>
    <grid 
    :playersDisplayList="getPlayersDisplayList"
    :identitiesList="getIdentitiesList"
    />
  </div>
</template>
<script>
import grid from '../components/Grid.vue';

export default {
  name: "TVDisplay",
  data() {
    return {
      identities: [],
    };
  },

  computed: {
    getPhase2() {
      return this.$store.state.currentRoundData.phase2;
    },

    getIdentitiesList() {
      return this.$store.state.gameData.identitiesList;
    },

    getPlayersDisplayList() {
      return this.$store.state.gameData.playersDisplayList;
    },
    getTimer() {
      let phase = this.$store.state.gameData.currentPhaseNumber;
      let time1 = this.$store.state.currentRoundData.phase1.timer;
      let time2 = this.$store.state.currentRoundData.phase2.timer;
      console.log("WORKS", phase, time1, time2)
      if (phase == 1) {
        return this.$store.state.currentRoundData.phase1.timer;
      } else if (phase == 2) {
        return this.$store.state.currentRoundData.phase2.timer;       
      } else {
        return this.timer = 0;
      }
    },
  },

  components: {
    grid
  }
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>