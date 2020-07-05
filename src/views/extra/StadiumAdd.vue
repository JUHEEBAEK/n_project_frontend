<template>
  <div>
    <core-Back :tableHeader="title" />
    <v-card class="card__addForm pa-4">
      <v-form ref="formStadiumAdd" class="form">
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
            <v-text-field
              v-model="address"
              label="주소"
              hide-details
              outlined
              :rules="[v => !!v || '입력해주십시오.']"
            />
          </v-col>

          <v-col cols="12" class="py-2">
            <v-text-field v-model="nickName" label="닉네임" hide-details outlined />
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
import util from "@/mixin/util.js";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");

export default {
  name: "Add",
  mixins: [util],
  data: () => ({
    title: "STADIUM ADD",
    name: "",
    address: "",
    nickName: "",
  }),
  
  methods:{
    ...stadiumMapActions(['add_stadium']),
    submit() {
      if (this.$refs.formStadiumAdd.validate()) {
        let _srcData = {};
        _srcData["name"] = this.name;
        _srcData["nick_name"] = this.nickName;
        _srcData["address"] = this.address;

        this.add_stadium(_srcData).then(() => {
          this.setSnackBar(this.snackBarSuccess, "정상적으로 추가되었습니다");
          history.back()
        });
      }
    },
  }
}

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
