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
											<button type="button" class="btn btn-success" @click="fnSaved()">
												<i class="fa fa-floppy-o"></i> 저장
											</button>
											<button type="button" class="btn btn-primary" @click="fnGoPage('L')">
												<i class="fa fa-list"></i> 목록
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="ibox-content">
								<div class="form-group">
									<label for="userId" class="col-sm-1 control-label"
										><span class="red">*</span>&nbsp;회원 ID</label
									>
									<div class="col-sm-5">
										<div class="input-group">
											<input
												type="text"
												class="form-control"
												v-model="userId"
												ref="userId"
												@keyup.enter="fnDuplicatedUserId()"
											/>
											<span class="input-group-btn">
												<button
													type="button"
													class="idCheck btn btn-info"
													@click="fnDuplicatedUserId()"
												>
													<i class="fa fa-check"></i> 중복확인
												</button>
											</span>
										</div>
										<p class="help-block">
											<small
												>회원ID는 영문, 영문+숫자 조합으로 작성하며 입력 후 중복확인을
												해주세요</small
											>
										</p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="userName" class="col-sm-1 control-label"
										><span class="red">*</span>&nbsp;회원명</label
									>
									<div class="col-sm-4">
										<input type="text" class="form-control" v-model="userName" ref="userName" />
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
									<label for="postCode" class="col-sm-1 control-label">주소</label>
									<div class="col-sm-2">
										<div class="input-group">
											<input
												type="number"
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
									<label for="role_2" class="col-sm-1 control-label">단체</label>
									<div class="col-sm-4">
										<select class="form-control" v-model="groupType" ref="groupType">
											<option value="">선택</option>
											<option
												v-for="(item, idx) in groupTypeList"
												:key="idx"
												:value="item.codeValue"
											>
												{{ item.codeName }}
											</option>
										</select>
									</div>
									<label for="checkedNames_1" class="col-sm-1 control-label">단체</label>
									<div class="col-sm-4">
										<div
											v-for="(item, idx) in checkedNameList"
											class="checkbox checkbox-info checkbox-inline"
											:key="idx"
										>
											<input
												type="checkbox"
												:id="'checkedNames_' + item.codeValue"
												:value="item.codeValue"
												v-model="checkedNames"
											/>
											<label :for="'checkedNames_' + item.codeValue" :key="item.codeValue">{{
												item.codeName
											}}</label>
										</div>
										<p class="help-block">
											<small>체크한 이름: {{ checkedNames }}</small>
										</p>
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
							<div class="ibox-footer text-right">
								<div class="actionBtn btn-group" role="group">
									<button type="button" class="btn btn-success" @click="fnSaved()">
										<i class="fa fa-floppy-o"></i> 저장
									</button>
								</div>
								<div class="actionBtn btn-group" role="group">
									<button class="btn btn-primary" type="button" @click="fnGoPage('L')">
										<i class="fa fa-list"></i> 목록
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>

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
											<button type="button" class="btn btn-sm btn-success" @click="fnSaved()">
												<i class="fa fa-floppy-o"></i> 저장
											</button>
											<button type="button" class="btn btn-sm btn-primary" @click="fnGoPage('L')">
												<i class="fa fa-list"></i> 목록
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="ibox-content">
								<div class="form-group">
									<label for="userId" class="col-sm-1 control-label"
										><span class="red">*</span>&nbsp;회원 ID</label
									>
									<div class="col-sm-5">
										<div class="input-group">
											<input
												type="text"
												class="form-control"
												v-model="userId"
												ref="userId"
												@keyup.enter="fnDuplicatedUserId()"
											/>
											<span class="input-group-btn">
												<button
													type="button"
													class="idCheck btn btn-info"
													@click="fnDuplicatedUserId()"
												>
													<i class="fa fa-check"></i> 중복확인
												</button>
											</span>
										</div>
										<p class="help-block">
											<small
												>회원ID는 영문, 영문+숫자 조합으로 작성하며 입력 후 중복확인을
												해주세요</small
											>
										</p>
									</div>
								</div>
								<div class="hr-line-dashed"></div>

								<div class="form-group">
									<label for="userName" class="col-sm-1 control-label"
										><span class="red">*</span>&nbsp;회원명</label
									>
									<div class="col-sm-4">
										<input type="text" class="form-control" v-model="userName" ref="userName" />
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
							</div>
							<div class="ibox-footer text-right">
								<div class="actionBtn btn-group" role="group">
									<button type="button" class="btn btn-sm btn-success" @click="fnSaved()">
										<i class="fa fa-floppy-o"></i> 저장
									</button>
								</div>
								<div class="actionBtn btn-group" role="group">
									<button class="btn btn-sm btn-primary" type="button" @click="fnGoPage('L')">
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
import { GetSyUserDuplicate, PostSyUser } from '@/api/index';

export default {
	name: 'userWrite',
	data() {
		return {
			loadingTp: false,
			todayDt: new Date().toISOString().slice(0, 10),
			userId: '',
			userName: '',
			birthDt: '',
			enterDt: new Date().toISOString().slice(0, 10),
			postCode: '',
			address: '',
			addressDetail: '',
			role: 2,
			roleList: [
				{ codeId: '010100', codeName: '회원', codeValue: '2' },
				{ codeId: '010400', codeName: '사업자', codeValue: '3' },
				{ codeId: '010200', codeName: '직원', codeValue: '5' },
				{ codeId: '010300', codeName: '관리자', codeValue: '9' },
			],
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
			groupTypeList: [
				{ codeId: '020100', codeName: '기업', codeValue: '1' },
				{ codeId: '020200', codeName: '기관', codeValue: '2' },
				{ codeId: '020300', codeName: '개인', codeValue: '3' },
			],
			groupType: '1',
			checkedNameList: [
				{ codeId: '020100', codeName: '기업', codeValue: '1' },
				{ codeId: '020200', codeName: '기관', codeValue: '2' },
				{ codeId: '020300', codeName: '개인', codeValue: '3' },
			],
			checkedNames: [], // input checkbox

			memo: '',

			// 회원 id 중복체크
			chkUserId: '',
			chkUserIdTp: false,
		};
	},
	created() {
		// 데이터를 가져온다
		this.fnInitData();
	},
	methods: {
		fnInitData() {},

		fnDuplicatedUserId() {
			if (this.userId == '') {
				this.$toastr.e('회원ID를 입력해주세요', '입력 오류');
				this.$refs.userId.focus();
				return false;
			}
			const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
			if (notPhoneticSymbolExp.test(this.userId)) {
				this.$toastr.e('회원ID는 한글을 입력할 수 없습니다', '입력 오류');
				this.$refs.userId.focus();
				return false;
			}

			let params = '?key=userId&val=' + this.userId;

			// 중복 체크
			GetSyUserDuplicate(params)
				.then(res => {
					const data = res.data;
					if (data.checkResult) {
						this.chkUserId = this.userId;
						this.chkUserIdTp = true;

						this.$swal.fire({
							title: '회원 ID 중복 확인',
							text: '사용가능한 회원 ID 입니다.',
							icon: 'success',
							showConfirmButton: false,
							confirmButtonColor: '#449d44',
							showCancelButton: false,
							cancelButtonColor: '#d33',
							timer: 2000,
						});
					} else {
						// this.$toastr.e('사용중인 ID 입니다 다른 ID로 입력해주세요', '입력 오류');
						// this.$refs.userId.focus();
						this.$swal.fire({
							title: '회원 ID 중복 확인',
							text: '사용중인 ID 입니다 다른 ID로 입력해주세요',
							icon: 'warning',
							showConfirmButton: false,
							confirmButtonColor: '#449d44',
							showCancelButton: false,
							cancelButtonColor: '#d33',
							timer: 2000,
						});
						this.$refs.userId.focus();
					}
				})
				.catch(err => {
					// console.log(err.response.data.error);
					this.$swal.fire({
						title: '회원 ID 확인',
						html:
							'회원 ID 정보 확인에 실패 하였습니다 (' +
							err.response.status +
							', ' +
							err.response.data.error +
							')',
						icon: 'error',
						timer: 2000,
						showConfirmButton: false,
					});
				});
		},

		execDaumPostcode() {
			new window.daum.Postcode({
				oncomplete: data => {
					if (this.extraAddress !== '') {
						this.extraAddress = '';
					}
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
		fnSaved() {
			// 입력 체크
			if (this.userId == '') {
				this.$toastr.e('사용자ID를 입력해주세요', '입력 오류');
				this.$refs.userId.focus();
				return false;
			}
			if (this.chkUserIdTp && this.userId !== this.chkUserId) {
				this.$toastr.e('판매점ID 중복확인을 해주세요', '입력 오류');
				this.$refs.userId.focus();
				return false;
			}
			const formData = {
				userId: this.userId,
				password: this.password,
				userName: this.userName,
			};
			var text = "'<strong>" + this.userName + "'</strong>님의 정보를 등록 하시겠습니까?";

			this.$swal
				.fire({
					title: '등록',
					html: text,
					icon: 'warning',
					showConfirmButton: true,
					confirmButtonColor: '#449d44',
					showCancelButton: true,
					cancelButtonColor: '#d33',
				})
				.then(result => {
					if (result.isConfirmed) {
						this.loadingTp = true;
						PostSyUser(formData)
							.then(res => {
								const data = res.data;

								this.$swal({
									title: '등록',
									text: '회원 등록에 성공 하였습니다.',
									icon: 'success',
									timer: 2000,
									showConfirmButton: false,
								}).then(() => {
									this.$router.push('/gn/sy/user/view/' + data.userNo);
								});
								// this.$toastr.s('등록 되었습니다', '등록');
								// this.$router.push('/gn/sy/user/view/' + data.userNo);
							})
							.catch(() => {
								this.$swal({
									title: '등록',
									text: '회원 등록에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
									type: 'error',
									timer: 2000,
									showConfirmButton: false,
								});
								// this.$toastr.e(data.error, '실패');
							})
							.finally(() => {
								this.loadingTp = false;
							});
					}
				});
		},
		fnGoPage(str) {
			if (str == 'L') this.$router.push('/gn/sy/user/list');
		},
	},
};
</script>
