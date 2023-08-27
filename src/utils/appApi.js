/*
 * @Author: 王磊
 * @Date: 2022-02-19 17:29:20
 * @LastEditTime: 2022-03-28 16:18:54
 * @LastEditors: Please set LastEditors
 * @Description: app跳转
 * @FilePath: \project\erpVue\vue-measure-h5\src\appJump.js
 */
/* eslint-disable */
export default {
	jump: parame => {
		setTimeout(() => {
			api &&
				api.execScript({
					name: api.winName,
					script: `openWebWin(${JSON.stringify(parame)})`,
				});
		}, 300);
	},
	back: () => {
		setTimeout(() => {
			api &&
				api.execScript({
					name: api.winName,
					script: `closeWin()`,
				});
		}, 300);
	},
	refresh: () => {
		setTimeout(() => {
			api &&
				api.execScript({
					name: api.winName,
					script: `h5Script('refresh')`,
				});
		}, 300);
	},
	addEvent: cb => {
		setTimeout(() => {
			api &&
				api.addEventListener(
					{
						name: 'refresh',
					},
					() => {
						if (cb) cb();
					}
				);
		}, 300);
	},
	setTitle: title => {
		setTimeout(() => {
			api &&
				api.execScript({
					name: api.winName,
					script: `changeTitle('${title}')`,
				});
		}, 300);
	},
	// 设置头部导航栏按钮
	changeRightBtn: rightBtn => {
		setTimeout(() => {
			api &&
				api.execScript({
					name: api.winName,
					script: `changeRightBtn(${JSON.stringify(rightBtn)})`,
				});
		}, 300);
	},
	// 监听导航栏按钮事件
	addEventRightBtn: (cb, name) => {
		setTimeout(() => {
			api &&
				api.addEventListener(
					{
						name,
					},
					(res = '') => {
						if (cb) cb(res);
					}
				);
		}, 300);
	},
	// 监听分享状态变化
	changeShareStatus: cd => {
		setTimeout(() => {
			api &&
				api.addEventListener(
					{
						name: 'changeShareStatus',
					},
					res => {
						if (cd) cd(res);
					}
				);
		}, 300);
	},
};
