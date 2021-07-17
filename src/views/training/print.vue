<template>
  <v-container fluid class="px-5 py-0">
    <v-row class="py-0 page__first" justify="center">
      <v-col cols="1" class="col__fist pa-0">
        <div class="background__label"></div>
        <v-avatar
          class="avatar__item avatar__item-top avatar__item-no"
          size="56"
        ></v-avatar>
        <div class="label__text label__text-date">Session Date</div>
        <v-avatar
          class="avatar__item avatar__item-top avatar__item-date"
          size="56"
        ></v-avatar>
        <div class="label__text label__text-season">Season</div>
        <v-avatar
          class="avatar__item avatar__item-top avatar__item-season"
          size="56"
        ></v-avatar>
        <div class="label__text label__text-age">Age Group</div>
        <v-avatar class="avatar__item avatar__item-age" size="56"></v-avatar>
        <div class="label__text label__text-players">Players</div>
        <v-avatar
          class="avatar__item avatar__item-players"
          size="56"
        ></v-avatar>
        <div class="label__text label__text-durations">Durations</div>
        <v-avatar
          class="avatar__item avatar__item-durations"
          size="56"
        ></v-avatar>
      </v-col>
      <v-col cols="11" class="col__second pa-0">
        <v-row class="low__first my-1 pa-2">
          <v-col cols="6" class="py-0">
            <v-text-field label="훈련 테마" dense hide-details />
          </v-col>
          <v-col cols="3" class="py-0" align-self="center">
            <v-autocomplete
              v-model="team"
              :items="teamList"
              class="mx-4"
              dense
              outlined
              hide-details
              label="팀"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3" class="py-0" align-self="center">
            <v-autocomplete
              v-model="coach"
              :items="coachList"
              class="mx-4"
              dense
              hide-details
              outlined
              label="코치/감독"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="low__second">
          <v-col cols="3" class="py-0">
            <v-text-field label="유형" autocomplete="off" hide-details />
          </v-col>
          <v-col cols="2" class="py-0">
            <v-text-field label="지역" autocomplete="off" hide-details />
          </v-col>
          <v-col cols="7" class="py-0">
            <v-text-field label="팀 목표" autocomplete="off" hide-details />
          </v-col>
          <v-col cols="7" class="py-0">
            <div>
              <input
                ref="hiddenInputFile"
                class="file__input"
                type="file"
                accept="image/png, image/jpeg"
                @change="onChangeImages"
              />
            </div>
            <div class="file__image">
              <div>
                <v-img
                  v-if="imageUrl"
                  :src="imageUrl"
                  height="240px"
                  width="480px"
                  contain
                ></v-img>
              </div>
            </div>
          </v-col>
          <v-divider class="mx-3" color="#93278f" vertical></v-divider>
          <v-col cols="3.5" class="py-1 img__field">
            <v-btn icon fab small @click="clickFileUpload">
              <v-icon>fas fa-image</v-icon>
            </v-btn>
            <v-btn icon fab small @click="clearImage">
              <v-icon>fas fa-trash-alt</v-icon>
            </v-btn>
            <v-img
              class="pa-0"
              src="@/assets/images/field.png"
              contain
              aspect-ratio="1.15"
            ></v-img>
          </v-col>
        </v-row>
        <v-row class="low__third">
          <v-col cols="6" class="py-0">
            <v-textarea
              name="Set Up"
              label="Set Up / Organisation"
              outlined
              value
              rows="6"
            />
            <v-textarea
              name="Set Up"
              label="Key Coaching Points"
              outlined
              value
              rows="5"
              hide-details
            />
          </v-col>
          <v-divider color="#00c0ff" vertical></v-divider>
          <v-col cols="5.5" class="py-0" align-self="center">
            <v-textarea
              name="Set Up"
              label="Progressions / Constraints"
              outlined
              value
              rows="4"
            />
            <v-textarea
              name="Set Up"
              label="Questions & Notes"
              outlined
              value
              rows="5"
              hide-details
            />
            <div cl>
              <v-row>
                <v-col class="py-0" cols="6" align-self="center">
                  <span class="title">Work / Rest Ratio:</span>
                </v-col>
                <v-col class="py-1" cols="3">
                  <v-text-field suffix="분" dense outlined hide-details />
                </v-col>
                <v-col class="py-1" cols="3">
                  <v-text-field suffix="초" dense outlined hide-details />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="page__second">
      <v-col cols="4">
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
              label="훈련 날짜"
              hide-details
              prepend-inner-icon="fas fa-calendar-alt"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="menu = false" />
        </v-menu>
      </v-col>
      <v-col cols="4">
        <v-autocomplete
          v-model="팀"
          :items="teamList"
          class="mx-4"
          flat
          label="팀"
        ></v-autocomplete>
        <!-- <v-text-field label="" hide-details /> -->
      </v-col>
      <v-col cols="4">
        <v-autocomplete
          v-model="코치"
          :items="coachList"
          class="mx-4"
          flat
          label="코치/감독"
        ></v-autocomplete>
        <!-- <v-text-field label="Coach" hide-details /> -->
      </v-col>

      <v-col cols="12" class="py-0">
        <v-text-field label="세션 목표" dense hide-details />
      </v-col>
      <v-col cols="12" class="py-2">
        <v-simple-table class="table__simple">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="pa-1 text-left text__short">선수 Player</th>
                <th class="pa-1 text-left">기술적 Technical</th>
                <th class="pa-1 text-left">전술적 Tectical</th>
                <th class="pa-1 text-left">사회적 Social</th>
                <th class="pa-1 text-left">정신적 Psychological</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 4" :key="n">
                <td class="td__blank">
                  <v-text-field
                    dense
                    counter="7"
                    hide-details
                    min-height="30px"
                  />
                </td>
                <td class="td__blank">
                  <v-text-field
                    dense
                    counter="24"
                    hide-details
                    min-height="30px"
                  />
                </td>
                <td class="td__blank">
                  <v-text-field
                    dense
                    counter="24"
                    hide-details
                    min-height="30px"
                  />
                </td>
                <td class="td__blank">
                  <v-text-field
                    dense
                    counter="24"
                    hide-details
                    min-height="30px"
                  />
                </td>
                <td class="td__blank">
                  <v-text-field
                    dense
                    counter="24"
                    hide-details
                    min-height="30px"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>

      <v-col cols="9" class="py-1">
        <v-simple-table class="table__simple-down">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="pa-1 text-left">선수 Player</th>
                <th class="pa-1 text-left">기술적 Technical</th>
                <th class="pa-1 text-left">전술적 Tectical</th>
                <th class="pa-1 text-left">사회적 Social</th>
                <th class="pa-1 text-left">정신적 Psychological</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 10" :key="n">
                <td class="td__blank">
                  <v-text-field dense counter="7" hide-details />
                </td>
                <td class="td__blank">
                  <v-text-field dense counter="24" hide-details />
                </td>
                <td class="td__blank">
                  <v-text-field dense counter="24" hide-details />
                </td>
                <td class="td__blank">
                  <v-text-field dense counter="24" hide-details />
                </td>
                <td class="td__blank">
                  <v-text-field dense counter="24" hide-details />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="3" class="py-1">
        <v-img
          src="@/assets/images/field.png"
          contain
          aspect-ratio="0.8"
        ></v-img>
        <v-textarea
          class="py-2"
          label="결론"
          outlined
          value
          rows="3"
          hide-details
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import regex from "../../mixins/regex";

export default {
  mixins: [regex],
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    coach: null,
    coachList: ["김훈성"],
    file: null,
    imageUrl: null,
    menu: false,
    team: null,
    teamList: ["TNT FC"]
  }),
  computed: {
    ...mapGetters("components/layout", {
      fullScreen: "fullScreen"
    })
  },
  async created() {
    this.$store.commit("common/SET_FULL_SCREEN", true);
  },
  methods: {
    clearImage: function() {
      this.imageUrl = null;
    },
    clickFileUpload: function() {
      this.$refs.hiddenInputFile.click();
    },
    onChangeImages(e) {
      console.log(e);
      const file = e.target.files[0]; // Get first index in files
      this.imageUrl = URL.createObjectURL(file); // Create File URL
    }
  }
};
</script>

<style lang="scss">
// 1) #0d4dff, #00ffa9;
// 2) #0d4dff, #00ffa9;
$topColor: #93278f;
$downColor: #00c0ff;
.col__fist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .background__label {
    position: absolute;
    background: linear-gradient(to top right, $downColor 20%, $topColor 80%);
    width: 40px;
    height: 100vh;
  }
  .avatar__item {
    border: solid 1px $downColor;
    background: white;
    &-top {
      border: solid 1px $topColor;
    }
  }
  .label__text {
    color: white;
    transform: rotate(-90deg);
    font-weight: 700;
    font-size: 12px;
  }
}
.col__second {
  .low__second {
    .file__image {
      display: flex;
      align-self: center;
      flex-direction: row;
    }
  }
}
.page__second {
  margin: 4px 0;
}

.td__blank {
  padding: 2px 4px !important;
  height: 45px;
  min-height: 45px;
}
.text__short {
  width: 140px;
}
.table__simple {
  thead {
    background: $topColor;
    opacity: 0.8;
    tr > th {
      color: white !important;
    }
  }
}
.table__simple-down {
  thead {
    background: $downColor;
    opacity: 0.8;
    tr > th {
      color: white !important;
    }
  }
}
.v-data-table td {
  height: 36px !important;
}
.theme--light.v-data-table thead tr:last-child th {
  height: 15px !important;
}
.img__field {
  display: flex;
  flex-direction: row;
}
.file__input {
  display: none;
}
</style>