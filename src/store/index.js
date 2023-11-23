import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const enhanceAccessToeken = () => {
	// console.log('enhanceAccessToeken');
	const { token } = localStorage;
	if (!token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		// console.log('token-', `Bearer ${token}`);
	}
};
enhanceAccessToeken();

export default new Vuex.Store({
	state: {
		token: '',
		refreshToken: '',
		userInfo: {},
		pageInfo: {},
		siteMenu: [],
		damageTypeList: [],
		progressList: [],
	},
	getters: {
		isLogin(state) {
			return state.token !== '';
		},
		// getUserInfo(state) {
		// 	return state.userInfo;
		// },
		// getPageInfo(state) {
		// 	return state.pageInfo;
		// },
		// getSiteMenu(state) {
		// 	return state.siteMenu;
		// },
	},

	mutations: {
		setToken(state, token) {
			state.token = token;
			localStorage.token = token;
		},
		setRefreshToken(state, refreshToken) {
			state.refreshToken = refreshToken;
			localStorage.refreshToken = refreshToken;
		},
		setUserInfo(state, value) {
			state.userInfo = value;
		},
		setDamageTypeList(state, value) {
			state.damageTypeList = value;
		},
		setProgressList(state, value) {
			state.progressList = value;
		},
		setPageInfo(state, pageInfo) {
			state.pageInfo = pageInfo;
		},
		setSiteMenu(state, menu) {
			state.siteMenu = menu;
		},
		setLogout(state) {
			// console.log('>> Logout');
			state.userInfo = {};
			state.pageInfo = {};
			state.siteMenu = [];
			state.token = '';
			state.refreshToken = '';
			state.damageTypeList = [];
			state.progressList = [];
			delete localStorage.token;
			delete localStorage.refreshToken;
		},
	},
	actions: {},
	modules: {},
	plugins: [
		createPersistedState({
			storage: window.sessionStorage,
		}),
	],
});
