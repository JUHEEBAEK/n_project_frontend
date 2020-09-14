<template>
  <div align-center justify-center class="join__main">
    <v-card class="join__container">
      <v-row class="pa-0">
        <v-col cols="4" align-self="center">
          <div class="left__box">
            <v-img aspect-ratio="3" contain src="@/assets/images/football.png"></v-img>
          </div>
        </v-col>
        <v-col cols="8">
          <v-form class="join__content" ref="join_form" lazy-validation>
            <v-row class="right__box">
              <v-col cols="6">
                <v-text-field
                  v-model="userId"
                  autocomplete="off"
                  color="#f5f5f5"
                  dense
                  dark
                  label="아이디"
                  :rules="emptyCheckRules"
                  outlined
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="userName"
                  autocomplete="off"
                  color="#f5f5f5"
                  dense
                  dark
                  label="이름"
                  :rules="nameRules"
                  outlined
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="password"
                  autocomplete="off"
                  color="#f5f5f5"
                  dense
                  dark
                  label="비밀번호"
                  outlined
                  :rules="pwdRules"
                  type="password"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="identifyPassword"
                  autocomplete="off"
                  color="#f5f5f5"
                  dense
                  dark
                  label="비밀번호확인"
                  :rules="identifyPwdRules"
                  outlined
                  type="password"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="selectedTeam"
                  :items="teamList"
                  autocomplete="off"
                  color="#f5f5f5"
                  dense
                  dark
                  label="팀 선택"
                  item-text="name"
                  item-value="idTeam"
                  outlined
                  return-object
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="selectedMember"
                  :items="memberList"
                  color="#f5f5f5"
                  dense
                  dark
                  label="회원 선택"
                  autocomplete="off"
                  item-text="name"
                  item-value="id"
                  outlined
                  return-object
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
          <div class="join__actions">
            <v-row justify="end">
              <v-col cols="2">
                <v-btn class="join__button" color="#fff" outlined block @click="clear">Clear</v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn class="join__button" color="#000" block @click="submit">Join</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
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
  mapState: teamMapState,
  mapActions: teamMapActions
} = createNamespacedHelpers("team");

const {
  mapState: memberMapState,
  mapActions: memberMapActions
} = createNamespacedHelpers("member");

const { mapState: commonState } = createNamespacedHelpers("common");
const { mapActions: accountActions } = createNamespacedHelpers("account");

export default {
  mixins: [regex, util],
  created() {
    this.$store.commit("common/SET_FULL_SCREEN", true);
    this.loadTeamList();
    this.loadMemberList();
  },
  computed: {
    ...commonState(["common"]),
    ...teamMapState(["teamList"]),
    ...memberMapState(["memberList"]),
    ...mapGetters("components/layout", {
      fullScreen: "fullScreen"
    })
  },
  data: () => ({
    userId: "",
    userName: "",
    password: null,
    identifyPassword: null,
    selectedTeam: "",
    selectedMember: ""
  }),
  methods: {
    ...teamMapActions(["select_all_team"]),
    ...memberMapActions(["select_member"]),
    clear: function() {
      this.$refs.join_form.reset();
    },
    submit: async function() {
      console.log("submit");
      if (this.$refs.join_form.validate()) {
        let body = {
          userId: this.userId,
          name: this.userName,
          password: this.password,
          member_id: this.selectedMember.id,
          team_id: this.selectedTeam.idTeam
        };
        console.log("body", body);
      }
    },
    loadMemberList: function() {
      this.select_member();
    },
    loadTeamList: function() {
      this.select_all_team();
    }
  }
};
</script>

<style lang="scss" src="@/assets/scss/views/join.scss" scoped></style>
