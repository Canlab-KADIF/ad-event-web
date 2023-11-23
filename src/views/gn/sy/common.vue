<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>공통코드 관리</h2>
				<ol class="breadcrumb">
					<li>
						<a href="javascript:;">Main</a>
					</li>
					<!--
					{? groupMiddle != ''}
						<li>{groupMiddle}</li>
					{/}
					-->
					<li class="active">
						<strong>기본 설정</strong>
					</li>
				</ol>
			</div>
		</div>
		<div class="wrapper wrapper-content animated fadeIn">
			<div class="row">
				<div class="col-lg-12">
					<div class="tabs-container">
						<ul class="nav nav-tabs">
							<li class="active"><a href="javascript:;">공통코드 관리</a></li>
							<!-- <li><a href="{tabUrl}_role.php?pageID={menuInfo.codeid}">권한 설정</a></li> -->
						</ul>
						<div class="tab-content">
							<div class="tab-pane active">
								<div class="panel-header">
									<button @click="reset" class="formInit btn btn-sm btn-default" type="button">
										<i class="fa fa-file-o"></i> 리셋
									</button>
									<div class="ibox-tools">
										<div class="btn-toolbar" role="toolbar">
											<div class="actionBtn btn-group" role="group">
												<button
													class="sortUp btn btn-sm btn-warning"
													data-action="SU"
													type="button"
													:disabled="codeId === ''"
													@click="moveMenu('U')"
												>
													<i class="fa fa-chevron-up"></i>
												</button>
												<button
													class="sortDown btn btn-sm btn-warning"
													data-action="SD"
													type="button"
													:disabled="codeId === ''"
													@click="moveMenu('D')"
												>
													<i class="fa fa-chevron-down"></i>
												</button>
											</div>
											<div class="actionBtn btn-group" role="group">
												<button
													type="button"
													class="firstNodeUpdate btn btn-sm btn-primary"
													:disabled="parentId !== ''"
													@click="addMenu"
												>
													<i class="fa fa-level-up"></i> 최상위 추가
												</button>
												<button
													type="button"
													class="InsertNode btn btn-sm btn-primary"
													data-action="ND"
													:disabled="codeId === ''"
													@click="addMenu"
												>
													<i class="fa fa-level-down"></i> 하위 추가
												</button>
											</div>
											<div class="actionBtn btn-group" role="group">
												<button
													class="lastNodeUpdate btn btn-sm btn-success"
													data-action="U"
													type="button"
													:disabled="codeId === ''"
													@click="updateMenu"
												>
													<i class="fa fa-floppy-o"></i> 저장
												</button>
												<button
													class="lastNodeDelete btn btn-sm btn-danger"
													data-action="D"
													type="button"
													:disabled="codeId === ''"
													@click="deleteMenu"
												>
													<i class="fa fa-times"></i> 삭제
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row m-t-sm">
				<div class="col-lg-3 m-b-sm">
					<!-- <div class="m-b-xs">
						<input type="text" id="tree-filter" name="tree-filter" class="input-sm form-control" placeholder="Search for tree data..." value="">
					</div> -->
					<div class="treeAction m-b-sm">
						<button class="btn btn-xs btn-default" type="button" @click="treeMenuAll('O')">
							<i class="fa fa-folder-open-o"></i> All Open
						</button>
						<button class="btn btn-xs btn-default" type="button" @click="treeMenuAll('C')">
							<i class="fa fa-folder-o"></i> All Close
						</button>
					</div>

					<div
						id="menuTree"
						class="jstree jstree-1 jstree-default"
						role="tree"
						tabindex="0"
						aria-activedescendant="010000"
						aria-busy="false"
					>
						<ul class="jstree-container-ul jstree-children" role="group">
							<li
								v-for="(level1, index) in treeData"
								:key="index"
								role="treeitem"
								class="jstree-node jstree-closed"
								:id="`jstree_${level1.codeId}`"
								ref="cls"
								:class="index === treeData.length - 1 ? 'jstree-last' : ''"
							>
								<i
									@click="treeMenu(level1.codeId, level1.treeOpen)"
									class="jstree-icon jstree-ocl"
									role="presentation"
								></i>
								<a
									class="jstree-anchor"
									:class="clickedCodeId === level1.codeId ? 'jstree-clicked' : ''"
									href="javascript:;"
									@click="fnOnClick(level1)"
									tabindex="-1"
									:id="level1.codeId"
								>
									<i
										class="jstree-icon jstree-themeicon fa fa-folder jstree-themeicon-custom"
										role="presentation"
									></i
									>{{ level1.codeName }}
								</a>

								<template v-if="level1.codeSub.length > 0">
									<ul role="group" class="jstree-children">
										<li
											v-for="(level2, idx) in level1.codeSub"
											:key="idx"
											role="treeitem"
											aria-selected="false"
											aria-level="2"
											class="jstree-node jstree-leaf"
											:class="idx === level1.codeSub.length - 1 ? 'jstree-last' : ''"
										>
											<i class="jstree-icon jstree-ocl" role="presentation"></i>
											<a
												class="jstree-anchor"
												:class="
													clickedCodeId === level2.codeId ? 'jstree-anchor jstree-clicked' : ''
												"
												href="javascript:;"
												@click="fnOnClick(level2)"
												tabindex="-1"
												id="010100_anchor"
											>
												<i
													class="jstree-icon jstree-themeicon fa fa-file-o jstree-themeicon-custom"
													role="presentation"
												></i
												>{{ level2.codeName }}
											</a>
										</li>
									</ul>
								</template>
							</li>
						</ul>
					</div>
				</div>

				<div class="col-lg-9 animated fadeIn">
					<div class="ibox">
						<div class="ibox-content">
							<form role="form" class="form-horizontal" id="syForm">
								<div class="form-group">
									<label for="parentId" class="col-sm-2 control-label">코드 구분</label>
									<!-- <div class="col-sm-5">
									<input type="text" class="form-control numeric" id="parentId"  maxlength="6" v-model="parentId" ref="parentId">
								</div> -->
									<div class="col-sm-10">
										<p class="cms-menuname">
											<i class="fa fa-caret-right"></i>
											<span v-if="parentId !== ''" id="parentId">
												{{ codeName }} [{{ codeId }}]</span
											>
										</p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="codeName" class="col-sm-2 control-label">코드명</label>
									<div class="col-sm-10">
										<input
											type="text"
											class="form-control"
											id="codeName"
											v-model="codeName"
											ref="codeName"
										/>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="codeValue" class="col-sm-2 control-label">코드값</label>
									<div class="col-sm-10">
										<input
											type="text"
											class="form-control"
											id="codeValue"
											v-model="codeValue"
											ref="codeValue"
										/>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="used" class="col-sm-2 control-label">사용 유무</label>
									<div class="col-sm-10">
										<div class="checkbox checkbox-success">
											<input
												type="checkbox"
												id="used"
												v-model="used"
												aria-label="코드 사용 유무"
												:checked="used"
											/>
											<label for="used">코드 사용 유무</label>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { GetSyCodeList, PostSyCode, PutSyCode, DeleteSyCode, PutSyCodeMove } from '@/api/index';

export default {
	comments: {},
	data() {
		return {
			codeList: [],
			// tree
			clickedCodeId: '',
			treeData: [],

			parentId: '',
			codeId: '',
			codeName: '',
			codeValue: '',
			codeSort: '',
			codeStep: '',
			used: true,
		};
	},
	created() {
		// 데이터를 가져온다
		this.initData();
	},
	methods: {
		initData() {
			let params = '';
			GetSyCodeList(params)
				.then(res => {
					const data = res.data;
					this.codeList = data.codeList;
					// console.log(this.codeList)
					for (var i = 0; i < this.codeList.length; i++) {
						this.codeList[i]['treeOpen'] = false;
						if (this.clickedCodeId !== '' && this.codeList[i]['codeId'] === this.clickedCodeId) {
							// 메뉴 순서 변경 후 현재 해당 메뉴의 sort 값을 변경된 sort 값으로 변경
							this.codeSort = this.codeList[i]['codeSort'];
						}
						for (var j = 0; j < this.codeList[i]['codeSub'].length; j++) {
							this.codeList[i]['codeSub'][j]['treeOpen'] = false;
							if (
								this.clickedCodeId !== '' &&
								this.codeList[i]['codeSub'][j]['codeId'] === this.clickedCodeId
							) {
								// 메뉴 순서 변경 후 현재 해당 메뉴의 sort 값을 변경된 sort 값으로 변경
								this.codeSort = this.codeList[i]['codeSub'][j]['codeSort'];
							}
						}
					}
					this.treeData = this.codeList;
				})
				.catch(err => {
					this.$swal.fire({
						title: '공통코드 정보 ',
						html:
							'공통코드 정보를 가져오는데 실패 하였습니다 (' +
							err.response.status +
							' ' +
							err.response.data.error +
							')',
						icon: 'error',
						timer: 2000,
						showConfirmButton: false,
					});
				});
		},
		treeMenu(codeId, treeOpen) {
			// console.log(codeId+' / '+treeOpen);
			for (var i = 0; i < this.treeData.length; i++) {
				if (this.treeData[i]['codeId'] === codeId) {
					this.treeData[i]['treeOpen'] = !treeOpen;
				}
				for (var j = 0; j < this.treeData[i]['codeSub'].length; j++) {
					if (this.treeData[i]['codeSub'][j]['codeId'] === codeId) {
						this.treeData[i]['codeSub'][j]['treeOpen'] = !treeOpen;
					}
				}
			}

			if (treeOpen) {
				// closed
				this.$el.querySelector('#jstree_' + codeId).classList.remove('jstree-open');
				this.$el.querySelector('#jstree_' + codeId).classList.add('jstree-closed');
			} else {
				// open
				this.$el.querySelector('#jstree_' + codeId).classList.remove('jstree-closed');
				this.$el.querySelector('#jstree_' + codeId).classList.add('jstree-open');
			}
		},
		treeMenuAll(tp) {
			if (this.treeData.length > 0) {
				for (var i = 0; i < this.treeData.length; i++) {
					if (tp === 'O') {
						this.$el
							.querySelector('#jstree_' + this.treeData[i]['codeId'])
							.classList.remove('jstree-closed');
						this.$el
							.querySelector('#jstree_' + this.treeData[i]['codeId'])
							.classList.add('jstree-open');
					} else if (tp === 'C') {
						this.$el
							.querySelector('#jstree_' + this.treeData[i]['codeId'])
							.classList.remove('jstree-open');
						this.$el
							.querySelector('#jstree_' + this.treeData[i]['codeId'])
							.classList.add('jstree-closed');
					}
				}
			}
		},
		reset() {
			this.clickedCodeId = '';
			this.parentId = '';
			this.codeId = '';
			this.codeName = '';
			this.codeValue = '';
			this.codeStep = '';
			this.codeSort = '';
			this.used = true;
		},
		fnOnClick(item) {
			this.clickedCodeId = item.codeId;
			this.codeName = item.codeName;
			this.codeValue = item.codeValue;
			this.codeId = item.codeId;
			this.parentId = item.parentId;
			this.codeSort = item.codeSort;
			this.codeStep = item.codeStep;
			this.used = item.used == 1 ? true : false;
		},
		fnTreeClick(codeId, openTf) {
			// console.log(codeId+' / '+treeTf)
			for (var i = 0; i < this.codeList.length; i++) {
				if (this.codeList[i]['codeId'] === codeId) {
					if (openTf == true) {
						this.codeList[i]['treeOpen'] = false;
					} else {
						this.codeList[i]['treeOpen'] = true;
					}
				}
			}
			// console.log(this.codeList);
		},

		addMenu() {
			if (this.codeStep === 2) {
				// this.$toastr.e('3차 메뉴는 생성 할 수 없습니다.', '입력 오류');
				this.$swal.fire({
					title: 'Error',
					text: '3차 메뉴는 생성 할 수 없습니다',
					icon: 'error',
					timer: 2000,
					showConfirmButton: false,
				});
				return false;
			}

			if (this.codeName === '') {
				this.$toastr.e('공통코드 명칭을 입력해 주세요', '입력 오류');
				this.$refs.codeName.focus();
				return false;
			}

			var title = '';
			var text = '';
			if (this.codeId === '') {
				// 최상단 메뉴 등록
				this.codeStep = 1;

				title = '최상위에 공통코드를 추가 하시겠습니까?';
				text = '해당 데이터가 1차 공통코드에 추가됩니다';
			} else {
				// 2차 공통코드 등록
				this.codeStep = 2;
				title = '2차 공통코드를 추가 하시겠습니까?';
				text = '해당 데이터가 2차 공통코드에 추가됩니다';
			}

			const formData = {
				codeId: this.codeId,
				codeName: this.codeName,
				codeValue: this.codeValue,
				codeStep: this.codeStep,
				used: this.used ? 1 : 0,
			};

			// console.log(formData);
			this.$swal
				.fire({
					title: title,
					text: text,
					icon: 'info', // success, error, warning, info
					showConfirmButton: true,
					confirmButtonColor: '#449d44',
					confirmButtonText: '승인',
					showCancelButton: true,
					cancelButtonColor: '#d33',
					cancelButtonText: '취소',
				})
				.then(result => {
					if (result.isConfirmed) {
						PostSyCode(formData)
							.then(() => {
								this.$swal
									.fire({
										title: 'Success',
										text: '공통코드 등록에 성공 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										this.initData();
									});
							})
							.catch(err => {
								this.$swal.fire({
									title: 'Error',
									html:
										'공통코드 등록에 실패 하였습니다 (' +
										err.response.status +
										', ' +
										err.response.data.error +
										')',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
				});
		}, // end function
		updateMenu() {
			if (this.codeName === '') {
				this.$toastr.e('공통코드 명칭을 입력해 주세요', '입력 오류');
				this.$refs.codeName.focus();
				return false;
			}

			const formData = {
				codeId: this.codeId,
				codeName: this.codeName,
				codeValue: this.codeValue,
				codeValue2: this.codeValue2,
				codeValue3: this.codeValue3,
				used: this.used ? 1 : 0,
			};
			// console.log(formData)
			this.$swal
				.fire({
					title: '해당 공통코드를 수정 하시겠습니까?',
					icon: 'info', // success, error, warning, info
					showConfirmButton: true,
					confirmButtonColor: '#449d44',
					confirmButtonText: '승인',
					showCancelButton: true,
					cancelButtonColor: '#d33',
					cancelButtonText: '취소',
				})
				.then(result => {
					if (result.isConfirmed) {
						PutSyCode(formData)
							.then(() => {
								this.$swal
									.fire({
										title: 'Success',
										text: '공통코드 수정에 성공 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										this.initData();
									});
							})
							.catch(err => {
								this.$swal.fire({
									title: 'Error',
									html:
										'공통코드 수정에 실패 하였습니다 (' +
										err.response.status +
										', ' +
										err.response.data.error +
										')',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
				});
		}, // end function
		deleteMenu() {
			let params = '?codeId=' + this.codeId;

			this.$swal
				.fire({
					title: '해당 메뉴를 삭제 하시겠습니까?',
					html: '해당 메뉴와 관련된 데이터가 모두 삭제됩니다',
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
						DeleteSyCode(params)
							.then(() => {
								this.$swal
									.fire({
										title: 'Success ',
										text: '성공적으로 삭제 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										// this.$router.push('/gn/syCode');
										this.initData();
									});
							})
							.catch(err => {
								this.$swal.fire({
									title: 'Error ',
									html:
										'메뉴 삭제에 실패 하였습니다 (' +
										err.response.status +
										', ' +
										err.response.data.error +
										')',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					} // end if
				});
		}, // end function
		moveMenu(move) {
			var title = '';
			if (move === 'U') {
				title = '해당 메뉴를 상위로 이동하시겠습니까?';
			} else {
				title = '해당 메뉴를 하위로 이동하시겠습니까?';
			}

			const formData = {
				codeId: this.codeId,
				parentId: this.parentId,
				codeStep: this.codeStep,
				codeSort: this.codeSort,
				moveType: move,
			};

			this.$swal
				.fire({
					title: title,
					text: '단계가 변경되는 메뉴 이동은 하실 수 없습니다',
					icon: 'info', // success, error, warning, info
					showConfirmButton: true,
					confirmButtonColor: '#449d44',
					confirmButtonText: '승인',
					showCancelButton: true,
					cancelButtonColor: '#d33',
					cancelButtonText: '취소',
				})
				.then(result => {
					if (result.isConfirmed) {
						PutSyCodeMove(formData)
							.then(() => {
								this.$swal
									.fire({
										title: 'SUCCESS ',
										text: '메뉴 이동에 성공 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										this.initData();

										// this.clickedCodeId = item.codeId;
										// this.codeName = item.codeName;
										// this.codeValue = item.codeValue;
										// this.codeId = item.codeId;
										// this.parentId = item.parentId;
										// this.codeSort = item.codeSort;
										// this.codeStep = item.codeStep;
										// this.used = item.used==='1'?true:false;
									});
							})
							.catch(err => {
								this.$swal.fire({
									title: 'ERROR ',
									html:
										'메뉴 이동에 실패 하였습니다 (' +
										err.response.status +
										', ' +
										err.response.data.error +
										')',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
				});
		},
	},
};
</script>
