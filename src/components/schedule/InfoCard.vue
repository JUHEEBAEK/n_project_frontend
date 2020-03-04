<template>
  <v-card :loading="loading" class="mx-auto">
    <v-card-title class="schedule__title">{{ scheduleInfo.name }}</v-card-title>
    <v-card-text>
      <div class="my-3 subtitle-1 schedule__time">{{ scheduleInfo.start }} - {{ scheduleInfo.end }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text class="schedule__stadium">{{ scheduleInfo.stadium }}</v-card-text>
    <v-card-text class="grey--text">{{ scheduleInfo.address }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  created() {
    console.log(this.scheduleInfo);
  },
  data: () => ({
    loading: false
  }),
  props: {
    scheduleInfo: {
      type: Object,
      default: null
    }
  }
};
</script>

<style>
</style>