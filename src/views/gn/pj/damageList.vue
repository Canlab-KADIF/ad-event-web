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
				<div class="col-lg-12">
					<div class="ibox">
						<div class="ibox-title">
							<div class="row">
								<form role="form" name="syForm">
									<div class="col-md-2">
										<p class="stat-header text-info">{{ totalCount }} 건</p>
									</div>
									<div class="col-md-3">
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
									</div>
									<div class="col-md-3">
										<div class="input-group">
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

											<input
												type="text"
												v-model="searchText"
												class="form-control input-sm"
												v-on:keyup.enter="fnSearch()"
												placeholder="메모 검색"
											/>

											<span class="input-group-btn"
												><button
													type="button"
													class="btn btn-sm btn-info"
													title="조건검색"
													@click="fnSearch()"
												>
													<i class="fa fa-search"></i></button
											></span>
										</div>
									</div>

									<div class="col-md-3 text-right">
										<button
											class="insert-btn btn btn-sm btn-primary"
											type="button"
											@click="fnGoPage('I')"
										>
											<i class="fa fa-edit"></i> 등록
										</button>
									</div>
								</form>
							</div>
						</div>
						<div class="ibox-content">
							<div class="row m-b-sm">
								<div class="col-md-1">
									<button class="btn btn-xs btn-info" type="button">
										<i class="fa fa-check-square-o"></i> 파손 종류
									</button>
								</div>
								<div class="col-md-8 checkAll">
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
								<!-- <div class="col-md-3">
									<input
										type="text"
										name="dataMenustaff"
										class="form-control input-sm"
										value=""
										placeholder="콘텐츠 담당 학과"
									/>
								</div>
								<div class="col-md-3">
									<input
										type="text"
										name="dataMenustaffTel"
										class="form-control input-sm"
										value=""
										placeholder="콘텐츠 담당 전화번호"
									/>
								</div>
								<div class="col-md-2">
									<button class="dataSetBtn btn btn-sm btn-primary" type="button">
										<i class="fa fa-pencil-square-o"></i> 선택된 데이터 일괄 셋팅
									</button>
								</div> -->
							</div>
							<div class="table-responsive">
								<table class="table table-hover table-middle table-bordered">
									<thead>
										<tr>
											<th scope="col" class="text-center">번호</th>
											<th scope="col" class="text-center">등록이미지</th>
											<th scope="col" class="text-center">완료이미지</th>
											<th scope="col" class="text-center">위도(lat)</th>
											<th scope="col" class="text-center">경도(lng)</th>
											<th scope="col" class="text-center">파손구분</th>
											<th scope="col" class="text-center">진행상태</th>
											<!-- <th scope="col" class="text-center">사용구분</th> -->
											<th scope="col" class="text-center">등록/완료일</th>
										</tr>
									</thead>
									<tbody>
										<!-- <tr .loginyn == 'N'} class="throughline"{/}> -->
										<tr
											v-for="(item, index) in itemList"
											@click="fnGoPage(item.damageNo)"
											:key="index"
										>
											<td class="text-center">{{ item.no }}</td>
											<td class="text-center">
												<template v-if="item.beforeImage">
													<img
														:src="item.beforeImage.filePath"
														width="150"
														style="max-width: 100%; height: auto"
													/>
												</template>
												<template v-else>
													<img src="/gn/images/noimage.jpg" width="150" />
												</template>
											</td>
											<td class="text-center">
												<template v-if="item.afterImage">
													<img :src="item.afterImage.filePath" width="150" />
												</template>
												<template v-else>
													<img
														src="/gn/images/noimage.jpg"
														width="150"
														style="max-width: 100%; height: auto"
													/>
												</template>
											</td>
											<td class="text-center">{{ item.lat }}</td>
											<td class="text-center">{{ item.lng }}</td>
											<td class="text-center">
												<img :src="damageTypeList[item.damageTp - 1].markerIcon" />

												<span class="btn btn-sm btn-default m-xxs" style="cursor: auto">{{
													item.damageNm
												}}</span>
											</td>
											<td class="text-center">
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
												<!-- <span v-else class="btn btn-sm btn-danger m-xxs" style="cursor: auto"
													>중지</span
												> -->
											</td>
											<!-- <td class="text-center">
												<span
													v-if="item.used == 1"
													class="btn btn-sm btn-info m-xxs"
													style="cursor: auto"
													>사용</span
												>
												<span v-else class="btn btn-sm btn-danger m-xxs" style="cursor: auto"
													>중지</span
												>
											</td> -->
											<td class="text-left">
												<span class="btn btn-sm btn-default m-xxs" style="cursor: auto"
													>등록일 </span
												>&nbsp;&nbsp;{{ item.insertDt }}
												<br />
												<span class="btn btn-sm btn-default m-xxs" style="cursor: auto"
													>완료일 </span
												>&nbsp;&nbsp;{{ item.endDt }}
											</td>
										</tr>

										<tr v-if="itemList.length < 1">
											<td colspan="8"><p class="nomenu text-center">데이터가 없습니다.</p></td>
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
				</div>
			</div>
		</div>
		<MdLoading v-if="loadingTp"></MdLoading>
	</div>
</template>

<script>
import { GetPjDamageList } from '@/api/index';
import MdLoading from '@/components/modals/MdLoading.vue';
export default {
	components: { MdLoading },
	name: 'roadList',
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
			pageSize: 20, // page 당 게시글 수
			pageScale: 10, // 페이지 수
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
		};
	},
	mounted() {},
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
			this.loadingTp = true;

			GetPjDamageList(params)
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
			// let listCnt = this.damageTypeList.length;
			// let chkCnt = this.damageTp.length;

			// if (tp && val == '0') {
			// 	for (let i = 0; i < this.damageTypeList.length; i++) {
			// 		let chkItem = this.damageTp.find(el => el == this.damageTypeList[i]['codeValue']);
			// 		if (chkItem === undefined) {
			// 			this.damageTp.push(this.damageTypeList[i]['codeValue']);
			// 			this.damageTp.sort();
			// 		}
			// 	}
			// } else if (!tp && val === '0') {
			// 	this.damageTp = [];
			// } else {
			// 	console.log(listCnt, chkCnt);
			// 	if (listCnt == chkCnt + 1) {
			// 		console.log('전체 선택 처리');
			// 		for (let i = 0; i < this.damageTypeList.length; i++) {
			// 			let chkItem = this.damageTp.find(el => el == this.damageTypeList[i]['codeValue']);
			// 			if (chkItem === undefined) {
			// 				this.damageTp.push(this.damageTypeList[i]['codeValue']);
			// 				this.damageTp.sort();
			// 			}
			// 		}
			// 	}
			// 	this.damageTp.sort();
			// }
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
