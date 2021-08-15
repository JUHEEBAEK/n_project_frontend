<template>
  <div>
    <core-app-bar
      v-if="!fullScreen"
      :leftDrawer="leftDrawer"
      :setLeftDrawer="setLeftDrawer"
      :userInfo="userInfo"
      :signOut="signOut"
    />
    <core-navigation
      v-if="!fullScreen"
      :leftDrawer="leftDrawer"
      :setLeftDrawer="setLeftDrawer"
      :leftMenus="leftMenus"
      :updateMenu="updateMenu"
    />
    <core-view :fullScreen="fullScreen" :leftDrawer="leftDrawer" />
    <core-footer
      v-if="!fullScreen"
      :footerMenus="footerMenus"
      :updateMenu="updateMenu"
    />
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import Navigation from "./Navigation.vue";
import View from "./View.vue";
import Footer from "./Footer.vue";

// import { rootProps } from "./props";

export default {
  components: {
    "core-app-bar": Toolbar,
    "core-navigation": Navigation,
    "core-view": View,
    "core-footer": Footer
  },
  props: {
    // ...rootProps
  },
  data: () => ({
    fullScreen: false,
    leftDrawer: false
  }),
  watch: {
    leftDrawer(value) {
      console.log(value);
    }
  },
  methods: {
    setLeftDrawer(value) {
      this.leftDrawer = value;
    }
  }
};
</script>

<style></style>
