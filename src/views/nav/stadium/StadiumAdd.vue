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
              :rules="[(v) => !!v || '입력해주십시오.']"
            />
          </v-col>

          <v-col cols="9">
            <v-text-field v-model="searchKeyword" label="주소 검색어" />
          </v-col>
          <v-col cols="3">
            <v-btn @click="searchWithKeyword(searchKeyword)">주소 검색 </v-btn>
          </v-col>
          <v-col>
            <v-list>
              <v-list-item
                v-for="item in serachlist"
                :key="item.id"
                @click="setAddress(item)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.place_name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.address_name"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <!--
                  https://vuetifyjs.com/ko/components/lists/
                  TODO: 돋보기 대신에 카카오맵 아이콘 들어가면 괜찮을 듯
                  -->
                  <v-icon>
                    fas fa-search
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <div v-for="value in serachlist" :key="value.id">
              {{ value.place_name }}
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="value.place_url"
              >
                링크
              </a>
              <v-btn @click="setAddress(value)">
                선택
              </v-btn>

              <br />
            </div>
          </v-col>

          <v-col cols="12" class="py-2">
            <v-text-field
              v-model="placeName"
              label="장소명"
              hide-details
              outlined
              :rules="[(v) => !!v || '입력해주십시오.']"
              disabled
            />
          </v-col>
          <v-col cols="12" class="py-2">
            <v-text-field
              v-model="address"
              label="주소"
              hide-details
              outlined
              :rules="[(v) => !!v || '입력해주십시오.']"
              disabled
            />
          </v-col>

          <v-col cols="12" class="py-2">
            <v-text-field
              v-model="nickName"
              label="닉네임"
              hide-details
              outlined
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
import util from "@/mixin/util.js";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions,
} = createNamespacedHelpers("stadium");

export default {
  name: "Add",
  mixins: [util],
  data: () => ({
    title: "STADIUM ADD",
    name: "",
    searchKeyword: "",
    serachlist: [],
    placeName: "",
    address: "",
    nickName: "",
  }),

  methods: {
    ...stadiumMapActions(["add_stadium"]),
    submit() {
      if (this.$refs.formStadiumAdd.validate()) {
        let _srcData = {};
        _srcData["name"] = this.name;
        _srcData["nick_name"] = this.nickName;
        _srcData["address"] = this.address;

        this.add_stadium(_srcData).then(() => {
          this.setSnackBar(this.snackBarSuccess, "정상적으로 추가되었습니다");
          history.back();
        });
      }
    },
    searchWithKeyword(keyWord) {
      // backend에서 주소 받아오기
      // 주소마다 kakao에 쿼리 보내기
      let _this = this;
      const places = new kakao.maps.services.Places();
      var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log("searchWithKeyword", result);
          _this.serachlist = result;
          // result를 어디다가 담은다음에 리스트로 쭉 보여주고
          // list가 클릭되면

          // address_name: "서울 용산구 이촌동 300-19"
          // category_group_code: "FD6"
          // category_group_name: "음식점"
          // category_name: "음식점 > 간식 > 제과,베이커리 > 파리바게뜨"
          // distance: ""
          // id: "13283515"
          // phone: "02-793-6252"
          // place_name: "파리바게뜨 이촌시그니처점"
          // place_url: "http://place.map.kakao.com/13283515"
          // road_address_name: "서울 용산구 이촌로 278-1"
          // x: "126.97763665362295"
          // y: "37.51853314013861"
        }
      };

      places.keywordSearch(keyWord, callback, { size: 10 });
    },
    setAddress(new_address) {
      this.address = new_address.address_name;
      this.placeName = new_address.place_name;
      this.serachlist = [];
    },
  },
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
