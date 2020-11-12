<template>
  <div>
    <div class="container">
      <v-row class="row__first">
        <v-col cols="3" class="col__first">
          <v-card class="card__container" elevation="0">
            <div class="first__team">
              <v-avatar tile size="70">
                <v-img :src="$imgBaseUrl + emblemImage" class="footer__img" contain />
              </v-avatar>
              <!-- <span class="text__name">{{ teamName }}</span> -->
            </div>
            <div class="first__uniformNumber">
              <v-avatar tile size="80">
                <v-img :src="$imgBaseUrl + imgUrl" class="footer__img" contain />
              </v-avatar>
              <span class="text__uniformNumber">{{ uniformNumber }}</span>
            </div>
          </v-card>
        </v-col>
        <v-col cols="9" class="col__second">
          <v-card class="card__container">
            <div class="text__name">
              {{ memberName }}
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="row__second">
        <v-col col="2" class="col__box">
          <div class="card__container">
            <div class="card__title">Attends</div>
            <div class="card__content">{{ count.attend }}</div>
          </div>
        </v-col>
        <v-col col="2" class="col__box">
          <div class="card__container">
            <div class="card__title">Games</div>
            <div class="card__content">{{ count.game }}</div>
          </div>
        </v-col>
        <v-col col="2" class="col__box">
          <div class="card__container">
            <div class="card__title">Goal</div>
            <div class="card__content">{{ count.goal }}</div>
          </div>
        </v-col>
        <v-col col="2" class="col__box">
          <div class="card__container">
            <div class="card__title">Assist</div>
            <div class="card__content">{{ count.assist }}</div>
          </div>
        </v-col>
        <v-col col="2" class="col__box">
          <div class="card__container">
            <div class="card__title">Clean</div>
            <div class="card__content">{{ count.clean }}</div>
          </div>
        </v-col>
      </v-row>
      <v-row class="row__third">
        <v-col cols="6">
          <div class="card__container">
            <div class="card__title">My GOAL - who ASSIST</div>
            <div class="card__content">
              <div class="rank__item" v-for="(item, index) in items" :key="`assist_${index}`">
                <b class="text__rank">{{ index + 1 }}</b>
                <span class="text__name">{{ item.name}}</span>
                <span class="text__count">{{ item.count }} assist</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
           <div class="card__container">
            <div class="card__title">My ASSIST - who Goal</div>
            <div class="card__content">
              <div class="rank__item" v-for="(item, index) in items" :key="`goal_${index}`">
                <b class="text__rank">{{ index + 1 }}</b>
                <span class="text__name">{{ item.name}}</span>
                <span class="text__count">{{ item.count }} assist</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    member_id: [String, Number]
  },
  data: () => ({
    emblemImage: "fsnnnn_emblem_official2.png",
    imgUrl: "003-tshirt.png",
    teamName: "FS 눈누난나",
    uniformNumber: 20,
    memberName: "백주희",
    count: {
      attend: 0,
      game: 0,
      goal: 0,
      assist: 0,
      clean: 0,
    },
    items: [
      { name: "이화인", count: 5},
      { name: "김지현", count: 4},
      { name: "이솔잎", count: 3},
      { name: "윤영임", count: 2},
      { name: "김나경", count: 1},
    ]
  }),
  created() {
    console.log(this.member_id);
  }
}
</script>

<style scoped lang="scss" src="@/assets/scss/views/footer/memberDetails.scss"></style>
