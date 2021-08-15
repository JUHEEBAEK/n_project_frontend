<template>
  <div class="login__main">
    <v-card class="login__container">
      <v-card-title class="login__header">
        <div class="header__logo-image">
          <img class="img__logo" width="180px" :src="logoImg" />
        </div>
        <div class="header__logo-text">Welcome to the futsal~!!!</div>
      </v-card-title>
      <div>
        <v-form ref="form" class="login__content" lazy-validation>
          <v-text-field
            v-model="username"
            autocomplete="off"
            class="login__input"
            color="#00ca88"
            dense
            label="Username"
            outlined
            :rules="idRules"
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
            :rules="passwordRules"
            @keydown.enter="submit"
          ></v-text-field>
        </v-form>
      </div>
      <div class="login__actions">
        <v-row>
          <v-col cols="12">
            <v-btn class="login__button" color="#00ca88" block :ripple="false" @click="submit">Login</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="#03a27c" text @click="clickToJoin">회원가입</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="#03a27c" text>비밀번호 찾기</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <req-loading :loading="loading" isBall :size="100" />
  </div>
</template>

<script>
import Loading from "@/components/loading";

import { userNameRules, pwdRules } from "@/helpers/rules";

export default {
  name: "Login",
  components: {
    "req-loading": Loading
  },
  props: {
    language: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    username: null,
    password: null,
    logoImg: require("@/assets/images/fsnnnn_emblem_official2.png")
  }),
  computed: {
    idRules() {
      return userNameRules();
    },
    passwordRules() {
      return pwdRules();
    }
  },
  methods: {
    setLoading(value) {
      this.loading = value;
    },
    clickToJoin: function() {
      this.$router.push({
        name: "join"
      });
    },
    submit: async function() {
      this.setLoading(true);
      if (this.$refs.form.validate()) {
        this.setLoading(true);
        this.$emit("signIn", {
          userId: this.username,
          password: this.password
        });
        this.setLoading(false);
      }
    }
  }
};
</script>
<style lang="scss" scoped src="./login.scss" />
