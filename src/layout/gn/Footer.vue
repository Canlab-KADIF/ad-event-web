<template lang="">
	<div>
		<div class="pull-right">
			<strong>GNCMS</strong> <small>{{ siteVersion }}</small>
		</div>
		<div>
			<span class="copyright"><strong>Copyright</strong></span>
			<span class="copyright-mini"><strong>&copy;</strong></span> 2023.
			<a href="http://www.gnict.co.kr" target="_blank" class="comin">GNICT</a> all rights reserved.
		</div>
	</div>
</template>
<script>
export default {
	name: 'Footer',
	data() {
		return {
			siteName: process.env.VUE_APP_SITE_NAME,
			siteVersion: process.env.VUE_APP_SITE_VERSION,
		};
	},
};
</script>
