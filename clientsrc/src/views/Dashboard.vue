<template>
  <div class="Dashboard container-fluid">
    <router-view />
  </div>
</template>


<script>
export default {
  name: "Dashboard",
  async mounted() {
    // this.$store.dispatch("getProfile", this.$auth.user);

  },
  methods: {
    // getTokens(tokens) {
    //   this.$store.dispatch("setSpotifyHostTokens", tokens);
    //   this.$store.dispatch("saveSpotifyHostTokens", tokens);
    //   this.$router.push({
    //     name: "SessionCreate",
    //   });
    // },
  },
};
</script>


<style scoped>
</style>