<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon @click.stop="onClickBtn" />
    <router-link to="/">
      <v-toolbar-title class="black--text"> {{ title }} </v-toolbar-title>
    </router-link>
    <v-spacer />
  </v-app-bar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("layout");

export default {
  name: "Toolbar.vue",
  data: () => ({
    title: "NunnuNanna"
  }),
  computed: {},
  watch: {
    // searchText(text) {
    //   console.log(text)
    // }
  },
  methods: {
    ...mapMutations(["setDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.layout.drawer);
    }
  }
};
</script>

<style scoped>
.v-application a {
  color: #fff;
}
</style>
