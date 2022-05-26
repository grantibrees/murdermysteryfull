<template>
  <div :class="dimensionsClass">

    <!-- <b-dropdown-item v-for="player in getPlayersArray" @click="confirmPopUp(player.hackerName)" :key="player.id">{{ player.hackerName }}</b-dropdown-item> -->
    <b-dropdown-item @click="confirmPopUp(playerData.hackerName)" :key="playerData.id">{{ playerData.hackerName }}</b-dropdown-item>

  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "DropDown",

  data () {
    return {
      dimensionsClass: 'rm-my',
    }
  },

  computed: {
    getPlayersArray() {
      return this.$store.state.allPlayers
    }
  },

  methods: {
    confirmPopUp(hackerName) {
      Swal.fire({
        title: hackerName,
        text: 'r U suR3 7h12 12 U?',
        showCancelButton: true,
        confirmButtonText: 'y35, 1 4m very $m4rt',
        cancelButtonText: 'H4H4H4H4H44H4',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'GOOD, ON TO THE NEXT STAGE OF THE GAME',
            showConfirmButton: false,
            timer: 3000
            }).then(() => {
              this.$store.dispatch("setPlayer", hackerName);
              this.$router.push({ name: "Display" });
            })
        } else if (result.isDismissed) {
          Swal.fire({
            title: 'FUCKIN REALLY?',
            text: 'YOU SUCK, TRY AGAIN',
            showConfirmButton: false,
            timer: 4500
            })
        }
      })
    }
  },
  props: ["playerData"]
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>