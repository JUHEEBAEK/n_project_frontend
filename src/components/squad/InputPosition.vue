<template>
  <div>
    <v-row justify="center">
      <v-chip
        v-for="(member, index) in fieldMembers"
        class="ma-2"
        color="indigo"
        text-color="white"
        :key="index"
      >
        {{ member.name }}
      </v-chip>
    </v-row>
    <v-row justify="center">
      <squad-input-chip-combobox
        v-model="goalKeeper"
        :items="members"
        label="골키퍼 선택"
      />
    </v-row>
    <v-row justify="center">
      <squad-input-chip-combobox
        v-model="benchMembers"
        multiple
        :items="members"
        label="벤치 선택"
      />
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      defualt: null
    }
  },
  data: () => ({
    goalKeeper: null,
    benchMembers: []
  }),
  computed: {
    fieldMembers() {
      let filteredMember = [];
      this.members.forEach(member => {
        if (
          !this.benchMembers.includes(member) &&
          !(this.goalKeeper == member)
        ) {
          filteredMember.push(member);
        }
      });
      return filteredMember;
    }
  },
  watch: {
    goalKeeper(member) {
      if (member) {
        let colapseIndex = this.benchMembers.indexOf(member);
        if (colapseIndex >= 0) {
          this.benchMembers.splice(colapseIndex, 1);
        }
      }
    },
    benchMembers(memberList) {
      memberList.forEach(member => {
        if (member == this.goalKeeper) {
          this.goalKeeper = null;
        }
      });
    }
  },
  methods: {}
};
</script>

<style>
.position__field {
  background: #a5d6a7;
}
.position__bench {
  background: #f1cd74;
}
.position__name {
  justify-content: center;
  margin: 0 auto;
  width: 108px;
}
</style>
