<template>
  <v-card class="py-2">
    <v-card-title>팀 나누기 목록</v-card-title>
    <v-card-text>
      <v-select v-model="temaSplitSelcted" :items="teamSplitList" />
      <v-btn dark color="blue" @click="INITIALIZE_ATTEND_MEMBER" outlined large> 초기화 </v-btn>
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
    ...squadState(["teamSplitList", "temaSplitSelcted"]),
  },
  methods: {
    ...calendarMutations(["INITIALIZE_ATTEND_MEMBER"]),
  },
  
};
</script>

<style>
</style>
