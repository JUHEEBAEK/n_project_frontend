<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item>
        <v-list-item-content class="float-left">
          <v-list-item-title class="title">NunnuNanna</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list nav>
      <v-list-item-group color="primary">
        <v-list-item
          class="nav__item"
          v-for="item in items"
          :key="item.title"
          :to="`${item.to}`"
        >
          <v-list-item-icon>
            <v-img :src="item.icon" contain width="24" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text--black" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: commonMapState,
  mapMutations: commonMapMutations,
} = createNamespacedHelpers("common");

export default {
  data: () => ({
    items: [
      {
        title: "TEAM",
        to: "",
        icon:
          "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/fsnnnn_emblem_official2.png",
      },
      {
        title: "MEMBER",
        to: "/member",
        icon: require("../../assets/linear/dark/team.png"),
      },
      {
        title: "CALENDAR",
        to: "/calendar",
        icon: require("../../assets/linear/dark/deadline.png"),
      },
      {
        title: "SQUAD",
        to: "/squad",
        icon: require("../../assets/linear/dark/tshirt.png"),
      },
      {
        title: "MATCH PREPARE",
        to: "/matchPrepare",
        icon: require("../../assets/linear/dark/soccer.png"),
      },
      {
        title: "MATCH",
        to: "/matchInput",
        icon: require("../../assets/linear/dark/medical-history.png"),
      },
      // {
      //   title: "STADIUM",
      //   to: "",
      //   icon: require("../../assets/linear/dark/stadium.png")
      // },
      // {
      //   title: "TRAINING",
      //   to: "",
      //   icon: require("../../assets/linear/dark/training.png")
      // },
      /* 임시로 추가 */
      // { title: "Spinner", to: "spinner" }
    ],
  }),
  computed: {
    ...commonMapState(["drawer"]),
    drawer: {
      get() {
        return this.$store.state.common.drawer;
      },
      set(val) {
        this.setDrawer(val);
      },
    },
  },
  mounted() {},

  methods: {
    ...commonMapMutations(["setDrawer"]),
  },
};
</script>
<style scoped>
a {
  text-decoration: none !important;
  color: #000 !important;
}

.v-list-item--link:before {
  background-color: #fff;
}
</style>
