<template>
  <div>
    <stadium-toolbar />
    <v-row>
      <v-col cols="12" md="9" lg="9" xl="9">
        <stadium-map
          :selected-stadium-index="selectedStadiumIndex"
          :show-stadium="true"
          :make-marker-with-click="false"
        />
      </v-col>
      <v-col cols="12" md="3" lg="3" xl="3">
        <stadium-cardList @selectStadium="handleSelect" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StadiumMap from "@/components/stadium/Map.vue";
import StadiumCardList from "@/components/stadium/CardList.vue";

export default {
  name: "StadiumList",
  components: { StadiumMap, StadiumCardList },
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

<style scoped></style>
