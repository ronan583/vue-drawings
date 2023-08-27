/*
 * @Author: your name
 * @Date: 2022-02-11 10:32:45
 * @LastEditTime: 2022-02-11 10:32:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \project\erpVue\vue-measure-h5\postcss.config.js
 */
module.exports = {
	plugins: {
		// postcss-pxtorem 插件的版本需要 >= 5.0.0
		'postcss-pxtorem': {
			rootValue({ file }) {
				return file.indexOf('vant') !== -1 ? 37.5 : 75;
			},
			propList: ['*'],
		},
	},
};
