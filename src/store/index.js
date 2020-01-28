import Vue from "vue";
import Vuex from "vuex";

const modules = {};

const requireModule = require.context("./modules", false, /\.js$/);
requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return;
  const moduleName = fileName.replace(/(\.\/|\.js)/gi, "");
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default
  };
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules
});
