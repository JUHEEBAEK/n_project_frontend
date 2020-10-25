<template>
  <div align-center justify-center class="join__main">
    <div class="join__header">
      <core-Back :tableHeader="title" />
    </div>
    <v-card class="join__container">
      <v-row class="pa-0 ma-0">
        <v-col cols="12" xs="12" sm="12" md="3" lg="4" xl="4" class="join__left">
          <div class="join__header">
            <span class="header__text">Join us</span>
            <v-img
              width="140"
              contain
              src="@/assets/images/soccer-goal.png"
            ></v-img>
            <div class="header__image">
              <v-img
                width="55"
                height="55"
                contain
                src="@/assets/images/football.png"
              ></v-img>
            </div>
          </div>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="9" lg="8" xl="8" class="join__right">
          <v-form class="join__content" ref="join_form" lazy-validation>
            <v-row class="right__box">
              <v-col cols="12">
                <v-text-field
                  v-model="userId"
                  autocomplete="off"
                  dense
                  label="아이디"
                  :rules="userIdRules"
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
                  :rules="pwdRules"
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
                <v-text-field
                  v-model="name"
                  autocomplete="off"
                  dense
                  label="이름"
                  :rules="nameRules"
                  outlined
                  required
                />
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
                  v-model="selectedTeam"
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
            <v-btn
              class="join__button ml-2"
              color="#000"
              dark
              @click="submit">
              Join
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <!-- util -->
    <util-snack-bar
      v-if="snackBar"
      :purpose="snackBarPurpose"
      :message="snackBarMessage"
    />
    <util-spinner v-if="loading"></util-spinner>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// mixins
import regex from "../mixins/regex";
import util from "../mixins/util.js";
// api
import { duplicateUserId, join } from "@/api/auth.js";


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
const { mapActions: accountMapActions } = createNamespacedHelpers("account");

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
    title: "JOIN",
    userId: "",
    isCheked: false,
    name: "",
    password: null,
    identifyPassword: null,
    selectedTeam: "",
    selectedMember: ""
  }),
  methods: {
    ...teamMapActions(["select_all_team"]),
    ...memberMapActions(["select_member"]),
    //FIXME: 아이디 중복체크 다시 확인
    checkDuplicated: async function() {
      if (this.userId) {
        let result = await duplicateUserId(this.userId);
        let coutntSameId = result.data.length;
        if (coutntSameId > 0) {
          this.userIdValidate = false;
        }
      }
    },
    clear: function() {
      this.$refs.join_form.reset();
    },
    submit: async function() {
      await this.checkDuplicated();
      if (this.$refs.join_form.validate()) {
        let body = {
          userId: this.userId,
          name: this.name,
          password: this.password,
          member_id: this.selectedMember.id,
          team_id: this.selectedTeam.idTeam
        };
        let joinResult = await this.join(body);
        console.log("joinResult", joinResult);
        if (joinResult.status === 200) {
          this.$router.push({ path: "/login" });
          this.setSnackBar(
            this.snackBarSuccess,
            "축하합니다 회원가입이 완료되었습니다."
          );
        } else {
          this.setSnackBar(this.snackBarFail, res.data.message);
        }
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
