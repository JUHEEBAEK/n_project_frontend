<template>
  <div class="text-center">
    <v-dialog v-model="dialog" v-if="type='teamList'" width="500">
      <v-card>
        <v-card-title class="teamList--title">
          <span class="headline">생성된 팀 리스트</span>
          <v-btn icon @click="closeDialog">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="team__list">
          <v-data-table
            class="teamlist--table elevation-1"
            :headers="headerOfSplitTeam"
            :items="summarySplitTeamList"
            :footer-props="teamPaging"
            :sort-by="['number']"            
            hide-default-footer
            disable-sort
            @click:row="clickTeam"
          ></v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import squad from "../../../assets/value/squad.json";
import dialog from "../../../mixin/dialog.js";
import { createNamespacedHelpers } from "vuex";
const { mapState: prepareMatchMapState, mapMutations:prepareMatchMapMutations } = createNamespacedHelpers("prepareMatch");

export default {
  mixins: [dialog],
  data: () => ({
    teamPaging: { "items-per-page-options": [10000] }
  }),
  computed: {
    ...prepareMatchMapState(["summarySplitTeamList","headerOfSplitTeam"])
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    clickTeam(item) {
      this.$emit("saveTeam", item);
    }
  }
};
</script>

<style>
.teamList--title {
  display: flex;
  justify-content: space-between;
}
.teamlist--table {
  overflow-y: scroll;
  height: 300px;
}
</style>