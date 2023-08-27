// import axios from 'axios';
// import { get } from '@/config/axios.js';
function get(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => {
				return response.json();
			})
			.then(myJson => {
				resolve(myJson);
				// console.log(myJson);
			})
			.catch(res => {
				reject(res);
			});
	});
}

function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		fetch(url, {
			body: JSON.stringify(data), // must match 'Content-Type' header
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, same-origin, *omit
			headers: {
				// 'user-agent': 'Mozilla/4.0 MDN Example',
				'content-type': 'application/json',
			},
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, cors, *same-origin
			// redirect: 'follow', // manual, *follow, error
			// referrer: 'no-referrer', // *client, no-referrer
		})
			.then(response => response.json()) // parses response to JSON
			.then(myJson => {
				resolve(myJson);
				console.log(myJson);
			})
			.catch(res => {
				reject(res);
			});
	});
}
function post1(url, data) {
	return new Promise((resolve, reject) => {
		fetch(url + data, {
			body: JSON.stringify(data), // must match 'Content-Type' header
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
		})
			.then(response => response.json()) // parses response to JSON
			.then(myJson => {
				resolve(myJson);
				// console.log(myJson);
			})
			.catch(res => {
				reject(res);
			});
	});
}
// const url1 = process.env.VUE_APP_NETURL;
// const url2 = process.env.VUE_APP_NETURLL; //本地
const url1 = `${process.env.VUE_APP_BASEURL}/net/emps`;
const url2 = `${process.env.VUE_APP_BASEURL}/net/emps`; // 本地
export const net = {
	udrepor: param => get(`${url2}/UDReport/GetFinalAccount?${param}`),
	// ProjContContract: (param, data) => post(url1 + "/ProjContContract/GetContractList?" + param, data),
	ProjContContract: param => get(`${url1}/ProjContContract/GetContractList?${param}`),
	startUpload: (param = {}) => post(`${url1}/Upload/startUpload`, param),
	// 取消同步
	ClearTask: (param = {}) => post(`${url1}/Upload/ClearTask`, param),
	// 清理缓存
	ClearCache: (param = {}) => post(`${url1}/Upload/ClearCache`, param),
	// startUpload: (param = {}) => post('http://192.168.0.162:8088/Upload/startUpload', param),
	PushContDataTablex: (param = '') => post1(`${url2}/UDReport/PushContDataTablex?`, param),
	GetUploadProcess: (param = {}) => post(`${url1}/Upload/GetUploadProcess`, param),
	// GetUploadProcess:(param = {})=>post('http://192.168.0.162:8088/Upload/GetUploadProcess', param)
};

export default { net };
