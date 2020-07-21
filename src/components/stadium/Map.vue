<template>
  <div>
    <div id="map"></div>
    <div class="button-group">
      <v-btn @click="changeSize(0)">Hide</v-btn>
      <v-btn @click="changeSize(1000)">show</v-btn>
      <v-btn @click="displayMarker(markerPositions1)">marker set 1</v-btn>
      <v-btn @click="displayMarker(markerPositions2)">marker set 2</v-btn>
      <v-btn @click="displayMarker(new_markers)">marker set 3 (empty)</v-btn>
      <v-btn @click="processingDBdata()"> 경기장 위치들 확인 </v-btn>
      <v-btn @click="updateDB()"> 디비 업데이트 </v-btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");


export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      places: null,
      new_markers:[],
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441]
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912]
      ],
      markers: [] // 여기다가 풋살장 위치 정보 받아와야함
    };
  },
  computed: {
    ...stadiuMapState(['stadiumList']),
  },
  mounted() {
    this.initMap();    
    this.select_stadium();
    // this.searchWithKeyword()
    // this.searchWithAddress()
  },
  methods: {
    ...stadiumMapActions(["select_stadium", 'update_stadium']),
    initMap() {
      console.log("initMap", kakao.maps);
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 10
      };
      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }

      const positions = markerPositions.map(
        position => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          position =>
            new kakao.maps.Marker({
              map: this.map,
              position
            })
        );
        // 모든 포지션을 lat lng 으로 변환해서 bounds(array)에 집어넣어주고
        // bounds를 인자로 Bounds를 잡는다
        // 남서쪽 북동쪽 좌표가 아마 순서대로 와야하지 않을까 싶다 (증명하려면 bounds가 2개의 값을 가지고 있어야한다?)
        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    searchWithKeyword(){
      // backend에서 주소 받아오기
      // 주소마다 kakao에 쿼리 보내기
      const places = new kakao.maps.services.Places();
      var callback = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
              console.log('searchWithKeyword', result);
          }
      };

      places.keywordSearch('판교 치킨', callback, {size: 2});
    },
    async searchWithAddress(address){
      let _this = this
      var geocoder = new kakao.maps.services.Geocoder();

      var callback = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
              // console.log('searchWithAddress', result);
              if (result[0]){
                _this.new_markers.push([result[0].x, result[0].y])
                return { 
                  longitude: result[0].x, 
                  latitude: result[0].y
                }
              }
          } else{
            console.error('에러남', address, result)
          }
      };
      //경기 성남시 분당구 삼평동 661
      await geocoder.addressSearch(address, callback);
    },
    async processingDBdata(){
      // address: "서울 송파구 올림픽로 25 잠실종합운동장 제1풋살장"
      // id: (...)
      // latitude: (...)
      // longitude: (...)
      // name: (...)
      // nick_name: (...)
      console.log(this.stadiumList)
      for (var i in this.stadiumList){
        let stadium = this.stadiumList[i]
        const result_coordinate = await this.searchWithAddress(stadium.address)
      }
    },
    async updateDB(){
      // 합치기 
      for (var i in this.stadiumList){
        let stadium = this.stadiumList[i]
        let coordinate = this.new_markers[i]
        stadium['longitude'] = coordinate[0]
        stadium['latitude'] = coordinate[1]
        this.update_stadium({
          stadium_id: stadium.id, 
          stadium:stadium
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 400px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
