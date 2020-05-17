import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  store
} from "./store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./components";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";
import VueMoment from "./plugins/moment";

Vue.config.productionTip = false;
Vue.use(VueMoment);
Vue.use(VueCookies);
Vue.prototype.$imgBaseUrl = "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/"

const ignoreWarnMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>.";
Vue.config.warnHandler = function (msg, vm, trace) {
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
  vuetify,
  async created() {
    // Cookie 에 저장되어 있는 JWT 가 있는 경우 && LocalStorage 가 존재하는 경우
    // LocalStorage 의 정보를 참고해서 Vuex 정보를 셋팅해준다.
    if (getToken()) {
      let payload = getTokenPayload(getToken());
      // payload 및 LocalStorage 에 필요한 항목들이 정상적으로 들어가 있는 경우
      if (
        payload.idfAdmin &&
        payload.email &&
        payload.name &&
        payload.authority &&
        payload.exp
      ) {
        store.commit("account/login");
      }
      // payload || LocalStorage 에 필요한 속성들이 없는 경우 : 변질되었다고 판단
      else {
        console.error(LOG, "payload || LocalStorage changed error");
      }
    }
    // 토큰 or localStorage 가 없는 경우
    else {
      console.error(LOG, "token || LocalStorage not exist error");
    }
  },
  render: h => h(App)
}).$mount("#app");