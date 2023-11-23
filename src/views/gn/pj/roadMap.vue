<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>판매점</h2>
				<ol class="breadcrumb">
					<li>
						<router-link to="/">Main</router-link>
					</li>
					<li class="active">
						<strong>프로그램</strong>
					</li>
				</ol>
			</div>
		</div>
		<div class="wrapper wrapper-content animated fadeIn">
			<div class="row">
				<div class="col-lg-8">
					<div class="ibox">
						<div class="ibox-title">
							<div class="row">
								<form role="form" name="syForm">
									<div class="col-md-4">
										<div class="input-group">
											<div class="input-daterange input-group input-group-sm" id="datepicker">
												<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
												<input
													type="date"
													class="form-control"
													id="searchSDT"
													v-model="searchSDT"
													ref="searchSDT"
													:max="todayDt"
													@change="fnSearch"
												/>
												<span class="input-group-addon"> ~ </span>
												<input
													type="date"
													class="form-control"
													v-model="searchEDT"
													:max="todayDt"
													@change="fnSearch"
												/>
											</div>
											<div class="input-group-btn searchDrop">
												<button
													type="button"
													id="searchpPogressText"
													class="btn btn-sm btn-default"
												>
													{{ progressKey }}
												</button>
												<button
													type="button"
													class="btn btn-sm btn-default dropdown-toggle"
													data-toggle="dropdown"
													aria-haspopup="true"
													aria-expanded="false"
												>
													<span class="caret"></span>
													<span class="sr-only">드롭다운 버튼</span>
												</button>
												<ul class="dropdown-menu">
													<li>
														<a
															href="javascript:;"
															@click="fnDropBox('progress', '상태 전체', 0)"
															data-form="searchProgress"
															data-val=""
															>상태 전체</a
														>
													</li>
													<li v-for="item in progressList" :key="item.codeValue">
														<a
															href="javascript:;"
															@click="fnDropBox('progress', item.codeName, item.codeValue)"
															>{{ item.codeName }}</a
														>
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="col-md-1">
										<button class="btn btn-sm btn-info" type="button">
											<i class="fa fa-check-square-o"></i> 파손 종류
										</button>
									</div>
									<div class="col-md-5">
										<div class="input-group">
											<div
												v-for="(item, idx) in damageTypeList"
												class="checkbox checkbox-info checkbox-inline"
												:key="idx"
											>
												<input
													type="checkbox"
													:id="'damageTp_' + item.codeValue"
													:value="item.codeValue"
													v-model="damageTp"
													@change="fnChecked($event.target.checked, item.codeValue)"
												/>
												<label :for="'damageTp_' + item.codeValue">{{ item.codeName }}</label>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div class="ibox-content">
							<!-- <div class="row m-b-sm">
								<div class="col-md-1">
									<button class="btn btn-xs btn-info" type="button">
										<i class="fa fa-check-square-o"></i> 파손 종류
									</button>
								</div>
								<div class="col-md-5">
									<div class="input-group">
										<div
											v-for="(item, idx) in damageTypeList"
											class="checkbox checkbox-info checkbox-inline"
											:key="idx"
										>
											<input
												type="checkbox"
												:id="'damageTp_' + item.codeValue"
												:value="item.codeValue"
												v-model="damageTp"
												@change="fnChecked($event.target.checked, item.codeValue)"
											/>
											<label :for="'damageTp_' + item.codeValue">{{ item.codeName }}</label>
										</div>
									</div>
								</div>
							</div> -->
							<div class="row m-b-sm">
								<div class="map_wrap">
									<div
										id="map"
										style="width: 100%; height: 100%; position: relative; overflow: hidden"
									></div>
									<!-- 지도타입 컨트롤 div 입니다 -->
									<!-- <div class="custom_typecontrol radius_border">
										<span id="btnRoadmap" class="selected_btn" @click="setMapType('roadmap')"
											>지도</span
										>
										<span id="btnSkyview" class="btn" @click="setMapType('skyview')">스카이뷰</span>
									</div> -->
									<!-- 지도 확대, 축소 컨트롤 div 입니다 -->
									<!-- <div class="custom_zoomcontrol radius_border">
										<span @click="zoomIn()"
											><img
												src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
												alt="확대"
										/></span>
										<span @click="zoomOut()"
											><img
												src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
												alt="축소"
										/></span>
									</div> -->
								</div>
							</div>
						</div>
						<div class="ibox-footer text-center">
							<div class="text-center">
								<nav></nav>
							</div>
						</div>
					</div>
				</div>

				<!-- sidebar start -->
				<div class="col-lg-4">
					<form role="form" id="syForm" class="form-horizontal">
						<div class="ibox">
							<div class="ibox-title">
								<div class="row">
									<form role="form" name="syForm">
										<div class="col-md-6">
											<p class="stat-header text-info">{{ totalCount }} 건</p>
										</div>
										<div class="col-md-6 text-right">
											<button
												class="insert-btn btn btn-sm btn-primary"
												type="button"
												@click="fnClickMaker(null)"
											>
												<i class="fa fa-list"></i> 전체보기
											</button>
										</div>
									</form>
								</div>
							</div>
							<div class="ibox-content">
								<div class="table-responsive">
									<table class="table table-hover table-middle">
										<tbody>
											<tr
												v-for="(item, index) in itemList"
												@click="fnClickMaker(index)"
												:key="index"
												:class="index === clickIdx ? 'highlight' : ''"
											>
												<td class="text-center">
													<template v-if="item.beforeImage">
														<img :src="item.beforeImage.filePath" width="100" />
													</template>
													<template v-else>
														<img src="/gn/images/noimage.jpg" width="100" />
													</template>
												</td>
												<td class="text-center">
													<template v-if="item.afterImage">
														<img :src="item.afterImage.filePath" width="100" />
													</template>
													<template v-else>
														<img src="/gn/images/noimage.jpg" width="100" />
													</template>
												</td>
												<td class="text-center">
													<span class="btn btn-sm btn-default m-xxs" style="cursor: auto">{{
														item.damageNm
													}}</span>
													<br />
													<span
														v-if="item.progressTp == 1"
														class="btn btn-sm btn-info m-xxs"
														style="cursor: auto"
														>{{ item.progressNm }}</span
													>
													<span
														v-else-if="item.progressTp == 2"
														class="btn btn-sm btn-primary m-xxs"
														style="cursor: auto"
														>{{ item.progressNm }}</span
													>
													<span
														v-else-if="item.progressTp == 9"
														class="btn btn-sm btn-danger m-xxs"
														style="cursor: auto"
														>{{ item.progressNm }}</span
													>
												</td>
												<td class="text-left">
													<span class="btn btn-sm btn-default m-xxs">등록일 </span>
													{{ item.insertDt }}
													<br />
													<span class="btn btn-sm btn-default m-xxs">완료일 </span>
													{{ item.endDt }}
													<br />
												</td>
											</tr>
											<tr v-if="itemList.length < 1">
												<td colspan="3"><p class="nomenu text-center">데이터가 없습니다.</p></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div v-if="itemList.length > 0" class="ibox-footer text-center">
								<div class="text-center">
									<nav>
										<ul class="pagination">
											<li v-if="page > pageScale">
												<a @click="fnPageNavMove(1)"><i class="fa fa-angle-double-left"></i></a>
											</li>
											<li v-if="page > 1">
												<a @click="fnPageNavMove(page - 1)"><i class="fa fa-angle-left"></i></a>
											</li>
											<li :class="{ active: page === pg }" v-for="pg in pageList" :key="pg">
												<a @click="fnPageNavMove(pg)">{{ pg }}</a>
											</li>
											<li v-if="page < totalPage">
												<a @click="fnPageNavMove(page + 1)"><i class="fa fa-angle-right"></i></a>
											</li>
											<li v-if="endPageBtn === true">
												<a @click="fnPageNavMove(totalPage)"
													><i class="fa fa-angle-double-right"></i
												></a>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<MdLoading v-if="loadingTp"></MdLoading>
	</div>
</template>

<script>
import { GetPjRoadMap } from '@/api/index';
import MdLoading from '@/components/modals/MdLoading.vue';
export default {
	components: { MdLoading },
	name: 'roadMap',
	data() {
		return {
			pageId: this.$route.params.pageId,
			todayDt: this.$moment().format('YYYY-MM-DD'),
			searchSDT: this.$moment().subtract(7, 'days').format('YYYY-MM-DD'),
			searchEDT: this.$moment().format('YYYY-MM-DD'),
			loadingTp: false,
			// 페이징
			pageList: [],
			page: 1,
			pageSize: 10, // page 당 게시글 수
			pageScale: 5, // 페이지 수
			totalCount: 0, // 전체 게시글 수
			totalPage: 0, // 전체 페이지 수
			endPageBtn: false,

			// 검색
			progressList: [],
			progressKey: '상태 전체',
			progressVal: 0,
			searchType: '',
			searchText: '',
			damageTypeList: [],
			damageTp: [],
			damageTpText: '',

			itemList: [],
			map: null,
			markerList: [],
			markers: [],
			clickIdx: null,
			markerSrc: this.$store.state.damageTypeList[0].markerIcon,
			markerSize: new kakao.maps.Size(64, 69),
			markerOption: { offset: new kakao.maps.Point(27, 69) },
			infoWindow: [],
		};
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.initMap();
		} else {
			const script = document.createElement('script');
			/* global kakao */
			script.onload = () => kakao.maps.load(this.initMap);
			// script.src =
			// 	'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4cb6c29439019aeb63f16fe4359cfe51';
			script.src =
				'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' +
				process.env.VUE_APP_KAKAO_KEY;
			document.head.appendChild(script);
		}
	},
	created() {
		this.fnInit();
	},
	methods: {
		fnInit() {
			let params = '?page=' + this.page + '&pageSize=' + this.pageSize;
			if (this.searchSDT && this.searchEDT) {
				params += '&searchSDT=' + this.searchSDT + '&searchEDT=' + this.searchEDT;
			}

			if (this.progressVal !== '') {
				params += '&searchProgress=' + this.progressVal;
			}
			if (this.damageTpText !== '') {
				params += '&searchDamage=' + this.damageTpText;
			}

			if (this.searchText !== '') {
				params += '&searchText=' + this.searchText;
			}
			// console.log(params);
			this.clickIdx = null;
			this.markerList = [];
			this.loadingTp = true;

			GetPjRoadMap(params)
				.then(res => {
					const data = res.data;
					this.page = data.page;
					this.pageSize = data.pageSize;
					this.totalCount = data['totalCount'];

					this.itemList = data.itemList;

					// store 저장
					this.$store.commit('setDamageTypeList', data.damageTypeList);
					this.damageTypeList = data.damageTypeList;
					// this.damageTypeList.unshift(this.damageItem);

					this.$store.commit('setProgressList', data.progressList);
					this.progressList = data.progressList;

					if (this.itemList.length > 0) {
						for (let i = 0; i < this.itemList.length; i++) {
							let markerItem = {
								index: i,
								damageNo: this.itemList[i]['damageNo'],
								latLng: new kakao.maps.LatLng(this.itemList[i]['lat'], this.itemList[i]['lng']),
								damageTp: this.itemList[i]['damageTp'],
								damageNm: this.itemList[i]['damageNm'],
								progressTp: this.itemList[i]['progressTp'],
								progressNm: this.itemList[i]['progressNm'],
								lat: this.itemList[i]['lat'],
								lng: this.itemList[i]['lng'],
								beforeImage: this.itemList[i]['beforeImage'].filePath,
								afterImage: this.itemList[i]['afterImage'].filePath,
								markerImage: this.damageTypeList[this.itemList[i]['damageTp'] - 1].markerIcon,
								memo: this.itemList[i]['memo'],
								insertDt: this.itemList[i]['insertDt'],
								endDt: this.itemList[i]['endDt'],
							};
							this.markerList.push(markerItem);
						}
						if (this.markerList.length > 0) {
							this.fnMapMarker();
						}
					}

					// 페이징
					this.fnPageNavigation(this.page);
				})
				.catch(() => {
					this.$swal.fire({
						title: '정보',
						html: '정보를 가져오는데 실패 하였습니다. <br />시스템 담당자에 문의 해 주세요',
						icon: 'error',
						timer: 2000,
						showConfirmButton: false,
					});
				})
				.finally(() => {
					this.loadingTp = false;
				});
		},
		initMap() {
			// 초기 맵 설정
			var container = document.getElementById('map');
			var options = {
				center: new kakao.maps.LatLng(33.450705, 126.570677),
				level: 3,
			};

			this.map = new kakao.maps.Map(container, options);
			// this.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);

			// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
			var mapTypeControl = new kakao.maps.MapTypeControl();

			// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
			// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
			this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

			// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
			var zoomControl = new kakao.maps.ZoomControl();
			this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
		},

		fnMapMarker() {
			// 지도 초기화
			this.initMap();

			var markerImage = '';
			var markerPosition = '';

			var iwContents = '';
			var item = [];
			// 마커 표시
			if (this.clickIdx !== null) {
				item.push(this.markerList[this.clickIdx]);
			} else {
				item = this.markerList;
			}

			for (let i = 0; i < item.length; i++) {
				markerImage = new kakao.maps.MarkerImage(
					item[i]['markerImage'],
					this.markerSize,
					this.markerOption,
				);
				// markerPosition = new kakao.maps.LatLng(this.lat, this.lng)
				markerPosition = item[i]['latLng'];

				this.markers = new kakao.maps.Marker({
					position: markerPosition,
					image: markerImage,
				});

				this.markers.setMap(this.map);

				// infoWindow
				iwContents = this.fnInfoContents(item[i]);
				var iwRemoveable = true;

				var infowindow = new kakao.maps.InfoWindow({
					content: iwContents,
					removable: iwRemoveable,
				});

				kakao.maps.event.addListener(
					this.markers,
					'click',
					this.makeOverListener(this.map, this.markers, infowindow),
				);

				// kakao.maps.event.addListener(
				// 	this.markers,
				// 	'mouseover',
				// 	this.makeOverListener(this.map, this.markers, infowindow),
				// );
				// kakao.maps.event.addListener(this.markers, 'mouseout', this.makeOutListener(infowindow));
			}

			// 지도 이동
			// 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
			const bounds = item.reduce(
				(bounds, position) => bounds.extend(position.latLng),
				new kakao.maps.LatLngBounds(),
			);
			this.map.setBounds(bounds);
		},
		fnInfoContents(json) {
			var html = '';
			html += '<div style="width:480px; padding:5px;">';

			html += '<div class="table-responsive">';
			html += '  <table class="table table-hover table-middle">';
			html += '    <colgroup>';
			html += '      <col width="7%" />';
			html += '      <col width="43%" />';
			html += '      <col width="7%" />';
			html += '      <col width="43%" />';
			html += '    </colgroup>';
			html += '    <tbody>';
			html += '    <tr>';
			html += '      <td class="text-left"><span class="label label-info">구분</span></td>';
			html += '      <td class="text-left">' + json.damageNm + '</td>';
			html += '      <td class="text-left"><span class="label label-info">상태</span></td>';
			html += '      <td class="text-left">' + json.progressNm + '</td>';
			html += '    </tr>';
			html += '    <tr>';
			html += '      <td class="text-left"><span class="label label-info">등록일</span></td>';
			html += '      <td class="text-left">' + json.insertDt + '</td>';
			html += '      <td class="text-left"><span class="label label-info">완료일</span></td>';
			html += '      <td class="text-left">' + json.endDt + '</td>';
			html += '    </tr>';
			html += '    <tr>';
			html += '      <td class="text-left"><span class="label label-info">위도</span></td>';
			html += '      <td class="text-left">' + json.lat + '</td>';
			html += '      <td class="text-left"><span class="label label-info">경도</span></td>';
			html += '      <td class="text-left">' + json.lng + '</td>';
			html += '    </tr>';
			html += '    <tr>';
			html += '      <td class="text-left"><span class="label label-info">등록</span></td>';
			if (json.beforeImage === undefined) {
				html +=
					'      <td colspan="3" class="text-center"><img src="/gn/images/noimage.jpg" style="max-width: 100%; height: auto;" /></td>';
			} else {
				html +=
					'      <td colspan="3" class="text-center"><img src="' +
					json.beforeImage +
					'" style="max-width: 100%; height: auto;" /></td>';
			}
			html += '    </tr>';
			html += '    <tr>';
			html += '      <td class="text-left"><span class="label label-info">완료</span></td>';
			if (json.afterImage === undefined) {
				html +=
					'      <td colspan="3" class="text-center"><img src="/gn/images/noimage.jpg" style="max-width: 100%; height: auto;" /></td>';
			} else {
				html +=
					'      <td colspan="3" class="text-center"><img src="' +
					json.afterImage +
					'" style="max-width: 100%; height: auto;" /></td>';
			}
			html += '    </tr>';
			html += '    <tr>';
			html += '      <td class="text-left"><span class="label label-info">메모</span></td>';
			html += '      <td colspan="3" class="text-left">' + json.memo + '</td>';
			html += '    </tr>';
			html += '    </tbody>';
			html += '  </table>';
			html += '</div>';
			html += '</div>';
			return html;
		},

		makeOverListener(map, marker, infowindow) {
			return function () {
				infowindow.open(map, marker);
			};
		},
		makeOutListener(infowindow) {
			return function () {
				infowindow.close();
			};
		},
		fnClickMaker(no) {
			// 지도 초기화
			this.initMap();

			this.clickIdx = no;
			this.fnMapMarker();
		},
		fnDropBox(name, key, val) {
			if (name == 'progress') {
				this.progressKey = key;
				this.progressVal = val;
			}
			this.fnSearch();
		},

		fnChecked() {
			this.damageTp.sort();
			this.damageTpText = '';
			for (let i = 0; i < this.damageTp.length; i++) {
				if (this.damageTpText === '') {
					this.damageTpText = this.damageTp[i];
				} else {
					this.damageTpText += ',' + this.damageTp[i];
				}
			}
			this.fnSearch();
		},
		fnPageNavMove(page) {
			// 페이지 이동
			this.page = page;
			this.fnInit();
		},

		fnPageNavigation(pg) {
			// 페이지 네비게이션
			let movePage = pg;

			this.totalPage = Math.ceil(this.totalCount / this.pageSize);
			// 시작 페이지 구하기
			var startPage = (Math.ceil(movePage / this.pageScale) - 1) * this.pageScale + 1;
			// 마지막 페이지 구하기
			var endPage = startPage + this.pageScale - 1;
			if (endPage >= this.totalPage) endPage = this.totalPage;

			this.pageList = [];
			for (var i = startPage; i <= endPage; i++) {
				this.pageList.push(i);
			}

			if (Math.ceil(movePage / this.pageScale) < Math.ceil(this.totalPage / this.pageScale)) {
				this.endPageBtn = true;
			} else {
				this.endPageBtn = false;
			}
		},
		fnSearch() {
			if (this.searchSDT > this.searchEDT) {
				this.$toastr.e('시작일은 종료일 보다 작아야 합니다', '입력 오류');
				// this.$refs.searchEDT.focus();
				return false;
			}
			this.page = 1;
			this.fnInit();
		},

		// fnDeleted(no) {
		// 	const params = '?damageNo=' + no;
		// 	console.log(params);
		// },
		fnGoPage(str) {
			if (str == 'I') {
				this.$router.push('/gn/pj/damage/write/I');
			} else {
				if (str > 0) {
					this.$router.push('/gn/pj/damage/view/' + str);
				}
			}
		},
	},
};
</script>
<style scoped>
#map {
	width: 100%;
	height: 70vh;
}
.map_wrap {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 70vh;
}
.radius_border {
	border: 1px solid #919191;
	border-radius: 5px;
}
.custom_typecontrol {
	position: absolute;
	top: 10px;
	right: 10px;
	overflow: hidden;
	width: 130px;
	height: 30px;
	margin: 0;
	padding: 0;
	z-index: 1;
	font-size: 12px;
	font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
}
.custom_typecontrol span {
	display: block;
	width: 65px;
	height: 30px;
	float: left;
	text-align: center;
	line-height: 30px;
	cursor: pointer;
}
.custom_typecontrol .btn {
	background: #fff;
	background: linear-gradient(#fff, #e6e6e6);
}
.custom_typecontrol .btn:hover {
	background: #f5f5f5;
	background: linear-gradient(#f5f5f5, #e3e3e3);
}
.custom_typecontrol .btn:active {
	background: #e6e6e6;
	background: linear-gradient(#e6e6e6, #fff);
}
.custom_typecontrol .selected_btn {
	color: #fff;
	background: #425470;
	background: linear-gradient(#425470, #5b6d8a);
}
.custom_typecontrol .selected_btn:hover {
	color: #fff;
}
.custom_zoomcontrol {
	position: absolute;
	top: 50px;
	right: 10px;
	width: 36px;
	height: 80px;
	overflow: hidden;
	z-index: 1;
	background-color: #f5f5f5;
}
.custom_zoomcontrol span {
	display: block;
	width: 36px;
	height: 40px;
	text-align: center;
	cursor: pointer;
}
.custom_zoomcontrol span img {
	width: 15px;
	height: 15px;
	padding: 12px 0;
	border: none;
}
.custom_zoomcontrol span:first-child {
	border-bottom: 1px solid #bfbfbf;
}
.openInfo {
	width: 300px;
	border: 1px solid black;
	border-radius: 5px;
	background-color: white;
}
</style>
