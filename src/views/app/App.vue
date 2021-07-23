<template>
  <v-app id="app">
    <core-Toolbar></core-Toolbar>
    <!-- <core-navigation v-if="!fullScreen"></core-navigation>
    <core-view></core-view> -->
    <!-- <layout-root
      :userInfo="userInfo"
      :userTeamInfo="userTeamInfo"
      :signOut="signOut"
      :currentMenu="currentMenu"
      :updateMenu="updateMenu"
      :manual="manual"
      :leftMenus="leftMenus"
    ></layout-root> -->
    <core-footer v-if="!fullScreen"></core-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { appProps } from "./props";

export default {
  name: "App",
  props: {
    ...appProps
  },
  computed: {
    ...mapGetters("global", {
      appLoad: "appLoad",
      isLogIn: "login",
      snackBar: "snackBar",
      currentMenu: "currentMenu",
      leftMenus: "leftMenus",
      footerMenus: "footerMenus"
    }),
    ...mapGetters("account", {
      userInfo: "info"
    })
  },
  created() {
    // this.beforeStartApplication();
  },
  methods: {
    ...mapActions("global", ["beforeStartApplication", "signOut", "signIn"]),
    ...mapActions(["updateMenu"]),
    ...mapActions("account")
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
