<template>
  <v-main>
    <v-container fluid fill-height class="main__container">
      <router-view v-if="!this.fullScreen" class="main__router-view" />
    </v-container>
  </v-main>
</template>

<script>
export default {
  props: {
    leftDrawer: {
      type: Boolean,
      default: false,
      required: true
    },
    fullScreen: {
      type: Boolean,
      default: false,
      required: true
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/scss/components/core/view.scss"></style>
