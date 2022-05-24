import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'
import "sweetalert2/dist/sweetalert2.min.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make bootstrap avaiable throughout the project
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  }
}).$mount("#app");