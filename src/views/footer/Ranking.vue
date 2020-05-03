<template>
  <div>
    <core-Toolbar></core-Toolbar>
    <core-navigation></core-navigation>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">BASiL</h1>
      </v-card-title>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          v-for="(item, index) in tabItems"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(item, index) in tabItems"
          :key="index"
        >
          <v-card
            color="basil"
            flat
          >
            <ranking-table
              :tableData="rankingData[item]"
            ></ranking-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex";
const { mapState: rankingMapState ,mapActions: rankingMapActions } = createNamespacedHelpers("ranking");

export default {
  name: "TesmSetting",
  data(){
    return {
      tab: null,
      tabItems: [
        'GOAL', 'ASSIGN', 'CLEAN SHEET',
      ],
      
    }
  },
  computed: {
    ...rankingMapState(["rankingData"])
    
  },

};
</script>

<style scoped></style>
