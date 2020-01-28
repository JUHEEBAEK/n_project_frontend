<template>
  <div>
    <v-card>
      <v-app-bar dark height="360" prominent>
        <template v-slot:img="{ props }">
          <v-img
            :src="require(`../../assets/bgImage/${profile.bg_image}`)"
            position="top center"
            v-bind="props"
          />
        </template>
        <v-btn icon @click="backPage">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-text class="text--primary">
        <v-text-field
          v-model="profile.name"
          filled
          label="NAME"
          prepend-icon="fas fa-user"
        />
        <v-text-field
          v-model="profile.uniform_number"
          filled
          label="UNIFORM_NUMBER"
          prepend-icon="fas fa-tshirt"
        />
        <v-text-field
          v-model="profile.nick_name"
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
              :v-model="profile.join_date"
              label="JOINING_DATE"
              filled
              hide-details
              prepend-icon="fas fa-calendar-alt"
              :value="date"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="profile.join_date" @input="menu = false" />
        </v-menu>
        <v-radio-group
          v-model="profile.inflow_route"
          row
          prepend-icon="fas fa-paper-plane"
        >
          <v-radio label="인스타" value="I" />
          <v-radio label="블로그" value="B" />
          <v-radio label="기타" value="O" />
        </v-radio-group>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-row>
          <v-col cols="6">
            <v-btn color="primary" block text @click="updateMember(profile)">
              UPDATE
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="red" block text @click="deleteMember(profile.id)">
              DELETE
            </v-btn>
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
  data: () => ({
    menu: false,
    date: ""
  }),
  computed: {
    ...mapState(["profile"]),
  },
  created() {
    console.log("Created");
    console.log(this.profile);
    this.date = moment(this.profile.join_date).format("YYYY-MM-DD");
    console.log(this.date);
  },
  methods: {
    ...mapActions(["delete_member", "update_member"]),
    ...mapMutations(["DETAILS_MEMBER"]),
    updateMember(profile) {
      console.log(profile);
      let formData = { member_id : profile.id, member: profile};
      this.update_member(formData);
    },
    deleteMember(member_id) {
      let formData = { data: { member_id } };
      this.delete_member(formData);
    },
    moveDetails(item) {
      console.log(item);
      this.$router.push({ path: `member/${item.id}/profile` });
    },
    backPage() {
      console.log("back 가자.");
      this.$router.go(-1);
    }
  }
};
</script>
