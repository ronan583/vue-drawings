export const Constants = {
	biztype: 'blg/resource',
	FOLDER_VALUE: 'FOLDER',
	// 可以预览的文件格式
	prewFormateList: ['TXT', 'WORD', 'EXCEL', 'PDF', 'IMAGE', 'VIDEO', 'AUDIO', 'PPT'],
	resourceTypeList: [
		{
			value: '',
			label: '全部',
			icon: 'jzb-icon-all',
		},
		{
			value: 'FOLDER',
			label: '文件夹',
		},
		{
			value: 'WORD',
			label: 'Word',
			icon: 'jzb-icon-word',
		},
		{
			value: 'EXCEL',
			label: 'Excel',
			icon: 'jzb-icon-excel',
		},
		{
			value: 'PDF',
			label: 'PDF',
			icon: 'jzb-icon-pdf',
		},
		{
			value: 'IMAGE',
			label: '图片',
			icon: 'jzb-icon-picture',
		},
		{
			value: 'VIDEO',
			label: '视频',
			icon: 'jzb-icon-video',
		},
		{
			value: 'AUDIO',
			label: '音频',
			icon: 'jzb-icon-audio',
		},
		{
			value: 'PPT',
			label: 'PPT',
			icon: 'jzb-icon-ppt',
		},
		{
			value: 'TXT',
			label: 'TXT',
			icon: 'jzb-icon-txt',
		},
		{
			value: 'ZIP',
			label: '压缩包',
			icon: 'jzb-icon-other',
		},
		{
			value: 'RAR',
			label: '压缩包',
			icon: 'jzb-icon-other',
		},
		{
			value: 'GZIP',
			label: '压缩包',
			icon: 'jzb-icon-other',
		},
		{
			value: 'CAD',
			label: 'CAD',
			icon: 'jzb-icon-other',
		},
		{
			value: 'XML',
			label: 'XML',
			icon: 'jzb-icon-other',
		},
		{
			value: 'UNKOWN',
			label: '其它',
			icon: 'jzb-icon-other',
		},
		{
			value: 'OTHER',
			label: '其它',
			icon: 'jzb-icon-other',
		},
	],
	appName: {
		COURSE_BUCKET: 'CourseBucket',
		RESOURCE_BUCKET: 'ResourceBucket',
		Drawing_2D_BUCKET: 'Drawing2DBucket',
	},
};
// 企业级应用管理(应用名称) : 与后端约定的值
export const COM_APP_NAME = 'comCustomBucketId';
export const SYS_NAME = 'JZB_SETTLEMENT_SYSBUCKETID';

export const JzbFileRecord = {
	// 允许添加的最大层级
	maxDepth: 5,
	// 排序间隔
	spaceNumber: 128,
	// 0默认、1企业资料、2项目资料 xm、3合同资料 ht 4 用户资料 ry
	//  'bgtz', 'bgl', 'bgsq', 'jl', 'tc', 'fp'
	bucketTypeList: ['', '', 'xm', 'ht', 'ry'],
};

export const getResourceType = value => {
	if (!value) return '';
	const resourceType = Constants.resourceTypeList.find(item => item.value === value);
	return resourceType ? resourceType.label : value;
};

export const getResourceIcon = value => {
	if (!value) return 'jzb-icon-all';
	const resourceType = Constants.resourceTypeList.find(item => item.value === value);
	return resourceType ? resourceType.icon : 'jzb-icon-other';
};

export const getFileType = fileName => {
	// 后缀获取
	let suffix = '';
	// 获取类型结果
	let result = '';
	try {
		const flieArr = fileName.split('.');
		suffix = flieArr[flieArr.length - 1];
	} catch (err) {
		suffix = '';
	}
	// fileName无后缀返回 UNKOWN
	if (!suffix) {
		return 'UNKOWN';
	}
	suffix = suffix.toLocaleLowerCase();
	// 图片格式
	const imglist = ['png', 'jpg', 'jpeg'];
	// 进行图片匹配
	result = imglist.find(item => item === suffix);
	if (result) {
		return 'IMAGE';
	}
	// 匹配 压缩包
	const ziplist = ['zip', 'gzip', 'rar'];
	result = ziplist.find(item => item === suffix);
	if (result) {
		return 'ZIP';
	}
	// 匹配txt
	const txtlist = ['txt'];
	result = txtlist.find(item => item === suffix);
	if (result) {
		return 'TXT';
	}
	// 匹配 excel
	const excelist = ['xls', 'xlt', 'et', 'xlsx', 'xltx', 'csv', 'xlsm', 'xltm'];
	result = excelist.find(item => item === suffix);
	if (result) {
		return 'EXCEL';
	}
	// 匹配 word
	const wordlist = ['doc', 'dot', 'wps', 'wpt', 'docx', 'dotx', 'docm', 'dotm', 'rtf'];
	result = wordlist.find(item => item === suffix);
	if (result) {
		return 'WORD';
	}
	// 匹配 pdf
	const pdflist = ['pdf'];
	result = pdflist.find(item => item === suffix);
	if (result) {
		return 'PDF';
	}
	// 匹配 ppt
	const pptlist = ['ppt', 'pptx', 'pptm', 'ppsx', 'ppsm', 'pps', 'potx', 'potm', 'dpt', 'dps'];
	result = pptlist.find(item => item === suffix);
	if (result) {
		return 'PPT';
	}
	// 匹配 视频
	const videolist = ['mp4', 'flv', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'webm', 'm4e', 'movie'];
	result = videolist.find(item => item === suffix);
	if (result) {
		return 'VIDEO';
	}
	// 匹配 音频
	const radiolist = ['mp3', 'midi', 'mid', 'wav', 'm4a', 'acp', 'aif', 'aiff', 'aifc', 'au', 'la1', 'lavs', 'lmsff', 'm3u'];
	result = radiolist.find(item => item === suffix);
	if (result) {
		return 'AUDIO';
	}
	// 匹配 音频
	const xmlist = ['xml'];
	result = xmlist.find(item => item === suffix);
	if (result) {
		return 'XML';
	}
	// 匹配 CAD图纸
	const cadlist = ['dwg', 'cpx', 'zjxm', 'gbq6', 'gqi4', 'gtj', 'qdg4', 'cgc', 'hntbj', 'dxf', 'dwf', 'dwt', 'bak'];
	result = cadlist.find(item => item === suffix);
	if (result) {
		return 'CAD';
	}

	// 其他 文件类型
	return 'OTHER';
};

export default {};
