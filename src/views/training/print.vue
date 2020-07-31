<template>
  <v-container fluid>
    <v-row class="low__first py-0">
      <v-col cols="6"></v-col>
      <v-col cols="3">
        <v-text-field label="Team" outlined></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field label="Coach" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="low__second py-0">
      <v-col cols="3">
        <v-text-field label="Type"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field label="Area"></v-text-field>
      </v-col>
      <v-col cols="7">
        <v-text-field label="Team Objectives"></v-text-field>
      </v-col>
      <v-col cols="8">
        <v-file-input multiple label="File input"></v-file-input>
      </v-col>
      <v-divider class="mx-5" color="#8BC34A" vertical></v-divider>
      <v-col cols="3.5">
        <v-img src="@/assets/field.png" contain aspect-ratio="0.8"></v-img>
      </v-col>
    </v-row>
    <v-row class="low__third">
      <v-col cols="6">
        <v-textarea name="Set Up" label="Set Up / Organisation" outlined value rows="10"></v-textarea>
        <v-textarea name="Set Up" label="Key Coaching Points" outlined value></v-textarea>
      </v-col>
      <v-divider color="#8BC34A" vertical></v-divider>
      <v-col cols="5.5">
        <v-textarea name="Set Up" label="Progressions / Constraints" outlined value></v-textarea>
        <v-textarea name="Set Up" label="Questions & Notes" outlined value></v-textarea>
        <div cl>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="2" align-self="center">
              <span class="title">Work / Rest Ratio:</span>
            </v-col>
            <v-col cols="3">
              <v-text-field label="mins" suffix="mins" outlined></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field label="sets" suffix="sets" outlined></v-text-field>
            </v-col>
          </v-row>
        </div>
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
  computed: {
    ...mapGetters("components/layout", {
      fullScreen: "fullScreen"
    })
  }
};
</script>

<style>
</style>