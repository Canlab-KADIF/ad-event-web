<template>
	<div>
		<div id="wrapper">
			<nav class="navbar-default navbar-static-side" role="navigation">
				<div class="sidebar-collapse">
					<!-- <ul class="nav metismenu" id="side-menu"> -->
					<ul class="nav metismenu" id="menu">
						<li class="nav-header">
							<div class="logo-element">
								<router-link to="/gn/"
									><img
										src="@/assets/images/gn/cms_logo.png"
										class="mainlogo"
										alt="GNCMS"
										@click="setPageId()"
								/></router-link>
								<h1>{{ siteName }}</h1>
							</div>
							<div class="logo-mini-element">
								<h1>
									<router-link to="/gn/"
										><img
											src="@/assets/images/gn/cms_logo.png"
											class="mainlogo"
											alt="GNCMS"
											@click="setPageId()"
									/></router-link>
								</h1>
							</div>
						</li>
						<!-- Left Menu -->
						<li
							v-for="(item, idx) in menuList"
							:class="item.active !== '' ? item.active : ''"
							:key="idx"
						>
							<a
								href="javascript:;"
								@click="fnSetMenu(idx)"
								:aria-expanded="item.active == 'active' ? true : false"
							>
								<i :class="item.menuIcon !== '' ? 'fa ' + item.menuIcon : ''"></i>
								<span class="nav-label">{{ item.menuName }} </span>
								<span v-if="item.menuSub.length > 0" class="fa arrow"></span>
							</a>
							<template v-if="item.menuSub.length > 0">
								<ul
									class="nav nav-second-level collapse"
									:class="item.active == 'active' ? 'in' : ''"
									:aria-expanded="item.active == 'active' ? true : false"
								>
									<li
										v-for="(items, subIdx) in item.menuSub"
										:class="items.active !== '' ? 'active' : ''"
										:key="subIdx"
									>
										<router-link :to="items.menuUrl">
											<i :class="items.menuIcon !== '' ? 'fa ' + items.menuIcon : ''"></i>
											{{ items.menuName }}
										</router-link>
									</li>
								</ul>
							</template>
						</li>
					</ul>
				</div>
			</nav>

			<div id="page-wrapper" class="gray-bg">
				<div class="row border-bottom">
					<nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
						<div class="navbar-header">
							<a class="navbar-minimalize btn btn-primary" href="#" @click="fnMiniNavbar()"
								><i class="fa fa-bars"></i
							></a>
							<form role="search" class="navbar-form-custom">
								<div class="form-group">
									<input
										type="text"
										placeholder="Search for contents or board..."
										class="form-control"
										name="topQuery"
										id="topQuery"
									/>
								</div>
							</form>
						</div>
						<ul class="nav navbar-top-links navbar-right">
							<li>
								<!-- <a href="{siteLink}" target="_blank"> -->
								<!-- <router-link to="/gn">
									<i class="fa fa-external-link"></i> <span>{{userInfo.userName}}</span>
								</router-link> -->
							</li>
							<li>
								<a href="javascript:;">
									<i class="fa fa-user"></i> <span class="m-t-xs"></span
									><strong>{{ userInfo.userName }}님</strong>
								</a>
							</li>
							<li class="logout">
								<a href="javascript:;" @click.prevent="fnLogout()"
									><i class="fa fa-sign-out"></i> <span>Log out</span></a
								>
							</li>
						</ul>
					</nav>
				</div>

				<!-- Main -->
				<router-view />

				<!-- Footer -->
				<div class="footer">
					<Footer />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Footer from '@/layout/gn/Footer.vue';
import { GetGnMenuList, PostLogout } from '@/api/index';

export default {
	name: 'LayoutGn',

	components: {
		Footer,
	},
	data() {
		return {
			siteName: process.env.VUE_APP_SITE_NAME,
			siteVersion: process.env.VUE_APP_SITE_VERSION,
			userInfo: this.$store.state.userInfo,
			pageInfo: {},

			isMiniNavbar: false,

			menuList: this.$store.state.siteMenu,
			menuIdx: '',
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
		this.fnInitData();
	},
	methods: {
		fnInitData() {
			let params = '';
			if (this.menuList.length < 1) {
				GetGnMenuList(params)
					.then(res => {
						const data = res.data;
						this.menuList = data.menuList;
						this.menuIdx = '';
						// this.fnSetMenu(this.pageInfo.menuIdx, this.pageInfo.menuSubIdx);
					})
					.catch(() => {
						this.$swal.fire({
							title: '메뉴 정보 ',
							html: '메뉴 정보를 가져오는데 실패 하였습니다 ',
							icon: 'error',
							timer: 2000,
							showConfirmButton: false,
						});
					});
			}
		},

		fnSetMenu(idx) {
			// console.log('fnSetMenu>>', idx, subIdx);
			// 선택 메뉴 활성화
			this.menuIdx = idx;

			for (var i = 0; i < this.menuList.length; i++) {
				this.menuList[i]['active'] = '';
				if (i == this.menuIdx) {
					this.menuList[i]['active'] = 'active';
					// menuUrl = this.menuList[i]['menuUrl'];
				}
				if (this.menuList[i]['menuSub'].length > 0) {
					for (var j = 0; j < this.menuList[i]['menuSub'].length; j++) {
						this.menuList[i]['menuSub'][j]['active'] = '';
						// if (i == idx && j == subIdx) {
						// 	// 1~2 depth 모두 같으면
						// 	this.menuList[i]['menuSub'][j]['active'] = 'active';
						// 	menuUrl = this.menuList[i]['menuSub'][j]['menuUrl'];

						// 	menuSubIdx = j;
						// }
					}
				}
			}

			this.pageInfo.menuIdx = this.menuIdx;
			this.$store.commit('setPageInfo', this.pageInfo);
			// this.$store.commit('setSiteMenu', this.menuList);

			// if (menuUrl != '') {
			// 	if (this.$route.path !== menuUrl) {
			// 		this.$router.push(menuUrl);
			// 	}
			// }
		},
		setPageId() {
			this.menuIdx = '';
			if (this.$route.path !== '/gn/') {
				this.$router.push('/gn/');
			}
		},
		fnMiniNavbar() {
			this.isMiniNavbar = !this.isMiniNavbar;
			if (this.isMiniNavbar) {
				document.querySelector('body').classList.add('mini-navbar');
			} else {
				document.querySelector('body').classList.remove('mini-navbar');
			}
		},
		fnLogout() {
			const formData = '';
			PostLogout(formData).then(res => {
				if (res) {
					// mutation의 Logout 실행
					this.$store.commit('setLogout');

					// 페이지 이동
					this.$router.push('/accounts/login');
				}
			});
		},
	},
};
</script>
