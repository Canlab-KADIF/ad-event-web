const { defineConfig } = require('@vue/cli-service');
// const path = require('path');
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		port: process.env.VUE_APP_PORT ? process.env.VUE_APP_PORT : 9010,
	},
});
