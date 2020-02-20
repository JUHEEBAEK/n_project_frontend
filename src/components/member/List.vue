<template>
  <v-card outlined>
    <v-row wrap class="pt-2">
      <v-img src="../../assets/sun.png" contain width="30" height="30" />
    </v-row>
    <v-row class>
      <v-col>
        <v-chip
          v-for="member in members.good"
          dark
          label
          :outlined="member.attend ? 'outlined' : ''"
          :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
          :color="member.attend ? 'tertiary' : 'muji'"
          :key="member.name"
          @click="isAttend(member)"
        >{{ member.name }}</v-chip>
      </v-col>
    </v-row>
    <v-row wrap>
      <v-img src="../../assets/rainy.png" contain width="30" height="30" />
    </v-row>
    <v-row class>
      <v-col>
        <v-chip
          v-for="member in members.so_so"
          dark
          label
          :outlined="member.attend ? 'outlined' : ''"
          :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
          :color="member.attend ? 'tertiary' : 'muji'"
          :key="member.name"
          @click="isAttend(member)"
        >{{ member.name }}</v-chip>
      </v-col>
    </v-row>
    <v-row wrap>
      <v-img src="../../assets/cemetery.png" contain width="30" height="30" />
    </v-row>
    <v-row class>
      <v-col>
        <v-chip
          v-for="member in members.ghost"
          dark
          label
          :outlined="member.attend ? 'outlined' : ''"
          :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
          :color="member.attend ? 'tertiary' : 'muji'"
          :key="member.name"
          @click="isAttend(member)"
        >{{ member.name }}</v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import stringAttendance from "../../assets/value/Attendance.json";

export default {
  name: "List",
  created() {
    console.log(this.members);
  },
  data: () => ({
    members: stringAttendance.members
  }),
  methods: {
    isAttend(item) {
      item.attend = !item.attend;
    }
  }
};
</script>

<style scoped>
span + span {
  margin: 2px;
}

.opacity-4 {
  opacity: 0.4;
}
</style>
