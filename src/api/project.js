/*
 * project.js
 * 项目微服务，包含项目、合同等功能
 * date: 2021-01-15
 * version: 1.0.0-SNAPSHOT
 */
import { post } from '@/network/axios';

//  合同成员
export const contractMember = {
	//  创建合同成员
	create: (param = {}, config = {}) => post('/project/contractMember/create', param, config),
	//  删除合同成员
	delete: (param = {}, config = {}) => post('/project/contractMember/delete', param, config),
	//  获取合同成员详情
	get: (param = {}, config = {}) => post('/project/contractMember/get', param, config),
	//  查询合同成员列表
	list: (param = {}, config = {}) => post('/project/contractMember/list', param, config),
	//  分页查询合同成员
	listPaged: (param = {}, config = {}) => post('/project/contractMember/listPaged', param, config),
	//  设置合同职位
	//  批量给合同成员设置合同职位
	setDuty: (param = {}, config = {}) => post('/project/contractMember/setDuty', param, config),
	//  更新合同成员
	update: (param = {}, config = {}) => post('/project/contractMember/update', param, config),
};
// 结算合同
export const contSettle = {
	settle: (param = {}, config = {}) => post('/project/contSettle/settle', param, config),
};
//  合同接口
export const contract = {
	//  批量获取合同概要
	batchGetBrief: (param = {}, config = {}) => post('/project/contract/batchGetBrief', param, config),
	//  创建合同
	create: (param = {}, config = {}) => post('/project/contract/create', param, config),
	//  删除合同
	delete: (param = {}, config = {}) => post('/project/contract/delete', param, config),
	//  获取合同详情
	get: (param = {}, config = {}) => post('/project/contract/get', param, config),
	//  获取合同概要
	getBrief: (param = {}, config = {}) => post('/project/contract/getBrief', param, config),
	//  批量导入合同
	//  导入模板：http:// cdn.ytud.net/office/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E5%90%88%E5%90%8C%E6%A8%A1%E6%9D%BFv2.xlsx
	importExcel: (param = {}, config = {}) => post('/project/contract/importExcel', param, config),
	//  查询合同概要
	//  有的项目合同数量过多，建议使用分页查询接口
	listBrief: (param = {}, config = {}) => post('/project/contract/listBrief', param, config),
	//  分页查询合同概要
	listBriefPaged: (param = {}, config = {}) => post('/project/contract/listBriefPaged', param, config),
	//  分页查询合同
	listPaged: (param = {}, config = {}) => post('/project/contract/listPaged', param, config),
};
//  合同类别
export const contCat = {
	//  查询合同类别
	//  根据项目查询合同类别，每个项目的合同类别都是不同的
	list: (param = {}, config = {}) => post('/project/contCat/list', param, config),
};
//  项目接口
export const project = {
	//  批量获取项目概要
	batchGetBrief: (param = {}, config = {}) => post('/project/project/batchGetBrief', param, config),
	//  创建项目
	create: (param = {}, config = {}) => post('/project/project/create', param, config),
	//  删除项目
	delete: (param = {}, config = {}) => post('/project/project/delete', param, config),
	//  获取项目详情
	get: (param = {}, config = {}) => post('/project/project/get', param, config),
	//  获取项目概要
	getBrief: (param = {}, config = {}) => post('/project/project/getBrief', param, config),
	//  获取项目经理
	getPm: (param = {}, config = {}) => post('/project/project/getPm', param, config),
	//  批量导入项目
	//  导入模板：http:// cdn.ytud.net/office/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E9%A1%B9%E7%9B%AE%E6%A8%A1%E6%9D%BFv2.xlsx
	importExcel: (param = {}, config = {}) => post('/project/project/importExcel', param, config),
	//  查询单位项目概要
	listBrief: (param = {}, config = {}) => post('/project/project/listBrief', param, config),
	//  查询项目合同
	//  查询单位下的项目合同，一级为项目，二级为合同,参建单位查询甲方的项目合同
	listContracts: (param = {}, config = {}) => post('/project/project/listContracts', param, config),
	//  分页查询项目
	listPaged: (param = {}, config = {}) => post('/project/project/listPaged', param, config),
	//  更新项目
	update: (param = {}, config = {}) => post('/project/project/update', param, config),
};

export default { contract, project, contSettle };
