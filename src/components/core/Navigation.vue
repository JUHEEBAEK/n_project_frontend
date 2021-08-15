<template>
  <v-navigation-drawer v-model="leftDrawer" :temporary="true" app overflow>
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
        <v-list-item v-for="item in leftMenus" :key="item.name" class="nav__item" @click="clickNavItem(item)">
          <v-list-item-icon>
            <v-img :src="$imgBaseUrl + item.meta.icon" contain width="24" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text--black" v-text="item.meta.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { leftNavProps } from "./props";

export default {
  props: {
    ...leftNavProps
  },
  watch: {
    leftDrawer(value) {
      this.$emit("setDrawer", value);
    }
  },
  methods: {
    clickNavItem(item) {
      this.$emit("updateRouter", item.name);
    }
  }
};
</script>

<style scoped></style>
