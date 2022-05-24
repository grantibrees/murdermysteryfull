import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'
import { domain, clientId, audience } from "./authConfig";
import "sweetalert2/dist/sweetalert2.min.css";


new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  }
}).$mount("#app");