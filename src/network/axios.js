/*
 * @Author: your name
 * @Date: 2021-03-09 14:16:10
 * @LastEditTime: 2022-03-24 11:19:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\vue_iotdeice\src\config\axios.js
 */
import axios from 'axios';
import Vue from 'vue';
import { GetRequestParams } from '@/utils/utils';

console.log(`项目接口运行环境：${process.env.VUE_APP_CURRENTMODE}`);

const instance = axios.create({
	// 创建axios实例，在这里可以设置请求的默认配置
	baseURL: process.env.VUE_APP_BASEURL,
	timeout: 10000, //  设置超时时间10s
});
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//  添加请求拦截器
instance.interceptors.request.use(
	config => {
		config.headers.token = GetRequestParams().token;
		if (config.url !== '/org/auth/loginByPwd' && config.url.indexOf('weboffice') === -1) {
			config.headers.userid = GetRequestParams().userid.toLowerCase();
			config.headers.comid = GetRequestParams().comid.toLowerCase();
		}
		/*
		处理域名
		1.本地开发npm run serve启动，由于后台开发的接口未发布到测试环境，调用后台本地的接口域名，域名地址需要处理(开发环境随便配置)
		2.测试打包npm run build:test启动，域名地址不需要处理，只需要设置VUE_APP_BASEURL='api.jizhibao.com'
		3.测试打包npm run build:pro启动，域名地址不需要处理,只需要设置VUE_APP_BASEURL='http:// api.jizhibao.com.cn'
		*/
		if (process.env.VUE_APP_CURRENTMODE === 'development' && process.env[config.requestBaseUrl]) {
			config.baseURL = process.env[config.requestBaseUrl];
		}
		return config;
	},
	error => {
		//  对请求错误做些什么
		return Promise.error(error);
	}
);
let token401 = false;
//  响应拦截器
instance.interceptors.response.use(
	response => {
		if (response.status === 200) {
			if (response.data.code === '401') {
				if (!token401) {
					token401 = true;
					Vue.prototype.$toast('请返回《首页》重新登录或刷新页面', '会话已失效');
				}
			}
			return Promise.resolve(response.data);
		}
		return Promise.reject(response);
	},
	//  服务器状态码不是200的情况
	error => {
		let msg = '服务器发生异常，请稍后再试';
		console.log(error);
		if (error.response) {
			switch (error.response.status) {
				case 401:
					msg = '会话已失效，请重新登录或刷新页面';
					break;
				case 403:
					msg = '您没有此操作权限访问';
					break;
				case 503:
					msg = '服务正在升级，请稍后再试';
					break;
				case 504:
					msg = '网关超时，请稍后再试';
					break;
				default:
					msg = '服务器发生异常，请稍后再试';
			}
		}
		Vue.prototype.$toast(msg);
		return Promise.reject(error.response); //  返回接口返回的错误信息
	}
);
const get = (url, params, config = {}) => {
	return new Promise((resolve, reject) => {
		instance({
			method: 'get',
			url,
			params,
			...config,
		})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};
const post = (url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		instance({
			method: 'post',
			url,
			data,
			...config,
		})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};
const put = (url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		instance({
			method: 'put',
			url,
			data,
			...config,
		})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};
const Delete = (url, data, config = {}, dataFlag) => {
	return new Promise((resolve, reject) => {
		instance({
			method: 'delete',
			url: dataFlag ? url : `${url}/${data}`,
			data: dataFlag ? data : '',
			...config,
		})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};
export { get, post, put, Delete };
