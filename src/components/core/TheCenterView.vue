<template>
  <v-main>
    <router-view :class="`main__router-view ${routerClass}`"></router-view>
  </v-main>
</template>

<script>
import { mainProps } from "./props";
export default {
  props: {
    ...mainProps
  },
  computed: {
    routerClass() {
      return this.$route.meta.fullScreen ? "" : `main__router-view-${this.leftDrawer ? "leftOpen" : "leftClose"}`;
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/scss/components/core/view.scss"></style>
