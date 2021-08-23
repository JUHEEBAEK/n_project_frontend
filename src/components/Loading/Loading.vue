<template>
  <v-dialog v-model="loading" fullscreen>
    <v-container fluid fill-height class="loading">
      <v-layout justify-center align-center>
        <img v-if="isBall" src="@/assets/images/animation/apng_loader-ball.png" class="img" />
        <v-progress-circular v-else indeterminate color="white" />
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isBall: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped src="@/assets/scss/components/loading.scss" />
