<template>
  <div class="display container-fluid">
    <h1>TV VIEW</h1>
    <vac v-if="phase1Timer" :end-time="new Date().getTime() + getTimer(1)">
      <span
        slot="process"
        slot-scope="{ timeObj }">{{ `Time Left: ${timeObj.m}:${timeObj.s}` }}</span>
      <span slot="finish">Done!</span>
    </vac>
    <vac v-if="phase2Timer" :end-time="new Date().getTime() + getTimer(2)">
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
      phase1Timer: false,
      phase2Timer: false,
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

    getPhase1Timer() {
      return this.$store.state.currentRoundData.phase1Data.timer ? this.phase1Timer = true : this.phase1Timer = false;
    },

    getPhase2Timer() {
      return this.$store.state.currentRoundData.phase2Data.timer ? this.phase2Timer = true : this.phase2Timer = false;
    },

    getTimer(phase) {
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