<template>
  <div align-center justify-center class="join__main">
    <v-card class="join__container">
      <v-card-title class="join__header">회원가입</v-card-title>
      <div>
        <v-form class="join__content" ref="form" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="userId"
                autocomplete="off"
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
                label="비밀번호확인"
                :rules="emptyCheckRules"
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
                label="회원 선택"
                autocomplete="off"
                item-text="name"
                outlined
                return-object
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <div class="join__actions">
        <v-row justify="end">
          <v-col cols="2">
            <v-btn class="join__button" color="#00ca88" outlined block @click="clear">Clear</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn class="join__button" color="#00ca88" block @click="submit">Join</v-btn>
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
      console.log("clear");
    },
    submit: async function() {
      console.log("submit");
      let body = {
        userId: this.userId,
        name: this.userName,
        password: this.password,
        member_id: this.memberId,
        team_id: this.selectedTeam.idTeam
      };
      console.log("body", body);
    },
    loadMemberList: function() {
      console.log("memberLoad");
      this.select_member();
    },
    loadTeamList: function() {
      console.log("load");
      this.select_all_team();
    }
  }
};
</script>

<style lang="scss" src="@/assets/scss/views/join.scss" scoped></style>
