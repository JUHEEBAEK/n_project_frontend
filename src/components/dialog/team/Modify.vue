<template>
  <div>
    <v-dialog v-model="dialog" v-if="type = 'unitTeamModify'" width="600">
      <v-card>
        <v-form ref="formUnitTeamModify" class="form">
          <v-row>
            <v-col cols="12"> 
              <v-radio-group v-model="teamType" row>
                <v-radio label="팀" value="Team"></v-radio>
                <v-radio label="유닛 팀" value="Unit"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" lg="6" class="py-2">
              <v-text-field
                v-model="name"
                label="이름"
                hide-details
                outlined
                :rules="[v => !!v || '입력해주십시오.']"
              />
            </v-col>
            <v-col cols="12" lg="6" class="py-2">
              <v-text-field
                v-model="description"
                label="설명"
                hide-details
                outlined
                :rules="[v => !!v || '입력해주십시오.']"
              />
            </v-col>
            <v-col cols="12" lg="6" class="py-2">
              <v-menu
                v-model="menuSeason"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="season"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menuSeason = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-right">
              <v-btn color="primary" large @click="submit">저장</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dialog from "../../../mixins/dialog.js";
import util from "../../../mixins/util.js";

export default {
  mixins: [dialog, util],
  props: {
    selectedTeam: Object
  },
  data:() => ({
    name: "",
    description: "",
    menuSeason: false,
    season: null
  }),
  methods: {
    save: function () {
      console.log("save");
    }
  }

}
</script>

<style>

</style>