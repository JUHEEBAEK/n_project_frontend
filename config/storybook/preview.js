import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

// import { sync } from "vuex-router-sync";
import options from "@/plugins/vuetify";
// import store from "@/store/index_refactoring";
// import router from "@/router/index_refactoring";

Vue.use(Vuetify);

// const unsync = sync(store, router);

const vuetify = new Vuetify(options);

// THIS is my decorator
export const decorators = [
  (story, context) => {
    // wrap the passed component within the passed context
    const wrapped = story(context);
    // extend Vue to use Vuetify around the wrapped component
    return Vue.extend({
      vuetify,
      // store,
      // router,
      components: { wrapped },
      template: `
        <v-app>
          <v-container fluid>
            <wrapped />
          </v-container>
        </v-app>
      `
    });
  }
];
