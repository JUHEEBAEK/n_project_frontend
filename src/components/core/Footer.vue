<template>
  <v-bottom-navigation
    color="light-blue darken-4"
    v-model="bottomNav"
    height="72"
  >
    <v-btn v-for="item in items" :key="item.title" :to="item.to">
      <span>{{ item.title }}</span>
      <v-img :src="`${item.icon}`" class="footer__img" contain />
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "Footer.vue",

  data: () => ({
    bottomNav: "CALENDAR",
    items: [
      {
        title: "ATTEND",
        to: "/attend",
<<<<<<< HEAD
        icon: require("../../assets/linear/dark/calendar.png"),
=======
        icon:
          "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/046-calendar.png",
>>>>>>> develop
      },
      {
        title: "SQUAD",
        to: "/squadView",
<<<<<<< HEAD
        icon: require("../../assets/linear/dark/tshirt.png"),
=======
        icon:
          "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/003-tshirt.png",
>>>>>>> develop
      },
      {
        title: "REPORT",
        to: "",
<<<<<<< HEAD
        icon: require("../../assets/linear/dark/scoreboard.png"),
=======
        icon:
          "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/037-scoreboard.png",
>>>>>>> develop
      },
      {
        title: "RANKING",
        to: "/ranking",
        icon:
<<<<<<< HEAD
          "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/podium.png",
=======
          "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/006-podium.png",
>>>>>>> develop
      },
    ],
  }),
};
</script>

<style scoped>
.footer__img {
  flex: 0.4 0 auto;
  width: 24px;
  height: 24px;
}
</style>
