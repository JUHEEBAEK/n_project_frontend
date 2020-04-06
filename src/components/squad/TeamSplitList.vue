<template>
  <v-card class="py-2">
    <v-card-title>팀 나눔 목록</v-card-title>
    <v-card-text>
      <v-select v-model="temaSplitSelcted" :items="teamSplitList" />
      <v-btn dark color="red" outlined large>선택한 팀 목록 삭제</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    teamSplitList: [1, 2, 3, 4, 5],
    temaSplitSelcted: 1
  }),
  methods: {
    // 팀 Split이 몇개 있는지 받아야한다 props로 받는게 제일 좋을지도
    teamSplit_chnaged() {
      // 선택된 팀 index가 바뀌면
      // db에 있는지 확인하고 있으면 불러준다
      // 없으면 default를 세팅해준다
    }
  }
};
</script>

<style>
</style>
