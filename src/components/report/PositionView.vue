<template>
  <div class="field__container">
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="12" md="5" lg="5">
        <v-card class="home__container">
          <v-card-title>HOME</v-card-title>
          <v-card-text>
            <squad-soccer-field :positionLabel="homePositionLabel"></squad-soccer-field>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col align-self="center" cols="2">
        <h1>VS</h1>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="5" lg="5">
        <v-card class="away__container">
          <v-card-title>AWAY</v-card-title>
          <v-card-text>
            <squad-soccer-field :positionLabel="awayPositionLabel"></squad-soccer-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import positionValue from "../../assets/value/Postion.json";

export default {
  data: () => ({
    homePositionLabel: positionValue.homePosition,
    awayPositionLabel: positionValue.awayPosition
  })
};
</script>

<style lang="scss">
</style>