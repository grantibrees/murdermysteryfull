<template>
  <div class="">
    <b-dropdown-item @click="confirmPopUp(identityName, totalVotes)" >
      {{ identityName }}
    </b-dropdown-item >
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "VotingDropDown",

  data() {
    return {
    }
  },

  computed: {
  },

  methods: {
    confirmPopUp(identityName, totalVotes) {
      Swal.fire({
        title: identityName,
        text: "r U suR3 7h12 12 WH0 U WANT TO VOTE FOR",
        showCancelButton: true,
        confirmButtonText: "y35",
        cancelButtonText: "N0",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.commit("updateVoteCount", { identityName, totalVotes })
          Swal.fire({
            title: "OK, LOOK AT THE ANCIENT TELEVISION",
            showConfirmButton: true,
          }).then(() => {
            //this.$store.dispatch("getPlayer", hackerName);
          });
        } else if (result.isDismissed) {
          Swal.fire({
            title: "OK",
            text: "Hurry, we don't have all day",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  },

  props: ["identityName", "identityList", "playerObj", "totalVotes"]
}
</script>

<style scoped>
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>