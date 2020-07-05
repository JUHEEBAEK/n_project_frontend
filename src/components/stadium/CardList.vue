<template>
  <div>    
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="pa-0"
        v-for="(item, idx) in stadiumList"
        :key="idx"
      >
        <v-card class="card__profile px-0 py-1 ma-1">
          <v-card-text class="text--primary pa-1">
            <div class="text text__title">{{ item.name }}</div>
            <div
              class="text text__uniformNumber px-2 tertiary--text"
            >{{ item.nick_name }}</div>
            <div class="text text__caption"> {{ item.address }}</div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" text @click="moveDetails(item)">UPDATE</v-btn>
            <v-btn color="red" text @click="deleteMember(item.id)">DELETE</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");


export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...stadiuMapState(['stadiumList'])
  },
  created() {
    this.select_stadium();
  },
  methods: {
    ...stadiumMapActions(['select_stadium']),
    moveDetails(item){

    },
    deleteMember(id){

    }
  },
}
</script>