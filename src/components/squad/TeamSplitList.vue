<template>
  <v-card class="py-2">
    <v-card-title>팀 나누기 목록</v-card-title>
    <v-card-text>
      <v-select v-model="temaSplitSelcted" :items="teamSplitList" />
      <v-btn dark color="blue" @click="makeNewSplitTeam" outlined large>새로운 팀 나누기 </v-btn>
      <v-btn dark color="red" outlined large>선택한 팀 나누기 삭제</v-btn>
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
    ...squadMutations(["MAKE_NEW_TEAM_SPLIT"]),
    ...calendarMutations(["INITIALIZE_ATTEND_MEMBER"]),
    makeNewSplitTeam(){
      this.MAKE_NEW_TEAM_SPLIT()
      this.INITIALIZE_ATTEND_MEMBER()
    },
    }
  },
  
};
</script>

<style>
</style>
