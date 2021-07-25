<template>
  <v-app id="app" class="app__container">
    <req-loading :loading="appLoad" :size="100" />
    <snack-bar :snackBar="snackBar" />
    <div style="display:flex; justify-content: center;">
      <authenticate v-if="!appLoad" :isAuthenticate="isLogIn">
        <template v-slot:login>
          <login :signIn="signIn"></login>
        </template>
        <template v-slot:root>
          <core-root
            :userInfo="userInfo"
            :signOut="signOut"
            :currentMenu="currentMenu"
            :updateMenu="updateMenu"
            :leftMenus="leftMenus"
            :footerMenus="footerMenus"
          />
        </template>
      </authenticate>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "@/components/loading";
import Authenticate from "@/components/authenticate";
import Login from "@/views/login/Login.vue";
import coreRoot from "@/components/core/Root.vue";
import SnackBar from "@/components/snackBar";

export default {
  name: "App",
  components: {
    authenticate: Authenticate,
    "req-loading": Loading,
    "snack-bar": SnackBar,
    "core-root": coreRoot,
    login: Login
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
      userInfo: "userInfo"
    })
  },
  created() {
    this.beforeStartApplication();
  },
  methods: {
    ...mapActions("global", ["beforeStartApplication", "signOut", "signIn"]),
    ...mapActions(["updateMenu"])
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
}
</style>
