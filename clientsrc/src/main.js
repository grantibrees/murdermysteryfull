import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'
import { Auth0Plugin } from "@bcwdev/auth0-vue";
import { domain, clientId, audience } from "./authConfig";
import "sweetalert2/dist/sweetalert2.min.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make bootstrap avaiable throughout the project
Vue.use(BootstrapVue)

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  }
}).$mount("#app");