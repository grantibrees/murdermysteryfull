<template>
  <div class="display container-fluid">
    <h1>TV VIEW</h1>
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
      sortMethod: false
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
    }

  },

  method: {
      sortIdentityList() {
        let array = this.$store.state.gameData.identitiesList;
        if (array >= 1) {
          let sorted = array.sort(
            (a, b) => b.totalVoteCount - a.totalVoteCount
        );
          console.log("SORTED", sorted)
          return sorted;
        } else {
          return array;
        }
      }
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