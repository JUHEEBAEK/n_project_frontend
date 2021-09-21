<template>
  <v-dialog v-model="dialog" width="480">
    <div class="dialog__container">
      <div class="dialog__header">
        {{ `${dialogTitle} 추가` }}
        <v-spacer />
        <a class="title__icon-close" @click="close" />
      </div>
      <div class="dialog__content">
        <v-form ref="formTeamAdd" class="form">
          <v-row class="bg__primary" justify="center">
            <v-col cols="12">
              <v-img width="120" class="img__top" :src="imageUrl" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-radio-group v-model="teamType" row>
                <v-radio label="팀" value="team"></v-radio>
                <v-radio label="유닛 팀" value="unitTeam"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
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
          <v-row v-if="teamType === 'unitTeam'">
            <v-col cols="12" lg="6">
              <v-text-field v-model="description" autocomplete="off" label="설명" hide-details outlined />
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="season"
                label="시즌"
                outlined
                hide-details
                prepend-inner-icon="fas fa-calendar-alt"
              />
            </v-col>
          </v-row>
        </v-form>
      </div>
      <div class="dialog__actions">
        <v-btn color="primary" large @click="submit">저장</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    dialog: Object,
    teamType: String
  },
  data: () => ({
    imageUrl: require("@/assets/images/emb-default.png"),
    name: "",
    season: new Date().toISOString().substr(0, 4),
    menuSeason: false
  }),
  computed: {
    dialogTitle() {
      return this.teamType === "team" ? "팀" : "유닛 팀";
    }
  },
  watch: {
    menuSeason(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    ...mapActions("team", ["createTeam"]),
    ...mapActions("unitTeam", ["createUnitTeam"]),
    submit() {
      if (this.$refs.formTeamAdd.validate()) {
        if (this.teamType === "team") {
          const formData = { name: this.name };
          const response = this.createTeam(formData);
          if (response) this.close();
        } else {
          const formData = {
            name: this.name,
            description: this.description,
            season: this.season
          };
          const response = this.createUnitTeam(formData);
          if (response) this.close();
        }
      }
    },
    close() {
      this.$emit("closeDialog", false);
    }
  }
};
</script>

<style scoped lang="scss">
.dialog__container {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 12px;
  .dialog__header {
    display: flex;
    padding: 12px;
    .title__icon-close {
      width: 32px;
      height: 32px;
      background: url("../../../assets/images/close.svg");
      &:hover {
        border-radius: 50%;
        background-color: #8c8c8c14;
      }
    }
  }
  .dialog__content {
    display: flex;
    padding: 12px;
    justify-content: center;
    .img__top {
      margin: 0 auto;
    }

    .input__white {
      background: #fff;
      border: solid 1px secondary;
    }
  }
  .dialog__actions {
    display: flex;
    padding: 12px;
    justify-content: flex-end;
  }
}
</style>
