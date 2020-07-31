<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="onClickBtn" />
      <router-link to="/">
        <v-toolbar-title class="black--text">{{ title }}</v-toolbar-title>
      </router-link>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations: commonMapMutations } = createNamespacedHelpers("common");

export default {
  name: "Toolbar.vue",
  data: () => ({
    title: "Home"
  }),
  computed: {},
  watch: {},
  methods: {
    ...commonMapMutations(["setDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.common.drawer);
    }
  }
};
</script>

<style scoped></style>
