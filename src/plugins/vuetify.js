import Vue from "vue";
import Vuetify from "vuetify/lib";
import theme from "./theme";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vuetify);

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "fa"
  },
  theme
};

export default new Vuetify(opts);
