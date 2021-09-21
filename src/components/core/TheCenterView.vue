<template>
  <v-main class="main__container">
    <router-view class="main__router-view"></router-view>
  </v-main>
</template>

<script>
import { mainProps } from "./props";
export default {
  props: {
    ...mainProps
  }
};
</script>

<style scoped lang="scss" src="@/assets/scss/components/core/view.scss"></style>
