import Vue from "vue";
import Vuetify from "vuetify/lib";
import theme from "./theme";

Vue.use(Vuetify);

const opts = {
  theme
};

export default new Vuetify(opts);
