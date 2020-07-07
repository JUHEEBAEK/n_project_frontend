<template>
  <v-app-bar flat color="white">
    <v-tool-bar-title class="stadium__count grey--text"></v-tool-bar-title>
    <v-spacer />
    <v-text-field
      v-model="search"
      hide-details
      :loading="isLoading"
      placeholder="경기장명으로 검색"
      prepend-icon="fas fa-search"
      single-line
    />
    <v-btn class="mx-2" fab dark small color="primary" @click="moveAddPage()">
      <v-icon dark>fas fa-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    model: null,
    search: null,
    isLoading: false
  }),
  watch: {
    search(val) {
      this.searchList(val);
    }
  },
  methods: {
    moveAddPage() {
      this.$router.push({
        name: "stadiumAdd"
      });
    }
  }
};
</script>

<style></style>
