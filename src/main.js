import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  store
} from "./store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
import moment from "moment";

import "./components";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

const ignoreWarnMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>.";
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");