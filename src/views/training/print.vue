<template>
  <v-container fluid class="px-5 py-0">
    <v-row class="py-0" justify="center">
      <v-col cols="1" class="col__fist pa-0">
        <div class="background__label"></div>
        <v-avatar class="avatar__item avatar__item-no" size="56"></v-avatar>
        <div class="label__text label__text-date">Session Date</div>
        <v-avatar class="avatar__item avatar__item-date" size="56"></v-avatar>
        <div class="label__text label__text-season">Season</div>
        <v-avatar class="avatar__item avatar__item-season" size="56"></v-avatar>
        <div class="label__text label__text-age">Age Group</div>
        <v-avatar class="avatar__item avatar__item-age" size="56"></v-avatar>
        <div class="label__text label__text-players">Players</div>
        <v-avatar class="avatar__item avatar__item-players" size="56"></v-avatar>
        <div class="label__text label__text-durations">Durations</div>
        <v-avatar class="avatar__item avatar__item-durations" size="56"></v-avatar>
      </v-col>
      <v-col cols="11" class="col__second pa-0">
        <v-row class="low__first pa-1">
          <v-col cols="6" class="py-0">
            <v-text-field label="Theme" hide-details />
          </v-col>
          <v-col cols="3" class="py-0">
            <v-text-field label="Team" outlined hide-details />
          </v-col>
          <v-col cols="3" class="py-0">
            <v-text-field label="Coach" outlined hide-details />
          </v-col>
        </v-row>
        <v-row class="low__second">
          <v-col cols="3" class="py-0">
            <v-text-field label="Type" autocomplete="off" hide-details />
          </v-col>
          <v-col cols="2" class="py-0">
            <v-text-field label="Area" autocomplete="off" hide-details />
          </v-col>
          <v-col cols="7" class="py-0">
            <v-text-field label="Team Objectives" autocomplete="off" hide-details />
          </v-col>
          <v-col cols="7" class="py-0">
            <div class="file__image">
              <v-file-input
                v-model="file"
                hide-input
                clearable
                accept="image/*"
                @change="uploadImage"
              ></v-file-input>
              <v-img v-if="imageUrl" :src="imageUrl" max-height="300" contain></v-img>
            </div>
          </v-col>
          <v-divider class="mx-5" color="#8BC34A" vertical></v-divider>
          <v-col cols="3.5" class="py-1">
            <v-img src="@/assets/field.png" contain aspect-ratio="1.2"></v-img>
          </v-col>
        </v-row>
        <v-row class="low__third">
          <v-col cols="6" class="py-0">
            <v-textarea name="Set Up" label="Set Up / Organisation" outlined value rows="6" />
            <v-textarea
              name="Set Up"
              label="Key Coaching Points"
              outlined
              value
              rows="4"
              hide-details
            />
          </v-col>
          <v-divider color="#8BC34A" vertical></v-divider>
          <v-col cols="5.5" class="py-0" align-self="center">
            <v-textarea name="Set Up" label="Progressions / Constraints" outlined value rows="4" />
            <v-textarea
              name="Set Up"
              label="Questions & Notes"
              outlined
              value
              rows="4"
              hide-details
            />
            <div cl>
              <v-row>
                <v-col class="py-0" cols="6" align-self="center">
                  <span class="title">Work / Rest Ratio:</span>
                </v-col>
                <v-col class="py-0" cols="3">
                  <v-text-field suffix="mins" outlined hide-details />
                </v-col>
                <v-col class="py-0" cols="3">
                  <v-text-field suffix="sets" outlined hide-details />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async created() {
    this.$store.commit("common/setFullScreen", true);
  },
  data: () => ({
    file: null,
    imageUrl: null
  }),
  computed: {
    ...mapGetters("components/layout", {
      fullScreen: "fullScreen"
    })
  },
  methods: {
    uploadImage: function(val) {
      console.log("upload", val);
      this.imageUrl = URL.createObjectURL(val);
    }
  }
};
</script>

<style lang="scss">
.col__fist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .background__label {
    position: absolute;
    background: #8bc34a;
    width: 40px;
    height: 100%;
  }
  .avatar__item {
    border: solid 1px #8bc34a;
    background: white;
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
</style>