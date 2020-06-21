<template>
  <v-container class="team__container">
    <v-row justify="center">
      <v-col cols="12">
        <h2>팀 소개</h2>
      </v-col>
      <v-col cols="12">
        <h4>2016.09.18 창단한 FS눈누난나</h4>
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" class="align-content-center">
        <div class="subheading">엠블럼</div>
        <v-img aspect-ratio="1" contain :src="$imgBaseUrl + emblem"></v-img>
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6">
        <div class="subheading">유니폼</div>
        <v-img aspect-ratio="1" contain :src="$imgBaseUrl + uniform"></v-img>
      </v-col>
      <v-col cols="12"></v-col>
      <v-col cols="12"></v-col>
      <v-col cols="12"></v-col>
      <v-col cols="12"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    emblem: "fsnnnn_emblem_official2.png",
    uniform: "fsnnnn_uniform.jpg"
  })
};
</script>

<style lang="scss">
.team__container {
  padding: 0;
}
</style>