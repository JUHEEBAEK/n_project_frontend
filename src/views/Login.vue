<template>
  <div align-center justify-center class="login__main">
    <v-card class="elevation-0 login__container">
      <v-card-title class="login__header">
        <div class="header__logo-image">
          <v-img src="@/assets/images/fsnnnn_emblem_official2.png" width="150px" contain />
        </div>
        <div class="header__logo-text">Log in to your account</div>
      </v-card-title>
      <div>
        <v-form class="login__content" ref="form" lazy-validation>
          <v-text-field
            v-model="username"
            autocomplete="off"
            class="login__input"
            color="#03a27c"
            dark
            dense
            label="Username"
            outlined
            :rules="userNameRules"
            @keydown.enter="submit"
          ></v-text-field>
          <v-text-field
            v-model="pwd"
            autocomplete="off"
            class="login__input"
            color="#03a27c"
            dark
            dense
            label="Password"
            outlined
            type="password"
            :rules="pwdRules"
            @keydown.enter="submit"
          ></v-text-field>
        </v-form>
      </div>
      <div class="login__actions">
        <v-btn class="login__button" dark block @click="submit">Login</v-btn>
      </div>
    </v-card>
    <!-- util -->
    <util-snack-bar v-if="snackBar" :purpose="snackBarPurpose" :message="snackBarMessage" />
    <util-loading v-if="loading" :size="100" :title="loadingTitle" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import regex from "../mixin/regex";
import util from "../mixin/util.js";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: attendMapState,
  mapActions: attendMapActions
} = createNamespacedHelpers("attend");

export default {
  mixins: [regex, util],
  created() {
    this.$store.commit("common/setFullScreen", true);
  },
  computed: {
    ...mapGetters("components/layout", {
      fullScreen: "fullScreen"
    })
  },
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login__container {
    padding: 30px;
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
        border-radius: 10px;
      }
    }

    .login__actions {
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      .login__button {
        border: solid 1px #03a27c;
        background-color: none;
        color: #00ebb2;
        height: 40px;
        border-radius: 10px;
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
