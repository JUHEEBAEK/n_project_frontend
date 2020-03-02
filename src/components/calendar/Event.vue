<template>
  <v-card class="calendar__event" color="grey lighten-4" flat>
    <v-toolbar color="grey lighten-4" flat tile height="40px">
      <v-spacer />
      <v-btn icon small class="mx-1" @click="openUpdateModal()">
        <v-icon small class="toolbar__icon">fas fa-edit</v-icon>
      </v-btn>
      <v-btn icon small class="mx-1" @click="deleteEvent()">
        <v-icon small class="toolbar__icon">fas fa-trash-alt</v-icon>
      </v-btn>
      <v-btn icon small class="mx-1" @click="close()">
        <v-icon small>fas fa-times</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text class="pa-4">
      <div class="item__container">
        <div class="row">
          <div class="col-2 align-self-center">
            <v-avatar size="20" :color="selectedEvent.color" />
          </div>
          <div class="col-10 text-left">
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__title" v-html="selectedEvent.name" />
              </div>
            </div>
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__start" v-html="selectedEvent.start" />
                ~
                <span class="schedule__end" v-html="selectedEvent.end" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item__container">
        <div class="row">
          <div class="col-2 align-self-center">
            <v-icon>fas fa-map-marker-alt</v-icon>
          </div>
          <div class="col-10 text-left">
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__stadium_name" v-html="selectedEvent.stadium_name" />
              </div>
            </div>
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__address" v-html="selectedEvent.address" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item__container">
        <div class="row">
          <div class="col-2">
            <v-icon>fas fa-users</v-icon>
          </div>
          <div class="col-10 text-left">
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__attend" v-html="`참석자 ${selectedEvent.attendCount} 명`" />
              </div>
            </div>
            <div class="row">
              <div class="col-12 py-0">
                <span
                  class="attend__member"
                  v-for="(item, idx) in selectedEvent.memeber_name_list"
                  :key="idx"
                >{{ item }},</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapActions } = createNamespacedHelpers("calendar");

export default {
  props: ["selectedEvent"],
  methods: {
    ...mapMutations(["SET_FULL_EVENT_MODAL"]),
    ...mapActions(["delete_event"]),
    openUpdateModal() {
      this.SET_FULL_EVENT_MODAL(true);
    },
    deleteEvent() {
      if (confirm("정말로 삭제하시겠습니까")) {
        this.delete_event({ schedule_id: this.selectedEvent.id });
        this.close();
      }
    },
    close() {
      // 상위 컴포넌트의 calendar 에서 event close 함수 사용
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.calendar__event {
  width: 400px;
}
</style>
