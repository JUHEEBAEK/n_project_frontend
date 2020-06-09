<template>
  <div>
    <v-row class="position__field" justify="center">
      <v-col
        cols="4"
        class="text-center px-0 pb-0"
        align-self="center"
        v-for="item in positionList"
        :key="item"
      >
        <v-btn v-if="item" @click="openDialog(item)">{{ item }}</v-btn>
        <v-text-field
          v-if="item"
          class="position__name"
          v-model="position[selectType][item]"
          clearable
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="position__bench" justify="center">
      <v-col
        cols="4"
        class="text-center px-0 pb-0"
        align-self="center"
        v-for="item in benchList"
        :key="item"
      >
        <v-btn v-if="item" @click="openDialog(item)">{{ item }}</v-btn>
        <v-text-field
          v-if="item"
          class="position__name"
          v-model="position[selectType][item]"
          clearable
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <dialog-squad-position
      v-if="dialog===true && type==='position'"
      :selectTeam="selectTeam"
      :selectPosition="selectPosition"
      @savePosition="savePosition"
    ></dialog-squad-position>
  </div>
</template>

<script>
import dialog from "../../mixin/dialog.js";
import regex from "../../mixin/regex.js";
import Position from "../../assets/value/Postion.json";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("prepareMatch");

export default {
  mixins: [dialog, regex],
  data: () => ({
    selectTeam: null,
    selectPosition: null,
    positionList: Position.list,
    benchList: Position.benchList,
    position: Position.basicPostion
  }),
  computed: {
    ...mapState(["isHome", "selectType", "homeTeam", "awayTeam"])
  },
  methods: {
    // 중복된 선수가 있는지 체크 해주는 함수.
    checkedDuplicatePostion: function(value) {
      // TODO: 중복된 선수 rules 추가해주기
      console.log("checkedDuplicatePostion", value);
      return true;
    },
    openDialog(val) {
      this.selectPosition = val;
      if (this.isHome) {
        this.selectTeam = this.homeTeam;
      } else {
        this.selectTeam = this.awayTeam;
      }
      if (this.homeTeam && this.awayTeam) {
        this.setDialogAndType({ dialog: true, type: "position" });
      }
    },
    savePosition(member) {
      this.position[this.selectType][member.position] = member.name;
    }
  }
};
</script>

<style>
.position__field {
  background: #a5d6a7;
}
.position__bench {
  background: #f1cd74;
}
.position__name {
  justify-content: center;
  margin: 0 auto;
  width: 108px;
}
</style>