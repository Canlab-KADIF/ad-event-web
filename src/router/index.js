import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import LayoutAuth from '@/layout/auth/index';
import LayoutGn from '@/layout/gn/index';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: LayoutAuth,
			children: [
				{
					path: '/accounts/login',
					name: 'login',
					component: () => import('@/views/accounts/login.vue'),
					meta: { title: process.env.VUE_APP_SITE_NAME },
				},
			],
		},
		{
			path: '/',
			component: LayoutGn,
			children: [
				{
					path: '/gn/',
					name: 'GnIndex',
					component: () => import('@/views/gn/Index.vue'),
					meta: { auth: true },
				},
				// {
				// 	path: '/gn/sy/config',
				// 	name: 'SyConfig',
				// 	component: () => import('@/views/gn/sy/config.vue'),
				// 	meta: { auth: true, title: '환경설정' },
				// },
				{
					path: '/gn/sy/common',
					name: 'SyCommonList',
					component: () => import('@/views/gn/sy/common.vue'),
					meta: { auth: true, title: '공통코드관리' },
				},
				{
					path: '/gn/sy/menu',
					name: 'SyMenu',
					component: () => import('@/views/gn/sy/menu.vue'),
					meta: { auth: true, title: '메뉴관리' },
				},
				{
					path: '/gn/sy/user/list',
					name: 'SyUserList',
					component: () => import('@/views/gn/sy/userList.vue'),
					meta: { auth: true, title: '회원관리' },
				},
				{
					path: '/gn/sy/user/view/:id',
					name: 'SyUserView',
					component: () => import('@/views/gn/sy/userView.vue'),
					meta: { auth: true, title: '회원관리' },
				},
				{
					path: '/gn/sy/user/write',
					name: 'SyUserWrite',
					component: () => import('@/views/gn/sy/userWrite.vue'),
					meta: { auth: true, title: '회원관리' },
				},

				// pj
				{
					path: '/gn/pj/damage/list',
					name: 'PjDamageList',
					component: () => import('@/views/gn/pj/damageList.vue'),
					meta: { auth: true, title: '도로 파손 정보 관리' },
				},
				{
					path: '/gn/pj/damage/view/:id',
					name: 'PjDamageView',
					component: () => import('@/views/gn/pj/damage.vue'),
					meta: { auth: true, title: '도로 파손 정보 관리' },
				},
				{
					path: '/gn/pj/damage/write/:id',
					name: 'PjDamageWrite',
					component: () => import('@/views/gn/pj/damage.vue'),
					meta: { auth: true, title: '도로 파손 정보 관리' },
				},
				{
					path: '/gn/pj/roadMap',
					name: 'PjRoadMap',
					component: () => import('@/views/gn/pj/roadMap.vue'),
					meta: { auth: true, title: '로드맵' },
				},
				// {
				// 	path: '/gn/pj/store/list',
				// 	name: 'PjStoreList',
				// 	component: () => import('@/views/gn/pj/storeList.vue'),
				// 	meta: { auth: true, title: '판매점' },
				// },
				// {
				// 	path: '/gn/pj/store/write/:id',
				// 	name: 'PjStoreWrite',
				// 	component: () => import('@/views/gn/pj/storeWrite.vue'),
				// 	meta: { auth: true, title: '판매점' },
				// },
				// {
				// 	path: '/gn/pj/store/view/:id',
				// 	name: 'PjStoreView',
				// 	component: () => import('@/views/gn/pj/storeView.vue'),
				// 	meta: { auth: true, title: '판매점' },
				// },
				// {
				// 	path: '/gn/pj/contents/list',
				// 	name: 'PjContentsList',
				// 	component: () => import('@/views/gn/pj/contentsList.vue'),
				// 	meta: { auth: true, title: '컨텐츠' },
				// },
				// {
				// 	path: '/gn/pj/contents/view/:id',
				// 	name: 'PjContentsView',
				// 	component: () => import('@/views/gn/pj/contentsView.vue'),
				// 	meta: { auth: true, title: '컨텐츠' },
				// },
				// {
				// 	path: '/gn/pj/contents/write/:id',
				// 	name: 'PjContentsWrite',
				// 	component: () => import('@/views/gn/pj/contentsWrite.vue'),
				// 	meta: { auth: true, title: '컨텐츠' },
				// },
				// sa
			],
		},
		{
			path: '*',
			component: () => import('@/views/notFound.vue'),
		},
	],
	base: process.env.BASE_URL,
});

router.beforeEach((to, from, next) => {
	// store.commit('startSpinner');
	setTimeout(() => {
		next();
	}, 1);
	// console.log('to-', to.fullPath, 'from-', from.fullPath);
	// console.log('check localStorage--', localStorage.token);

	// // 모니터링에서 메뉴 이동시 Interval 확인 후 정지
	// if (from.fullPath == "/gn/observe") {
	//   // console.log('ob1-', store.getters.isTimerId);
	//   let id = store.getters.isTimerId;
	//   if (id != 0) {
	//     setTimeout(() => {
	//       clearInterval(id);
	//       // Interval(timerId) 초기화
	//       this.$store.commit("setTimerId", 0);

	//       // console.log('router clearInterval->', id);
	//     }, 1000);
	//   }
	// }

	// state.token 없는 상태에서 기존 url로 접속하는 경우
	if (to.meta.auth && !store.getters.isLogin) {
		// 새창인 경우로 state.token은 없지만 localStorage token이 존재하는 경우
		if (localStorage.token != undefined) {
			// store 저장
			store.commit('setToken', localStorage.token);
			// 기존에 refreshToken 데이터를 commit하고 있어서 조건문 걸어둠
			if (localStorage.refreshToken != undefined) {
				store.commit('setRefreshToken', localStorage.refreshToken);
			}
			store.commit('setUserName', localStorage.userName);
			store.commit('setScope', localStorage.userScope);
			next();
		} else {
			alert('인증이 필요합니다.');
			// 새창인 경우인데 localStorage token까지도 없는 경우
			// console.log('인증이 필요합니다.');
			next('/accounts/login');
		}
		return;
	} else if (to.fullPath == '/' && to.meta.auth == undefined) {
		if (!store.getters.isLogin) {
			// 로그아웃 상태에서 root url로 접속하는 경우
			// console.log('인증이 필요합니다..');
			next('/accounts/login');
		} else if (store.getters.isLogin) {
			// 로그인 상태에서 root url로 접속하는 경우
			// console.log('시작');
			next('/gn');
		}
		return;
	}

	// 로그아웃이 진행됐는데 로그인된 화면에서 페이지 이동 발생한 경우
	if (localStorage.token == undefined && store.getters.isLogin) {
		// mutation의 Logout 실행
		alert('로그아웃된 계정입니다.');
		store.commit('Logout');
		// 페이지 이동
		next('/accounts/login');
	}
	next();
});

router.afterEach(to => {
	const title = to.meta.title === undefined ? '도로 안전 관리 시스템' : to.meta.title;
	Vue.nextTick(() => {
		document.title = title;
	});
	// store.commit('endSpinner');
});

export default router;
