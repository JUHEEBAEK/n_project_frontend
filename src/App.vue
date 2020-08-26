<template>
  <v-app id="app">
    <core-Toolbar v-if="!fullScreen"></core-Toolbar>
    <core-navigation v-if="!fullScreen"></core-navigation>
    <core-view></core-view>
    <core-footer v-if="!fullScreen"></core-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapGetters("common", {
      fullScreen: "fullScreen"
    })
  },
  created() {
    console.log("this");
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
