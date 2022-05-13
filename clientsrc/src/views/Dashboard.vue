<template>
  <div class="Dashboard container-fluid">
    <router-view />
  </div>
</template>


<script>
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "Dashboard",
  async mounted() {
    let tokens = {
      accessToken: this.$route.query.accessToken,
      refreshToken: this.$route.query.refreshToken,
      expiresIn: this.$route.query.expiresIn,
    };
    await onAuth();
    this.$store.dispatch("setBearer", this.$auth.bearer);
    this.$store.dispatch("getProfile", this.$auth.user);
    this.getTokens(tokens);
  },
  methods: {
    getTokens(tokens) {
      this.$store.dispatch("setSpotifyHostTokens", tokens);
      this.$store.dispatch("saveSpotifyHostTokens", tokens);
      this.$router.push({
        name: "SessionCreate",
      });
    },
  },
};
</script>


<style scoped>
</style>