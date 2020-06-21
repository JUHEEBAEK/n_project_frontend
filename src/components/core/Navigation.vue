<template>
  <div>
    <v-navigation-drawer v-model="drawer" :temporary="true" app overflow>
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
          <v-list-item class="nav__item" v-for="item in items" :key="item.title" :to="`${item.to}`">
            <v-list-item-icon>
              <v-img :src="$imgBaseUrl + item.icon" contain width="24" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text--black" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: commonMapState,
  mapMutations: commonMapMutations
} = createNamespacedHelpers("common");

export default {
  data: () => ({
    items: [
      {
        title: "TEAM",
        to: "/team",
        icon: "fsnnnn_emblem_official2.png"
      },
      {
        title: "MEMBER",
        to: "/member",
        icon: "team.png"
      },
      {
        title: "CALENDAR",
        to: "/calendar",
        icon: "deadline.png"
      },
      {
        title: "SQUAD",
        to: "/squad",
        icon: "003-tshirt.png"
      },
      {
        title: "MATCH PREPARE",
        to: "/matchPrepare",
        icon: "soccer.png"
      }
    ]
  }),
  computed: {
    ...commonMapState(["drawer"]),
    drawer: {
      get() {
        return this.$store.state.common.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  mounted() {},

  methods: {
    ...commonMapMutations(["setDrawer"])
  }
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
