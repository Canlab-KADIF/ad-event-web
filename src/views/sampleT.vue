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
		<div class="wrapper wrapper-content2 animated fadeIn">
			<div class="row">
				<div class="col-lg-12"></div>
			</div>
		</div>
		<MdLoading v-if="loadingTp"></MdLoading>
	</div>
</template>

<script>
import { GetGnCheckDuplicate, PostPjStore } from '@/api/index';

export default {
	name: 'userWrite',
	data() {
		return {
			loadingTp: false,
			todayDt: new Date().toISOString().slice(0, 10),
			userNo: '', // 사업자의 sy_user.seq (타인 등록 시)

			storeId: '',
			// 판매점 id 중복체크
			chkStoreId: '',
			chkStoreIdTp: false,
			storeName: '',
			enterDt: new Date().toISOString().slice(0, 10),
			buyerName: '',
			buyerMobile: '',
			email: '',
			postCode: '',
			address: '',
			addressDetail: '',
			memo: '',
			used: 1,
		};
	},
	created() {
		// 데이터를 가져온다
		this.fnInitData();
	},
	methods: {
		fnInitData() {},

		fnDuplicatedStoreId() {
			if (this.storeId == '') {
				this.$toastr.e('판매점 ID를 입력 해주세요', '입력 오류');
				this.$refs.storeId.focus();
				return false;
			}
			const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
			if (notPhoneticSymbolExp.test(this.userId)) {
				this.$toastr.e('판매점 ID는 한글을 입력할 수 없습니다', '입력 오류');
				this.$refs.storeId.focus();
				return false;
			}

			let params = '?key=storeId&val=' + this.storeId;

			// 중복 체크
			GetGnCheckDuplicate(params)
				.then(res => {
					const data = res.data;
					if (data.checkResult) {
						this.chkStoreId = this.storeId;
						this.chkStoreIdTp = true;

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
			if (this.storeId == '') {
				this.$toastr.e('판매점ID를 입력해주세요', '입력 오류');
				this.$refs.storeId.focus();
				return false;
			}
			if (this.chkStoreIdTp && this.storeId !== this.chkStoreId) {
				this.$toastr.e('판매점ID 중복확인을 해주세요', '입력 오류');
				this.$refs.siteId.focus();
				return false;
			}

			if (this.storeName == '') {
				this.$toastr.e('판매점 이름을 입력해주세요', '입력 오류');
				this.$refs.storeName.focus();
				return false;
			}

			const formData = {
				storeId: this.storeId,
				storeName: this.storeName,
				enterDt: this.enterDt,
				buyerName: this.buyerName,
				buyerMobile: this.buyerMobile,
				email: this.email,
				postCode: this.postCode,
				address: this.address,
				addressDetail: this.addressDetail,
				memo: this.memo,
				used: this.used,
			};
			console.log(formData);

			this.loadingTp = true;
			PostPjStore(formData)
				.then(res => {
					const data = res.data;

					this.$swal({
						title: '등록',
						text: '등록에 성공 하였습니다.',
						icon: 'success',
						timer: 2000,
						showConfirmButton: false,
					}).then(() => {
						this.$router.push('/gn/pj/store/view/' + data.storeNo);
						// this.$toastr.s('등록 되었습니다', '등록');
						// this.$router.push('//gn/pj/store/view/' + data.userNo);
					});
				})
				.catch(() => {
					// this.$swal({
					// 	title: 'ERROR',
					// 	html: '등록에 실패 하였습니다 <br />시스템 담당자에 문의 해 주세요',
					// 	type: 'error',
					// 	timer: 2000,
					// 	showConfirmButton: false,
					// });
					this.$toastr.e('등록에 실패 하였습니다 시스템 담당자에 문의 하세요', '실패');
				})
				.finally(() => {
					this.loadingTp = false;
				});
		},
		fnGoPage(str) {
			if (str == 'L') this.$router.push('/gn/pj/store/list');
		},
	},
};
</script>
