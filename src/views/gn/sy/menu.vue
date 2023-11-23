<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>메뉴 관리</h2>
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
							<li class="active"><a href="javascript:;">메뉴 관리</a></li>
							<!-- <li><a href="{tabUrl}_role.php?pageID={menuInfo.menuid}">권한 설정</a></li> -->
						</ul>
						<div class="tab-content">
							<div class="tab-pane active">
								<div class="panel-header">
									<button @click="fnReset()" class="formInit btn btn-sm btn-default" type="button">
										<i class="fa fa-file-o"></i> 리셋
									</button>
									<div class="ibox-tools">
										<div class="btn-toolbar" role="toolbar">
											<div class="actionBtn btn-group" role="group">
												<button
													class="sortUp btn btn-sm btn-warning"
													data-action="SU"
													type="button"
													:disabled="menuId === ''"
													@click="fnMoveMenu('U')"
												>
													<i class="fa fa-chevron-up"></i>
												</button>
												<button
													class="sortDown btn btn-sm btn-warning"
													data-action="SD"
													type="button"
													:disabled="menuId === ''"
													@click="fnMoveMenu('D')"
												>
													<i class="fa fa-chevron-down"></i>
												</button>
											</div>
											<div class="actionBtn btn-group" role="group">
												<button
													type="button"
													class="firstNodeUpdate btn btn-sm btn-primary"
													:disabled="menuId !== ''"
													@click="fnAddMenu()"
												>
													<i class="fa fa-level-up"></i> 최상위 추가
												</button>
												<button
													type="button"
													class="InsertNode btn btn-sm btn-primary"
													data-action="ND"
													:disabled="menuId === ''"
													@click="fnAddMenu()"
												>
													<i class="fa fa-level-down"></i> 하위 추가
												</button>
											</div>
											<div class="actionBtn btn-group" role="group">
												<button
													class="lastNodeUpdate btn btn-sm btn-success"
													data-action="U"
													type="button"
													:disabled="menuId === ''"
													@click="fnUpdateMenu()"
												>
													<i class="fa fa-floppy-o"></i> 저장
												</button>
												<button
													class="lastNodeDelete btn btn-sm btn-danger"
													data-action="D"
													type="button"
													:disabled="menuId === ''"
													@click="fnDeleteMenu()"
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
								:id="`jstree_${level1.menuId}`"
								ref="cls"
								:class="index === treeData.length - 1 ? 'jstree-last' : ''"
							>
								<i
									@click="treeMenu(level1.menuId, level1.treeOpen)"
									class="jstree-icon jstree-ocl"
									role="presentation"
								></i>
								<a
									class="jstree-anchor"
									:class="clickedMenuId === level1.menuId ? 'jstree-clicked' : ''"
									href="javascript:;"
									@click="fnOnClick(level1)"
									tabindex="-1"
									:id="level1.menuId"
								>
									<i
										class="jstree-icon jstree-themeicon fa fa-folder jstree-themeicon-custom"
										role="presentation"
									></i
									>{{ level1.menuName }}
								</a>

								<template v-if="level1.menuSub.length > 0">
									<ul role="group" class="jstree-children">
										<li
											v-for="(level2, idx) in level1.menuSub"
											:key="idx"
											role="treeitem"
											aria-selected="false"
											aria-level="2"
											class="jstree-node jstree-leaf"
											:class="idx === level1.menuSub.length - 1 ? 'jstree-last' : ''"
										>
											<i class="jstree-icon jstree-ocl" role="presentation"></i>
											<a
												class="jstree-anchor"
												:class="
													clickedMenuId === level2.menuId ? 'jstree-anchor jstree-clicked' : ''
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
												>{{ level2.menuName }}
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
									<label class="col-sm-2 control-label">선택 메뉴</label>
									<div class="col-sm-10">
										<p class="cms-menuname">
											<i class="fa fa-caret-right"></i>
											<span v-if="menuId !== ''" id="menuSe"> {{ menuName }} [{{ menuId }}]</span>
										</p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="menuName" class="col-sm-2 control-label">메뉴 명칭</label>
									<div class="col-sm-10">
										<input type="text" class="form-control" v-model="menuName" ref="menuName" />
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="menuUrl" class="col-sm-2 control-label">메뉴 링크</label>
									<div class="col-sm-10">
										<input type="text" class="form-control" v-model="menuUrl" ref="menuUrl" />
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="menuIcon" class="col-sm-2 control-label">메뉴 ICON</label>
									<div class="col-sm-10">
										<button
											v-if="menuIcon !== ''"
											class="btn btn-sm btn-default"
											data-action="MR"
											type="button"
											disabled=""
										>
											<i class="fa icon-lg" :class="'' + menuIcon"></i>
										</button>
										<button type="button" class="btn btn-sm btn-info" @click="fnSearchIcon()">
											<i class="fa fa-floppy-o"></i> ICON 찾기
										</button>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="menuRole" class="col-sm-2 control-label">메뉴 사용권한</label>
									<div class="col-sm-10">
										<select class="form-control" v-model="menuRole" ref="menuRole">
											<option value="">선택</option>
											<option v-for="(item, idx) in roleList" :key="idx" :value="item.codeValue">
												{{ item.codeName }}
											</option>
										</select>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="used" class="col-sm-2 control-label">메뉴 노출</label>
									<div class="col-sm-10">
										<div class="checkbox checkbox-success">
											<input type="checkbox" id="used" v-model="used" />
											<label for="used">메뉴 노출 유무</label>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<MdView v-if="mdIconTp" @close-modal="mdIconTp = false">
			<MdIcon :sendData="iconList" @selected="fnModalClosed" />
		</MdView>
	</div>
</template>

<script>
import { GetSyMenu, PostSyMenu, PutSyMenu, DeleteSyMenu, PutSyMenuMove } from '@/api/index';
import MdView from '@/components/modals/MdView.vue';
import MdIcon from '@/components/modals/MdIcon.vue';
export default {
	components: { MdView, MdIcon },
	data() {
		return {
			menuList: [],
			iconList: [],
			roleList: [],
			// tree
			clickedMenuId: '',
			treeClickArr: [],
			treeData: [],
			menuId: '',
			menuName: '',
			parentId: '',
			menuSort: '',
			menuStep: '',
			menuUrl: '',
			menuIcon: '',
			menuRole: '',
			used: true,

			mdIconTp: false,
		};
	},
	created() {
		// 데이터를 가져온다
		this.fnInitData();
	},
	methods: {
		fnInitData() {
			let params = '';
			GetSyMenu(params)
				.then(res => {
					const data = res.data;
					this.menuList = data.menuList;
					this.iconList = data.iconList;
					this.roleList = data.roleList;
					for (var i = 0; i < this.menuList.length; i++) {
						// this.menuList[i]['treeOpen'] = 'jstree-node jstree-closed';
						this.menuList[i]['treeOpen'] = false;
						if (this.clickedMenuId !== '' && this.menuList[i]['menuId'] === this.clickedMenuId) {
							// 메뉴 순서 변경 후 현재 해당 메뉴의 sort 값을 변경된 sort 값으로 변경
							this.menuSort = this.menuList[i]['menuSort'];
						}
						for (var j = 0; j < this.menuList[i]['menuSub'].length; j++) {
							this.menuList[i]['menuSub'][j]['treeOpen'] = false;
							if (
								this.clickedMenuId !== '' &&
								this.menuList[i]['menuSub'][j]['menuId'] === this.clickedMenuId
							) {
								// 메뉴 순서 변경 후 현재 해당 메뉴의 sort 값을 변경된 sort 값으로 변경
								this.menuSort = this.menuList[i]['menuSub'][j]['menuSort'];
							}
						}
					}
					this.treeData = this.menuList;
				})
				.catch(err => {
					this.$swal.fire({
						title: '메뉴 정보 ',
						html:
							'메뉴 정보를 가져오는데 실패 하였습니다 (' +
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
		treeMenu(menuId, treeOpen) {
			for (var i = 0; i < this.treeData.length; i++) {
				if (this.treeData[i]['menuId'] === menuId) {
					this.treeData[i]['treeOpen'] = !treeOpen;
				}
				for (var j = 0; j < this.treeData[i]['menuSub'].length; j++) {
					if (this.treeData[i]['menuSub'][j]['menuId'] === menuId) {
						this.treeData[i]['menuSub'][j]['treeOpen'] = !treeOpen;
					}
				}
			}

			if (treeOpen) {
				// closed
				this.$el.querySelector('#jstree_' + menuId).classList.remove('jstree-open');
				this.$el.querySelector('#jstree_' + menuId).classList.add('jstree-closed');
			} else {
				// open
				this.$el.querySelector('#jstree_' + menuId).classList.remove('jstree-closed');
				this.$el.querySelector('#jstree_' + menuId).classList.add('jstree-open');
			}
		},
		treeMenuAll(tp) {
			if (this.treeData.length > 0) {
				for (var i = 0; i < this.treeData.length; i++) {
					if (tp === 'O') {
						this.$el
							.querySelector('#jstree_' + this.treeData[i]['menuId'])
							.classList.remove('jstree-closed');
						this.$el
							.querySelector('#jstree_' + this.treeData[i]['menuId'])
							.classList.add('jstree-open');
					} else if (tp === 'C') {
						this.$el
							.querySelector('#jstree_' + this.treeData[i]['menuId'])
							.classList.remove('jstree-open');
						this.$el
							.querySelector('#jstree_' + this.treeData[i]['menuId'])
							.classList.add('jstree-closed');
					}
				}
			}
		},
		fnReset() {
			this.clickedMenuId = '';
			this.menuId = '';
			this.menuName = '';
			this.parentId = '';
			this.menuSort = '';
			this.menuUrl = '';
			this.menuStep = '';
			this.menuIcon = '';
			this.menuRole = '';
			this.used = this.used ? 1 : 0;
		},
		fnOnClick(item) {
			console.log(item);
			this.clickedMenuId = item.menuId;
			this.menuName = item.menuName;
			this.menuId = item.menuId;
			this.parentId = item.parentId;
			this.menuSort = item.menuSort;
			this.menuUrl = item.menuUrl;
			this.menuStep = item.menuStep;
			this.menuIcon = item.menuIcon;
			this.menuRole = item.menuRole;
			this.used = item.used == 1 ? true : false;
			// if (item.used == '1') {
			// 	this.menuChecked = true;
			// } else {
			// 	this.menuChecked = false;
			// }
		},
		fnTreeClick(menuId, openTf) {
			for (var i = 0; i < this.menuList.length; i++) {
				if (this.menuList[i]['menuId'] === menuId) {
					if (openTf === true) {
						this.menuList[i]['treeOpen'] = false;
					} else {
						this.menuList[i]['treeOpen'] = true;
					}
				}
			}
		},
		fnSearchIcon() {
			this.mdIconTp = true;
		},
		fnModalClosed(name, val1) {
			if (name === 'icon') {
				this.menuIcon = val1;
			}
		},
		fnAddMenu() {
			var title = '';
			var text = '';
			if (this.menuId === '') {
				// 최상단 메뉴 등록
				this.menuStep = 1;

				title = '최상위 메뉴를 추가 하시겠습니까?';
				text = '해당 데이터가 1차 메뉴에 추가됩니다';
			} else {
				// 2차 메뉴 등록
				this.menuStep = 2;
				title = '2차 메뉴를 추가 하시겠습니까?';
				text = '해당 데이터가 2차 메뉴에 추가됩니다';
			}

			if (this.menuName === '') {
				this.$toastr.e('메뉴 명칭을 입력해 주세요', '입력 오류');
				this.$refs.menuName.focus();
				return false;
			}

			if (this.menuRole === '') {
				this.$toastr.e('사용권한을 선택해 주세요', '입력 오류');
				this.$refs.menuRole.focus();
				return false;
			}

			const formData = {
				menuId: this.menuId,
				menuName: this.menuName,
				menuStep: this.menuStep,
				menuUrl: this.menuUrl,
				menuIcon: this.menuIcon,
				menuRole: this.menuRole,
				used: this.used ? '1' : '0',
			};

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
						PostSyMenu(formData)
							.then(() => {
								this.$swal
									.fire({
										title: 'Success',
										text: '메뉴 등록에 성공 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										this.fnInitData();
										// this.$store.commit('setSiteMenu', this.menuList);
									});
							})
							.catch(() => {
								this.$swal.fire({
									title: 'Error',
									html: '메뉴 등록에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
				});
		},
		fnUpdateMenu() {
			if (this.menuName === '') {
				this.$toastr.e('메뉴 명칭을 입력해 주세요', '입력 오류');
				this.$refs.menuName.focus();
				return false;
			}

			if (this.menuRole === '') {
				this.$toastr.e('사용권한을 선택해 주세요', '입력 오류');
				this.$refs.menuRole.focus();
				return false;
			}

			const formData = {
				menuId: this.menuId,
				menuName: this.menuName,
				menuUrl: this.menuUrl,
				menuIcon: this.menuIcon,
				menuRole: this.menuRole,
				used: this.used ? '1' : '0',
			};

			this.$swal
				.fire({
					title: '해당 메뉴를 수정 하시겠습니까?',
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
						PutSyMenu(formData)
							.then(() => {
								this.$swal
									.fire({
										title: 'Success',
										text: '메뉴 수정에 성공 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										this.fnInitData();
									});
							})
							.catch(() => {
								this.$swal.fire({
									title: 'Error',
									html: '메뉴 수정에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
				});
		},
		fnDeleteMenu() {
			let params = '?menuId=' + this.menuId;

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
						DeleteSyMenu(params)
							.then(() => {
								// const data = res.data;
								this.$swal
									.fire({
										title: 'Success ',
										text: '성공적으로 삭제 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										this.fnInitData();
									});
							})
							.catch(() => {
								this.$swal.fire({
									title: 'Error ',
									html: '메뉴 삭제에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
				});
		},
		fnMoveMenu(move) {
			let title = '';
			if (move === 'U') {
				title = '해당 메뉴를 상위로 이동하시겠습니까?';
			} else {
				title = '해당 메뉴를 하위로 이동하시겠습니까?';
			}

			const formData = {
				menuId: this.menuId,
				parentId: this.parentId,
				menuStep: this.menuStep,
				menuSort: this.menuSort,
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
						PutSyMenuMove(formData)
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
										this.fnInitData();
									});
							})
							.catch(() => {
								this.$swal.fire({
									title: 'ERROR ',
									html: '메뉴 이동에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
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
