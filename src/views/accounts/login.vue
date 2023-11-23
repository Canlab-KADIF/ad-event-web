<template>
	<div>
		<form>
			<div class="form-group">
				<input
					type="text"
					class="form-control"
					id="userId"
					ref="userId"
					v-model="userId"
					placeholder="Userid"
					required
				/>
			</div>
			<div class="form-group">
				<input
					type="password"
					class="form-control"
					id="password"
					ref="password"
					v-model="password"
					placeholder="Password"
					autocomplete="off"
					required
					@keyup.enter="fnLogin()"
				/>
			</div>
			<button
				type="button"
				class="loginBtn btn btn-primary block full-width m-b"
				@click="fnLogin()"
			>
				Login
			</button>
		</form>
	</div>
</template>

<script>
import { PostLogin } from '@/api/index';
export default {
	name: 'Login',
	data() {
		return {
			userId: '',
			password: '',
		};
	},
	methods: {
		fnLogin() {
			// this.$store.commit('startSpinner');
			if (this.userId === '') {
				alert('ID를 입력해주세요');
				this.$refs.userId.focus();
				return false;
			}
			if (this.password === '') {
				alert('비밀번호를 입력해주세요');
				this.$refs.password.focus();
				return false;
			}
			const formData = {
				userId: this.userId,
				password: this.password,
			};
			// LOGIN action 실행
			PostLogin(formData)
				.then(res => {
					const data = res.data;

					// store 저장
					this.$store.commit('setToken', data.token);
					// refreshToken 데이터를 commit하고 있어서 조건문 걸어둠
					if (data.refreshToken !== undefined) {
						this.$store.commit('setRefreshToken', data.refreshToken);
					}
					const userInfo = {
						userNo: data.userNo,
						userId: data.userId,
						userName: data.userName,
						userRole: data.role,
					};
					this.$store.commit('setUserInfo', userInfo);

					// // token 복호화로 scope 받기
					// // library 호출
					// const jwt = require('jsonwebtoken');
					// // decode method 사용
					// const decodeAccessToken = jwt.decode(data.token);
					// if (decodeAccessToken.scope.length > 0) {
					// 	this.$store.commit('setScope', decodeAccessToken.scope[0]);
					// 	console.log(
					// 		'decodeAccessToken data-',
					// 		decodeAccessToken,
					// 		decodeAccessToken.scope[0],
					// 	);
					// 	this.$store.commit('endSpinner');
					// } else {
					// 	alert('decodeAccessToken data Error');
					// 	// this.$store.commit('endSpinner');
					// 	return;
					// }
					// 페이지 이동
					this.$router.push('/gn/');
				})
				.catch(() => {
					// error message
					this.$toastr.e(
						'로그인에 실패 하였습니다. <br />로그인 정보를 확인해 주세요',
						'입력 오류',
					);
					// this.$store.commit('endSpinner');
				});
		},
	},
};
</script>
