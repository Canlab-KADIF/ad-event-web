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
									<div class="col-md-3">
										<p class="stat-header text-info">{{ totalCount }} 건</p>
									</div>
									<div class="col-md-6">
										<div class="input-group">
											<div class="input-group-btn searchDrop">
												<button type="button" id="searchRoleText" class="btn btn-sm btn-default">
													{{ roleKey }}
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
													<li v-for="item in roleList" :key="item.val">
														<a href="javascript:;" @click="fnDropBox('role', item.key, item.val)">{{
															item.key
														}}</a>
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
										</tr>

										<tr v-if="itemList.length < 1">
											<td colspan="5"><p class="nomenu text-center">데이터가 없습니다.</p></td>
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
import { GetSyUserList } from '@/api/index';
import MdLoading from '@/components/modals/MdLoading.vue';
export default {
	components: { MdLoading },
	name: 'userList',
	data() {
		return {
			pageId: this.$route.params.pageId,
			todayDt: new Date().toISOString().slice(0, 10),
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
			roleList: [
				{ key: '회원', val: 1 },
				{ key: '비회원', val: 0 },
			],
			roleKey: '회원 전체',
			roleVal: '',
			searchType: '',
			searchText: '',

			itemList: [],
		};
	},
	mounted() {},
	created() {
		this.fnInitData();
	},
	methods: {
		fnInitData() {
			let params = '?page=' + this.page + '&pageSize=' + this.pageSize;
			if (this.roleVal !== '') {
				params = params + '&searchRole=' + this.roleVal;
			}

			this.loadingTp = true;

			GetSyUserList(params)
				.then(res => {
					const data = res.data;
					this.page = data.page;
					this.pageSize = data.pageSize;
					this.totalCount = data['totalCount'];
					this.itemList = data.itemList;

					// 페이징
					this.fnPageNavigation(this.page);
				})
				.catch(() => {
					this.$swal.fire({
						title: '키워드',
						html: '키워드 정보를 가져오는데 실패 하였습니다. <br />시스템 담당자에 문의 해 주세요',
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
			console.log(key, val);
			if (name == 'role') {
				this.roleVal = val;
				this.roleKey = key;
			}
			this.fnSearch();
		},
		fnPageNavMove(page) {
			// 페이지 이동
			this.page = page;
			this.fnInitData();
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
			this.fnPageNavMove(1);
			this.fnInitData();
		},

		fnDeleted(no) {
			const params = '?keywordNo=' + no;
			console.log(params);
		},
		fnGoPage(str) {
			if (str == 'I') {
				this.$router.push('/gn/pj/store/write');
			} else {
				if (str > 0) {
					this.$router.push('/gn/pj/store/view/' + str);
				}
			}
		},
	},
};
</script>
