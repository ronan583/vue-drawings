const basePath = 'drawing';
module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: basePath,
	filenameHashing: true,
	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	configureWebpack: config => {
		config.externals = {
			vue: 'Vue',
			vant: 'vant',
		};
		config.output.filename = `${basePath}/js/[name].[hash].js`;
		config.output.chunkFilename = `${basePath}/js/[name].[hash].js`;
	},
	devServer: {
		host: '0.0.0.0', // 项目运行时的本地地址
		port: 8596, // 端口号
		https: false, // https:{type:Boolean}
		disableHostCheck: true,
		open: true, // 配置自动启动浏览器
	},
};
