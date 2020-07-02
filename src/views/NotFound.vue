<template>
  <div class="notFound">
    <img class="image_404" :src="$imgBaseUrl + imageUrl" />
    <h2 class="headline font-weight-black">존재하지 않는 페이지 입니다.</h2>
  </div>
</template>

<script>
export default {
  data: () => ({
    imageUrl: "notFound_404.png"
  })
};
</script>

<style>
.notFound {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 30px;
}

.image_404 {
  width: 50%;
}
</style>
