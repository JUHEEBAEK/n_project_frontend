<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon @click.stop="onClickBtn" />
    <router-link to="/">
      <v-toolbar-title class="black--text">{{ title }}</v-toolbar-title>
    </router-link>
    <v-spacer />
  </v-app-bar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("common");

export default {
  name: "Toolbar.vue",
  data: () => ({
    title: "NunnuNanna"
  }),
  computed: {},
  watch: {},
  methods: {
    ...mapMutations(["setDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.common.drawer);
    }
  }
};
</script>

<style scoped>
.v-application a {
  color: #fff;
}
</style>
