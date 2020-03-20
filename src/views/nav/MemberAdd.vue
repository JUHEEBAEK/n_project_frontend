<template>
  <div>
    <core-Back :tableHeader="title" />
    <v-card class="card__addForm pa-4">
      <v-form ref="formMemberAdd" class="form">
        <v-row class="bg__primary py-10" justify="center">
          <v-col cols="12">
            <v-img
              width="80"
              height="80"
              class="img__top"
              src="../../assets/linear/light/user.png"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-2">
            <v-text-field
              v-model="name"
              label="이름"
              hide-details
              outlined
              :rules="[v => !!v || '입력해주십시오.']"
            />
          </v-col>
          <v-col cols="12" class="py-2">
            <v-text-field v-model="nickName" label="닉네임" hide-details outlined />
          </v-col>
          <v-col cols="12" class="py-2">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="입단일"
                  outlined
                  hide-details
                  prepend-inner-icon="fas fa-calendar-alt"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="date" @input="menu = false" />
            </v-menu>
          </v-col>
          <v-col cols="12" class="py-2">
            유입경로
            <v-radio-group v-model="route" row>
              <v-radio label="인스타" value="I" />
              <v-radio label="블로그" value="B" />
              <v-radio label="기타" value="O" />
            </v-radio-group>
          </v-col>
          <v-col cols="12" class="py-2">
            <v-autocomplete
              v-model="uniform_number"
              label="등번호"
              hide-details
              outlined
              :items="uniform_number_not_used_list"
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
import util from "../../mixin/util.js";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: memberMapState,
  mapActions: memberMapActions
} = createNamespacedHelpers("member");

export default {
  name: "Add",
  mixins: [util],
  data: () => ({
    title: "MEMBER ADD",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    name: "",
    nickName: "",
    route: null,
    uniform_number: ""
  }),
  computed: {
    ...memberMapState(["searchResult"]),
    uniform_number_not_used_list() {
      let number_list_1to99 = [];
      for (let i = 1; i < 100; i++) {
        number_list_1to99.push(i);
      }
      for (let i in this.searchResult) {
        let id_used = Number(this.searchResult[i]["uniform_number"]);
        let idx = number_list_1to99.indexOf(id_used);
        if (idx > -1) number_list_1to99.splice(idx, 1);
      }

      return number_list_1to99;
    }
  },
  created() {},
  async mounted() {
    this.select_member();
  },
  methods: {
    ...memberMapActions(["add_member", "select_member"]),
    submit() {
      if (this.$refs.formMemberAdd.validate()) {
        let _srcData = {};
        _srcData["name"] = this.name;
        _srcData["nick_name"] = this.nickName;
        _srcData["join_date"] = this.date;
        _srcData["uniform_number"] = this.uniform_number;
        _srcData["inflow_route"] = this.route;

        this.add_member(_srcData).then(() => {
          this.setSnackBar(this.snackBarSuccess, "정상적으로 추가되었습니다");
        });

        this.clear();
      }
    },
    clear() {
      //this.$v.$reset()
      this.name = "";
      this.nickName = "";
      this.date = new Date().toISOString().substr(0, 10);
      this.uniform_number = "";
      this.route = null;
    }
  }
};
</script>

<style scoped>
.bg__primary {
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
