<template>
  <div class="join__main">
    <v-card class="join__container">
      <v-row class="pa-0 ma-0">
        <v-col cols="12" xs="12" sm="12" md="3" lg="4" xl="4" class="join__left">
          <div class="join__header">
            <div class="header__top">
              <v-btn icon dark @click="backPage()">
                <v-icon>mdi-arrow-left-thick</v-icon>
              </v-btn>
            </div>
            <span class="header__text">Join us</span>
            <v-img width="140" contain src="@/assets/images/soccer-goal.png"></v-img>
            <div class="header__image">
              <v-img width="55" height="55" contain src="@/assets/images/football.png"></v-img>
            </div>
          </div>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="9" lg="8" xl="8" class="join__right">
          <v-form ref="join_form" class="join__content" lazy-validation>
            <v-row class="right__box">
              <v-col cols="12">
                <v-text-field
                  v-model="userId"
                  autocomplete="off"
                  dense
                  label="아이디"
                  :rules="idRules"
                  outlined
                  required
                />
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="password"
                  autocomplete="off"
                  dense
                  label="비밀번호"
                  outlined
                  :rules="passwordRules"
                  type="password"
                  required
                />
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="identifyPassword"
                  autocomplete="off"
                  dense
                  label="비밀번호확인"
                  :rules="identifyPwdRules"
                  outlined
                  type="password"
                  required
                />
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6">
                <v-text-field v-model="name" autocomplete="off" dense label="이름" outlined required />
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6">
                <v-autocomplete
                  v-model="selectedMember"
                  :items="memberList"
                  dense
                  label="회원 선택"
                  autocomplete="off"
                  item-text="name"
                  item-value="id"
                  outlined
                  return-object
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6">
                <v-autocomplete
                  v-model="idfteam"
                  :items="teamList"
                  autocomplete="off"
                  dense
                  label="팀 선택"
                  item-text="name"
                  item-value="idTeam"
                  outlined
                  return-object
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
          <div class="join__actions">
            <v-btn class="join__button mr-2" outlined @click="clear">Clear</v-btn>
            <v-btn class="join__button ml-2" color="green darken-4" dark @click="submit">
              Join
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { userIdRules, pwdRules, identifyPwdRules } from "@/helpers/rules";

export default {
  data: () => ({
    title: "JOIN",
    userId: "",
    isDupulicateId: false,
    name: "",
    password: null,
    identifyPassword: null,
    idfteam: "",
    selectedMember: ""
  }),
  computed: {
    ...mapGetters("team", ["teamList"]),
    ...mapGetters("member", ["memberList"]),
    idRules() {
      return userIdRules(this.isDupulicateId);
    },
    passwordRules() {
      return pwdRules();
    },
    identifyPwdRules() {
      const isSame = this.password !== this.identifyPassword;
      return identifyPwdRules(isSame);
    }
  },
  created() {
    this.loadMemberList();
    this.loadTeamList();
  },
  methods: {
    ...mapActions(["updateRouter"]),
    ...mapActions("team", ["getTeamList"]),
    ...mapActions("member", ["getRegularMemberList"]),
    ...mapActions("account", ["duplicateUserId", "join"]),
    async loadMemberList() {
      // TODO:비밀번호 찾기 기능 만든 후에 이미 가입된 선수 빼는 것 필요
      await this.getRegularMemberList();
    },
    async loadTeamList() {
      await this.getTeamList();
    },
    checkDuplicated: async function(id) {
      if (id) {
        const response = await this.duplicateUserId(this.userId);
        this.isDupulicateId = response > 0 ? true : false;
      }
    },
    clear: function() {
      this.$refs.join_form.reset();
    },
    submit: async function() {
      await this.checkDuplicated(this.userId);
      if (this.$refs.join_form.validate()) {
        const body = {
          userId: this.userId,
          name: this.name,
          password: this.password,
          member_id: this.selectedMember.id,
          team_id: this.idfteam.idTeam
        };
        const success = await this.join(body);
        if (success) {
          this.updateRouter("login");
        }
      }
    },
    backPage() {
      this.updateRouter("login");
    }
  }
};
</script>

<style lang="scss" src="./join.scss" scoped></style>
