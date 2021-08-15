<template>
  <v-app-bar app class="appBar">
    <v-app-bar-nav-icon @click.stop="openNavigation" />
    <router-link to="/home" class="bar__first-title">
      <v-toolbar-title class="black--text">{{ title }}</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <div class="bar__second-profile">
      <v-menu v-model="menu" class="profile__menu" :close-on-content-click="false" :nudge-width="120" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <span class="profile__text">{{ userInfo.name }} 님</span>
            <v-avatar class="mx-3" color="grey">
              <img src="@/assets/images/photo-default.png" alt="John" />
            </v-avatar>
          </div>
        </template>
        <v-card class="profile__dropdown">
          <div class="avatar__box-info">
            <span class="text__bold-main">{{ userInfo.role }}</span>
            <span class="text__bold-main">{{ userInfo.id }}</span>
            <v-btn class="button__item" outlined color="primary" small @click="movePage('my-profile')">내 정보</v-btn>
          </div>
          <v-divider class="avatar__box-divider" />
          <v-card-actions class="avatar__box-logout" @click="logout">
            <span>로그아웃</span>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { appBarProps } from "./props";

export default {
  name: "Toolbar",
  props: {
    ...appBarProps
  },
  data: () => ({
    title: "Nunnu Nanna",
    menu: ""
  }),
  methods: {
    openNavigation() {
      this.$emit("setDrawer", !this.leftDrawer);
    },
    movePage(page) {
      this.$emit("updateRouter", page);
    },
    logout() {
      this.$emit("signOut");
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/scss/components/core/toolbar.scss"></style>
