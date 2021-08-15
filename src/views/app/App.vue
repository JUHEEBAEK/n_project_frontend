<template>
  <v-app id="app" class="app__container">
    <req-loading :loading="$route.meta.requireAuth ? !isPropsAlready : isAuthorized" :size="100" />
    <snack-bar :snackBar="snackBar" />
    <template v-if="$route.meta.requireAuth">
      <the-app-bar v-bind="appbarProps" @setDrawer="setLeftDrawer" @signOut="signOut" @updateRouter="updateRouter" />
      <the-left-nav v-bind="leftNavProps" @setDrawer="setLeftDrawer" @updateRouter="updateRouter" />
      <the-layout-main v-bind="mainProps"></the-layout-main>
      <the-footer v-bind="footerProps" :footerMenus="footerMenus" @updateRouter="updateRouter" />
    </template>
    <template v-if="!$route.meta.reqireAuth && !isAuthorized">
      <router-view @signIn="signIn" />
    </template>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "@/components/loading";
import SnackBar from "@/components/snackBar";
import TheAppBar from "@/components/core/Toolbar.vue";
import TheLeftNav from "@/components/core/Navigation.vue";
import TheLayoutMain from "@/components/core/View.vue";
import TheFooter from "@/components/core/Footer.vue";

import { appBarProps, leftNavProps, mainProps, footerProps } from "@/components/core/props";

export default {
  name: "App",
  components: {
    "req-loading": Loading,
    "snack-bar": SnackBar,
    TheAppBar,
    TheLeftNav,
    TheLayoutMain,
    TheFooter
  },
  data() {
    return {
      fullscreen: false,
      leftDrawer: false,
      returnProps: {
        appbar: appBarProps,
        leftNav: leftNavProps,
        main: mainProps,
        footer: footerProps
      }
    };
  },
  computed: {
    ...mapGetters("global", {
      isAuthorized: "isAuthorized",
      snackBar: "snackBar",
      currentMenu: "currentMenu",
      leftMenus: "leftMenus",
      footerMenus: "footerMenus"
    }),
    ...mapGetters("account", {
      accountType: "accountType",
      userInfo: "userInfo"
    }),
    isPropsAlready() {
      return !!(this.appbarProps && this.leftNavProps && this.mainProps && this.footerProps);
    },
    appbarProps() {
      return this.bindProps("appbar");
    },
    leftNavProps() {
      return this.bindProps("leftNav");
    },
    mainProps() {
      return this.bindProps("main");
    },
    footerProps() {
      return this.bindProps("footer");
    }
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["updateRouter"]),
    ...mapActions("global", ["init", "signIn", "signOut"]),
    setPublicComp() {}, // 뭐지??
    bindProps(prop) {
      return Object.keys(this.returnProps[prop]).reduce((props, key) => {
        props[key] = this[key];
        return props;
      }, {});
    },
    setLeftDrawer(value) {
      this.leftDrawer = value;
    }
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
  height: 100%;
}
// 나중에 reset vuetify 빼기
.v-application--wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
