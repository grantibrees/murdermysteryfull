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
    this.routerPush();
  },
  methods: {
    routerPush() {
      this.$router.push({
        name: "Welcome",
      });
    },
  },
};
</script>


<style scoped>
</style>