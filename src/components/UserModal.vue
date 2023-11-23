<template>
	<div class="ibox">
		<div class="ibox-title">
			<div class="row">
				<form role="form" name="syForm">
					<div class="col-md-2">
						<!-- <p class="stat-header text-info">{{ totalCount }} 건</p> -->
					</div>
					<div class="col-md-8">
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
											@click="selectDropBox('role', '', '회원 전체')"
											data-form="searchRole"
											data-val=""
											>회원 전체</a
										>
									</li>
									<li v-for="item in roleList" :key="item.codeValue">
										<a
											href="javascript:;"
											@click="selectDropBox('role', item.codeValue, item.codeName)"
											>{{ item.codeName }}</a
										>
									</li>
								</ul>
							</div>
							<input
								type="text"
								class="form-control input-sm"
								v-model="searchText"
								placeholder="아이디, 사용자명 검색"
								@keyup.enter="searchUser"
							/>
							<span class="input-group-btn"
								><button
									type="button"
									class="btn btn-sm btn-info"
									title="조건검색"
									@click="searchUser"
								>
									<i class="fa fa-search"></i></button
							></span>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="ibox-content">
			<div class="table-responsive">
				<table class="table table-hover">
					<thead>
						<tr>
							<th scope="col">번호</th>
							<th scope="col">사용자명(ID)</th>
							<th scope="col">회원 구분</th>
							<th scope="col">지역</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						<!-- <tr .loginyn == 'N'} class="throughline"{/}> -->
						<tr v-for="(item, index) in userList" :key="index">
							<td>{{ item.no }}</td>
							<th v-if="item.deleteId !== ''" scope="row">{{ item.userName }}</th>
							<th v-else scope="row">{{ item.userName }} ({{ item.userId }})</th>
							<td>{{ item.userLevelNm }}</td>
							<td>{{ item.addressDetail }}</td>
							<td>
								<button
									type="button"
									class="btn btn-success"
									@click="userSelect(item.seq, item.userName)"
								>
									선택
								</button>
							</td>
						</tr>

						<tr v-if="userList.length < 1">
							<td colspan="5"><p class="nomenu text-center">데이터가 없습니다.</p></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="text-center">
				<nav>
					<ul class="pagination">
						<li v-if="page > pageScale">
							<a @click="pageMove(1)"><i class="fa fa-angle-double-left"></i></a>
						</li>
						<li v-if="page > 1">
							<a @click="pageMove(page - 1)"><i class="fa fa-angle-left"></i></a>
						</li>
						<li :class="{ active: page === pg }" v-for="pg in pageList" :key="pg">
							<a @click="pageMove(pg)">{{ pg }}</a>
						</li>
						<li v-if="page < totalPage">
							<a @click="pageMove(page + 1)"><i class="fa fa-angle-right"></i></a>
						</li>
						<li v-if="endPageBtn === true">
							<a @click="pageMove(totalPage)"><i class="fa fa-angle-double-right"></i></a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>
import { GetGnSearchUserList } from '@/api/index';

export default {
	data() {
		return {
			// 검색
			roleList: [],
			roleKey: '',
			roleValue: '회원 전체',
			searchText: '',
			page: 1,
			pageSize: 10, // page 당 게시글 수
			pageScale: 10, // 페이지 수
			totalCount: 0, // 전체 게시글 수
			totalPage: 0, // 전체 페이지 수
			endPageBtn: false,
			pageList: [],
			userList: [],
		};
	},
	created() {
		// 데이터를 가져온다
		this.initData();
	},
	methods: {
		userSelect(userSeq, userName) {
			this.$emit('selected', 'user', userSeq, userName);
			this.$parent.$emit('close-modal');
		},

		// dropbox select
		selectDropBox(name, key, val) {
			if (name === 'role') {
				this.roleValue = val;
				this.roleKey = key;
			}
			this.initData();
		},

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
			// console.log(this.$route.query.pageId)
			let params = '?&page=' + this.page + '&pageSize=' + this.pageSize;
			// 권한
			if (this.roleKey !== '') {
				params = params + '&searchRole=' + this.roleKey;
			}
			// {이름, id} 검색어
			if (this.searchText !== '') {
				params = params + '&searchText=' + this.searchText;
			}
			// console.log(params)
			GetGnSearchUserList(params)
				.then(res => {
					const data = res.data;
					this.page = data.page;
					this.pageSize = data.pageSize;
					this.totalCount = data['totalCount'];
					this.userList = data.userList;
					this.roleList = data.roleList;

					// 페이징
					this.PageNavigation(this.page);
				})
				.catch(err => {
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
						html: true,
					});
				});
		},
		searchUser() {
			this.initData();
		},
	},
};
</script>
