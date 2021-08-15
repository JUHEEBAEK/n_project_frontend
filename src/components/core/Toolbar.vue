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
            <div class="first__box">
              <span class="text__main">{{ userInfo.team_id === "1" ? "눈누난나" : userInfo.team_id }}</span>
              <span class="badge__item">{{ userInfo.role === "A" ? "운영진" : "" }}</span>
            </div>
            <div>
              <span class="text__main">{{ userInfo.name }}</span>
              <span class="text__sub">{{ `(${userInfo.user_id})` }}</span>
            </div>
            <v-btn class="button__item" outlined color="primary" small @click="move('my-profile')">내 정보</v-btn>
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
    move(page) {
      console.log("move", page);
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
