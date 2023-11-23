<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>회원 관리</h2>
				<ol class="breadcrumb">
					<li>
						<router-link to="/">Main</router-link>
					</li>
					<li class="active">
						<strong>기본 설정</strong>
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
									<div class="col-md-3">
										<p class="stat-header text-info">{{ totalCount }} 건</p>
									</div>
									<div class="col-md-6">
										<div class="input-group">
											<div class="input-group-btn searchDrop">
												<button type="button" id="searchRoleText" class="btn btn-sm btn-default">
													{{ roleValue }}
												</button>
												<button
													type="button"
													class="btn btn-sm btn-default dropdown-toggle"
													data-toggle="dropdown"
													aria-haspopup="true"
													aria-expanded="false"
												>
													<span class="caret"></span>
													<span class="sr-only">회원 드롭다운 버튼</span>
												</button>
												<ul class="dropdown-menu">
													<li>
														<a
															href="javascript:;"
															@click="fnDropBox('role', '', '회원 전체')"
															data-form="searchRole"
															data-val=""
															>회원 전체</a
														>
													</li>
													<li v-for="item in roleList" :key="item.codeId">
														<a
															href="javascript:;"
															@click="fnDropBox('role', item.codeValue, item.codeName)"
															>{{ item.codeName }}</a
														>
													</li>
												</ul>
											</div>

											<input
												type="text"
												v-model="searchText"
												class="form-control input-sm"
												placeholder="아이디, 사용자명 검색"
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
							<div class="table-responsive">
								<table class="table table-hover table-middle table-bordered">
									<thead>
										<tr>
											<th scope="col" class="text-center">번호</th>
											<th scope="col" class="text-center">회원명</th>
											<th scope="col" class="text-center">회원ID</th>
											<th scope="col" class="text-center">회원권한</th>
											<th scope="col" class="text-center">회원구분</th>
											<th scope="col" class="text-center">로그인</th>
											<th scope="col" class="text-center">상태</th>
											<th scope="col" class="text-center">로그인 횟수</th>
											<th scope="col" class="text-center">마지막 로그인</th>
										</tr>
									</thead>
									<tbody>
										<!-- <tr .loginyn == 'N'} class="throughline"{/}> -->
										<tr
											v-for="(item, index) in itemList"
											@click="fnGoPage(item.userSeq)"
											:key="index"
										>
											<td class="text-center">{{ item.no }}</td>
											<th scope="row">
												{{ item.userName }}
											</th>
											<td>{{ item.userId }}</td>
											<td class="text-center">
												<span class="btn btn-sm btn-default m-xxs" style="cursor: auto">{{
													item.roleNm
												}}</span>
											</td>
											<td class="text-center">
												<span class="btn btn-sm btn-info m-xxs" style="cursor: auto">{{
													item.groupTypeNm
												}}</span>
											</td>
											<td class="text-center">
												<span
													v-if="item.loginYn === 'Y'"
													class="btn btn-sm btn-primary m-xxs"
													style="cursor: auto"
													>{{ item.loginYnNm }}</span
												>
												<span v-else class="btn btn-sm btn-warning m-xxs" style="cursor: auto">{{
													item.loginYnNm
												}}</span>
											</td>
											<td class="text-center">
												<span
													v-if="item.deleteId === ''"
													class="btn btn-sm btn-primary m-xxs"
													style="cursor: auto"
													>{{ item.userState }}</span
												>
												<span v-else class="btn btn-sm btn-danger m-xxs" style="cursor: auto">{{
													item.userState
												}}</span>
											</td>
											<td class="text-center">{{ item.loginCount }}</td>
											<td class="text-center">{{ item.lastLoginDt }}</td>
										</tr>

										<tr v-if="itemList.length < 1">
											<td colspan="7"><p class="nomenu text-center">데이터가 없습니다.</p></td>
										</tr>
									</tbody>
								</table>
							</div>
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
// import PageNavigation from '@/components/PageNavigation';
import { GetSyUserList } from '@/api/index';
import MdLoading from '@/components/modals/MdLoading.vue';
export default {
	components: { MdLoading },
	data() {
		return {
			todatDate: new Date().toISOString().slice(0, 10),
			pageId: this.$route.params.pageId,
			roleList: [],
			roleKey: '',
			roleValue: '회원 전체',

			searchText: '',
			page: 1,
			pageSize: 20, // page 당 게시글 수
			pageScale: 10, // 페이지 수
			totalCount: 0, // 전체 게시글 수
			totalPage: 0, // 전체 페이지 수
			endPageBtn: false,
			pageList: [],
			itemList: [],
			loadingTp: false,
		};
	},
	watch: {},
	created() {
		// 데이터를 가져온다
		this.fnInitData();
	},
	methods: {
		fnInitData() {
			this.loadingTp = true;

			let params = '?&page=' + this.page + '&pageSize=' + this.pageSize;

			if (this.roleKey !== '') {
				params = params + '&searchRole=' + this.roleKey;
			}
			// {이름, id} 검색어
			if (this.searchText !== '') {
				params = params + '&searchText=' + this.searchText;
			}

			GetSyUserList(params)
				.then(res => {
					const data = res.data;

					this.page = data.page;
					this.pageSize = data.pageSize;
					this.totalCount = data['totalCount'];
					this.itemList = data.itemList;
					this.roleList = data.roleList;
					// 페이징
					this.PageNavigation(this.page);
				})
				.catch(err => {
					// console.log(err)
					// console.log(err.response.status)
					// console.log(err.response.data.error)

					this.$swal.fire({
						title: '회원 정보 ',
						html:
							'회원 정보를 가져오는데 실패 하였습니다 (' +
							err.response.status +
							' ' +
							err.response.data.error +
							')',
						icon: 'error',
						timer: 2000,
						showConfirmButton: false,
					});
				});
			this.loadingTp = false;
		},
		// dropbox select
		fnDropBox(name, key, val) {
			if (name === 'role') {
				this.roleValue = val;
				this.roleKey = key;
			} else if (name === 'local') {
				this.SearchLocalTypeKey = key;
				this.SearchLocalTypeValue = val;
			}
			this.fnSearch();
		},

		fnPageNavMove(page) {
			// 페이지 이동
			this.page = page;
			this.fnInitData();
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
			} else {
				this.endPageBtn = false;
			}
		},

		fnSearch() {
			this.fnPageNavMove(1);
			this.fnInitData();
		},
		fnGoPage(str) {
			if (str == 'I') {
				this.$router.push('/gn/sy/user/write');
			} else {
				if (str > 0) {
					this.$router.push('/gn/sy/user/view/' + str);
				}
			}
		},
		addUser() {
			// 신규 등록
			this.$router.push('/gn/sy/user/write');
		},
	},
};
</script>
