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
            color="#00ca88"
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
            color="#00ca88"
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
        <v-row>
          <v-col cols="12">
            <v-btn class="login__button" color="#00ca88" block @click="submit">Login</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="#03a27c" text @click="goJoinPage">회원가입</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="#03a27c" text>비밀번호 찾기</v-btn>
          </v-col>
        </v-row>
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
    console.log(this.snackBar);
  },
  computed: {
    ...commonState(["snackBar"]),
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
    goJoinPage: function() {
      console.log("join");
      this.$router.push({ name: "join" });
    },
    submit: async function() {
      console.log("login");

      if (this.$refs.form.validate()) {
        this.setLoadingBar(true);
        let formData = {
          userId: this.username,
          password: this.password
        };
        const res = await this.loginProcess(formData);
        if (res.status !== 400 && res.data.token) {
          console.log(this.user);
          this.$router.push({ path: "/" });
        } else {
          console.log("실패", res.data.message);
          // FIXME: 오류를 여러번 이어서 냈을 때 처음만 스낵바 보이고 나머지는 안보임????
          this.setSnackBar(this.snackBarFail, res.data.message);
        }
        this.setLoadingBar(false);
      }
    }
  }
};
</script>

<style lang="scss" src="@/assets/scss/views/login.scss" scoped></style>
