<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>환경설정</h2>
				<ol class="breadcrumb">
					<li>
						<router-link to="/">Main</router-link>
					</li>
					<li class="active">
						<strong>기본설정</strong>
					</li>
				</ol>
			</div>
		</div>

		<div class="wrapper wrapper-content animated fadeIn">
			<div class="row m-t-sm">
				<div class="col-md-3 m-b-sm">
					<div class="ibox">
						<div class="ibox-content">
							<div class="container-lg">
								<div
									class="slimScrollDiv"
									style="position: relative; overflow: hidden; width: auto; height: 100%"
								>
									<div class="scroll-container" style="overflow: hidden; width: auto; height: 100%">
										<table id="BTable" class="rowCursor table table-striped">
											<tbody>
												<tr
													v-for="(item, index) in configList"
													:key="item.codeId"
													:class="index === idx ? 'highlight' : ''"
												>
													<td scope="row" @click="setSideBar(item, index)">
														<small>{{ item.codeName }}</small>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div
										class="slimScrollBar"
										style="
											background: rgb(0, 0, 0);
											width: 7px;
											position: absolute;
											top: 0px;
											opacity: 0.4;
											display: none;
											border-radius: 7px;
											z-index: 99;
											right: 1px;
											height: 356.262px;
										"
									></div>
									<div
										class="slimScrollRail"
										style="
											width: 7px;
											height: 100%;
											position: absolute;
											top: 0px;
											display: none;
											border-radius: 7px;
											background: rgb(51, 51, 51);
											opacity: 0.2;
											z-index: 90;
											right: 1px;
										"
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-9 animated fadeIn">
					<!-- 영수증 출력 정보 -->
					<!-- <ConfigReceipt v-if="isReceipt" :subPageTitle="subPageTitle" /> -->

					<!-- 공지사항 -->
					<!-- <ConfigNotice v-if="isNotice" :subPageTitle="subPageTitle" /> -->

					<!-- 구매 제한 -->
					<!-- <ConfigLimit v-if="isLimit" :subPageTitle="subPageTitle" /> -->

					<div class="row" v-if="isNone">
						<div class="col-lg-12">
							<div class="ibox animated fadeIn">
								<div class="ibox-title">
									<h3 class="small-size80">
										<i class="fa fa-list"></i> <span class="textNm">환경설정</span> 목록. 총 :
										<span id="cCount">{{ configList.length }}</span
										>건
										<small
											>&nbsp;&nbsp;<span class="textNm">왼쪽의 카테고리</span> 목록을 선택하여
											내용을 등록/수정하실 수 있습니다.</small
										>
									</h3>
									<div class="ibox-tools actionBtn">
										<!-- <button class="addBtn btn btn-sm btn-primary" data-action="A" type="button" disabled=""><i class="fa fa-plus"></i> 추가</button> -->
									</div>
								</div>

								<div class="ibox-content">
									<p id="CText" class="nomenu">환경설정 항목을 선택해 주세요.</p>
									<table id="CTable" class="table table-striped none">
										<thead>
											<tr>
												<th scope="col"><span class="textNm">카테고리</span> 명</th>
												<th scope="col">정렬순서</th>
												<th scope="col">사용유무</th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import PageNavigation from '@/components/PageNavigation';
// import ConfigReceipt from '@/components/ConfigReceipt';
// import ConfigNotice from '@/components/ConfigNotice';
// import ConfigLimit from '@/components/ConfigLimit';
import { GetSyConfig } from '@/api/index';

export default {
	// components: { ConfigReceipt, ConfigNotice, ConfigLimit },
	data() {
		return {
			// 상태
			idx: '', // 왼쪽 항목 활성화

			configList: [],
			isNone: true,

			// 입력창 - 영수증 정보
			isReceipt: false,

			// 입력창 - 공지사항
			isNotice: false,

			// 입력창 - 구매제한
			isLimit: false,

			subPageTitle: '',
		};
	},
	created() {
		// 데이터를 가져온다
		this.initData();
	},
	methods: {
		pageMove(page) {
			// 페이지 이동
			this.page = page;
			this.initData();
		},
		PageNavigation(pg) {
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
			}
		},

		initData() {
			let params = '';

			// GetSyConfig(params)
			// 	.then(res => {
			// 		const data = res.data;
			// 		// console.log(data)
			// 		this.configList = data.configList;
			// 	})
			// 	.catch(err => {
			// 		console.log(err.error.response);
			// 	});
		},

		setSideBar(item, idx) {
			this.idx = idx;
			this.subPageTitle = item.codeName;
			if (this.idx == 0) {
				this.isReceipt = true;
				this.isNotice = false;
				this.isLimit = false;
				this.isNone = false;
			} else if (this.idx == 1) {
				this.isReceipt = false;
				this.isNotice = true;
				this.isLimit = false;
				this.isNone = false;
			} else if (this.idx == 2) {
				this.isReceipt = false;
				this.isNotice = false;
				this.isLimit = true;
				this.isNone = false;
			} else {
				this.isReceipt = false;
				this.isNotice = false;
				this.isLimit = false;
				this.isNone = true;
			}
		},
		resetData() {
			// this.seq = '';
			// this.storeSeq = '';
			// this.noticeFirst = '';
			// this.noticeSecond = '';
			// this.noticeThird = '';
			// this.deleteId = '';
		},
		formOpen() {
			this.resetData();
			this.openForm = true;
		},
		formClose() {
			this.resetData();
			this.openForm = false;
		},
	},
};
</script>
