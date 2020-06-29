<template>
  <div>
    <v-bottom-navigation app fixed color="light-blue darken-4" v-model="bottomNav" height="72">
      <v-btn v-for="item in items" :key="item.title" :to="item.to">
        <span>{{ item.title }}</span>
        <v-img :src="$imgBaseUrl + item.icon" class="footer__img" contain />
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import CoreValueItem from "../../assets/value/CoreValueItem.json";

export default {
  name: "Footer.vue",

  data: () => ({
    bottomNav: "CALENDAR",
    items: CoreValueItem.footerItems
  })
};
</script>

<style scoped lang="scss" src="../../styles/components/core/footer.scss"></style>
