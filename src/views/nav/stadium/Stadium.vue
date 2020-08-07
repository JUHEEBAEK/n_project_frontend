<template>
  <div>
    <stadium-toolbar />
    <v-row>
      <v-col cols="9" sm="12" md="10" lg="9" xl="9">
        <stadium-map :selectedStadiumIndex="selectedStadiumIndex" />
      </v-col>
      <v-col cols="3" sm="12" md="2" lg="3" xl="3">
        <div class="scrollable">
          <stadium-cardList @selectStadium="handleSelect" />
        </div>
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
      this.selectedStadiumIndex = index;
    }
  }
};
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  max-height: 100vh;
}
</style>
