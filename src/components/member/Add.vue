<template>
  <v-card class="card__addForm pa-4">
    <v-form class="form">
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
          <v-text-field v-model="name" label="이름" hide-details outlined />
        </v-col>
        <v-col cols="12" class="py-2">
          <v-text-field
            v-model="nickName"
            label="닉네임"
            hide-details
            outlined
          />
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
            :items="uniform_numberList"
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
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("member");

export default {
  name: "Add",
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    name: "",
    nickName: "",
    route: null,
    uniform_number: "",
    uniform_numberList: []
    /*uniformNumberList: [26,27,28,30,31,32,34,35,36,38,39,40,41,42,43,44,45,46,47,48,49,
                50, 51, 52,54,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,72,73,74,75,76,78,79,
                80,81,82,84,85,86,87,89,90,91,92,93,95,97,98 ],*/
  }),
  created() {
    console.log("Created");
    this.loop100();
  },
  methods: {
    ...mapActions(["add_member"]),
    submit() {
      console.log("Submit data");
      let _srcData = {};

      _srcData["name"] = this.name;
      _srcData["nick_name"] = this.nickName;
      _srcData["join_date"] = this.date;
      _srcData["uniform_number"] = this.uniform_number;
      _srcData["inflow_route"] = this.route;

      console.log(_srcData);

      this.add_member(_srcData).then(() => {
        console.log("success");
      });

      this.clear();
    },

    clear() {
      //this.$v.$reset()
      this.name = "";
      this.nickName = "";
      this.date = new Date().toISOString().substr(0, 10);
      this.uniform_number = "";
      this.route = null;
    },

    loop100() {
      console.log("loop");
      for (let i = 1; i < 100; i++) {
        this.uniform_numberList.push(i);
      }
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
