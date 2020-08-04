<template>
  <div>
    <stadium-toolbar />
    <v-row>
      <v-col cols="6">
        <div class="scrollable">
          <stadium-cardList />
        </div>
      </v-col>
      <v-col cols="6">
        <stadium-map />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "stadiumList",
  data: () => ({
    title: "STADIUM",
    scrollInvoked: 0
  }),
  methods: {
    onScroll() {
      this.scrollInvoked++;
    }
  }
};
</script>

<style scoped>
.scrollable {
  overflow: auto;
  max-height: 100vh;
}
</style>
