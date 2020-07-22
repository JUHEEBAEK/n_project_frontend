<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="pa-0"
        v-for="(item, idx) in searchResult"
        :key="idx"
      >
        <v-card class="card__profile px-0 py-1 ma-1">
          <v-img
            class="white--text align-end"
            aspect-ratio="2"
            cover
            :src="`https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/bgImage/${item.bg_image}`"
          />
          <v-card-text class="text--primary pa-1">
            <div class="text text__title">{{ item.name }}</div>
            <div
              class="text text__uniformNumber px-2 tertiary--text"
            >{{ item.uniform_number ? item.uniform_number : "00" }}</div>
            <div class="text text__caption">{{ $moment(item.join_date).format("YYYY-MM-DD") }}</div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" text @click="moveDetails(item)">UPDATE</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: memberMapState,
  mapActions: memberMapActions
} = createNamespacedHelpers("member");

export default {
  data: () => ({}),
  computed: {
    ...memberMapState(["searchResult"])
  },
  mounted() {
    this.select_member();
  },
  methods: {
    ...memberMapActions(["select_member"]),
    moveDetails(item) {
      this.$router.push({
        name: "memberUpdatePage",
        params: { memberId: item.id }
      });
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
