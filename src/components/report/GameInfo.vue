<template>
  <div class="gameInfo__container">
    <div class="gameInfo__header">
      <div class="header__first">
        <span class="px-1 text__type">Practice</span>
        <span class="px-1 text__date">7 June 2020</span>
      </div>
      <div class="header__second">
        <span class="text__staduim">잠실 제 2 풋살장</span>
      </div>
    </div>
    <div class="gameInfo__content">
      <div class="home__container">
        <div class="home__emblem">
          <v-avatar class="emblem" size="124">
            <v-img aspect-ratio="1" cover :src="$imgBaseUrl + homeEmblem" />
          </v-avatar>
        </div>
        <div class="title__name">NunnuNanna Team A</div>
      </div>
      <div class="score__container">
        <div class="text__bigTitle">3:2</div>
        <div class="text__description">
          <v-icon>fas fa-stopwatch</v-icon>
          <span class="mx-1">10'</span>
        </div>
      </div>
      <div class="away__container">
        <div class="away__emblem">
          <v-avatar class="emblem" size="124">
            <v-img aspect-ratio="1" cover :src="$imgBaseUrl + awayEmblem" />
          </v-avatar>
        </div>
        <div class="title__name">NunnuNanna Team B</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeEmblem: "emblem/nnnn_emblem01.jpg",
      awayEmblem: "emblem/nnnn_emblem02.jpg"
    };
  }
};
</script>

<style lang="scss" scoped src="../../styles/components/report/gameInfo.scss"></style>
