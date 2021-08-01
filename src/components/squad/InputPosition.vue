<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="2">
        <span> 필드: </span>
      </v-col>
      <v-col cols="10">
        <v-chip
          v-for="(member, index) in fieldMembers"
          class="ma-2"
          color="indigo"
          text-color="white"
          :key="index"
        >
          {{ member.name }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="2">
        <span> 골기퍼: </span>
      </v-col>
      <v-col>
        <squad-input-chip-combobox
          v-model="goalKeeper"
          :items="members"
          label="골키퍼 선택"
        />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="2">
        <span> 벤치: </span>
      </v-col>
      <v-col>
        <squad-input-chip-combobox
          v-model="benchMembers"
          multiple
          :items="members"
          label="벤치 선택"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import positionValue from "@/assets/value/position.json";

export default {
  props: {
    members: {
      type: Array,
      defualt: null
    }
  },
  data: () => ({
    goalKeeper: null,
    benchMembers: [],
    jockerMembers: []
  }),
  computed: {
    fieldMembers() {
      let fieldMembers = [];
      this.members.forEach(member => {
        if (
          !this.benchMembers.includes(member) &&
          !(this.goalKeeper == member) &&
          !this.jockerMembers.includes(member)
        ) {
          fieldMembers.push(member);
        }
      });

      return fieldMembers;
    }
  },
  watch: {
    members: {
      immediate: true,
      handler: function(members) {
        members.forEach(member => {
          if (member.position === "GK") {
            this.goalKeeper = member;
          }
          if (positionValue.benchList.includes(member.position)) {
            this.benchMembers.push(member);
          }
          if (member.position === "JK") {
            this.jockerMembers.push(member);
          }
        });
      }
    },
    fieldMembers() {
      this.emitData();
    },
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
  methods: {
    emitData() {
      let members = [];
      this.fieldMembers.forEach(member => {
        members.push({ ...member });
      });
      if (this.goalKeeper) members.push({ ...this.goalKeeper, position: "GK" });
      this.benchMembers.forEach((member, index) => {
        members.push({ ...member, position: positionValue.benchList[index] });
      });

      this.$emit("change", members);
    }
  }
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
