<template>
  <v-row class="match__container" justify="center">
    <v-col cols="12" lg="8" md="9" sm="12" xs="12">
      <v-contatner fluid>
        <v-form ref="form">
          <v-row class="mx-2">
            <!-- 헤더영역 날짜와 쿼터 선택 -->
            <v-col cols="6" class="py-1">
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
            <v-col cols="6" class="py-0">
              <v-select :items="items" label="quarter" :rules="emptyCheckRules"></v-select>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" lg="8" class="py-0" align-self="center">
              <v-divider />
              <v-sheet v-if="'A' in firstDivideTeam">
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
                  <v-slide-item class="align-self-center">
                    <v-btn color="primary" small icon @click="removeTeam">
                      <v-icon size="24" v-text="'fas fa-minus-circle'"></v-icon>
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
              <v-sheet v-else color="grey lighten-4" class="vertical-middle py-10">
                <v-btn large @click="openTeamList">Team 불러오기</v-btn>
              </v-sheet>
              <v-divider />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mx-2 py-1">
              <v-switch class="mt-0" v-model="status" :label="`Status: ${setStatus}`"></v-switch>
            </v-col>
          </v-row>
          <v-row row wrap justify="center">
            <v-col cols="3"></v-col>
            <v-col cols="3" class="py-1">
              <div class="team__home">HOME</div>
            </v-col>
            <v-col cols="3" class="py-1">
              <div class="team__away">AWAY</div>
            </v-col>
            <v-col cols="3"></v-col>
            <v-col cols="12">
              <div class="selectTeam__box">
                <div class="team__home">
                  <v-card color="grey lighten-2" width="150" height="150">
                    <v-card-title class="justify-center">{{homeTeam.team}}</v-card-title>
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
                    <v-card-title class="justify-center">{{awayTeam.team}}</v-card-title>
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
                :rules="positionDuplicateRules"
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
                :rules="positionDuplicateRules"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="save" color="primary">저장</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-contatner>
      <dialog-squad-position
        v-if="dialog===true && type==='position'"
        :selectTeam="selectTeam"
        :selectPosition="selectPosition"
        @savaPosition="savaPosition"
      ></dialog-squad-position>

      <dialog-squad-team-list v-if="dialog===true && type==='teamList'" @selectTeam="saveTeam"></dialog-squad-team-list>

      <util-snack-bar :purpose="snackBarPurpose" :message="snackBarMessage" />
    </v-col>
  </v-row>
</template>

<script>
// mixin
import dialog from "../../../mixin/dialog.js";
import regex from "../../../mixin/regex.js";
import dummy from "../../../assets/value/dummy.json";
import Position from "../../../assets/value/Postion.json";

export default {
  mixins: [dialog, regex],
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
    benchList: Position.benchList,
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
      let isHome = this.status;
      let selectedTeam = this.firstDivideTeam[value];
      let targetTeam = null;
      let oppositeTeam = null;
      if (isHome) {
        targetTeam = this.homeTeam;
        oppositeTeam = this.awayTeam;
      } else {
        targetTeam = this.awayTeam;
        oppositeTeam = this.homeTeam;
      }

      let checkOppositeTeamIsSame = selectedTeam === oppositeTeam;
      if (checkOppositeTeamIsSame) {
        // swap home and away
        let tmp = {};
        tmp = targetTeam;
        targetTeam = oppositeTeam;
        oppositeTeam = tmp;
      } else {
        targetTeam = this.firstDivideTeam[value];
      }

      if (isHome) {
        this.homeTeam = targetTeam;
        this.awayTeam = oppositeTeam;
      } else {
        this.homeTeam = oppositeTeam;
        this.awayTeam = targetTeam;
      }
    },
    openTeamList: function() {
      console.log("open");
      this.setDialogAndType({ dialog: true, type: "teamList" });
    },
    removeTeam() {
      console.log("remove");
      this.firstDivideTeam = {};
      this.homeTeam = "";
      this.awayTeam = "";
    },
    save() {
      console.log("SAVE");
      if (this.$refs.form.validate()) {
      }
    },
    // 중복된 선수가 있는지 체크 해주는 함수.
    checkedDuplicatePostion: function(value) {
      // TODO: 중복된 선수 rules
      console.log("checkedDuplicatePostion", value);
      return true;
    },
    savaPosition(member) {
      this.position[this.selectType][member.position] = member.name;
    },
    saveTeam(item) {
      this.firstDivideTeam = dummy.firstDivideTeam;
      this.setDialogAndType({ dialog: false, type: null });
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
  background: #f1cd74;
}
.position__name {
  justify-content: center;
  margin: 0 auto;
  width: 108px;
}
</style>