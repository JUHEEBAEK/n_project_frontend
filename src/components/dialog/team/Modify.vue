<template>
  <v-dialog v-model="dialog" width="600">
    <div class="dialog__container">
      <div class="dialog__header">
        유닛 팀 정보 수정
        <v-spacer />
        <a class="title__icon-close" @click="close" />
      </div>
      <div class="dialog__content">
        <v-form ref="formUnitTeamModify" class="form">
          <v-row>
            <v-col cols="12" class="py-2">
              <v-text-field
                v-model="name"
                label="팀 이름"
                hide-details
                outlined
                :rules="[v => !!v || '입력해주십시오.']"
              />
            </v-col>
            <v-col cols="12" class="py-2">
              <v-text-field
                v-model="description"
                label="상세정보"
                hide-details
                outlined
                :rules="[v => !!v || '입력해주십시오.']"
              />
            </v-col>
            <v-col cols="12" class="py-2">
              <v-text-field
                v-model="season"
                type="number"
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
        <v-btn color="primary" @click="save">저장</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    selectedTeam: {
      type: Object,
      default: () => {}
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    name: "",
    description: "",
    season: null
  }),
  watch: {
    selectedTeam(selectedTeam) {
      if (selectedTeam) {
        this.setTeamInfo(selectedTeam);
      }
    }
  },
  methods: {
    ...mapActions("unitTeam", ["updateUnitTeam"]),
    setTeamInfo(selectedTeam) {
      console.log(selectedTeam);
      this.name = selectedTeam.name;
      this.description = selectedTeam.description;
      this.season = selectedTeam.season;
    },
    save: async function() {
      this.$emit("setLoadingBar", true);
      const body = {
        id_unit_team: this.selectedTeam.id_unit_team,
        unit_team_info: {
          name: this.name,
          description: this.description,
          season: this.season
        }
      };
      const response = await this.updateUnitTeam(body);

      if (response) {
        this.close();
      }
      this.$emit("setLoadingBar", false);
    },
    close() {
      this.$emit("closeDialog");
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
  }
  .dialog__actions {
    display: flex;
    padding: 12px;
    justify-content: flex-end;
  }
}
</style>
