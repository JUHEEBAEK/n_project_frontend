<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="pa-0"
        v-for="(item, idx) in memberList"
        :key="idx"
      >
        <v-card class="card__profile px-0 py-1 ma-1">
          <v-img
            class="white--text align-end"
            aspect-ratio="2"
            cover
            :src="require(`../../assets/bgImage/${item.bg_image}`)"
          />
          <v-card-text class="text--primary pa-1">
            <div class="text text__title">{{ item.name }}</div>
            <div class="text text__uniformNumber px-2 tertiary--text">
              {{ item.uniform_number ? item.uniform_number : "00" }}
            </div>
            <div class="text text__caption">
              {{ moment(item.join_date).format("YYYY-MM-DD") }}
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" text @click="moveDetails(item)">
              UPDATE
            </v-btn>
            <v-btn color="red" text @click="deleteMember(item.id)">
              DELETE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("member");
export default {
  data: () => ({}),
  computed: {
    ...mapState(["memberList"])
  },
  mounted() {
    this.select_member();
  },

  methods: {
    ...mapActions(["select_member", "delete_member", "details_member"]),
    testButton() {
      console.log("dbug");
    },

    updateMember(member_id) {
      console.log(member_id);
    },

    deleteMember(member_id) {
      let formData = { data: { member_id } };
      this.delete_member(formData);
    },

    moveDetails(item) {
      console.log(item);
      this.details_member(item.id);
      this.$router.push({ path: `member/${item.id}/profile` });
    }
  }
};
</script>

<style scoped>
.card__profile {
  padding: 10px;
}
a {
  text-decoration: none;
}
</style>
