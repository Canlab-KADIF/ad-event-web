<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>컨텐츠 {{ pageTitle }}</h2>
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
		<div class="wrapper wrapper-content2 animated fadeIn">
			<div class="row">
				<div class="col-lg-12">
					<form role="form" id="syForm" class="form-horizontal">
						<div class="ibox">
							<div class="ibox-title">
								<h3 class="small-size80">
									<i class="fa fa-list"></i> 일반 정보
									<small
										>&nbsp;&nbsp;(<span class="red"> *</span>) 표시는 필수 입력 항목 입니다</small
									>
								</h3>
								<div class="ibox-tools">
									<div class="btn-toolbar" role="toolbar">
										<div class="actionBtn btn-group" role="group">
											<template v-if="damageNo == 'I'">
												<button type="button" class="btn btn-success" @click="fnSaved()">
													<i class="fa fa-floppy-o"></i> 저장
												</button>
											</template>
											<template v-else>
												<button type="button" class="btn btn-success" @click="fnUpdated()">
													<i class="fa fa-floppy-o"></i> 수정
												</button>
												<button type="button" class="btn btn-danger" @click="fnDeleted()">
													<i class="fa fa-trash-o"></i> 삭제
												</button>
											</template>

											<button type="button" class="btn btn-primary" @click="fnGoPage('L')">
												<i class="fa fa-list"></i> 목록
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="ibox-content">
								<!-- <div class="form-group">
									<label for="title" class="col-sm-1 control-label"
										><span class="red">*</span>&nbsp;콘텐츠명</label
									>
									<div class="col-sm-4">
										<input
											type="text"
											class="form-control"
											v-model="title"
											ref="title"
											placeholder="컨텐츠명 입력"
										/>
									</div>
									<label for="enterDt" class="col-sm-1 control-label"
										><span class="red">*</span>&nbsp;등록일</label
									>
									<div class="col-sm-2">
										<input
											type="date"
											class="form-control"
											v-model="enterDt"
											:max="todayDt"
											ref="enterDt"
										/>
									</div>
								</div>
								<div class="hr-line-dashed"></div> -->

								<div class="form-group">
									<label for="lat" class="col-sm-2 control-label"
										><span class="red">*</span>&nbsp;위도(lat)</label
									>
									<div class="col-sm-4">
										<input
											type="text"
											class="form-control"
											v-model="lat"
											ref="lat"
											placeholder="위도 입력"
										/>
									</div>
									<label for="lng" class="col-sm-2 control-label"
										><span class="red">*</span>&nbsp;경도(lng)</label
									>
									<div class="col-sm-4">
										<div class="input-group">
											<input
												type="text"
												class="form-control"
												v-model="lng"
												ref="lng"
												placeholder="경도 입력"
											/>
											<span class="input-group-btn"
												><button
													type="button"
													class="btn btn-sm btn-info"
													title="조건검색"
													@click="initMap(lat, lng)"
												>
													<i class="fa fa-search"></i> 검색
												</button></span
											>
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-2"></div>
									<div class="col-sm-10">
										<span class="text-left"
											>지도의 위치에 마우스로 클릭 하거나, 위도, 경도 입력 후 "검색" 버튼을 선택해
											주세요</span
										>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-2"></div>
									<div class="col-sm-10">
										<div id="map"></div>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="damageTp_1" class="col-sm-2 control-label"
										><span class="red">*</span>&nbsp;파손종류</label
									>
									<div class="col-sm-4">
										<div
											v-for="(item, idx) in damageTypeList"
											class="radio radio-success radio-inline"
											:key="idx"
										>
											<input
												type="radio"
												:id="'damageTp_' + item.codeValue"
												:value="item.codeValue"
												v-model="damageTp"
												@change="fnChangeDamage()"
											/>
											<label :for="'damageTp_' + item.codeValue">{{ item.codeName }}</label>
										</div>
									</div>
									<label for="progressTp_1" class="col-sm-2 control-label"
										><span class="red">*</span>&nbsp;진행상태</label
									>
									<div class="col-sm-4">
										<div
											v-for="(item, idx) in progressList"
											class="radio radio-warning radio-inline"
											:key="idx"
										>
											<input
												type="radio"
												:id="'progressTp_' + item.codeValue"
												v-model="progressTp"
												:value="item.codeValue"
												@change="fnChangeProgress()"
											/>
											<label :for="'progressTp_' + item.codeValue"> {{ item.codeName }} </label>
										</div>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="enterDt" class="col-sm-2 control-label">등록일</label>
									<div class="col-sm-4">
										<input
											type="date"
											class="form-control"
											v-model="enterDt"
											:max="todayDt"
											ref="enterDt"
											disabled
										/>
									</div>

									<label for="endDt" class="col-sm-2 control-label">&nbsp;완료일</label>
									<div class="col-sm-4">
										<input
											type="date"
											class="form-control"
											v-model="endDt"
											:max="todayDt"
											ref="endDt"
											:disabled="disProgressTp == 0"
										/>
										<p class="help-block"><small>진행상태가 완료 일 경우 입력해 주세요</small></p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="beforeFile" class="col-sm-2 control-label">등록 사진</label>
									<div class="col-sm-4">
										<input
											type="file"
											id="beforeFile"
											name="beforeFile"
											ref="beforeFile"
											class="filestyle"
											data-buttontext="등록 사진 선택"
											data-iconname="fa fa-file-image-o"
											data-buttonname="btn-info"
											tabindex="-1"
											@change="fnFileUpload($event, 'before')"
											style="position: absolute; clip: rect(0px, 0px, 0px, 0px)"
										/>
										<div class="bootstrap-filestyle input-group">
											<input
												type="text"
												for="beforeFile"
												class="form-control"
												v-model="beforeFileName"
												readonly
											/>
											<span class="group-span-filestyle input-group-btn" tabindex="0">
												<label for="beforeFile" class="btn btn-info">
													<span class="icon-span-filestyle fa fa-file-image-o"></span>
													<span class="buttonText"></span>
													등록 이미지 선택
												</label>
											</span>
										</div>
									</div>
									<label for="afterFile" class="col-sm-2 control-label">완료 사진</label>
									<div class="col-sm-4">
										<input
											type="file"
											id="afterFile"
											name="afterFile"
											ref="afterFile"
											class="filestyle"
											data-buttontext="완료 사진 선택"
											data-iconname="fa fa-file-image-o"
											data-buttonname="btn-warning"
											tabindex="-1"
											@change="fnFileUpload($event, 'after')"
											style="position: absolute; clip: rect(0px, 0px, 0px, 0px)"
										/>
										<div class="bootstrap-filestyle input-group">
											<input
												type="text"
												for="afterFile"
												class="form-control"
												v-model="afterFileName"
												readonly
											/>
											<span class="group-span-filestyle input-group-btn" tabindex="0">
												<label for="afterFile" class="btn btn-warning">
													<span class="icon-span-filestyle fa fa-file-image-o"></span>
													<span class="buttonText"></span>
													완료 이미지 선택
												</label>
											</span>
										</div>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="beforeFile" class="col-sm-2 control-label"></label>
									<div class="col-sm-4">
										<template v-if="beforeFile">
											<img :src="beforeFile.filePath" style="max-width: 100%; height: auto" />
										</template>
										<template v-else>
											<img src="/gn/images/noimage.jpg" />
										</template>
									</div>
									<label for="afterFile" class="col-sm-2 control-label"></label>
									<div class="col-sm-4">
										<template v-if="afterFile">
											<img :src="afterFile.filePath" style="max-width: 100%; height: auto" />
										</template>
										<template v-else>
											<!-- <img :src="/gn/images/noimage.jpg" /> -->
											<img :src="afterPreview" />
										</template>
									</div>
								</div>

								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="memo" class="col-sm-2 control-label">메모</label>
									<div class="col-sm-10">
										<input type="text" class="form-control" v-model="memo" ref="memo" />
									</div>
								</div>

								<div class="hr-line-dashed"></div>

								<!-- <div class="form-group">
									<label for="used" class="col-sm-1 control-label">사용 유무</label>
									<div class="col-sm-4">
										<div class="checkbox checkbox-success">
											<input
												type="checkbox"
												id="used"
												v-model="used"
												aria-label="사용 유무"
												:checked="used"
											/>
											<label for="used">사용 유무</label>
										</div>
									</div>
								</div> -->
							</div>
							<div class="ibox-footer text-right">
								<div class="actionBtn btn-group" role="group">
									<template v-if="damageNo == 'I'">
										<button type="button" class="btn btn-success" @click="fnSaved()">
											<i class="fa fa-floppy-o"></i> 저장
										</button>
									</template>
									<template v-else>
										<button type="button" class="btn btn-success" @click="fnUpdated()">
											<i class="fa fa-floppy-o"></i> 수정
										</button>
										<button type="button" class="btn btn-danger" @click="fnDeleted()">
											<i class="fa fa-trash-o"></i> 삭제
										</button>
									</template>

									<button class="btn btn-primary" type="button" @click="fnGoPage('L')">
										<i class="fa fa-list"></i> 목록
									</button>
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
import { GetPjDamage, PostPjDamage, PutPjDamage, DeletePjDamage } from '@/api/index';
import MdLoading from '@/components/modals/MdLoading.vue';

export default {
	components: {
		MdLoading,
		// KakaoMap,
	},
	name: 'damageWrite',
	data() {
		return {
			damageNo: this.$route.params.id,
			loadingTp: false,
			pageNo: '',
			pageTitle: '',
			todayDt: this.$moment().format('YYYY-MM-DD'),
			damageTypeList: this.$store.state.damageTypeList,
			damageTp: '1',
			damageTpText: '',
			progressList: this.$store.state.progressList,
			progressTp: 1,
			disProgressTp: 0,
			lat: '35.11260198092492', //위도(latitude)
			lng: '126.87744474375125', //경도(longitude)
			enterDt: this.$moment().format('YYYY-MM-DD'),
			endDt: '',
			beforeFile: [],
			beforeFileName: '',
			afterFile: [],
			afterFileName: '',
			afterPreview: '/gn/images/noimage.jpg',
			memo: '',
			used: true,
			map: null,
			markerList: [],
			markers: [],
			markerSrc: this.$store.state.damageTypeList[0].markerIcon,
			markerSize: new kakao.maps.Size(64, 69),
			markerOption: { offset: new kakao.maps.Point(27, 69) },
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
		// 데이터를 가져온다
		this.fnInit();
	},
	methods: {
		fnInit() {
			this.loadingTp = true;

			if (this.damageNo !== 'I') {
				// view 화면
				let params = '?damageNo=' + this.damageNo;
				GetPjDamage(params)
					.then(res => {
						const data = res.data;

						this.damageTp = data.damageTp;
						this.progressTp = data.progressTp;
						if (this.progressTp == '9') {
							this.disProgressTp = 1;
						} else {
							this.disProgressTp = 0;
						}
						this.enterDt = data.enterDt;
						this.endDt = data.endDt;
						this.memo = data.memo;
						// this.used = data.used;

						this.beforeFile = data.beforeFile;
						this.beforeFileName = data.beforeFile['fileNameOrigin'];
						this.afterFile = data.afterFile;
						this.afterFileName = data.afterFile['fileNameOrigin'];
						// marker
						this.lat = data.lat;
						this.lng = data.lng;
						this.markerSrc = this.damageTypeList[this.damageTp - 1].markerIcon;

						this.initMap(this.lat, this.lng);
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
			} else {
				this.loadingTp = false;
			}
		},
		initMap() {
			// 초기 맵 설정
			// 35.11260198092492, 126.87744474375125
			var container = document.getElementById('map');
			var options = {
				center: new kakao.maps.LatLng(this.lat, this.lng),
				level: 3,
			};

			this.map = new kakao.maps.Map(container, options);

			// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
			var mapTypeControl = new kakao.maps.MapTypeControl();

			// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
			// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
			this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

			// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
			var zoomControl = new kakao.maps.ZoomControl();
			this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

			// var marker = new kakao.maps.Marker({
			// 	// 지도 중심좌표에 마커를 생성합니다
			// 	position: this.map.getCenter(),
			// 	image: this.markerImage,
			// });
			var markerImage = new kakao.maps.MarkerImage(
					this.markerSrc,
					this.markerSize,
					this.markerOption,
				),
				markerPosition = new kakao.maps.LatLng(this.lat, this.lng); // 마커가 표시될 위치입니다

			// 마커를 생성합니다
			var marker = new kakao.maps.Marker({
				position: markerPosition,
				image: markerImage, // 마커이미지 설정
			});

			marker.setMap(this.map);

			// 마커 클릭 시 해당 위치로 마커 이동
			let base = this;
			kakao.maps.event.addListener(this.map, 'click', function (mouseEvent) {
				var latlng = mouseEvent.latLng;

				base.lat = latlng.getLat();
				base.lng = latlng.getLng();

				marker.setPosition(latlng);
				// base.fnMapMarker(base.lat, base.lng);
				// console.log('fnClickMap', base.lat, base.lng);
			});
		},

		fnMapMarker(lat, lng) {
			if (this.lat == '') {
				this.$toastr.e('위도를 입력 해주세요', '입력 오류');
				this.$refs.lat.focus();
				return false;
			}
			if (this.lng == '') {
				this.$toastr.e('경도를 입력 해주세요', '입력 오류');
				this.$refs.lng.focus();
				return false;
			}
			// console.log('fnMapMarker', lat, lng);
			var container = null;
			var options = null;

			container = document.getElementById('map');
			options = {
				center: new kakao.maps.LatLng(lat, lng),
				level: 3,
			};

			var map = new kakao.maps.Map(container, options);
			var marker = new kakao.maps.Marker({
				// 지도 중심좌표에 마커를 생성합니다
				position: map.getCenter(),
				image: this.markerImage,
			});

			// 지도에 마커를 표시합니다
			marker.setMap(this.map);

			// this.initMap();
			// console.log('fnMapMarker', lat, lng);
			// this.markerList = [];
			// let markerItem = {
			// 	title: 'marker-' + lat + '-' + lng,
			// 	latLng: new kakao.maps.LatLng(lat, lng),
			// };
			// this.markerList.push(markerItem);
			// this.markerList.forEach(position => {
			// 	const marker = new kakao.maps.Marker({
			// 		map: this.map,
			// 		position: position.latLng, // 마커의 위치
			// 		title: position.title, // 마우스 오버 시 표시할 제목
			// 		// image: markerImage, // 마커의 이미지
			// 	});
			// 	marker.setDraggable(true);
			// 	this.markers.push(marker);
			// });
			// // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
			// const bounds = this.markerList.reduce(
			// 	(bounds, position) => bounds.extend(position.latLng),
			// 	new kakao.maps.LatLngBounds(),
			// );
			// this.map.setBounds(bounds);
		},
		fnChangeDamage() {
			this.markerSrc = this.damageTypeList[this.damageTp - 1].markerIcon;
			this.initMap();
		},
		fnChangeProgress() {
			// console.log(this.progressTp);
			if (this.progressTp == '9') {
				this.disProgressTp = 1;
			} else {
				this.disProgressTp = 0;
			}
		},
		fnModalClosed(name, val1) {
			if (name === 'category') {
				this.categoryList = val1;
			} else if (name === 'keyword') {
				this.keywordList = val1;
			}
		},
		fnFileAdd(tp, f) {
			if (tp == 'before') {
				this.beforeFile.push(f);
			} else {
				this.afterFile.push(f);
			}

			// console.log(this.imageFile);
		},
		fnFileUpload(e, tp) {
			// let inputFile = e.target;
			// console.log(inputFile);
			let fileTp = e.target.files[0].type;

			if (tp == 'before') {
				if (fileTp == 'image/jpeg' || fileTp == 'image/gif' || fileTp == 'image/png') {
					this.beforeFile = e.target.files[0];
					this.beforeFileName = this.beforeFile.name;
				} else {
					this.$toastr.e('사진 파일만 업로드 할 수 있습니다', '입력 오류');
					return false;
				}
			} else if (tp == 'after') {
				if (fileTp == 'image/jpeg' || fileTp == 'image/gif' || fileTp == 'image/png') {
					this.afterFile = e.target.files[0];
					this.afterFileName = this.afterFile.name;
				} else {
					this.$toastr.e('사진 파일만 업로드 할 수 있습니다', '입력 오류');
					return false;
				}
			} else {
				this.$toastr.e('사진 파일만 업로드 할 수 있습니다', '입력 오류');
				return false;
			}
		},
		fnSaved() {
			// 입력 체크
			if (this.lat == '') {
				this.$toastr.e('위도를 입력 해주세요', '입력 오류');
				this.$refs.lat.focus();
				return false;
			}
			if (this.lng == '') {
				this.$toastr.e('경도를 입력 해주세요', '입력 오류');
				this.$refs.lng.focus();
				return false;
			}
			if (this.damageTp.length < 1) {
				this.$toastr.e('파손 종류를 선택 해주세요', '입력 오류');
				// this.$refs.damage_1.focus();
				return false;
			}

			if (this.damageTp == '') {
				this.$toastr.e('파손 종류를 선택 해주세요', '입력 오류');
				// this.$refs.damage_1.focus();
				return false;
			}

			if (this.progressTp == '') {
				this.$toastr.e('진행상태를 선택 해주세요', '입력 오류');
				return false;
			}

			if (this.progressTp == '9' && this.endDt == '') {
				this.$toastr.e('완료일을 입력 해주세요', '입력 오류');
				this.$refs.endDt.focus();
				return false;
			}

			// if (this.imageFileName == '') {
			// 	this.$toastr.e('파일을 등록 해주세요', '입력 오류');
			// 	this.$refs.imageFile.focus();
			// 	return false;
			// }

			const formData = {
				lat: this.lat,
				lng: this.lng,
				damageTp: this.damageTp,
				progressTp: this.progressTp,
				memo: this.memo,
				beforeFile: this.beforeFile,
				aferFile: this.aferFile,
				// used: this.used ? 1 : 0,
			};

			this.loadingTp = true;

			PostPjDamage(formData)
				.then(res => {
					const data = res.data;

					this.$swal({
						title: '등록',
						text: '등록에 성공 하였습니다.',
						icon: 'success',
						timer: 2000,
						showConfirmButton: false,
					}).then(() => {
						this.$router.push('/gn/pj/damage/view/' + data.damageNo);
					});
					// this.$toastr.s('등록 되었습니다', '등록');
					// this.$router.push('/gn/sy/user/view/' + data.userNo);
				})
				.catch(() => {
					this.$swal({
						title: '등록',
						html: '등록에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
						type: 'error',
						timer: 2000,
						showConfirmButton: false,
					});
					// this.$toastr.e(data.error, '실패');
				})
				.finally(() => {
					this.loadingTp = false;
				});
		},

		fnUpdated() {
			// 입력 체크
			if (this.lat == '') {
				this.$toastr.e('위도를 입력 해주세요', '입력 오류');
				this.$refs.lat.focus();
				return false;
			}
			if (this.lng == '') {
				this.$toastr.e('경도를 입력 해주세요', '입력 오류');
				this.$refs.lng.focus();
				return false;
			}
			if (this.damageTp == '') {
				this.$toastr.e('파손 종류를 선택 해주세요', '입력 오류');
				// this.$refs.damage_1.focus();
				return false;
			}

			if (this.progressTp == '') {
				this.$toastr.e('진행상태를 선택 해주세요', '입력 오류');
				return false;
			}

			if (this.progressTp == '9' && this.endDt == '') {
				this.$toastr.e('완료일을 입력 해주세요', '입력 오류');
				this.$refs.endDt.focus();
				return false;
			}

			const formData = {
				damageNo: this.damageNo,
				lat: this.lat,
				lng: this.lng,
				damageTp: this.damageTp,
				progressTp: this.progressTp,
				endDt: this.endDt,
				memo: this.memo,
				beforeFile: this.beforeFile,
				afterFile: this.afterFile,
				// used: this.used ? 1 : 0,
			};
			// console.log(formData);

			PutPjDamage(formData)
				.then(() => {
					// const data = res.data;
					this.$swal({
						title: '수정',
						text: '수정에 성공 하였습니다.',
						icon: 'success',
						timer: 2000,
						showConfirmButton: false,
					}).then(() => {
						this.fnInit();
					});
				})
				.catch(() => {
					this.$swal({
						title: '수정',
						html: '수정에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
						type: 'error',
						timer: 2000,
						showConfirmButton: false,
					});

					// this.$toastr.e(data.error, '실패');
				})
				.finally(() => {
					// this.loadingTp = false;
				});
			this.loadingTp = false;
			// this.fnGoPage('L');
		},

		fnDeleted() {
			let params = '?damageNo=' + this.damageNo;

			var text = '정보를 삭제 하시겠습니까?';
			this.$swal
				.fire({
					title: '삭제',
					html: text,
					icon: 'warning', // success, error, warning, info
					showConfirmButton: true,
					confirmButtonColor: '#449d44',
					confirmButtonText: '승인',
					showCancelButton: true,
					cancelButtonColor: '#d33',
					cancelButtonText: '취소',
				})
				.then(result => {
					if (result.isConfirmed) {
						DeletePjDamage(params)
							.then(() => {
								this.$swal({
									title: '삭제',
									text: '삭제에 성공 하였습니다.',
									icon: 'success',
									timer: 2000,
									showConfirmButton: false,
								}).then(() => {
									this.fnGoPage('L');
								});
							})
							.catch(() => {
								this.$swal.fire({
									title: '삭제',
									html: '삭제에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
				});
		},

		fnGoPage(str) {
			if (str == 'L') this.$router.push('/gn/pj/damage/list');
		},
	},
};
</script>
<style scoped>
#map {
	width: 100%;
	height: 600px;
}
</style>
