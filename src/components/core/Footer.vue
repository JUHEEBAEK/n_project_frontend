<template>
  <v-bottom-navigation
    color="light-blue darken-4"
    v-model="bottomNav"
    height="72"
  >
    <v-btn v-for="item in items" :key="item.title" :to="item.to">
      <span>{{ item.title }}</span>
      <v-img :src="$imgBaseUrl + item.icon" class="footer__img" contain />
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
        icon: "046-calendar.png",
      },
      {
        title: "SQUAD",
        to: "/squadView",
        icon: "003-tshirt.png",
      },
      {
        title: "REPORT",
        to: "",
        icon: "037-scoreboard.png",
      },
      {
        title: "RANKING",
        to: "/ranking",
        icon: "006-podium.png",
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
