<template>
  <div class="bg-warning" id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  mounted() {
  },
  async beforeCreate() {
    // try {
    //   this.$store.dispatch("initializeSocket");
    // } catch (err) {
    //   console.log("the problem is in app");
    //   this.$router.push({ name: "home" });
    // }
  },
  components: {},
};
</script>


<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

#app {
  font-family: "Alata", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  background-image: linear-gradient(to bottom left, black, black);
  opacity: 0;
}
</style>
