<template>
  <div>
    <v-bottom-navigation
      v-model="bottomNav"
      app
      fixed
      color="light-blue darken-4"
      height="72"
    >
      <v-btn
        v-for="item in footerMenus"
        :key="item.title"
        @click="movePage(item)"
      >
        <span>{{ item.title }}</span>
        <v-img :src="$imgBaseUrl + item.icon" class="footer__img" contain />
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import CoreValueItem from "../../assets/value/CoreValueItem.json";

import { createNamespacedHelpers } from "vuex";

const { mapGetters: accountMapGetters } = createNamespacedHelpers("account");

export default {
  name: "FooterVue",
  props: {
    footerMenus: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    bottomNav: "CALENDAR",
    items: CoreValueItem.footerItems
  }),
  computed: {
    ...accountMapGetters(["userInfo"])
  },
  methods: {
    movePage: function(item) {
      console.log("footer movePage", item);
      if (item.title === "ME") {
        this.$router.push({
          name: "memberDetails",
          params: { member_id: this.userInfo.member_id }
        });
        this.$router.go();
      } else {
        this.$emit("updateRouter", item.name);
      }
    }
  }
};
</script>

<style
  scoped
  lang="scss"
  src="@/assets/scss/components/core/footer.scss"
></style>
