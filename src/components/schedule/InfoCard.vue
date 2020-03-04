<template>
  <v-card :loading="cardInfoLoading" class="mx-auto">
    <v-card-title class="schedule__title">{{ scheduleName }}</v-card-title>
    <v-card-text>
      <div class="my-3 subtitle-1 schedule__time">{{ scheduleStart }} - {{ scheduleEnd }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text class="schedule__stadium">{{ scheduleStadium }}</v-card-text>
    <v-card-text class="grey--text">{{ scheduleAddress }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    cardInfoLoading: {
      type: Boolean,
      default: false
    },
    scheduleName: {
      type: String,
      default: null
    },
    scheduleStart: {
      type: String,
      default: null
    },
    scheduleEnd: {
      type: String,
      default: null
    },
    scheduleStadium: {
      type: String,
      default: null
    },
    scheduleAddress: {
      type: String,
      default: null
    }
  }
};
</script>

<style>
</style>