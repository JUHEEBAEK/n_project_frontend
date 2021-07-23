<template>
  <div>
    <core-Toolbar
      v-if="!fullScreen"
      :leftDrawer="leftDrawer"
      :setLeftDrawer="setLeftDrawer"
      :userInfo="userInfo"
    ></core-Toolbar>
    <core-navigation
      v-if="!fullScreen"
      :leftDrawer="leftDrawer"
      :setLeftDrawer="setLeftDrawer"
      :leftMenus="leftMenus"
      :updateMenu="updateMenu"
    ></core-navigation>
    <core-view :fullScreen="fullScreen" :leftDrawer="leftDrawer"></core-view>
    <core-footer
      v-if="!fullScreen"
      :footerMenus="footerMenus"
      :updateMenu="updateMenu"
    ></core-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    fullScreen: false,
    leftDrawer: false
  }),
  computed: {
    ...mapGetters("global", {
      // appLoad: "appLoad",
      // isLogIn: "login",
      // snackBar: "snackBar",
      currentMenu: "currentMenu",
      leftMenus: "leftMenus",
      footerMenus: "footerMenus"
    }),
    ...mapGetters("account", {
      userInfo: "userInfo"
    })
  },
  watch: {
    leftDrawer(value) {
      console.log(value);
    }
  },
  methods: {
    ...mapActions(["updateMenu"]),
    setLeftDrawer(value) {
      this.leftDrawer = value;
    }
  }
};
</script>

<style></style>
