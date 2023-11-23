<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>회원 관리</h2>
				<ol class="breadcrumb">
					<li>
						<a href="javascript:;">Main</a>
						<!-- <router-link to="/gn">Main</router-link> -->
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
											<button type="button" class="btn btn-success" @click="fnUpdated()">
												<i class="fa fa-floppy-o"></i> 저장
											</button>
											<button type="button" class="btn btn-danger" @click="fnDeleted">
												<i class="fa fa-trash-o"></i> 삭제
											</button>
											<button type="button" class="btn btn-primary" @click="fnGoPage('list')">
												<i class="fa fa-list"></i> 목록
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="ibox-content">
								<div class="form-group">
									<label for="userId" class="col-sm-1 control-label">회원 ID</label>
									<div class="col-sm-5">
										<div class="input-group">
											<input
												type="text"
												class="form-control"
												v-model="userId"
												ref="userId"
												readonly
											/>
											<span class="input-group-btn">
												<button
													class="passwdInit btn btn-warning"
													type="button"
													@click="fnResetPassword()"
												>
													<i class="fa fa-check"></i> 비밀번호 초기화
												</button>
											</span>
										</div>
										<p class="help-block">
											<small>비밀번호 초기화 시 아이디와 동일하게 변경 됩니다</small>
										</p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<!-- <div class="form-group">
									<label for="password" class="col-sm-1 control-label">비밀번호</label>
									<div class="col-sm-4">
										<input type="password" class="form-control" v-model="password" ref="password" />
										<p class="help-block">
											<small
												>비밀번호 변경 시 입력 하며 영문/영문+숫자 조합으로 입력해 주세요</small
											>
										</p>
									</div>
								</div>
								<div class="hr-line-dashed"></div> -->

								<div class="form-group">
									<label for="userName" class="col-sm-1 control-label"
										><span class="red">*</span>&nbsp;회원명</label
									>
									<div class="col-sm-4">
										<input type="text" class="form-control" v-model="userName" ref="userName" />
									</div>
									<label for="birthDt" class="col-sm-1 control-label">생년월일</label>
									<div class="col-sm-2">
										<input
											type="date"
											class="form-control"
											v-model="birthDt"
											:max="todayDt"
											ref="birthDt"
										/>
										<p class="help-block"><small>직접 입력하거나 달력 팝업에서 선택</small></p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="mobile" class="col-sm-1 control-label"
										><span class="red">*</span>&nbsp;핸드폰번호</label
									>
									<div class="col-sm-4">
										<input type="text" class="form-control" v-model="mobile" ref="mobile" />
										<p class="help-block"><small>입력 예) 010-1234-5678</small></p>
									</div>
									<label for="gender_M" class="col-sm-1 control-label">성별</label>
									<div class="col-sm-4">
										<div
											v-for="item in genderList"
											class="radio radio-warning radio-inline"
											:key="item.key"
										>
											<input
												type="radio"
												:id="'gender_' + item.val"
												v-model="gender"
												:value="item.val"
											/>
											<label :for="'gender_' + item.val"> {{ item.key }} </label>
										</div>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="tel" class="col-sm-1 control-label">전화번호</label>
									<div class="col-sm-4">
										<input type="tel" class="form-control" v-model="tel" ref="tel" />
										<p class="help-block"><small>입력 예) 02-1234-5678</small></p>
									</div>
									<label for="email" class="col-sm-1 control-label">이메일</label>
									<div class="col-sm-4">
										<input type="text" class="form-control" id="email" v-model="email" />
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="groupName" class="col-sm-1 control-label">소속명</label>
									<div class="col-sm-4">
										<input type="text" class="form-control" v-model="groupName" ref="groupName" />
									</div>

									<label for="group_M" class="col-sm-1 control-label">소속구분</label>
									<div class="col-sm-4">
										<div
											v-for="item in groupTypeList"
											class="radio radio-warning radio-inline"
											:key="item.codeValue"
										>
											<input
												type="radio"
												:id="'group_' + item.codeValue"
												v-model="groupType"
												:value="item.codeValue"
											/>
											<label :for="'group_' + item.codeValue"> {{ item.codeName }} </label>
										</div>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="groupPosition" class="col-sm-1 control-label">직급</label>
									<div class="col-sm-4">
										<input
											type="text"
											class="form-control"
											v-model="groupPosition"
											ref="groupPosition"
										/>
									</div>
									<label for="enterDt" class="col-sm-1 control-label">가입일</label>
									<div class="col-sm-2">
										<input
											type="date"
											class="form-control"
											v-model="enterDt"
											:max="todayDt"
											ref="enterDt"
										/>
										<p class="help-block"><small>직접 입력하거나 달력 팝업에서 선택</small></p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="postCode" class="col-sm-1 control-label">주소</label>
									<div class="col-sm-2">
										<div class="input-group">
											<input
												type="text"
												class="form-control"
												id="postCode"
												v-model="postCode"
												placeholder="우편번호"
											/>
											<span class="input-group-btn">
												<button
													class="idCheck btn btn-info"
													type="button"
													@click="execDaumPostcode()"
												>
													<i class="fa fa-search"></i> 주소검색
												</button>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label for="address" class="col-sm-1 control-label">&nbsp;</label>
									<div class="col-sm-4">
										<input
											type="text"
											class="form-control"
											id="address"
											v-model="address"
											placeholder="주소"
											ref="address"
										/>
									</div>
									<div class="col-sm-5">
										<input
											type="text"
											class="form-control"
											id="addressDetail"
											v-model="addressDetail"
											placeholder="상세주소"
										/>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="role_2" class="col-sm-1 control-label">권한</label>
									<div class="col-sm-4">
										<div
											v-for="(item, index) in roleList"
											class="radio radio-info radio-inline"
											:key="index"
										>
											<input
												type="radio"
												:id="'role_' + item.codeValue"
												v-model="role"
												:value="item.codeValue"
											/>
											<label :for="'role_' + item.codeValue"> {{ item.codeName }} </label>
										</div>
									</div>
									<label for="login_Y" class="col-sm-1 control-label">로그인 유무</label>
									<div class="col-sm-4">
										<div
											v-for="(item, index) in loginList"
											class="radio radio-warning radio-inline"
											:key="index"
										>
											<input
												type="radio"
												:id="'login_' + item.val"
												v-model="loginYn"
												:value="item.val"
											/>
											<label :for="'login_' + item.val"> {{ item.key }} </label>
										</div>
										<p class="help-block"><small>로그인 허용 : 키오스크 사용 가능</small></p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="memo" class="col-sm-1 control-label">회원메모</label>
									<div class="col-sm-9">
										<input type="text" class="form-control" id="memo" v-model="memo" />
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

				<div class="col-lg-12">
					<div class="ibox">
						<div class="ibox-footer text-right">
							<div class="actionBtn btn-group" role="group">
								<button type="button" class="btn btn-success" @click="fnUpdated()">
									<i class="fa fa-floppy-o"></i> 저장
								</button>
								<button type="button" class="btn btn-danger" @click="fnDeleted">
									<i class="fa fa-trash-o"></i> 삭제
								</button>
							</div>
							<div class="actionBtn btn-group" role="group">
								<button class="btn btn-primary" type="button" @click="fnGoPage('list')">
									<i class="fa fa-list"></i> 목록
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { GetSyUser, PutSyUser, DeleteSyUser, PutSyUserResetPassword } from '@/api/index';
export default {
	components: {},
	data() {
		return {
			pageId: this.$route.params.pageId,
			id: this.$route.params.id,

			todayDt: new Date().toISOString().slice(0, 10),
			userId: '',
			// password: '',
			userName: '',
			birthDt: '',
			mobile: '',
			tel: '',
			email: '',
			enterDt: '',
			postCode: '',
			address: '',
			addressDetail: '',
			role: '',
			roleList: [],
			loginYn: 'Y',
			loginList: [
				{ key: '로그인 가능', val: 'Y' },
				{ key: '로그인 불가', val: 'N' },
			],
			genderList: [
				{ key: '남성', val: 'M' },
				{ key: '여성', val: 'F' },
			],
			gender: 'M',
			groupName: '',
			groupTypeList: [],
			groupType: '1',
			groupPosition: '',
			memo: '',
		};
	},
	created() {
		this.fnInitData();
	},
	methods: {
		fnInitData() {
			let userNo = this.$route.params.id;
			let params = '?userNo=' + userNo;
			if (userNo != '' && userNo != undefined) {
				GetSyUser(params)
					.then(res => {
						const data = res.data;
						this.roleList = data.roleList;
						this.groupTypeList = data.groupTypeList;

						// 일반 입력
						this.userId = data.userId;
						this.userName = data.userName;
						this.birthDt = data.birthDt;
						this.mobile = data.mobile;
						this.tel = data.tel;
						this.gender = data.gender;
						this.email = data.email;
						this.enterDt = data.enterDt;
						this.postCode = data.postCode;
						this.address = data.address;
						this.addressDetail = data.addressDetail;
						this.role = data.role;
						this.loginYn = data.loginYn;
						this.groupName = data.groupName;
						this.groupType = data.groupType;
						this.groupPosition = data.groupPosition;
						this.memo = data.memo;
					})
					.catch(() => {
						this.$swal.fire({
							title: '회원 정보',
							html: '회원 정보를 가져오는데 실패 하였습니다. <br />시스템 담당자에 문의 해 주세요',
							icon: 'error',
							timer: 2000,
							showConfirmButton: false,
						});
					});
			} else {
				this.$toastr.e('error', '입력 오류');
			}
		},

		fnResetPassword() {
			// 비밀번호 초기화
			if (this.userId !== '') {
				const formData = {
					userNo: this.id,
				};
				this.$swal
					.fire({
						title: '사용자의 비밀번호를 초기화 하시겠습니까?',
						html: "비밀번호를 초기화 하시면 <strong>'아이디'</strong>와 동일한 비밀번호로 변경됩니다.",
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
							PutSyUserResetPassword(formData)
								.then(() => {
									this.$swal.fire({
										title: '비밀번호 초기화 성공',
										text: '비밀번호를 초기화에 성공 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									});
								})
								.catch(() => {
									this.$swal.fire({
										title: '비밀번호 초기화 실패',
										html: '비밀번호 초기화에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
										icon: 'error',
										timer: 2000,
										showConfirmButton: false,
									});
								});
						}
					});
			}
		},
		fnUpdated() {
			// 입력 체크
			if (this.userName == '') {
				this.$toastr.e('회원명을 입력해 주세요', '입력 오류');
				this.$refs.userName.focus();
				return false;
			}
			if (this.mobile == '') {
				this.$toastr.e('핸드폰번호를 입력해 주세요', '입력 오류');
				this.$refs.mobile.focus();
				return false;
			}

			const formData = {
				userNo: this.id,
				// password: this.password,
				userName: this.userName,
				birthDt: this.birthDt,
				mobile: this.mobile,
				gender: this.gender,
				tel: this.tel,
				email: this.email,
				groupName: this.groupName,
				groupType: this.groupType,
				groupPosition: this.groupPosition,
				enterDt: this.enterDt,
				postCode: this.postCode,
				address: this.address,
				addressDetail: this.addressDetail,
				role: this.role,
				loginYn: this.loginYn,
				memo: this.memo,
			};
			// console.log(formData);
			var text = "'<strong>" + this.userName + "'</strong>님의 정보를 수정 하시겠습니까?";
			this.$swal
				.fire({
					title: '회원 정보 수정',
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
						PutSyUser(formData)
							.then(() => {
								this.$swal
									.fire({
										title: '회원 정보 업데이트',
										text: '회원 정보 업데이트에 성공 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										// this.password = '';
										// this.passwordRe = '';
										this.fnInitData();
									});
							})
							.catch(() => {
								this.$swal.fire({
									title: '회원 정보 업데이트',
									html: '회원 정보 업데이트에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					}
					// else if (result.isDismissed) { // 만약 모달창에서 cancel 버튼을 눌렀다면
					// 	// ...실행
					// }
				});
		},
		fnDeleted() {
			const params = '?userNo=' + this.id;

			var text = "'<strong>" + this.userName + "'</strong>님의 정보를 삭제 하시겠습니까?";
			this.$swal
				.fire({
					title: '회원 삭제',
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
						DeleteSyUser(params)
							.then(() => {
								this.$swal
									.fire({
										title: '회원 삭제',
										text: '회원 삭제에 성공 하였습니다.',
										icon: 'success',
										timer: 1000,
										showConfirmButton: false,
									})
									.then(() => {
										this.fnGoPage('list');
									});
							})
							.catch(() => {
								this.$swal.fire({
									title: '회원 삭제',
									html: '회원 삭제에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
									icon: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
							});
					} // end if
				});
		},
		execDaumPostcode() {
			new window.daum.Postcode({
				oncomplete: data => {
					if (this.extraAddress !== '') {
						this.extraAddress = '';
					}
					// console.log(data)
					if (data.userSelectedType == 'R') {
						// 사용자가 도로명 주소를 선택했을 경우
						this.address = data.roadAddress;
					} else {
						// 사용자가 지번 주소를 선택했을 경우(J)
						this.address = data.jibunAddress;
					}

					// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
					if (data.userSelectedType == 'R') {
						// 법정동명이 있을 경우 추가한다. (법정리는 제외)
						// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
						if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
							this.extraAddress += data.bname;
						}
						// 건물명이 있고, 공동주택일 경우 추가한다.
						if (data.buildingName !== '' && data.apartment == 'Y') {
							this.extraAddress +=
								this.extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
						}
						// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
						if (this.extraAddress !== '') {
							this.extraAddress = `(${this.extraAddress})`;
						}
					} else {
						this.extraAddress = '';
					}
					// 우편번호를 입력한다.
					this.postCode = data.zonecode;
				},
			}).open();
		},
		fnGoPage(str) {
			if (str == 'list') this.$router.push('/gn/sy/user/list');
		},
	},
};
</script>
