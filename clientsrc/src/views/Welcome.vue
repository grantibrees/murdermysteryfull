<template>
  <div class="Welcome container-fluid">
    <h1 class="">W3LC0M3 B4CK</h1>
    <b-dropdown id="dropdown-1" text="WH0 AR3 Y0U?" class="m-md-2">
    <dropDown v-for="player in getPlayersArray"
      :playerData="player"
      :key="player.id"
    />
    </b-dropdown>
  </div>
</template>


<script>
import dropDown from "../components/DropDown";

export default {
  name: "Welcome",

  computed: {
    getPlayersArray() {
      return this.$store.state.allPlayers
    }
  },

  mounted() {
    this.$store.dispatch("getAllPlayers");
    this.$store.dispatch("joinRoom", "murder");
  },
  async beforeCreate(){
    this.$store.dispatch("checkForPlayer")
  },

  components: {
      dropDown
  }
};
</script>


<style scoped>
</style>