<template>
	<div>
		<router-view />
	</div>
</template>

<script>
import Footer from '@/layout/gn/Footer.vue';
import { GetMenuList, PostLogout } from '@/api/index';

export default {
	name: 'LayoutGn',

	components: {
		Footer,
	},
	data() {
		return {
			loginUserName: '',
			loginUserScop: '',
			sidebarLeft: false,
			isMiniNavbar: false,
			pageId: '',
			menuList: [],
		};
	},
	computed: {
		classActive: function () {
			return {
				active: !this.isActive,
			};
		},
	},
	created() {
		this.initData();
	},
	methods: {
		// Left menu
		setMiniNavbar() {
			this.isMiniNavbar = !this.isMiniNavbar;
			if (this.isMiniNavbar) {
				document.querySelector('body').classList.add('mini-navbar');
			} else {
				document.querySelector('body').classList.remove('mini-navbar');
			}
		},
		leftMenu(idx) {
			// 선택 메뉴 활성화
			// for(var i=0; i<this.menuList.length; i++) {
			// 	this.menuList[i]['menuUrl'] = this.menuList[i]['menuUrl'] + '/' + this.menuList[i]['menuId'];
			// 	if (i == idx) {
			// 		this.menuList[i]['active'] = 'active';
			// 	} else {
			// 		this.menuList[i]['active'] = '';
			// 	}
			// 	for(var j=0; j<this.menuList[i]['menuSub'].length; j++) {
			// 		if(this.menuList[i]['menuSub'][j]['menuId'] === this.$route.params.pageId) {
			// 			this.menuList[i]['menuSub'][j]['active'] = "active"
			// 		} else {
			// 			this.menuList[i]['menuSub'][j]['active'] = ""
			// 		}
			// 	}
			// }
			// console.log('>>>> '+this.$route.params.pageId);
		},
		setPageId(menuIdx, subIdx) {
			if (menuIdx === undefined) {
				this.$store.commit('setMenu', []);
				this.initData();
			} else {
				for (var i = 0; i < this.menuList.length; i++) {
					for (var j = 0; j < this.menuList[i]['menuSub'].length; j++) {
						if (i === menuIdx && j === subIdx) {
							this.menuList[i]['menuSub'][j]['active'] = 'active';
						} else {
							this.menuList[i]['menuSub'][j]['active'] = '';
						}
					}
				}
				this.$store.commit('setMenu', this.menuList);
			}
		},
		initData() {
			// this.loginUserName =  this.$store.getters.isUserName;
			// this.loginUserScop =  this.$store.getters.isScope;
			// this.menuList = this.$store.getters.isMenuList;

			let params = '';
			// if (this.$route.params.pageId !== undefined) {
			// 	params = "?pageId=" + this.$route.params.pageId;
			// }

			// console.log('initData params-', params);
			if (this.menuList.length === 0) {
				// GetMenuList(params)
				// 	.then(res => {
				// 		const data = res.data;
				// 		this.menuList = data.menuList;
				// 	})
				// 	.catch(err => {
				// 		alert(err.response.data.error);
				// 	});
			}
		},
		fnLogout() {
			const formData = '';
			PostLogout(formData).then(res => {
				if (res) {
					// mutation의 Logout 실행
					this.$store.commit('Logout');
					// 페이지 이동
					this.$router.push('/accounts/login');
				}
			});
		},
	},
};
</script>
