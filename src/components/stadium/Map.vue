<template>
  <div>
    <div id="map" style="width:800px; height: 800px"></div>
    <div class="button-group">
      <v-btn @click="changeSize(0)">Hide</v-btn>
      <v-btn @click="changeSize(1000)">show</v-btn>
      <v-btn @click="displayMarker(markerPositions1)">marker set 1</v-btn>
      <v-btn @click="displayMarker(markerPositions2)">marker set 2</v-btn>
      <v-btn @click="displayAllMarker(stadiumList)">NNNN 경기장 가져오기</v-btn>
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
        center: new kakao.maps.LatLng(37.5642, 127.001),
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
      // 마커 등록 https://apis.map.kakao.com/web/sample/addMarkerClickEvent/
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
              map: this.map, // marker.setMap(map)하는 과정을 생략
              position,
              clickable: true
            })
        );
        console.log('markers가 marker리스트를 과연 반환할까?', this.markers)
        
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
    // TODO: 여기 
    displayAllMarker(markerPositions){
      // stadium list has latitude, longitude, nick_name, name
      // this.stadiumList 을 가져온다
      // 유사배열 핸들링 https://medium.com/@yerin22/190703-%EC%9C%A0%EC%82%AC%EB%B0%B0%EC%97%B4%EC%9D%84-%EC%A7%84%EC%A7%9C-%EB%B0%B0%EC%97%B4%EB%A1%9C-%EB%B0%94%EA%BE%B8%EB%8A%94-%EB%B0%A9%EB%B2%95-fdd29f82ec48
      // console.log(markerPositions, Array.from(markerPositions))
      // console.log(this.markers, (this.markers.length > 0))
      // 1. 마커 생성 
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }
      let positions = []
      for (let i = 0; i < markerPositions.length; i++){
        let position = new kakao.maps.LatLng(Number(markerPositions[i].latitude), Number(markerPositions[i].longitude))
        positions.push(position)
      }

      if (positions.length > 0) {
        this.markers = positions.map(
          position =>
            new kakao.maps.Marker({
              map: this.map, // marker.setMap(map)하는 과정을 생략
              position,
              clickable: true
            })
        );
      }

      
      // 2. iwContent 만들기
      // https://apis.map.kakao.com/web/sample/markerWithInfoWindow/
      // 2-1. 일단 단순하게 경기장 이름을 표시해주자 (폰트 선택, 글씨 굵기 조정)


      // 3. 이벤트 등록 
      // https://apis.map.kakao.com/web/sample/addMarkerClickEvent/

      // etc. 다른 마커 클릭시, 기존 열린 윈도우 닫기 (인포 윈도우 관리법)
      // https://devtalk.kakao.com/t/topic/87779/3
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
                _this.new_markers.push([result[0].y, result[0].x])
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
    // TODO: 여기 밑에는 경기장 등록시 재활용 예정
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
