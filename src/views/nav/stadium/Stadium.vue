<template>
  <div>
    <stadium-toolbar />
    <v-row>
      <v-col cols="6">
        <div class="scrollable">
          <stadium-cardList @selectStadium="handleSelect" />
        </div>
      </v-col>
      <v-col cols="6">
        <stadium-map :selectedStadiumIndex="selectedStadiumIndex" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "stadiumList",
  data: () => ({
    title: "STADIUM",
    selectedStadiumIndex: null
  }),
  methods: {
    handleSelect(index) {
      console.log(index);
      this.selectedStadiumIndex = index;
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
