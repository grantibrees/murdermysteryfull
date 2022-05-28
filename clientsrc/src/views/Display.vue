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
      <h2>VOTING TIM3</h2>
      <p>You have this many votes to spend: {{ getTotalVotes }} </p>
      <b-dropdown id="dropdown-1" text="WH0 DO YOU VOTE FOR?" class="m-md-2">
        <votingDropDown v-for="identity in getIdentitiesList"
          :identitiesList="getIdentitiesList"
          :identityName="identity.identityName"
          :playerObj="getPlayerObj"
          :totalVotes="getTotalVotes"
          :key="identity.identityName"
        />
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import cyberPunk from "../components/Cyberpunk.vue";
import mole from "../components/Mole.vue";
import trivia from "../components/Trivia.vue";
import votingDropDown from "../components/VotingDropDown.vue";

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
      return this.$store.state.currentRoundData.phase1;
    },

    getPlayersArray() {
      return this.$store.state.allPlayers
    },

    getIdentitiesList() {
      return this.$store.state.gameData.identitiesList;
    },
    getPlayerObj() {
      return this.$store.state.player;
    },
    getTotalVotes() {
      for (let i = 0; i < this.$store.state.gameData.playersDisplayList.length; i++) {
        console.log("DEFINED?", this.$store.state.gameData.playersDisplayList[i].firstName)
        console.log("FIRSTNAME", this.$store.state.gameData.playersDisplayList[i].roundEarnedVotes)
        if (this.$store.state.player.firstName == this.$store.state.gameData.playersDisplayList[i].firstName) {
          return this.$store.state.gameData.playersDisplayList[i].roundEarnedVotes;
        }
      }
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
    votingDropDown,
  },
};
</script>


<style scoped>
</style>