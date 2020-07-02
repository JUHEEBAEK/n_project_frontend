<template>
  <div class="mx-0">
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker without buttons"
              prepend-icon="fas fa-calendar-day"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="menu = false"
            :allowed-dates="allowedEvents"
            :events="arrayEvents"
            event-color="green lighten-1"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
        <v-slide-group v-model="model" class="pa-2" active-class="primary" show-arrows>
          <v-slide-item v-for="n in 10" :key="n" v-slot:default="{ active, toggle }">
            <v-card
              dark
              :color="active ? 'primary' : 'grey lighten-1'"
              class="ma-2 pt-1"
              height="30"
              width="50"
              @click="toggle"
            >{{ `Q${n}` }}</v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    arrayEvents: [],
    quarterList: [1, 2, 3, 4, 5, 6],
    model: null
  }),
  mounted() {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  },
  methods: {
    allowedEvents: function(val) {
      return this.arrayEvents.indexOf(val) > -1;
    }
  }
};
</script>

<style>
</style>