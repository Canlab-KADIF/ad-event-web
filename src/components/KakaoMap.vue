<template>
	<div class="ibox">
		<div class="ibox-title">
			<div class="row">
				<!-- 제목 영역 -->
			</div>
		</div>
		<div class="ibox-content">
			<div class="row">
				<!-- 지도 영역 -->
				<div id="map"></div>
			</div>
		</div>
	</div>
</template>

<script>
// import { GetGnSearchUserList } from '@/api/index';

export default {
	name: 'KakaoMap',
	props: {
		receiveData: [],
	},
	data() {
		return {
			map: null,
			jsKey: process.env.VUE_APP_KAKAO_KEY,
			markerList: this.receiveData,
		};
	},

	created() {
		// 데이터를 가져온다
		this.fnInit();
	},
	mounted() {
		// if (window.kakao && window.kakao.maps) {
		// 	// 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
		// 	this.loadMap();
		// } else {
		// 	// 없다면 카카오 스크립트 추가 후 맵 실행
		// 	this.loadScript();
		// }
	},
	methods: {
		fnInit() {
			// console.log('map', this.markerList);
			console.log('==============================');
			for (let i = 0; i < this.receiveData.length; i++) {
				console.log(this.receiveData['i']);
			}
			for (let i = 0; i < this.markerList.length; i++) {
				console.log(this.markerList['i']);
			}
			console.log('==============================');
			this.loadScript();
		},

		loadScript() {
			const script = document.createElement('script');
			// &autoload=false api를 로드한 후 맵을 그리는 함수가 실행되도록 구현

			/* global kakao */
			script.addEventListener('load', () => {
				kakao.maps.load(() => {
					// 카카오맵 API가 로딩이 완료된 후 지도의 기본적인 세팅을 시작해야 한다.
					this.loadMap();
				});
			});
			script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=' + this.jsKey + '&autoload=false';
			script.type = 'text/javascript';
			document.head.appendChild(script); // html>head 안에 스크립트 소스를 추가
		},
		loadMap() {
			const container = document.getElementById('map'); // 지도를 담을 DOM 영역
			const options = {
				// 지도를 생성할 때 필요한 기본 옵션
				center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
				level: 3, // 지도의 레벨(확대, 축소 정도)
			};

			this.map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
			this.loadMaker();
		},
		loadMaker() {
			const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

			const marker = new window.kakao.maps.Marker({
				position: markerPosition,
			});

			marker.setMap(this.map);
		},
	},
};
</script>
<style scoped>
#map {
	width: 100%;
	height: 400px;
}
</style>
