<template>
  <div class="SessionJoin font-site full-height bg-warning container-fluid">
    <div class="row justify-content-center p-push">
      <div class="col-12 pt-5">
        <div class="form-group pt-5">
          <input
            v-on:keyup.enter="joinSessionVisitor"
            v-model="sessionCode"
            type="text"
            class="form-control"
          />
          <small id="helpId" class="form-text text-muted">Enter Session Code:</small>
          <div class="border-pill-wrap col-sm-12 col-md-6 mt-4">
            <button class="btn btn-pill btn-block" @click="joinSessionVisitor">Join</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import utils from "../../utils.js";
export default {
  name: "SessionJoin",
  data() {
    return {
      sessionCode: "",
    };
  },
  mounted() {},
  computed: {},
  methods: {
    joinSessionVisitor() {
      console.log(this.sessionCode.toUpperCase());
      this.$store.dispatch(
        "joinSessionVisitor",
        this.sessionCode.toUpperCase()
      );
    },
  },
  components: {},
};
</script>


<style scoped>
.full-height {
  min-height: 100vh;
}

.btn-pill {
  background-color: var(--warning);
}
.btn-pill:hover {
  color: var(--info);
}

.p-push {
  padding-top: 12em;
}
</style>