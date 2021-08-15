<template>
  <div>
    <v-bottom-navigation v-model="bottomNav" app fixed color="light-blue darken-4" height="72">
      <v-btn v-for="footer in footerMenus" :key="footer.title" @click="movePage(footer)">
        <span>{{ footer.meta.title }}</span>
        <v-img :src="$imgBaseUrl + footer.meta.icon" class="footer__img" contain />
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FooterVue",
  props: {
    footerMenus: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    bottomNav: "CALENDAR"
  }),
  computed: {
    ...mapGetters("account", {
      userInfo: "userInfo"
    })
  },
  methods: {
    movePage: function(item) {
      this.$emit("updateRouter", item.name);
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/scss/components/core/footer.scss"></style>
