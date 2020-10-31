<template>
  <div>
    <core-Back :tableHeader="title" />
    <v-card class="card__addForm pa-4">
      <v-form ref="formTeamAdd" class="form">
        <v-row class="bg__primary py-10" justify="center">
          <v-col cols="12">
            <v-img
              width="120"
              class="img__top"
              src="../../../assets/images/emb-default.png"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"> 
            <v-radio-group v-model="teamType" row>
              <v-radio label="팀" value="Team"></v-radio>
              <v-radio label="유닛 팀" value="Unit"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" class="py-2">
            <v-text-field
              v-model="name"
              autocomplete="off"
              label="이름"
              hide-details
              outlined
              :rules="[v => !!v || '입력해주십시오.']"
            />
          </v-col>
        </v-row>
        <v-row v-if="teamType === 'Unit'">
          <v-col cols="12" lg="6" class="py-2">
            <v-text-field
              v-model="description"
              autocomplete="off"
              label="설명"
              hide-details
              outlined
            />
          </v-col>
          <v-col cols="12" lg="6" class="py-2">
            <v-text-field
              v-model="season"
              label="시즌"
              outlined
              hide-details
              prepend-inner-icon="fas fa-calendar-alt"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-right">
            <v-btn color="primary" large @click="submit">저장</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <util-snack-bar :purpose="snackBarPurpose" :message="snackBarMessage" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import util from "../../../mixins/util.js";
import { createNamespacedHelpers } from "vuex";
const {
  mapActions: teamMapActions
} = createNamespacedHelpers("team");

export default {
  name: "TeamAdd",
  mixins: [util],
  data: () => ({
    title: "TEAM ADD",
    name: "",
    teamType: "Team",
    season: new Date().toISOString().substr(0, 4),
    menuSeason: false,
  }),
  computed: {
    ...mapGetters("common", {
      fullScreen: "fullScreen"
    })
  },
  watch: {
    menuSeason (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  created() {
    this.$store.commit("common/SET_FULL_SCREEN", true);
  },
  methods: {
    ...teamMapActions(["add_team", "add_unit_team"]),
    submit() {
      if (this.$refs.formTeamAdd.validate()) {
        if(this.teamType === "Team") {
          let _srcData = {};
          _srcData["name"] = this.name;
          this.add_team(_srcData).then(() => {
            this.setSnackBar(this.snackBarSuccess, "정상적으로 추가되었습니다");
            history.back();
          });
        }else {
          let _srcData = {};
          _srcData["name"] = this.name;
          _srcData["description"] = this.description;
          _srcData["season"] = this.season;
          this.add_unit_team(_srcData).then(() => {
            this.setSnackBar(this.snackBarSuccess, "정상적으로 추가되었습니다");
            history.back();
          });
        }
      }
    }
  }
};
</script>

<style scoped>
ㅣ.bg__primary {
  background-color: #002d5d;
}

.img__top {
  margin: 0 auto;
}

.input__white {
  background: #fff;
  border: solid 1px secondary;
}
</style>
