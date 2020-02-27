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
        <v-text-field v-model="profile.name" filled label="NAME" prepend-icon="fas fa-user" />
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
              :v-model="moment(profile.join_date).format('YYYY-MM-DD')"
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
        <v-radio-group v-model="profile.inflow_route" row prepend-icon="fas fa-paper-plane">
          <v-radio label="인스타" value="I" />
          <v-radio label="블로그" value="B" />
          <v-radio label="기타" value="O" />
        </v-radio-group>

        <v-radio-group
          v-model="profile.bg_image"
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

      <v-card-actions class="justify-center">
        <v-row>
          <v-col cols="6">
            <v-btn color="primary" block text @click="updateMember(profile)">UPDATE</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="red" block text @click="deleteMember(profile.id)">DELETE</v-btn>
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
    date: "",
    imageUrl: ""
  }),
  computed: {
    ...mapState(["profile"])
  },
  created() {
    this.date = moment(this.profile.join_date).format("YYYY-MM-DD");
    this.imageUrl = require(`../../assets/bgImage/${this.profile["bg_image"]}`);
  },
  methods: {
    ...mapActions(["delete_member", "update_member"]),
    updateMember(profile) {
      profile.join_date = moment(this.profile.join_date).format("YYYY-MM-DD");
      let formData = { member_id: profile.id, member: profile };
      this.update_member(formData);
    },
    deleteMember(member_id) {
      let formData = { data: { member_id } };
      this.delete_member(formData);
    },
    moveDetails(item) {
      this.$router.push({ path: `member/${item.id}/profile` });
    },
    backPage() {
      this.$router.go(-1);
    },
    changeImage(target) {
      this.imageUrl = require(`../../assets/bgImage/${target}`);
    }
  }
};
</script>
