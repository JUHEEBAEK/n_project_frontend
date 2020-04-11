<template>
  <v-card class="py-2">
    <v-card-title>팀 나누기 목록</v-card-title>
    <v-card-text>
      <v-select v-model="temaSplitSelcted" :items="teamSplitList" />
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: squadState,
  mapMutations: squadMutations,
  mapActions: squadActions,
} = createNamespacedHelpers("squad");
const {
  mapMutations: calendarMutations,
} = createNamespacedHelpers("calendar");
export default {
  
  data: () => ({
  }),
  computed: {
    ...squadState(["teamSplitList"]),
    temaSplitSelcted:{
      get(){
        return  this.$store.state.squad.temaSplitSelcted
      },
      set(value){
        this.SET_TEAM_INDEX_CHANGED(value)
      }
    }
  },
  
  methods: {
    ...squadMutations(["SET_TEAM_INDEX_CHANGED"]),
  },
  
};
</script>

<style>
</style>
