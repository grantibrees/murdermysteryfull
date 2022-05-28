<template>
  <div class="display container-fluid">
    <h1>DISPLAY VIEW</h1>
    <div v-if="stateUpdate == 'update'">
      <mole v-if="moleState" :firstName="getFirstName" />
      <cyberPunk v-else :firstName="getFirstName" />
    </div>
    <div v-if="stateUpdate == 'trivia'">
      <trivia :phase1="getPhase1" />
    </div>
    <div v-if="stateUpdate == 'voting'">
      <voting :phase2="getPhase2" />
    </div>
    <div v-if="stateUpdate == 'trivia'">
      <trivia />
    </div>

  </div>
</template>

<script>
import cyberPunk from "../components/Cyberpunk.vue";
import mole from "../components/Mole.vue";
import trivia from "../components/Trivia.vue";
import voting from "../components/Voting.vue";

export default {
  name: "Display",
  data() {
    return {
      isMole: false,
    };
  },
  methods:{
  },

  computed: {
    stateUpdate(){
      return this.$store.state.stateUpdate
    },
    
    moleState() {
      return this.$store.state.player.mole
        ? (this.isMole = true)
        : (this.isMole = false);
    },

    getFirstName() {
      return this.$store.state.player.firstName;
    },

    getPhase1() {
      return this.$store.state.round.phase1;
    },

    getPhase2() {
      return this.$store.state.round.phase2;
    }
  },

  async mounted() {
    this.$store.dispatch("checkForPlayer");
    this.$store.dispatch("joinRoom", "murder");
  },

  components: {
    cyberPunk,
    mole,
    trivia,
    voting
  },
};
</script>


<style scoped>
</style>