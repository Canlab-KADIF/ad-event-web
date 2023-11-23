<template lang="">
	<div class="loginColumns animated fadeIn">
		<div class="row">
			<div class="col-sm-6 login-bg">
				<div class="cmstitle">
					<img src="../../../public/gn/images/cms_logo.png" alt="{_gs_CMSNM}" />
					<h1>{{ siteName }}</h1>
				</div>
				<div class="cmslogo">
					<h1>GNICT</h1>
					<small>CONTENT MANAGEMENT SYSTEM</small>
				</div>
			</div>
			<div class="col-sm-6 login-form">
				<div class="ibox-content">
					<router-view />

					<p class="login-copyright text-right">
						<small>
							Copyright 2023.
							<a href="http://www.gnict.co.kr/" target="_blank" class="gnict">GNICT</a> all rights
							reserved.<br />
							GNICT {{ siteVersion }}
						</small>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			siteName: process.env.VUE_APP_SITE_NAME,
			siteVersion: process.env.VUE_APP_SITE_VERSION,
		};
	},
};
// $('body').addClass('gray-bg');
</script>
