<template>
  <v-navigation-drawer v-model="setting" right app clipped>
    <v-list>
      <v-list-item>
        <v-list-item-content class="float-left px-2">
          <v-list-item-title class="title text-left">참석자</v-list-item-title>
          <v-list-item-title class="title text-right">총 14명</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item>
        <v-list-item-content class="float-left">
          <v-list-item-title class="title text-left">팀 수</v-list-item-title>
          <v-item-group>
            <v-item
              v-for="item in attendTeamCount"
              :key="item"
              class="group__item"
              v-slot:default="{ active, toggle }"
            >
              <v-btn
                :color="active ? 'primary' : ''"
                fab
                elevation="0"
                x-small
                @click="toggle"
                @click.native="setTeamCount(item)"
              >
                <v-scroll-y-transition>
                  <div
                    v-if="active"
                    class="flex-grow-1 text-center list__item white--text"
                  >{{ item }}</div>
                  <div v-else class="flex-grow-1 text-center list__item">{{ item }}</div>
                </v-scroll-y-transition>
              </v-btn>
            </v-item>
            <v-item class="group__item">
              <v-btn
                :color="active ? 'primary' : ''"
                fab
                elevation="0"
                x-small
                @click="addTeamCount"
              >+</v-btn>
            </v-item>
          </v-item-group>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item>
        <v-list-item-content class="float-left">
          <v-list-item-title class="title text-left">최소인원 수</v-list-item-title>
          <v-item-group>
            <v-item
              v-for="item in maxPlayerCount"
              :key="item"
              class="group__item"
              v-slot:default="{ active, toggle }"
            >
              <v-btn
                :color="active ? 'primary' : ''"
                fab
                elevation="0"
                x-small
                @click="toggle"
                @click.native="setMinCount(item)"
              >
                <v-scroll-y-transition>
                  <div
                    v-if="active"
                    class="flex-grow-1 text-center list__item white--text"
                  >{{ item }}</div>
                  <div v-else class="flex-grow-1 text-center list__item">{{ item }}</div>
                </v-scroll-y-transition>
              </v-btn>
            </v-item>
            <v-item class="group__item">
              <v-btn
                :color="active ? 'primary' : ''"
                fab
                elevation="0"
                x-small
                @click="addMinCount"
              >+</v-btn>
            </v-item>
          </v-item-group>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item>
        <v-checkbox v-model="isJoker" color="primary" label=" 깍두기 여부"></v-checkbox>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item class="float-right">
        <v-btn color="primary" @click="save">저장</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("common");

export default {
  data: () => ({
    attendTeamCount: [2, 3, 4, 5],
    maxPlayerCount: [4, 5, 6, 7],
    isJoker: false,
    teamCount: 2,
    minCount: 5
  }),
  computed: {
    ...mapState(["setting"]),
    setting: {
      get() {
        return this.$store.state.common.setting;
      },
      set(val) {
        this.setSetting(val);
      }
    }
  },
  methods: {
    ...mapMutations(["setSetting"]),
    addTeamCount() {
      console.log("add Team");
      let length = this.attendTeamCount.length;
      this.attendTeamCount.push(length + 2);
    },
    addMinCount() {
      console.log("add player");
      let length = this.maxPlayerCount.length;
      this.maxPlayerCount.push(length + 4);
    },
    setMinCount(count) {
      this.minCount = count;
    },
    setTeamCount(count) {
      this.teamCount = count;
    },
    addMember(item) {
      console.log(item);
    },
    save() {
      console.log("save");
      let setting = {
        teamCount: this.teamCount,
        minCount: this.minCount,
        isJoker: this.isJoker
      };
      this.$emit("divideTeamSetting", setting);
    }
  }
};
</script>
<style scoped>
.group__item {
  margin: 0 5px;
}
.list__item {
  font-size: 1rem;
}
</style>
