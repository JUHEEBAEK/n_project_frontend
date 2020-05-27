<template>
  <v-card outlined class="pa-3">
    <v-row wrap justify="center">
      <v-col cols="1" align-self="center">
        <v-img src="../../assets/sun.png" contain width="30" height="30" />
      </v-col>
      <v-col cols="11">
        <div class="text-left">
          <v-chip
            v-for="member in good_attend"
            :key="member.name"
            dark
            label
            :outlined="member.attend ? 'outlined' : ''"
            :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
            :color="member.attend ? 'tertiary' : 'muji'"
            @click="clickMember(member)"
          >{{ member.name }}</v-chip>
        </div>
      </v-col>
    </v-row>
    <v-row wrap justify="center">
      <v-col cols="1" align-self="center">
        <v-img src="../../assets/rainy.png" contain width="30" height="30" />
      </v-col>
      <v-col cols="11">
        <div class="text-left">
          <v-chip
            v-for="member in so_so_attend"
            :key="member.name"
            dark
            label
            :outlined="member.attend ? 'outlined' : ''"
            :class="member.attend ? 'chip__member': 'chip__member opacity-4'"
            :color="member.attend ? 'tertiary' : 'muji'"
            @click="clickMember(member)"
          >{{ member.name }}</v-chip>
        </div>
      </v-col>
    </v-row>
    <v-row wrap justify="center">
      <v-col cols="1" align-self="center">
        <v-img src="../../assets/cemetery.png" contain width="30" height="30" />
      </v-col>
      <v-col cols="11">
        <div class="text-left">
          <v-chip
            v-for="member in ghost_attend"
            dark
            label
            :outlined="member.attend ? 'outlined' : ''"
            :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
            :color="member.attend ? 'tertiary' : 'muji'"
            :key="member.name"
            @click="clickMember(member)"
          >{{ member.name }}</v-chip>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: attendMapState } = createNamespacedHelpers("attend");

export default {
  created() {
    console.log("created Member rating list", this.ghost_attend);
  },
  computed: {
    ...attendMapState(["good_attend", "so_so_attend", "ghost_attend"])
  },
  methods: {
    clickMember(member) {
      this.$emit("isAttend", member);
    }
  }
};
</script>

<style>
</style>