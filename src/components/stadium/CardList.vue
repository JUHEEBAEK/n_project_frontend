<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="pa-0"
        v-for="(item, idx) in stadiumList"
        :key="idx"
      >
        <v-card class="stadium__container px-0 py-1 ma-1">
          <v-card-title class="stadium__title">
            <div class="text text__title">{{ item.name }}</div>
          </v-card-title>
          <v-card-text class="stadium__description pa-2">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div class="text text__caption" v-bind="attrs" v-on="on">{{ item.address }}</div>
              </template>
              <span>{{ item.address }}</span>
            </v-tooltip>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" text @click="moveDetails(item)">UPDATE</v-btn>
            <v-btn color="red" text @click="deleteStadium(item.id)">DELETE</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");

export default {
  data() {
    return {};
  },
  computed: {
    ...stadiuMapState(["stadiumList"])
  },
  created() {
    this.select_stadium();
  },
  methods: {
    ...stadiumMapActions(["select_stadium", "delete_stadium"]),

    async deleteStadium(stadium_id) {
      let formData = { stadium_id: stadium_id };
      if (confirm("정말 정말로 삭제하시겠습니까??")) {
        await this.delete_stadium(formData);
        this.select_stadium();
      }
    },
    moveDetails(item) {
      this.$router.push({
        name: "stadiumUpdate",
        params: { stadiumId: item.id }
      });
    }
  }
};
</script>

<style lang="scss" src="../../styles/components/stadium/cardList.scss"></style>
