<template>
  <v-main>
    <v-container fluid fill-height class="main__container">
      <router-view v-if="!this.fullScreen" class="main__router-view" />
    </v-container>
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
