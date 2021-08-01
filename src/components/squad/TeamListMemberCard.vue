<template>
  <v-card color="grey lighten-2" width="350" min-height="100">
    <v-system-bar v-if="deletable" color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon @click="$emit('delete')">fas fa-times</v-icon>
    </v-system-bar>
    <v-card-title class="justify-center">{{ title }}</v-card-title>
    <v-card-text class="member__box justify-center">
      <span
        v-for="(member, index) in members"
        :key="index"
        class="team__member"
        >{{ member.name }}</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    deletable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    members: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.member__box {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}
.team__member {
  margin: 3px;
}
</style>
