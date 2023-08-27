/*
 * @Author: your name
 * @Date: 2021-07-07 09:43:06
 * @LastEditTime: 2021-08-27 11:31:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \project\vueProject\vue_template\.eslintrc.js
 */
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/airbnb', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-param-reassign': 'off',
	},
	// 全局变量不检测
	globals: {
		_: true,
		api: true,
	},
};
