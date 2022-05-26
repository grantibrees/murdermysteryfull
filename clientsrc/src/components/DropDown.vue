<template>
  <div :class="dimensionsClass">
    <h1 class="">W3LC0M3 B4CK</h1>
    <b-dropdown id="dropdown-1" text="WH0 AR3 Y0U?" class="m-md-2">
    <b-dropdown-item @click="confirmPopUp(player.hackerName)" v-for="player in players" :key="player.id">{{ player.hackerName }}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "DropDown",

  data () {
    return {
      dimensionsClass: 'rm-my'
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
            showConfirmButton: false
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

  props: ["players"]
};
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>