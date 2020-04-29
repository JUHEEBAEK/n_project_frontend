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
              :tableData="dataDict[item]"
            ></ranking-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TesmSetting",
  data(){
    return {
      tab: null,
      tabItems: [
        'GOAL', 'ASSIGN', 'CLEAN SHEET',
      ],
      dataDict: {
        'GOAL': [
          {
            name: 'Frozen Yogurt',
            score: 159,
          },
          {
            name: 'Ice cream sandwich',
            score: 237,
          },
          {
            name: 'Eclair',
            score: 262,
          },
        ], 
        'ASSIGN': [
          {
            name: '탕수육',
            score: 45,
          },
          {
            name: '치킨',
            score: 22,
          },
          {
            name: '피자',
            score: 11,
          },
        ], 
        'CLEAN SHEET': [
          {
            name: '상추',
            score: 11159,
          },
          {
            name: '배추',
            score: 3237,
          },
          {
            name: '김치',
            score: 1262,
          },
        ],
        
      }
    }
  }

};
</script>

<style scoped></style>
