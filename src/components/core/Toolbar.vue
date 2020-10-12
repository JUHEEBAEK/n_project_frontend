<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="onClickBtn" />
      <router-link to="/">
        <v-toolbar-title class="black--text">{{ title }}</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <div class="bar__second-profile">
        <span class="profile__text px-2 subtitle-2">{{ userInfo.id }} 님</span>
        <v-menu class="profile__menu" offset-y>
          <div class="profile__dropdown" align="center">
            <div class="avatar__box">
              <div class="avatar__box-info">
                <span class="text__bold-main">{{ userInfo.name }}</span>
              </div>
              <div class="avatar__box-actions">
                <v-btn
                  class="button__item"
                  outlined
                  color="primary"
                  small
                  @click="movePage('my-profile')"
                >
                  내 정보</v-btn
                >
              </div>
              <v-divider class="avatar__box-divider" />
              <div class="avatar__box-logout" @click="logout">
                <span>로그아웃</span>
              </div>
            </div>
          </div>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations: commonMapMutations } = createNamespacedHelpers("common");
const { mapGetters: accountMapGetters } = createNamespacedHelpers("account");

export default {
  name: "Toolbar.vue",
  data: () => ({
    title: "Nunnu Nanna"
  }),
  computed: {
    ...accountMapGetters(["userInfo"])
  },
  watch: {},
  methods: {
    ...commonMapMutations(["SET_DRAWER"]),
    onClickBtn() {
      this.SET_DRAWER(!this.$store.state.common.drawer);
    },
    movePage(page) {
      console.log("move", page);
    },
    logout() {
      console.log("logout");
    }
  }
};
</script>

<style scoped></style>
