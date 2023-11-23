import store from '@/store/index';
// import router from '@/router';

export function setInterceptors(axiosService) {
	axiosService.interceptors.request.use(
		function (config) {
			config.headers.Authorization = 'Bearer ' + store.state.token;
			return config;
		},
		function (error) {
			return Promise.reject(error);
		},
	);

	axiosService.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if (error.response && error.response.status) {
				// console.log(err);
				switch (error.response.status) {
					case 401:
						// 권한 없음
						// alert('로그인 세션이 만료되었습니다.\n재로그인 해주세요.');
						// this.$store.commit('setLogout');
						// this.$router.push('/accounts/login');
						this.$toastr.e('사용 권한이 없습니다', '권한 오류');
						this.$router.push('/gn/');
						return new Promise(() => {});
					default:
						return Promise.reject(error);
				}
			}
		},
	);
	return axiosService;
}
