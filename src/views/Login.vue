<template>
  <div align-center justify-center class="login__main">
    <v-card class="elevation-0 login__container">
      <v-card-title class="login__header">
        <div class="header__logo-image">Logo</div>
        <div class="header__logo-text">Log in to your account</div>
      </v-card-title>
      <v-card-text>
        <v-form class="login__content" ref="form" lazy-validation>
          <v-text-field
            v-model="username"
            label="Username"
            class="login__input"
            :rules="userNameRules"
            @keydown.enter="submit"
          ></v-text-field>
          <v-text-field
            v-model="pwd"
            label="Password"
            class="login__input"
            type="password"
            :rules="pwdRules"
            autocomplete="off"
            @keydown.enter="submit"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="login__actions">
        <v-btn class="login__button" dark block rounded @click="submit">Login</v-btn>
      </v-card-actions>
    </v-card>
    <!-- util -->
    <util-snack-bar v-if="snackBar" :purpose="snackBarPurpose" :message="snackBarMessage" />
    <util-loading v-if="loading" :size="100" :title="loadingTitle" />
  </div>
</template>

<script>
import util from "../mixin/util.js";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: attendMapState,
  mapActions: attendMapActions
} = createNamespacedHelpers("attend");

export default {
  mixins: [util],
  data: () => ({
    chartData: [],
    title: "2020 출석횟수",
    isLoading: false
  }),
  methods: {
    submit: function() {
      console.log("login");
    }
  }
};
</script>

<style lang="scss" scoped>
.login__main {
  padding: 0;
  background-image: url("../assets/images/section02_bg.jpg");
  display: flex;
  justify-content: center;
  align-items: center;

  .login__container {
    padding: 30px;
    width: 24vw;
    height: 38vh;
    background-color: #0000005e;
    color: white;

    .login__header {
      padding: 30px 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .header__logo-image {
        margin: 10px 0;
      }
      .header__logo-text {
      }
    }
    .login__content {
      padding: 0px 30px;
      display: flex;
      flex-direction: column;

      .login__input {
        width: 100%;
        background: none;
        color: #fff;
        border: none;
        font-size: 14px;
        font-weight: 700;
        border-bottom: solid 1px #fff;
        margin: 20px 0;
      }
    }

    .login__actions {
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      .login__button {
        background: #00ebb2;
        border: solid 1px #03a27c;
        color: #463b3b;
      }
      .find__button {
        margin: 20px 0;
        background: #455a64;
        border: solid 1px #2d3a41;
      }
    }
  }
}
</style>
