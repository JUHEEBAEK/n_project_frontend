import Vue from "vue";
import Vuetify from "vuetify/lib";
import Ripple from "vuetify/lib/directives/ripple";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import store from "@/store/index_refactoring";
import router from "./router";

import "./registerServiceWorker"; // ???
import "roboto-fontface/css/roboto/roboto-fontface.css"; // ???
import "@fortawesome/fontawesome-free/css/all.css"; // 추후에 fontawesome => mdi 갈아타기 vuetify 기본 이모티콘

import "./components"; // 나중에 지울꺼임.
import options from "./plugins/vuetify";
import VueMoment from "./plugins/moment";

import VueCookies from "vue-cookies";
import { isAuthorization } from "./mixins/auth";
import { getUserInfo } from "./common/user.js";

sync(store, router);

Vue.config.productionTip = false;
Vue.use(VueMoment);
Vue.use(VueCookies);

Vue.use(Vuetify, {
  directives: {
    Ripple
  }
});

Vue.prototype.$imgBaseUrl =
  "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/";

const ignoreWarnMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>.";
Vue.config.warnHandler = function(msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
};

new Vue({
  router,
  store,
  vuetify: new Vuetify(options),
  created() {
    if (isAuthorization()) {
      store.commit("account/SET_USER_INFO", getUserInfo());
    }
  },
  template: "<v-app><story/></v-app>",
  render: h => h(App)
}).$mount("#app");
