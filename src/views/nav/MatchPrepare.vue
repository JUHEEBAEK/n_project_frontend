<template>
  <v-row class="match__container" justify="center">
    <v-col cols="12" lg="8" md="9" sm="12" xs="12">
      <v-contatner fluid>
        <v-row class="mx-2">
          <!-- 헤더영역 날짜와 쿼터 선택 -->
          <v-col cols="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Picker date"
                  prepend-icon="fas fa-calendar-alt"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-select :items="items" label="quarter"></v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" lg="8">
            <v-divider />
            <v-sheet>
              <v-slide-group show-arrows>
                <v-slide-item
                  v-for="item in firstDivideTeam"
                  :key="item.team"
                  v-slot:default="{ toggle }"
                >
                  <v-card class="team__box" @click.native="clickTeam(item.team)" @click="toggle">
                    <v-card-title>{{item.team}}</v-card-title>
                    <v-card-text class="member__box">
                      <span
                        v-for="data in item.items"
                        :key="data.id"
                        class="team__member"
                      >{{ data.name }}</span>
                    </v-card-text>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
            <v-divider />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="mx-2">
            <v-switch v-model="status" :label="`Status: ${setStatus}`"></v-switch>
          </v-col>
        </v-row>
        <v-row row wrap justify="center">
          <v-col cols="12">
            <h2 class="title">HOME / AWAY 팀을 선택하시오</h2>
          </v-col>
          <v-col cols="3"></v-col>
          <v-col cols="3">
            <div class="team__home">HOME</div>
          </v-col>
          <v-col cols="3">
            <div class="team__away">AWAY</div>
          </v-col>
          <v-col cols="3"></v-col>
          <v-col cols="12">
            <div class="selectTeam__box">
              <div class="team__home">
                <v-card color="grey lighten-2" width="150" height="150">
                  <v-card-title class="py-2 justify-center">{{homeTeam.team}}</v-card-title>
                  <v-card-text class="member__box justify-center">
                    <span
                      v-for="member in homeTeam.items"
                      :key="member.id"
                      class="team__member"
                    >{{ member.name }}</span>
                  </v-card-text>
                </v-card>
              </div>
              <div class="align-self-center">
                <h2 class="mx-3">VS</h2>
              </div>
              <div class="team__away">
                <v-card color="grey lighten-2" width="150" height="150">
                  <v-card-title class="py-2 justify-center">{{awayTeam.team}}</v-card-title>
                  <v-card-text class="member__box justify-center">
                    <span
                      v-for="member in awayTeam.items"
                      :key="member.id"
                      class="team__member"
                    >{{ member.name }}</span>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="position__field" justify="center">
          <v-col
            cols="4"
            class="text-center"
            align-self="center"
            v-for="item in positionList"
            :key="item"
          >
            <v-btn v-if="item" @click="openDialog(item)">{{ item }}</v-btn>
            <v-text-field
              v-if="item"
              class="position__name"
              v-model="position[selectType][item]"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-contatner>
      <dialog-position
        v-if="dialog===true && type==='position'"
        :selectTeam="selectTeam"
        :selectPosition="selectPosition"
        @savaPosition="savaPosition"
      ></dialog-position>

      <util-snack-bar :purpose="snackBarPurpose" :message="snackBarMessage" />
    </v-col>
  </v-row>
</template>

<script>
// mixin
import dialog from "../../mixin/dialog.js";
import dummy from "../../assets/value/dummy.json";
import Position from "../../assets/value/Postion.json";

export default {
  mixins: [dialog],
  created() {},
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    items: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
    status: true,
    firstDivideTeam: dummy.firstDivideTeam,
    attendList: [],
    homeTeam: {},
    awayTeam: {},
    selectTeam: {},
    selectType: "Home",
    selectPosition: null,
    positionList: Position.list,
    position: Position.basicPostion
  }),
  computed: {
    setStatus() {
      if (this.status) {
        this.selectType = "Home";
        return "Home";
      } else {
        this.selectType = "Away";
        return "Away";
      }
    }
  },
  methods: {
    openDialog(val) {
      console.log(val);
      // position dialog open;;
      this.selectPosition = val;
      if (this.status) {
        this.selectTeam = this.homeTeam;
      } else {
        this.selectTeam = this.awayTeam;
      }
      if (this.homeTeam.team && this.awayTeam.team) {
        this.setDialogAndType({ dialog: true, type: "position" });
      }
    },
    clickTeam(value) {
      // 팀 선택 하는 것. 코드 정리가 무조건 필요해 보임 ...
      // TODO 코드 리뷰 필요
      if (this.status) {
        if (this.homeTeam === this.firstDivideTeam[value]) {
          let tmp = {};
          tmp = this.awayTeam;
          this.awayTeam = this.homeTeam;
          this.homeTeam = tmp;
        } else if (this.awayTeam === this.firstDivideTeam[value]) {
          tmp = this.homeTeam;
          let tmp = {};
          this.homeTeam = this.awayTeam;
          this.awayTeam = tmp;
        } else {
          this.homeTeam = this.firstDivideTeam[value];
        }
      } else {
        if (this.awayTeam === this.firstDivideTeam[value]) {
          tmp = this.homeTeam;
          let tmp = {};
          this.homeTeam = this.awayTeam;
          this.awayTeam = tmp;
        } else if (this.homeTeam === this.firstDivideTeam[value]) {
          let tmp = {};
          tmp = this.awayTeam;
          this.awayTeam = this.homeTeam;
          this.homeTeam = tmp;
        } else {
          this.awayTeam = this.firstDivideTeam[value];
        }
      }
    },
    savaPosition(member) {
      this.position[this.selectType][member.position] = member.name;
      console.log(this.position);
    }
  }
};
</script>

<style>
.match__container {
}
.team__box {
  margin: 5px;
  overflow-y: scroll;
  max-width: 250px;
  max-height: 250px;
}
.member__box {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}
.team__member {
  margin: 3px;
}
.selectTeam__box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.position__box {
  padding: 13px 0;
  background-color: lightgrey;
  border-radius: 5px;
  height: 50px;
}
.position__field {
  background: #a5d6a7;
}
.position__bench {
  background: #8d6e63;
}
.position__name {
  justify-content: center;
  margin: 0 auto;
  width: 108px;
}
</style>