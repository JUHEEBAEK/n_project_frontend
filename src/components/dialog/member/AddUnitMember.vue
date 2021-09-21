<template>
  <v-dialog v-model="dialog" persistent width="480">
    <div class="dialog__container">
      <div class="dialog__header">
        유닛 팀 선수 추가
        <v-spacer />
        <a class="title__icon-close" @click="close" />
      </div>
      <div class="dialog__content">
        <v-form ref="formUnitTeamModify" class="form__container">
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="selectedMember"
                :items="memberWithoutTeamList"
                dense
                label="선수 선택"
                autocomplete="off"
                item-text="name"
                item-value="id"
                outlined
                return-object
              ></v-autocomplete>
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
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    unitTeamId: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    memberWithoutTeamList: [],
    name: "",
    description: "",
    season: null
  }),
  computed: {
    ...mapGetters("unitMember", ["allUnitMembers"]),
    ...mapGetters("member", ["memberList"])
  },
  async created() {
    await this.loadAllUnitMemberList();
    this.loadMemberList();
  },
  methods: {
    ...mapActions("unitMember", ["getAllUnitMemberList", "createUnitMember"]),
    ...mapActions("member", ["getRegularMemberList"]),
    async loadAllUnitMemberList() {
      await this.getAllUnitMemberList();
    },
    async loadMemberList() {
      await this.getRegularMemberList();
      const memberIdList = this.allUnitMembers.map(member => member.member_id);
      this.setMemberWithoutTeamList(memberIdList);
    },
    setMemberWithoutTeamList(memberIdList) {
      this.memberWithoutTeamList = this.memberList.filter(item => memberIdList.indexOf(item.id) < 0);
    },
    save: async function() {
      this.$emit("setLoading", true);
      const body = {
        member_id: this.selectedMember.id,
        unit_team_id: this.unitTeamId
      };
      const response = await this.createUnitMember(body);
      if (response) this.close();
      this.$emit("setLoading", false);
    },
    close() {
      this.$emit("close", false);
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/scss/components/dialogTemplate.scss" />
