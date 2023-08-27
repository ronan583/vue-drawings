/**
 * 修改日期：2020-06-03
 */
/* eslint-disable */
// 1.* 常量
// 1.1 表单校验
const regular = {
	// 空格
	space: /^(?=.*\S).+$/,
	// 密码
	pwd: /(?!^(\d+|[a-zA-Z]+|[~!@_#$%^&*()\-+=,.?]+)$)^[\w~!@_#$%^&*()\-+=,.?]{6,20}$/,
	// 邮箱
	email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,4})$/,
	// 手机号
	mobile: /^(1)\d{10}$/,
	// 验证自然数
	naturalNumber: /^(([0-9]*[1-9][0-9]*)|(0+))$/,
	// 英文
	english: /^.[A-Za-z]+$/,
	// 座机
	telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
	// 传真
	fax: /^(\d{3,4}-)?\d{7,8}$/,
	// 银行卡号码
	bankCard: /^[1-9]\d{9,19}$/,
	// 证件号码
	IDNumber: /^[a-z0-9A-Z]{0,50}$/,
	// 身份证号码,包括15位和18位的
	IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
	// QQ号码
	qq: /^[1-9]\d{4,11}$/,
	// 网址, 仅支持http和https开头的
	url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
	// 0到20位的英文字符和数字
	enNum0to20: /^[a-z0-9A-Z]{0,20}$/,
	// 6~18个字，必须由英文/字母/数字/下划线组成，不能以下划线开头或结尾
	enNum_6to18: /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,18}$/,
	// 2到100位的中英文字符和空格
	cnEnSpace2to100: /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/,
	// 数字和换行符
	numLinefeed: /^[0-9\n*]+$/,
	// 255位以内的字符
	char0to255: /^.{0,255}$/,
	// 非负数
	nonNegativeNum: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
};

const NO_GROUP = 'NOGROUP'; // 和ResourceManager相同
const ALL_NODE_ID = 'ALL_NODE_ID'; // 全部文件节点
const NEW_GROUP = 'NEWGROUP'; // 和ResourceManager相同

// 2.* 通用方法
/** 2.1 格式化金额
 * 示例：formatCurrency(99.312) =>99.31
 */
const timeFormat = time => {
	// 时间格式化 2019-09-08
	const year = time.getFullYear();
	// eslint-disable-next-line
	const month = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
	// eslint-disable-next-line
	const day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
	// eslint-disable-next-line
	return year + '-' + month + '-' + day;
};
const iconsConfig = {
	word: { name: 'jzb-app-word', color: 'rgb(55, 129, 235)' },
	excel: { name: 'jzb-app-excel', color: 'rgb(19, 170, 87)' },
	ppt: { name: 'jzb-app-ppt2', color: 'rgb(220, 103, 74)' },
	pdf: { name: 'jzb-app-pdf', color: 'rgb(237, 68, 41)' },
	xml: { name: 'jzb-app-xml', color: 'rgb(25, 168, 249)' },
	audio: { name: 'jzb-app-music', color: 'rgb(238, 86, 196)' },
	video: { name: 'jzb-app-video', color: 'rgb(128, 100, 240)' },
	dwg: { name: 'jzb-app-dwg', color: 'rgb(134, 152, 203)' },
	mp3: { name: 'jzb-app-music', color: 'rgb(238, 86, 196)' },
	mp4: { name: 'jzb-app-music', color: 'rgb(238, 86, 196)' },
	rar: { name: 'jzb-app-archive', color: 'rgb(59, 211, 223)' },
	txt: { name: 'jzb-app-text', color: 'rgb(247, 192, 11)' },
	// edit: { name: 'edit', color: 'rgb(19, 170, 87)' },
	// delete: { name: 'delete', color: 'rgb(237, 68, 41)' },
	// move: { name: 'tiaobo', color: 'rgb(55, 129, 235)' },
	// share: { name: 'fenxiang', color: 'rgb(255, 160, 0)' },
	// download: { name: 'xia', color: 'rgb(142, 205, 7)' },
    edit: { name: 'edit', color: 'rgb(55, 129, 235)' },
	delete: { name: 'delete', color: 'rgb(55, 129, 235)' },
	move: { name: 'tiaobo', color: 'rgb(55, 129, 235)' },
	share: { name: 'fenxiang', color: 'rgb(55, 129, 235)' },
	download: { name: 'xia', color: 'rgb(55, 129, 235)' },
};
// 转换图标名称
const typeToIcon = cellType => {
	let iconData;
	// console.log(cellType, cellType.toString().toLowerCase(), iconsConfig[cellType.toString().toLowerCase()]);
	if (Number(cellType) < 4 || ['SYSTEM_CATALOG', 'CUSTOM_CATALOG', NEW_GROUP, NO_GROUP, ALL_NODE_ID, 'folder'].includes(cellType)) {
		iconData = { name: 'jzb-app-folder', color: 'rgb(255, 160, 0)' };
	} else if (['jpg', 'jpeg', 'png', 'gif', 'image'].includes(cellType.toLowerCase())) {
		iconData = { name: 'jzb-app-img', color: 'rgb(142, 205, 7)' };
	} else if (iconsConfig[cellType.toLowerCase()]) {
		iconData = iconsConfig[cellType.toLowerCase()];
	} else iconData = { name: 'jzb-app-other', color: 'rgb(25, 137, 249)' };
	return iconData;
};
const formatCurrency = (val, floatType = 2) => {
	val = `${val}`.replace(/\$|,/g, '');
	if (isNaN(val)) {
		val = '0';
	}
	const sign = val == (val = Math.abs(val));
	val = Math.floor(val * 100 + 0.50000000001);
	let cents = val % 100;
	val = Math.floor(val / 100).toString();
	if (cents < 10) {
		cents = `0${cents}`;
	}
	for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
		val = `${val.substring(0, val.length - (4 * i + 3))},${val.substring(val.length - (4 * i + 3))}`;
	}
	if (floatType == 2) val += `.${cents}`;
	return (sign ? '' : '-') + val;
};

/** 2.2 截取url参数
 * 示例：GetRequestParams().userid
 */
const GetRequestParams = () => {
	const url = location.search; // 获取url中"?"符后的字串
	const theRequest = new Object();
	if (url.indexOf('?') != -1) {
		const str = url.substr(1);
		const strs = str.split('&');
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
		}
	}
	return theRequest;
};
// 2.3 替换url参数
const replaceUrlParams = (oUrl, paramName, replaceWith) => {
	const re = eval(`/(${paramName}=)([^&]*)/gi`);
	return oUrl.replace(re, `${paramName}=${replaceWith}`);
};
// 2.4 uuid
const guid = () => {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	const uuid = `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
	return uuid.toLocaleUpperCase();
};
// 2.5 getFrameExtraHeight
const getFrameExtraHeight = () => {
	const frameHeader = document.getElementById('frame-header');
	const frameMenuTag = document.getElementById('frame-menu-tag');
	const frameHeaderHeight = frameHeader ? frameHeader.clientHeight : 0;
	const frameMenuTagHeight = frameMenuTag ? frameMenuTag.clientHeight : 0;
	return frameHeaderHeight + frameMenuTagHeight;
};
const autoTableWidth = (list, key, minwidth = 250, unitWidth = 12.5) => {
	if (list && Array.isArray(list) && list.length > 0) {
		const maxLength = Math.max.apply(
			Math,
			list.map(item => (item[key] && item[key].length ? item[key].length : 0))
		);
		const maxWidth = Math.ceil(maxLength * unitWidth);
		const resWidth = maxWidth > minwidth ? maxWidth : minwidth;
		return resWidth;
	}
	return minwidth;
};
// 3.* 树形数组方法
// 3.1 treeList- 批处理
const mapTreeList = (treeList, fn, childName = 'children') => {
	const lists = deepClone(treeList);
	const newList = lists.map(item => {
		const res = fn(item);
		if (item[childName] && item[childName].length > 0) {
			res[childName] = mapTreeList(item[childName], fn);
		}
		return res;
	});
	return newList;
};
// 3.2 treeList 遍历
const eachTreeList = (treeList, fn, childName = 'children') => {
	const lists = deepClone(treeList);
	lists.forEach(item => {
		fn(item);
		if (item[childName] && item[childName].length > 0) {
			eachTreeList(item[childName], fn);
		}
	});
};
// 3.3 treeList-扁平过滤
const flatTreeList = (treeList, fn, childName = 'children') => {
	const newList = [];
	const lists = deepClone(treeList);
	eachTreeList(
		lists,
		item => {
			if (!fn || (fn && fn(item))) newList.push(item);
		},
		childName
	);
	return newList;
};
// 3.4 treeList-过滤
const filterTreeList = (treeList, fn, childName = 'children') => {
	const newList = [];
	const lists = deepClone(treeList);
	lists.forEach(item => {
		if (fn && fn(item)) {
			if (item[childName]) item[childName] = filterTreeList(item[childName], fn, childName);
			newList.push(item);
		}
	});
	return newList;
};

// 3.5 treeList-查找到某一项
const findItemTreeList = (treeList, fn, childName = 'children') => {
	const lists = deepClone(treeList);
	let res = null;
	eachTreeList(
		lists,
		item => {
			if (fn && fn(item)) res = item;
		},
		childName
	);
	return res;
};
// 3.6 treeList-查找到某一项的children
const findChildTreeList = (treeList, fn, childName = 'children') => {
	const lists = deepClone(treeList);
	let res = [];
	eachTreeList(
		lists,
		item => {
			if (fn && fn(item)) res = item[childName];
		},
		childName
	);
	return res;
};

/**
 *
 * @param {*} tree 传入数组
 * @param {*} fn 过滤方法，传入当前节点，返回为ture的数据
 * @param {*} children 子节点字段
 * @returns
 */
const deepFilterTreeList = (tree, fn, children = 'children') => {
	const deepfilter = (tree, fn) => {
		const nodes = deepClone(tree);
		// 如果数组不存在，返回空
		if (!(nodes && nodes.length)) {
			return [];
		}
		const newChildren = [];
		for (const node of nodes) {
			// 递归过滤
			const subs = deepfilter(node[children], fn);
			if (fn(node)) {
				// 父节过滤成功，添加到数组
				newChildren.push(node);
			} else if (subs && subs.length) {
				// 将所有过滤成功的子节点，和父节点添加到数组
				node[children] = subs;
				newChildren.push(node);
			}
		}
		return newChildren.length ? newChildren : [];
	};
	return deepfilter(tree, fn);
};

// 4.* 对象
// 4.1 深拷贝
const deepClone = aObject => {
	if (!aObject) {
		return aObject;
	}
	let bObject;
	let v;
	let k;
	bObject = Array.isArray(aObject) ? [] : {};
	for (k in aObject) {
		v = aObject[k];
		bObject[k] = typeof v === 'object' ? deepClone(v) : v;
	}
	return bObject;
};

/**
 * 本地缓存
 */
// 项目
const PROJECT_KEY = 'JZBPROJECT';
// 合同
const CONTRACT_KEY = 'JZBCONTRACT';
// 设备
const DEVICE_KEY = 'JZBDEVICEID';
const cacheSelect = {
	setProjectId: (projValue = '', key = PROJECT_KEY) => {
		localStorage.setItem(key, projValue);
		return true;
	},
	getProjectId: (key = PROJECT_KEY) => {
		return localStorage.getItem(key);
	},
	getProject: (list, projIdKey = 'projId') => {
		if (!list || list.length === 0) return {};
		// 获取本地保存的id
		const _localProjId = localStorage.getItem(PROJECT_KEY);
		// 如果本地存储的项目id不存在，返回第一个数据
		if (!_localProjId) return list[0];

		// 获取本地存储的项目id对应的项目，如果不存在，选中第一个项目
		const _project = list.find(item => item[projIdKey] == _localProjId);
		if (!_project) return list[0];
		// 如果存在返回
		return _project;
	},
	setContractId: (contValue = '', key = CONTRACT_KEY) => {
		localStorage.setItem(key, contValue);
		return true;
	},
	getContractId: (key = CONTRACT_KEY) => {
		return localStorage.getItem(key);
	},
	getContract: (list, contIdKey = 'contId') => {
		if (!list || list.length === 0) return {};
		// 获取本地保存的id
		const _localContId = localStorage.getItem(CONTRACT_KEY);
		// 如果本地存储的合同id不存在，返回第一个数据
		if (!_localContId) return list[0];

		// 获取本地存储的合同id对应的合同，如果不存在，选中第一个合同
		const _cont = list.find(item => item[contIdKey] == _localContId);
		if (!_cont) return list[0];
		// 如果存在返回
		return _cont;
	},
	// 存储查询项目到本地
	setLocalProjectName: name => {
		name && localStorage.setItem('JZB_PROJECT_NAME', name);
	},
	// 存储查询合同到本地
	setLocalContractName: name => {
		name && localStorage.setItem('JZB_CONTRACT_NAME', name);
	},
	// 存储查询项目到本地
	setLocalProjectId: id => {
		id && localStorage.setItem('JZB_PROJECT_ID', id);
	},
	// 存储查询合同到本地
	setLocalContractId: id => {
		id && localStorage.setItem('JZB_CONTRACT_ID', id);
	},
	getLocalProjName: () => {
		return localStorage.getItem('JZB_PROJECT_NAME') || '';
	},
	getLocalContName: () => {
		return localStorage.getItem('JZB_CONTRACT_NAME') || '';
	},
	// 获取存储到本地的项目
	getLocalProjectContName: (list, key = 'projName', localKey = 'JZB_PROJECT_NAME') => {
		if (!list) return '';
		if (list.length === 0) return '';
		const name = localStorage.getItem(localKey);
		if (!name) return list[0][key];
		const res = list.some(item => {
			return item[key].toString() == name.toString();
		});
		if (res) {
			return name;
		}
		return list[0][key];
	},
	getDeviceId: (key = DEVICE_KEY) => {
		return localStorage.getItem(key);
	},
	setDeviceId: (_deviceId = '', key = DEVICE_KEY) => {
		localStorage.setItem(key, _deviceId);
		return true;
	},
	/**
	 * 检查传入值是否存在改数组中
	 * @param {string} fieldName 字段名称
	 * @param {string} objVal  检索值
	 * @param {Array} mDataList 检索数组
	 * return true or false
	 */
	checkIsFormData: (fieldName = '', objVal = '', mDataList = []) => {
		if (!fieldName || !objVal || !Array.isArray(mDataList) || mDataList.length === 0) {
			return false;
		}
		for (const item of mDataList) {
			if (item[fieldName].toLowerCase() === objVal.toLowerCase()) {
				return true;
			}
		}
		return false;
	},
};

/**
 * 6.1 本地存储
 */
const storage = {
	setLocalStorage: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	},
	getLocalStorage: key => {
		const res = localStorage.getItem(key);
		try {
			const ret = JSON.parse(res);
			return ret;
		} catch (error) {
			return res;
		}
	},
	setSessionStorage: (key, value) => {
		sessionStorage.setItem(key, JSON.stringify(value));
	},
	getSessionStorage: key => {
		const res = sessionStorage.getItem(key);
		try {
			const ret = JSON.parse(res);
			return ret;
		} catch (error) {
			return res;
		}
	},
};

export {
	regular, // 1.1 表单校验正则
	timeFormat,
	formatCurrency, // 2.1 格式化金额
	GetRequestParams, // 2.2 截取字符串url参数
	replaceUrlParams, // 2.3 替换url参数
	guid, // 2.4 生成guid
	getFrameExtraHeight, // 2.5 获取框架额外高度
	autoTableWidth, // 2.6 获取列表某一项最大宽度
	mapTreeList, // 3.1 treeList- map遍历，返回新数组
	eachTreeList, // 3.2 treeList-遍历
	flatTreeList, // 3.3 treeList-扁平后
	filterTreeList, // 3.4 treeList-过滤
	findItemTreeList, // 3.5 treeList-查找到某一项
	findChildTreeList, // 3.6 treeList-查找到某一项的children
	deepFilterTreeList, // 3.7 treeList-深度过滤
	deepClone, // 4.1 对象深拷贝
	typeToIcon,
	cacheSelect, // 5.1 本地项目，合同，设备存储
	storage, // 6.1 本地存储
	NO_GROUP, // C区的未分类
	ALL_NODE_ID, // 全部文件
	NEW_GROUP, // 自定义目录的未分类
};
