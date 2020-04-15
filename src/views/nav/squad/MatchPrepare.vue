<template>
  <div>
    <core-Toolbar />
    <core-Navigation />
    <v-row class="match__container" justify="center">
      <v-col cols="12" lg="8" md="9" sm="12" xs="12">
        <v-contatner fluid>
          <v-form ref="form">
            <schedule-date-list></schedule-date-list>
            <squad-quarter></squad-quarter>
            <squad-team-list></squad-team-list>
            <squad-input-position></squad-input-position>
            <v-row>
              <v-col>
                <v-btn @click="save" color="primary">저장</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-contatner>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    save() {
      console.log("SAVE");
      if (this.$refs.form.validate()) {
      }
    },
  },
};
</script>

<style></style>
