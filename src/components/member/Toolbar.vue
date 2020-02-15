<template>
  <div>
    <v-card class="mx-auto">
      <v-app-bar flat>
        <v-toolbar-title class="grey--text"
          >총 {{ searchResult.length }} 명</v-toolbar-title
        >
        <v-spacer />

        <v-text-field
          v-model="search"
          hide-details
          placeholder="이름으로 검색"
          prepend-icon="fas fa-search"
          single-line
        />
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="moveMemverAdd()"
        >
          <v-icon dark>fas fa-plus</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("member");

export default {
  data: () => ({
    model: null,
    search: null,
    isLoading: false
  }),
  computed: {
    ...mapState(["memberList", "searchResult"])
  },
  watch: {
    search(val) {
      console.log("search????");
      this.searchList(val);
    }
  },
  methods: {
    ...mapMutations(["SET_SEARCH_RESULT"]),
    searchList(val) {
      if (val !== "" && val.length !== 0) {
        const result = this.memberList.filter(item => {
          let name = item.name;
          return name.indexOf(val) > -1;
        });
        this.SET_SEARCH_RESULT(result);
      } else {
        this.SET_SEARCH_RESULT(this.memberList);
      }
    },
    moveMemverAdd() {
      console.log("move add page");
      this.$router.push("/memberAdd");
    }
  }
};
</script>
<style></style>
