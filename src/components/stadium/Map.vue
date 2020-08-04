<template>
  <div>
    <div id="map" style="width:500px; height: 500px"></div><<<<<<< HEAD
    <!-- 마커가 선택되면 id를 매개값으로 MapSelected Event 발생 $emit('MapSelected', markerPositions[i].id) -->
    =======
    >>>>>>> feature/#50
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
  props: {
    selectedStadiumIndex: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      map: null,
      places: null,
      infowWindows: null,
      new_markers: [],
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
      markers: [], // 여기다가 풋살장 위치 정보 받아와야함
      imageSrc:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      markerImage: null,
      highlightIndex: null
    };
  },
  computed: {
    ...stadiuMapState(["searchResult"])
  },
  async mounted() {
    this.initMap();
    this.initMarkerImage();
    await this.select_stadium();
    this.displayAllMarker(this.searchResult);
    this.addInfowindowToMarkers(this.searchResult);
  },
  watch: {
    searchResult(val) {
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.makers = [];
      this.displayAllMarker(this.searchResult);
      this.addInfowindowToMarkers(this.searchResult);
      this.highlightIndex = null;
    },
    selectedStadiumIndex(val) {
      if (this.highlightIndex != null) {
        this.redisplayMarker(this.highlightIndex, false);
      }
      this.redisplayMarker(val, true);
      this.highlightIndex = val;
      this.reAddInfowindowToMarker(val);
    }
  },
  methods: {
    ...stadiumMapActions(["select_stadium", "update_stadium"]),
    initMap() {
      console.log("initMap", kakao.maps);
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5642, 127.001),
        level: 10
      };
      this.map = new kakao.maps.Map(container, options);
    },
    initMarkerImage() {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      this.markerImage = new kakao.maps.MarkerImage(this.imageSrc, imageSize);
    },
    remove() {
      this.markers[this.highlightIndex].setMap(null);
    },
    show() {
      let markerPosition = this.searchResult[this.highlightIndex];
      const kakaoPosition = new kakao.maps.LatLng(
        Number(markerPosition.latitude),
        Number(markerPosition.longitude)
      );
      let new_maker = new kakao.maps.Marker({
        map: this.map, // marker.setMap(map)하는 과정을 생략
        position: kakaoPosition,
        clickable: true,
        image: this.markerImage
      });
    },
    addMarker(position) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: position
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    redisplayMarker(index, isStarImage) {
      let marker = this.markers[index];
      let markerPosition = this.searchResult[index];
      // 마커 등록 https://apis.map.kakao.com/web/sample/addMarkerClickEvent/

      marker.setMap(null);
      const kakaoPosition = new kakao.maps.LatLng(
        Number(markerPosition.latitude),
        Number(markerPosition.longitude)
      );
      if (isStarImage) {
        marker = new kakao.maps.Marker({
          map: this.map, // marker.setMap(map)하는 과정을 생략
          position: kakaoPosition,
          clickable: true,
          image: this.markerImage
        });
      } else {
        marker = new kakao.maps.Marker({
          map: this.map, // marker.setMap(map)하는 과정을 생략
          position: kakaoPosition,
          clickable: true
        });
      }
      // 여기서 마커를 다시 설정해줘야 marker가 바뀐다
      this.markers[index] = marker;
    },
    reAddInfowindowToMarker(index) {
      let _this = this;
      let markerPosition = this.searchResult[index];
      let marker = this.markers[index];

      let name = markerPosition.nick_name;
      let lat = markerPosition.latitude;
      let long = markerPosition.longitude;

      let iwContent = `<div style="padding:5px;"> 
                        ${markerPosition.nick_name} <br>
                        <a href="https://map.kakao.com/link/to/${name},${lat},${long}" style="color:blue" target="_blank">길찾기</a>
                      </div> `;
      let iwPosition = new kakao.maps.LatLng(
        Number(markerPosition.latitude),
        Number(markerPosition.longitude)
      );
      let infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
        removable: true
      });
      this.infowWindows.push(infowindow);
      // 모든 윈도우를 열 필요가 있을 때 주석 해제
      // infowindow.open(this.map, this.markers[i])

      // 3. 이벤트 등록
      // https://apis.map.kakao.com/web/sample/addMarkerClickEvent/
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function() {
        _this.infowWindows.forEach(infowindow => {
          infowindow.close();
        });
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(_this.map, marker);
      });
    },
    displayAllMarker(markerPositions) {
      // stadium list has latitude, longitude, nick_name, name
      // this.searchResult 을 가져온다
      let _this = this;
      // 1. 마커 생성
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }
      // markerPositions가 유사배열일 수 있어서 forEach를 쓰지 않음
      let positions = [];
      for (let i = 0; i < markerPositions.length; i++) {
        let position = new kakao.maps.LatLng(
          Number(markerPositions[i].latitude),
          Number(markerPositions[i].longitude)
        );
        positions.push(position);
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
    },
    addInfowindowToMarkers(markerPositions) {
      let _this = this;
      this.infowWindows = [];
      for (let i = 0; i < markerPositions.length; i++) {
        let name = markerPositions[i].nick_name;
        let lat = markerPositions[i].latitude;
        let long = markerPositions[i].longitude;

        let iwContent = `<div class="customoverlay"> 
                          <a href="https://map.kakao.com/link/to/${name},${lat},${long}" target="_blank">
                             <span class="title"> ${markerPositions[i].nick_name} </span>
                          </a> 
                        </div>`;
        let iwPosition = new kakao.maps.LatLng(
          Number(markerPositions[i].latitude),
          Number(markerPositions[i].longitude)
        );

        let infowindow = new kakao.maps.CustomOverlay({
          position: iwPosition,
          content: iwContent
          // yAnchor: 1 // 위치를 y축방향으로 이동 시킨다
        });
        // infowindow.setMap(this.map);
        this.infowWindows.push(infowindow);
        // 모든 윈도우를 열 필요가 있을 때 주석 해제
        // infowindow.open(this.map, this.markers[i])

        // 3. 이벤트 등록
        // https://apis.map.kakao.com/web/sample/addMarkerClickEvent/
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(this.markers[i], "click", function() {
          _this.infowWindows.forEach(infowindow => {
            infowindow.setMap(null);
          });
          // 마커 위에 인포윈도우를 표시합니다
          // infowindow.open(_this.map, _this.markers[i]);

          _this.$emit("MapSelected", markerPositions[i].id);
          infowindow.setMap(_this.map);
        });
      }
      // etc. 다른 마커 클릭시, 기존 열린 윈도우 닫기 (인포 윈도우 관리법)
      // https://devtalk.kakao.com/t/topic/87779/3
    },
    searchWithKeyword() {
      // backend에서 주소 받아오기
      // 주소마다 kakao에 쿼리 보내기
      const places = new kakao.maps.services.Places();
      var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log("searchWithKeyword", result);
        }
      };

      places.keywordSearch("판교 치킨", callback, { size: 2 });
    },
    async searchWithAddress(address, i) {
      let _this = this;
      var geocoder = new kakao.maps.services.Geocoder();

      var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          if (result[0]) {
            _this.new_markers[i] = [result[0].x, result[0].y];
            return {
              longitude: result[0].x,
              latitude: result[0].y
            };
          }
        } else {
          console.error("에러남", address, result);
        }
      };
      //경기 성남시 분당구 삼평동 661
      await geocoder.addressSearch(address, callback);
    },
    // TODO: 여기 밑에는 경기장 등록시 재활용 예정
    async processingDBdata() {
      // address: "서울 송파구 올림픽로 25 잠실종합운동장 제1풋살장"
      // id: (...)
      // latitude: (...)
      // longitude: (...)
      // name: (...)
      // nick_name: (...)
      this.new_markers = new Array(this.searchResult.length);
      for (var i in this.searchResult) {
        let stadium = this.searchResult[i];
        const result_coordinate = await this.searchWithAddress(
          stadium.address,
          i
        );
      }
    },
    async updateDB() {
      // 합치기
      console.log(this.new_markers);
      for (var i in this.searchResult) {
        let stadium = this.searchResult[i];
        let coordinate = this.new_markers[i];
        stadium["longitude"] = coordinate[0];
        stadium["latitude"] = coordinate[1];
        this.update_stadium({
          stadium_id: stadium.id,
          stadium: stadium
        });
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
</style>
