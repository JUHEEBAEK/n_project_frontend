<template>
  <div>
    <core-Toolbar />
    <core-Navigation />
    <v-row class="match__container" justify="center">
      <v-col cols="12" lg="8" md="9" sm="12" xs="12">
        <v-contatner fluid>
          <v-form ref="form">
            <schedule-date-list 
            @changeDate="setScheduleData"></schedule-date-list>
            <squad-quarter></squad-quarter>
            <squad-team-list></squad-team-list>
            <squad-input-position></squad-input-position>
            <v-row>
              <v-col>
                <v-btn @click="save" color="primary">저장</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-contatner>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");
const {
  mapState: squadState,
  mapActions: squadActions
} = createNamespacedHelpers("squad");

const {
  mapState: prepareMatchState,
  mapActions: prepareMatchActions
} = createNamespacedHelpers("prepareMatch");

export default {
  
  methods: {
    ...squadActions(['getSplitTeamListWithSchedule']),
    ...calendarMapActions(["load_member"]),
    ...prepareMatchActions(["setSplitTeamList","setSummarySplitTeamList"]),
    save() {
      console.log("SAVE");
      if (this.$refs.form.validate()) {
      }
    },
    async setScheduleData(selected_schedule) {
      if (this.scheduleIndex == -1) return;
      
      // db에서 불러오는 부분
      await this.getSplitTeamListWithSchedule(selected_schedule.id);
      await this.load_member(selected_schedule.id);
      // prepareMatch store에서 값 세팅
      await this.setSplitTeamList();
      await this.setSummarySplitTeamList();

    },

  },
};
</script>

<style></style>
