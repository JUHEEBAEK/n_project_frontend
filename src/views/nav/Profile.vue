<template>
  <div>
    <v-card>
      <v-app-bar dark height="360" prominent>
        <template v-slot:img="{ props }">
          <v-img :src="imageUrl" position="top center" v-bind="props" />
        </template>
        <v-btn icon @click="backPage">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-text class="text--primary">
        <v-text-field
          v-model="memberInfo.name"
          filled
          label="NAME"
          prepend-icon="fas fa-user"
        />
        <v-text-field
          v-model="memberInfo.uniform_number"
          filled
          label="UNIFORM_NUMBER"
          prepend-icon="fas fa-tshirt"
        />
        <v-text-field
          v-model="memberInfo.nick_name"
          filled
          label="NICK_NAME"
          prepend-icon="fas fa-smile"
        />
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :v-model="memberInfo.join_date"
              label="JOINING_DATE"
              filled
              hide-details
              prepend-icon="fas fa-calendar-alt"
              :value="date"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="menu = false" />
        </v-menu>
        <v-radio-group
          v-model="memberInfo.inflow_route"
          row
          prepend-icon="fas fa-paper-plane"
        >
          <v-radio label="인스타" value="I" />
          <v-radio label="블로그" value="B" />
          <v-radio label="기타" value="O" />
        </v-radio-group>

        <v-radio-group
          v-model="memberInfo.bg_image"
          row
          prepend-icon="fas fa-image"
          @change="changeImage"
        >
          <v-radio label="welcome" value="ledWelcome.jpg" />
          <v-radio label="wow" value="ledWow.jpg" />
          <v-radio label="what" value="ledWhat.jpg" />
          <v-radio label="yeah" value="ledYeah.jpg" />
          <v-radio label="game" value="ledGame.jpg" />
          <v-radio label="soccer" value="ledSoccer.jpg" />
          <v-radio label="beer" value="ledBeer.jpg" />
          <v-radio label="movie" value="ledVedio.jpg" />
          <v-radio label="music" value="ledClef.jpg" />
        </v-radio-group>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" block text @click="updateMember(memberInfo)"
              >UPDATE</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "member"
);

export default {
  props: {
    // 선택한 선수
    memberId: {
      type: [String, Number],
      default: null
    }
  },
  async created() {
    console.log("Created Profile");
    console.log("memberId ", this.memberId);
    await this.getMemberInfo(this.memberId);
  },
  data: () => ({
    menu: false,
    memberInfo: {},
    name: "",
    uniformNumber: "",
    nickName: "",
    joinDate: null,
    inflowRoute: "",
    bgImage: "",
    date: "",
    imageUrl: ""
  }),
  computed: {
    ...mapState(["profile"])
  },
  methods: {
    ...mapActions(["details_member", "delete_member", "update_member"]),
    async getMemberInfo(memberId) {
      this.memberInfo = await this.details_member(memberId);
      this.setMemberInfo(this.memberInfo);
    },

    setMemberInfo(memberInfo) {
      console.log("set");
      this.date = moment(memberInfo.join_date).format("YYYY-MM-DD");
      console.log("1");
      this.imageUrl = require(`../../assets/bgImage/${memberInfo["bg_image"]}`);
      console.log("2");
    },
    updateMember(memberInfo) {
      console.log(memberInfo);
      memberInfo.join_date = moment(this.memberInfo.join_date).format(
        "YYYY-MM-DD"
      );
      let formData = { member_id: memberInfo.id, member: memberInfo };
      this.update_member(formData);
    },
    deleteMember(memberId) {
      let formData = { data: { memberId } };
      this.delete_member(formData);
    },
    moveDetails(item) {
      console.log(item);
      this.$router.push({ path: `member/${item.id}/memberInfo` });
    },
    backPage() {
      console.log("back 가자.");
      this.$router.go(-1);
    },
    changeImage(target) {
      console.log(target);
      this.imageUrl = require(`../../assets/bgImage/${target}`);
      console.log(this.imageUrl);
    }
  }
};
</script>

<style scoped></style>
