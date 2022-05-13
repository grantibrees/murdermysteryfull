<template>
  <div class="SessionCreate font-site full-height bg-warning container-fluid">
    <div class="row p-push align-items-center">
      <div class="col-12">
        <div class="form-group">
          <div class="row px-5 py-3">
            <input
              v-model="newSessionName"
              type="text"
              placeholder="Please Enter a Session Name"
              class="form-control text-center rounded-pill"
            />
          </div>
          <div class="border-pill-wrap">
            <button @click="createSession" class="btn btn-block btn-pill p-3">
              <h2>Create Session</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import utils from "../../utils.js";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "SessionCreate",
  data() {
    return {
      newSessionName: "",
    };
  },
  async beforeMount() {
    // await this.auth();
  },
  computed: {},
  methods: {
    // async auth() {
    //   await this.$auth.loginWithPopup();
    //   // await onAuth();
    //   this.$store.dispatch("setBearer", this.$auth.bearer);
    //   this.$store.dispatch("getProfile", this.$auth.user);
    // },
    createSession() {
      this.$store.dispatch("createSession", {
        sessionName: this.newSessionName,
        sessionCode: utils.randomCode(),
        userEmail: this.$store.state.user.email,
      });
      this.newSessionName = "";
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

.container-fluid {
  margin: 0;
  padding: 0;
}
</style>