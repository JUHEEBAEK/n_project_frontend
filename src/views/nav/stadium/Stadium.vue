<template>
  <div>
    <stadium-toolbar />
    <v-row>
      <v-col cols="12" md="9" lg="9" xl="9">
        <stadium-map :selectedStadiumIndex="selectedStadiumIndex" :showStadium="true" :makeMarkerWithClick="true"  v-model="markerPosition"/>
      </v-col>
      <v-col cols="12" md="3" lg="3" xl="3">
        <stadium-cardList @selectStadium="handleSelect"  />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "stadiumList",
  data: () => ({
    title: "STADIUM",
    selectedStadiumIndex: null,
    markerPosition:{
      latitude: 37.54393,
      longitude: 127.071252
    }
  }),
  methods: {
    handleSelect(index) {
      this.selectedStadiumIndex = index;
    }
  }
};
</script>

<style scoped></style>
