<template>
  <div>
    <div id="map" class="map__container"></div>
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
      markers: [], // 여기다가 풋살장 위치 정보 받아와야함
      defaultImageSrc:
        "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/map/maps-and-location.png",
      imageSrc:
        "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/map/red-pin.png",
      markerImage: null,
      defaultMarkerImage: null,
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
      this.selectedStadiumIndex = null;
    },
    selectedStadiumIndex(val) {
      if (this.highlightIndex != null) {
        this.redisplayMarker(this.highlightIndex, false);
      }
      this.highlightIndex = val;

      this.redisplayMarker(val, true);

      this.infowWindows.forEach(infowindow => {
        infowindow.setMap(null);
      });
      this.map.setCenter(this.markers[val].getPosition());
      this.map.setLevel(3);
    }
  },
  methods: {
    ...stadiumMapActions(["select_stadium", "update_stadium"]),
    initMap() {
      console.log("initMap", kakao.maps);
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5642, 127.001),
        level: 8
      };
      this.map = new kakao.maps.Map(container, options);
    },
    initMarkerImage() {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(48, 48);

      // 마커 이미지를 생성합니다
      this.markerImage = new kakao.maps.MarkerImage(this.imageSrc, imageSize);
      this.defaultMarkerImage = new kakao.maps.MarkerImage(
        this.defaultImageSrc,
        imageSize
      );
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
      // TODO: https://apis.map.kakao.com/web/documentation/#Marker
      // setImage method를 이용해서 다시 짤 것
      let marker = this.markers[index];
      if (isStarImage) {
        marker.setImage(this.markerImage);
      } else {
        marker.setImage(null);
      }

      // 마커 등록 https://apis.map.kakao.com/web/sample/addMarkerClickEvent/
    },
    reAddInfowindowToMarker(index) {},

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
              clickable: true,
              image: this.defaultMarkerImage
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
          content: iwContent,
          yAnchor: 2 // 위치를 y축방향으로 이동 시킨다
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
<style lang="scss" src="../../styles/components/stadium/map.scss"></style>
