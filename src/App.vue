<template>
  <v-app id="App">
    <core-root
      :userInfo="userInfo"
      :currentMenu="currentMenu"
      :updateMenu="updateMenu"
      :leftMenus="leftMenus"
      :footerMenus="footerMenus"
      :signOut="signOut"
    ></core-root>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
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
      userInfo: "userInfo"
    })
  },
  created() {
    // this.beforeStartApplication();
  },
  methods: {
    ...mapActions("global", ["beforeStartApplication", "signOut", "signIn"]),
    ...mapActions(["updateMenu"])
    // ...mapActions("account")
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
