<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card :loading="isLoading">
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="memberInfo.name" label="이름"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu
                v-model="menuJoinDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    label="입단일"
                    hide-details
                    readonly
                    prepend-icon="fas fa-calendar-alt"
                    :value="memberInfo.join_date"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="memberInfo.join_date" @input="menuJoinDate = false" />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="memberInfo.uniform_number"
                label="등번호"
                hide-details
                :items="uniform_number_not_used_list"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="memberInfo.nick_name" label="닉네임"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="memberInfo.grade"
                :items="grades"
                item-text="text"
                item-value="value"
                label="등급"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" v-if="memberInfo.grade === 3">
              <v-menu
                v-model="menuWithDrawDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    label="탈퇴날짜"
                    hide-details
                    clearable
                    readonly
                    prepend-icon="fas fa-calendar-alt"
                    :value="memberInfo.withdraw_date"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="memberInfo.withdraw_date" @input="menuWithDrawDate = false" />
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
      required: true
    },
    clickedInfo: {
      type: Object
    },
    memberList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data: () => ({
    menuWithDrawDate: false,
    menuJoinDate: false,

    grades: [
      { text: "정회원", value: 1 },
      { text: "준회원", value: 2 },
      { text: "탈퇴", value: 3 }
    ],

    editedIndex: -1,
    memberInfo: {
      name: "",
      grade: 2,
      join_date: new Date().toISOString().substr(0, 10),
      uniform_number: "",
      withdraw_date: null
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "회원 추가" : "회원 수정";
    },
    uniform_number_not_used_list() {
      let defaultNumList = [];
      for (let i = 1; i < 100; i++) {
        defaultNumList.push(i);
      }
      const useUniformNumberList = this.memberList
        .filter(member => Number(member.uniform_number) !== 0)
        .map(member => Number(member.uniform_number));
      // TODO: 이거 오래걸리는지 확인 필요
      const unUsedUniformNumberList = defaultNumList.filter(number => !useUniformNumberList.includes(number));

      unUsedUniformNumberList.unshift("");
      // 자기 번호 다시 넣어주기
      unUsedUniformNumberList.push(this.memberInfo.uniform_number);
      return unUsedUniformNumberList;
    }
  },
  watch: {
    clickedInfo(info) {
      if (info.id) {
        this.setMemberInfo(info);
      }
    }
  },
  methods: {
    ...mapActions("member", ["createMember", "updateMember"]),
    setMemberInfo(info) {
      this.editedIndex = this.memberList.indexOf(info);
      this.memberInfo = Object.assign({}, info);
      this.memberInfo.grade = info.grade;
      this.memberInfo.uniform_number = Number(info.uniform_number);
    },
    save: async function() {
      this.isLoading = true;
      if (this.editedIndex === -1) {
        const _srcData = {};
        _srcData["name"] = this.memberInfo.name;
        _srcData["nick_name"] = this.memberInfo.nickName;
        _srcData["join_date"] = this.memberInfo.join_date;
        _srcData["uniform_number"] = this.memberInfo.uniform_number;
        _srcData["inflow_route"] = "O";
        const response = await this.createMember(_srcData);
        if (response) {
          this.close();
        }
      } else {
        const formData = { member_id: this.clickedInfo.id, member: this.memberInfo };
        const response = await this.updateMember(formData);
        if (response) {
          this.close();
        }
      }

      this.isLoading = false;
    },
    close() {
      this.init();
      this.$emit("toggleDialog", false);
    },
    init() {
      this.editedIndex = -1;
      this.memberInfo = {
        name: "",
        grade: 2,
        join_date: new Date().toISOString().substr(0, 10),
        uniform_number: "",
        withdraw_date: null
      };
    }
  }
};
</script>

<style></style>
