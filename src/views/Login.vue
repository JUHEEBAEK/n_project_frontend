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
            v-model="password"
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
        <v-btn dark text @click="join">회원가입</v-btn>
      </div>
    </v-card>
    <!-- util -->
    <util-snack-bar v-if="snackBar" :purpose="snackBarPurpose" :message="snackBarMessage" />
    <util-spinner v-if="loading"></util-spinner>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import regex from "../mixin/regex";
import util from "../mixin/util.js";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: attendMapState,
  mapActions: attendMapActions
} = createNamespacedHelpers("attend");

const { mapState: commonState } = createNamespacedHelpers("common");
const { mapActions: accountActions } = createNamespacedHelpers("account");

export default {
  mixins: [regex, util],
  created() {
    this.$store.commit("common/SET_FULL_SCREEN", true);
  },
  computed: {
    ...commonState(["common"]),
    ...mapGetters("components/layout", {
      fullScreen: "fullScreen"
    })
  },
  data: () => ({
    username: "",
    password: null
  }),
  methods: {
    ...accountActions(["loginProcess"]),
    submit: function() {
      console.log("login");

      if (this.$refs.form.validate()) {
        this.setLoadingBar(true);
        let formData = {
          username: this.username,
          password: this.password
        };

        // const formData = new FormData();
        // formData.append("userName", this.username);
        // formData.append("password", this.password);
        this.loginProcess(formData);
        this.setLoadingBar(false);
      }
      // Validation(email,pwd) Fail
      else {
        console.log("실패");
        this.setSnackBar(
          this.snackBarFail,
          "이메일과 비밀번호를 형식에 맞게 입력해주세요"
        );
      }
    }
  }
};
</script>

<style lang="scss" src="@/assets/scss/views/login.scss" scoped></style>
