/*
 * @Author: your name
 * @Date: 2021-08-31 17:28:07
 * @LastEditTime: 2022-03-24 11:52:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\vueProject\vue_template\src\api\api.js
 */
/*
  requestBaseUrl用于区分不同的后台本地测试地址，不传值默认axios中的baseURL为process.env.VUE_APP_BASEURL
*/
import { post, get, put, Delete } from '@/network/axios';

const baseUrl = 'VUE_APP_BASEURL';
export const file = {
	//  上传永久非公开文件，并且与某个业务标识(bizkey)绑定
	uploadBizUrl: (paramurl = {}, param = {}, config = {}) => post(`/file/fileupload/uploadBiz${paramurl}`, param, config),
};
export const auth = {
	// 登录接口
	loginByPwd: (param = {}, config = {}) => post('/org/auth/loginByPwd', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取用户信息
	getUserinfo: (param = {}, config = {}) => post('/org/auth/userinfo', param, { ...config, requestBaseUrl: baseUrl }),
};
export const depart = {
	// 获取公司数据
	list: (param = {}, config = {}) => post('/org/depart/list', param, { ...config, requestBaseUrl: baseUrl }),
};
export const comProjectInfo = {
	// 项目列表接口（通过用户名获取）
	selectProjectListByUserId: (param = {}, config = {}) => post('/o/erp/comProjectInfo/selectProjectListByUserId', param, { ...config, requestBaseUrl: baseUrl }),
	// 项目列表接口（通过公司获取）
	queryListForSort: (param = {}, config = {}) => post('/o/erp/comProjectInfo/queryListForSort', param, { ...config, requestBaseUrl: baseUrl }),
	// 经办部门接口
	getorg: (param = {}, config = {}) => post('/o/erp/comProjectInfo/getorg', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取用户信息
	getcom: (param = {}, config = {}) => post('/o/erp/comProjectInfo/getcom', param, { ...config, requestBaseUrl: baseUrl }),
	// 单位项目信息
	getorguser: (param = {}, config = {}) => post('/o/erp/comProjectInfo/getorguser', param, { ...config, requestBaseUrl: baseUrl }),
};
export const pay = {
	// 获取无合同支付列表
	list: (param = {}, config = {}) => post('/erp/pay/buildFounds/list', param, { ...config, requestBaseUrl: baseUrl }),
	// 创建一条无合同支付
	create: (param = {}, config = {}) => post('/erp/pay/buildFounds/create', param, { ...config, requestBaseUrl: baseUrl }),
	// 更新一条无合同支付数据
	update: (param = {}, config = {}) => post('/erp/pay/buildFounds/update', param, { ...config, requestBaseUrl: baseUrl }),
	// 查看用户是否可以修改支付数据
	getCanUpdate: (param = {}, config = {}) => post('/erp/pay/buildApproval/getCanUpdate', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取一条支付数据详情
	get: (param = {}, config = {}) => post('/erp/pay/buildFounds/get', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同支付的期次和累计合同金额
	init: (param = {}, config = {}) => post('/erp/pay/buildFounds/init', param, { ...config, requestBaseUrl: baseUrl }),
	// 判断合同是否可以添加
	canAdd: (param = {}, config = {}) => post('/erp/pay/buildFounds/canAdd', param, { ...config, requestBaseUrl: baseUrl }),
	// 附件设置
	set: (param = {}, config = {}) => post('/erp/pay/verify/set', param, { ...config, requestBaseUrl: baseUrl }),
	//
	getReport: (param = {}, config = {}) => post('/erp/pay/buildFounds/getReport', param, { ...config, requestBaseUrl: baseUrl }),
	getContList: (param = {}, config = {}) => post('/erp/pay/buildFounds/getContList', param, { ...config, requestBaseUrl: baseUrl }),
	downLoadFile: (param = {}, config = {}) => post('/erp/pay/buildFounds/downLoadFile', param, { ...config, requestBaseUrl: baseUrl }),
};
export const contractType = {
	// 获取流程选择树
	getTreeList: (param = {}, config = {}) => post('/o/erp/contractType/getTreeList', param, { ...config, requestBaseUrl: baseUrl }),
	// 流程类别新增
	add: (param = {}, config = {}) => post('/o/erp/contractType/add ', param, { ...config, requestBaseUrl: baseUrl }),
	// 流程类别删除
	delBatchByIds: (param = {}, config = {}) => post('/o/erp/contractType/delBatchByIds', param, { ...config, requestBaseUrl: baseUrl }),
	// 流程类别修改
	modify: (param = {}, config = {}) => put('/o/erp/contractType/modify', param, { ...config, requestBaseUrl: baseUrl }),
};
export const vendor = {
	// 获取收款方（供应商）
	queryListPage: (param = {}, config = {}) => post('/o/erp/vendor/queryListPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取供应商编号
	getNextNo: (param = {}, config = {}) => get('/o/erp/vendor/getNextNo', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取供应商单条数据
	getRowDetails: (param = '', config = {}) => get(`/o/erp/vendor/${param}`, '', { ...config, requestBaseUrl: baseUrl }),
	// 删除供应商单条数据
	del: (param = '', config = {}) => Delete('/o/erp/vendor', param, { ...config, requestBaseUrl: baseUrl }),
	// 添加供应商列表数据
	add: (param = {}, config = {}) => post('/o/erp/vendor/add', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改供应商列表数据
	modify: (param = {}, config = {}) => put('/o/erp/vendor/modify', param, { ...config, requestBaseUrl: baseUrl }),
	// 供应商准入文件
	listAccessAttach: (param = '', config = {}) => get(`/o/erp/vendor/listAccessAttach/${param}`, '', { ...config, requestBaseUrl: baseUrl }),
	// 供应商准入文件保存
	saveAccessAttach: (param = {}, config = {}) => post('o/erp/vendor/saveAccessAttach', param, { ...config, requestBaseUrl: baseUrl }),

	// 供应商潜在文件
	listLatentAttach: (param = '', config = {}) => get(`/o/erp/vendor/listLatentAttach/${param}`, param, { ...config, requestBaseUrl: baseUrl }),
	// 供应商潜在文件保存
	saveLatentAttach: (param = {}, config = {}) => post('o/erp/vendor/saveLatentAttach', param, { ...config, requestBaseUrl: baseUrl }),

	// 供应商取消文件
	listCancelAttach: (param = '', config = {}) => get(`/o/erp/vendor/listCancelAttach/${param}`, '', { ...config, requestBaseUrl: baseUrl }),
	// 供应商取消文件保存
	saveCancelAttach: (param = {}, config = {}) => post('o/erp/vendor/saveCancelAttach', param, { ...config, requestBaseUrl: baseUrl }),

	// 供应商尽职调查文件
	listInvestigateAttach: (param = '', config = {}) => get(`/o/erp/vendor/listInvestigateAttach/${param}`, '', { ...config, requestBaseUrl: baseUrl }),
	// 供应商尽职调查文件保存
	saveInvestigateAttach: (param = {}, config = {}) => post('o/erp/vendor/saveInvestigateAttach', param, { ...config, requestBaseUrl: baseUrl }),
	// 导出供应商Excel
	excelExport: (param = {}, config = {}) => post('o/erp/vendor/excelExport', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同付款乙方数据
	queryVendorByContId: (param = {}, config = {}) => post('o/erp/vendor/queryVendorByDisburseContId', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取收入合同请款甲方单位
	queryVendorByIncomeContId: (param = {}, config = {}) => post('o/erp/vendor/queryVendorByIncomeContId', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合作单位（甲乙丙丁）
	queryListLimit: (param = {}, config = {}) => post('/o/erp/vendor/queryListLimit', param, { ...config, requestBaseUrl: baseUrl }),
	// 通过搜索获取合作单位（甲乙丙丁）
	queryListPortion: (param = {}, config = {}) => post('/o/erp/vendor/queryListPortion', param, { ...config, requestBaseUrl: baseUrl }),
};
export const comTemplate = {
	// 获取配置附件选择模板
	root: (param = {}, config = {}) => post('/cat/comTemplate/root', param, { ...config, requestBaseUrl: baseUrl }),
};
export const state = {
	// 获取配置附件模板列表
	getSysTree: (param = {}, config = {}) => post('/measure/owner/state/sysTree', param, { ...config, requestBaseUrl: baseUrl }),
};
export const verify = {
	// 获取配置附件id
	getForId: (param = {}, config = {}) => post('/erp/pay/verify/getForId', param, { ...config, requestBaseUrl: baseUrl }),
	// 新增配置附件设置
	fileVerifyAdd: (param = {}, config = {}) => post('/erp/pay/verify/fileVerifyAdd', param, { ...config, requestBaseUrl: baseUrl }),
	// 更新配置附件设置
	fileVerifyUpdate: (param = {}, config = {}) => post('/erp/pay/verify/fileVerifyUpdate', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取已选择配置附件设置的列表
	fileVerifyList: (param = {}, config = {}) => post('/erp/pay/verify/fileVerifyList', param, { ...config, requestBaseUrl: baseUrl }),
};
export const approvalNode = {
	// 查看支付数据当前审批人
	currentNode: (param = {}, config = {}) => post('/erp/pay/buildApprovalNode/currentNode', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取当前审批流
	initNodeList: (param = {}, config = {}) => post('/o/erp/vendorAppr/approvalNode/initNodeList', param, { ...config, requestBaseUrl: baseUrl }),
	// 提交审批
	agree: (param = {}, config = {}) => post('/erp/pay/buildApprovalNode/agree', param, { ...config, requestBaseUrl: baseUrl }),
	// 回退审批
	reject: (param = {}, config = {}) => post('/erp/pay/buildApprovalNode/reject', param, { ...config, requestBaseUrl: baseUrl }),
};
export const approval = {
	// 支付信息提交
	create: (param = {}, config = {}) => post('erp/pay/buildApproval/create', param, { ...config, requestBaseUrl: baseUrl }),
	start: (param = {}, config = {}) => post('/erp/pay/buildApproval/start', param, { ...config, requestBaseUrl: baseUrl }),
};
export const slink = {
	// 通过地址获取二维码
	exchange: (param = {}, config = {}) => post('/slink/slink/exchange', param, { ...config, requestBaseUrl: baseUrl }),
};
export const approvalLog = {
	// 查看无合同支付数据操作记录
	list: (param = {}, config = {}) => post('/erp/pay/approvalLog/list', param, { ...config, requestBaseUrl: baseUrl }),
};
export const comTypeTemp = {
	// 获取供应商类数据
	getTreeListTemp: (param = {}, config = {}) => post('/o/erp/comTypeTemp/getTreeListTemp', param, { ...config, requestBaseUrl: baseUrl }),
	// 添加供应商类数据
	addComTypeTemp: (param = {}, config = {}) => post('/o/erp/comTypeTemp/addComTypeTemp', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改供应商类数据
	modifyComTypeTemp: (param = {}, config = {}) => put('/o/erp/comTypeTemp/modifyComTypeTemp', param, { ...config, requestBaseUrl: baseUrl }),
	// 删除供应商类数据
	delComTypeTempBatchByIds: (param = {}, config = {}) => post('/o/erp/comTypeTemp/delComTypeTempBatchByIds', param, { ...config, requestBaseUrl: baseUrl }),
};
export const contractTypeUser = {
	// 获取流程人员列表
	queryListPage: (param = {}, config = {}) => post('/o/erp/contractTypeUser/queryListPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 移除流程人员数据
	delBatchByIds: (param = {}, config = {}) => post('/o/erp/contractTypeUser/delBatchByIds', param, { ...config, requestBaseUrl: baseUrl }),
	// 编辑流程人员数据
	modify: (param = {}, config = {}) => post('/o/erp/contractTypeUser/modify', param, { ...config, requestBaseUrl: baseUrl }),
	// 替换流程人员数据
	changeApprUser: (param = {}, config = {}) => post('/o/erp/contractTypeUser/changeApprUser', param, { ...config, requestBaseUrl: baseUrl }),
	// 候选人列表添加
	addList: (param = {}, config = {}) => post('/o/erp/contractTypeUser/addList', param, { ...config, requestBaseUrl: baseUrl }),
	// 流动人员列表上移/下移
	upordown: (param = {}, config = {}) => post('/o/erp/contractTypeUser/upordown', param, { ...config, requestBaseUrl: baseUrl }),
};
// 支出合同
// 合同订立(增删改查)
export const disburseContract = {
	// 查询类别下的关联数据
	delgetContTypetcontId: (param = {}, config = {}) => post('/o/erp/disburseContract/delgetContTypetcontId', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同
	contSumPage: (param = {}, config = {}) => post('/o/erp/disburseContract/contSumPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同编号
	getContNo: (param = {}, config = {}) => post('/o/erp/disburseContract/getContNo', param, { ...config, requestBaseUrl: baseUrl }),
	// 添加合同
	add: (param = {}, config = {}) => post('/o/erp/disburseContract/add', param, { ...config, requestBaseUrl: baseUrl }),
	// 查看支出合同详情
	getAppContractById: (param = {}, config = {}) => post('/o/erp/disburseContract/getAppContractById', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改合同
	modify: (param = {}, config = {}) => put('/o/erp/disburseContract/modify', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出合同撤回
	updateBackContract: (param = {}, config = {}) => post('/o/erp/disburseContract/updateBackContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 删除合同
	delContractAll: (param = {}, config = {}) => post('/o/erp/disburseContract/delContractAll', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同导出
	contratExcelExport: (param = {}, config = {}) => post('/o/erp/disburseContract/contratExcelExport', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同催办
	urgeContract: (param = {}, config = {}) => post('/o/erp/disburseContract/urgeContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取已审批合同汇总
	getContSummary: (param = {}, config = {}) => post('/o/erp/disburseContract/getContSummary', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同补充(增删改查)
export const disburseBC = {
	// 合同补充查看列表
	queryBcContractList: (param = {}, config = {}) => post('/o/erp/disburseBC/queryBcContractList', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同补充页面列表
	contPage: (param = {}, config = {}) => post('/o/erp/disburseBC/contPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同变更编号
	getContNo: (param = {}, config = {}) => post('/o/erp/disburseBC/getContNo', param, { ...config, requestBaseUrl: baseUrl }),
	// 查看合同补充详情
	getBcContractById: (param = {}, config = {}) => post('/o/erp/disburseBC/getBcContractById', param, { ...config, requestBaseUrl: baseUrl }),
	// 催办
	urgeContract: (param = {}, config = {}) => post('/o/erp/disburseBC/urgeContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 删除
	delBcContractBatchByIds: (param = {}, config = {}) => post('/o/erp/disburseBC/delBcContractBatchByIds', param, { ...config, requestBaseUrl: baseUrl }),
	// 新建合同补充
	addBcContract: (param = {}, config = {}) => post('/o/erp/disburseBC/addBcContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改合同补充
	modifyBcContract: (param = {}, config = {}) => put('/o/erp/disburseBC/modifyBcContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同补充撤回
	updateBackContract: (param = {}, config = {}) => post('/o/erp/disburseBC/updateBackContract', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同变更(增删改查)
export const disburseBG = {
	// 合同变更查看列表
	queryBgContractList: (param = {}, config = {}) => post('/o/erp/disburseBG/queryBgContractList', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更页面列表
	contPage: (param = {}, config = {}) => post('/o/erp/disburseBG/contPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同变更编号
	getContNo: (param = {}, config = {}) => post('/o/erp/disburseBG/getContNo', param, { ...config, requestBaseUrl: baseUrl }),
	// 新建合同变更
	addBgContract: (param = {}, config = {}) => post('/o/erp/disburseBG/addBgContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 查看合同变更详情
	getBgContractById: (param = {}, config = {}) => post('/o/erp/disburseBG/getBgContractById', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更催办
	urgeContract: (param = {}, config = {}) => post('/o/erp/disburseBG/urgeContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更删除
	delBgContractBatchByIds: (param = {}, config = {}) => post('/o/erp/disburseBG/delBgContractBatchByIds', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更修改
	modifyBgContract: (param = {}, config = {}) => put('/o/erp/disburseBG/modifyBgContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更撤回
	updateBackContract: (param = {}, config = {}) => post('/o/erp/disburseBG/updateBackContract', param, { ...config, requestBaseUrl: baseUrl }),
};
// 收入合同
// 合同订立(增删改查)
export const incomeContract = {
	// 获取收入合同
	contSumPage: (param = {}, config = {}) => post('/o/erp/incomeContract/contSumPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取收入合同编码
	getContNo: (param = {}, config = {}) => post('/o/erp/incomeContract/getContNo', param, { ...config, requestBaseUrl: baseUrl }),
	// 删除收入合同
	delContractAll: (param = {}, config = {}) => post('/o/erp/incomeContract/delContractAll', param, { ...config, requestBaseUrl: baseUrl }),
	// 催办收入合同
	urgeContract: (param = {}, config = {}) => post('/o/erp/incomeContract/urgeContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 导出收入合同
	contratExcelExport: (param = {}, config = {}) => post('/o/erp/incomeContract/contratExcelExport', param, { ...config, requestBaseUrl: baseUrl }),
	// 查看收入合同详情
	getAppContractById: (param = {}, config = {}) => post('/o/erp/incomeContract/getAppContractById', param, { ...config, requestBaseUrl: baseUrl }),
	// 新建收入合同
	add: (param = {}, config = {}) => post('/o/erp/incomeContract/add', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改收入合同
	modify: (param = {}, config = {}) => put('/o/erp/incomeContract/modify', param, { ...config, requestBaseUrl: baseUrl }),
	// 撤回收入合同
	updateBackContract: (param = {}, config = {}) => post('/o/erp/incomeContract/updateBackContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取已审批合同汇总
	getContSummary: (param = {}, config = {}) => post('/o/erp/incomeContract/getContSummary', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同补充(增删改查)
export const incomeBC = {
	// 合同补充查看列表
	queryBcContractList: (param = {}, config = {}) => post('/o/erp/incomeBC/queryBcContractList', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同补充页面列表
	contPage: (param = {}, config = {}) => post('/o/erp/incomeBC/contPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同变更编号
	getContNo: (param = {}, config = {}) => post('/o/erp/incomeBC/getContNo', param, { ...config, requestBaseUrl: baseUrl }),
	// 查看合同补充详情
	getBcContractById: (param = {}, config = {}) => post('/o/erp/incomeBC/getBcContractById', param, { ...config, requestBaseUrl: baseUrl }),
	// 催办
	urgeContract: (param = {}, config = {}) => post('/o/erp/incomeBC/urgeContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 删除
	delBcContractBatchByIds: (param = {}, config = {}) => post('/o/erp/incomeBC/delBcContractBatchByIds', param, { ...config, requestBaseUrl: baseUrl }),
	// 新建合同补充
	addBcContract: (param = {}, config = {}) => post('/o/erp/incomeBC/addBcContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改合同补充
	modifyBcContract: (param = {}, config = {}) => put('/o/erp/incomeBC/modifyBcContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同补充撤回
	updateBackContract: (param = {}, config = {}) => post('/o/erp/incomeBC/updateBackContract', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同变更(增删改查)
export const incomeBG = {
	// 合同变更查看列表
	queryBgContractList: (param = {}, config = {}) => post('/o/erp/incomeBG/queryBgContractList', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更页面列表
	contPage: (param = {}, config = {}) => post('/o/erp/incomeBG/contPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同变更编号
	getContNo: (param = {}, config = {}) => post('/o/erp/incomeBG/getContNo', param, { ...config, requestBaseUrl: baseUrl }),
	// 新建合同变更
	addBgContract: (param = {}, config = {}) => post('/o/erp/incomeBG/addBgContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 查看合同变更详情
	getBgContractById: (param = {}, config = {}) => post('/o/erp/incomeBG/getBgContractById', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更催办
	urgeContract: (param = {}, config = {}) => post('/o/erp/incomeBG/urgeContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更删除
	delBgContractBatchByIds: (param = {}, config = {}) => post('/o/erp/incomeBG/delBgContractBatchByIds', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更修改
	modifyBgContract: (param = {}, config = {}) => put('/o/erp/incomeBG/modifyBgContract', param, { ...config, requestBaseUrl: baseUrl }),
	// 合同变更撤回
	updateBackContract: (param = {}, config = {}) => post('/o/erp/incomeBG/updateBackContract', param, { ...config, requestBaseUrl: baseUrl }),
};
// 支出/收入合同订立
// 合同审批流
export const buildContractAppr = {
	// 获取原始审批流程
	getApprList: (param = {}, config = {}) => post('/o/erp/buildContractAppr/getApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出发起审批
	saveContractApprList: (param = {}, config = {}) => post('/o/erp/buildContractAppr/saveContractApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入发起审批
	saveIncomeContractApprList: (param = {}, config = {}) => post('/o/erp/buildContractAppr/saveIncomeContractApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出合同审批
	toAppr: (param = {}, config = {}) => post('/o/erp/buildContractAppr/toAppr', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入合同审批
	incomeContractToAppr: (param = {}, config = {}) => post('/o/erp/buildContractAppr/incomeContractToAppr', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取当前审批人
	getApprThis: (param = {}, config = {}) => post('/o/erp/buildContractAppr/getApprThis', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出合同替换
	changeDisburseApprUserByContId: (param = {}, config = {}) => post('/o/erp/buildContractAppr/changeDisburseApprUserByContId', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入合同替换
	changeIncomeApprUserByContId: (param = {}, config = {}) => post('/o/erp/buildContractAppr/changeIncomeApprUserByContId', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同审批流记录
export const buildContractApprLog = {
	// 支出合同审批流程记录
	queryList: (param = {}, config = {}) => post('/o/erp/buildContractApprLog/queryList', param, { ...config, requestBaseUrl: baseUrl }),
};
// 支出/收入合同补充
// 合同审批流
export const buildBCAppr = {
	// 获取补充合同原始审批流程
	getApprList: (param = {}, config = {}) => post('/o/erp/buildBCAppr/getApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出补充合同发起审批
	saveContractApprList: (param = {}, config = {}) => post('/o/erp/buildBCAppr/saveContractApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入补充合同发起审批
	saveIncomeBCApprList: (param = {}, config = {}) => post('/o/erp/buildBCAppr/saveIncomeBCApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出补充合同审批
	toAppr: (param = {}, config = {}) => post('/o/erp/buildBCAppr/toAppr', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入补充合同审批
	incomeBCToAppr: (param = {}, config = {}) => post('/o/erp/buildBCAppr/incomeBCToAppr', param, { ...config, requestBaseUrl: baseUrl }),
	// 补充合同获取当前审批人
	getApprThis: (param = {}, config = {}) => post('/o/erp/buildBCAppr/getApprThis', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出补充合同替换
	changeDisburseApprUserByContId: (param = {}, config = {}) => post('/o/erp/buildBCAppr/changeDisburseApprUserByContId', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入补充合同替换
	changeIncomeApprUserByContId: (param = {}, config = {}) => post('/o/erp/buildBCAppr/changeIncomeApprUserByContId', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同审批流记录
export const buildBCApprLog = {
	// 获取补充合同审批流程记录
	queryList: (param = {}, config = {}) => post('/o/erp/buildBCApprLog/queryList', param, { ...config, requestBaseUrl: baseUrl }),
};
// 支出/收入合同变更
// 合同审批流
export const buildBGAppr = {
	// 获取变更合同原始审批流程
	getApprList: (param = {}, config = {}) => post('/o/erp/buildBGAppr/getApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出变更合同发起审批
	saveContractApprList: (param = {}, config = {}) => post('/o/erp/buildBGAppr/saveContractApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入变更合同发起审批
	saveIncomeBGApprList: (param = {}, config = {}) => post('/o/erp/buildBGAppr/saveIncomeBGApprList', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出变更合同审批
	toAppr: (param = {}, config = {}) => post('/o/erp/buildBGAppr/toAppr', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入变更合同审批
	incomeBGToAppr: (param = {}, config = {}) => post('/o/erp/buildBGAppr/incomeBGToAppr', param, { ...config, requestBaseUrl: baseUrl }),
	// 变更合同获取当前审批人
	getApprThis: (param = {}, config = {}) => post('/o/erp/buildBGAppr/getApprThis', param, { ...config, requestBaseUrl: baseUrl }),
	// 支出变更合同替换
	changeDisburseApprUserByContId: (param = {}, config = {}) => post('/o/erp/buildBGAppr/changeDisburseApprUserByContId', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入变更合同替换
	changeIncomeApprUserByContId: (param = {}, config = {}) => post('/o/erp/buildBGAppr/changeIncomeApprUserByContId', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同审批流记录
export const buildBGApprLog = {
	// 获取变更合同审批流程记录
	queryList: (param = {}, config = {}) => post('/o/erp/buildBGApprLog/queryList', param, { ...config, requestBaseUrl: baseUrl }),
};
export const pubData = {
	// 获取所属层级
	getdata: (param = {}, config = {}) => post('/o/pub/data/getdata', param, { ...config, requestBaseUrl: baseUrl }),
};
export const attch = {
	// 获取合同附件
	queryList: (param = {}, config = {}) => post('/o/erp/attch/queryList', param, { ...config, requestBaseUrl: baseUrl }),
};
export const user = {
	// 获取用户信息
	getUser: (param = {}, config = {}) => post('/org/user/get', param, { ...config, requestBaseUrl: baseUrl }),
};
export const invoice = {
	// 获取科目列表
	discern: (param = {}, config = {}) => post('/erp/pay/invoice/discern', param, { ...config, requestBaseUrl: baseUrl }),
};
export const bgTypeAcc = {
	// 获取变更类型
	queryBgTypeAccList: (param = {}, config = {}) => post('/o/erp/bgTypeAcc/queryBgTypeAccList', param, { ...config, requestBaseUrl: baseUrl }),
};

// 费用类型
export const feeType = {
	// 获取费用类型
	getTreeList: (param = {}, config = {}) => post(`/o/erp/feeType/getTreeList?comId=${param.comId}&projectId=${param.projectId}`, param, { ...config, requestBaseUrl: baseUrl }),
	// 新增费用类型
	addFeeType: (param = {}, config = {}) => post('/o/erp/feeType/addFeeType', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改费用类型
	modifyFeeType: (param = {}, config = {}) => post('/o/erp/feeType/modifyFeeType', param, { ...config, requestBaseUrl: baseUrl }),
	// 删除费用类型
	delFeeType: (param = {}, config = {}) => post(`/o/erp/feeType/${param}`, param, { ...config, requestBaseUrl: baseUrl }),
};
// 现场费用
export const feeRecord = {
	// 新增现场费用
	addFeeRecord: (param = {}, config = {}) => post('/o/erp/feeRecord/addFeeRecord', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改现场费用
	modifyFeeRecord: (param = {}, config = {}) => post('/o/erp/feeRecord/modifyFeeRecord', param, { ...config, requestBaseUrl: baseUrl }),
	// 删除现场费用
	deleteFeeType: (param = {}, config = {}) => post(`/o/erp/feeRecord/${param}`, param, { ...config, requestBaseUrl: baseUrl }),
	// 获取现场费用
	queryListPage: (param = {}, config = {}) => post('/o/erp/feeRecord/queryListPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 导出现场费用
	exportFeeRecord: (param = {}, config = {}) =>
		post(`/o/erp/feeRecord/exportFeeRecord?comId=${param.comId}&projectId=${param.projectId}&feeTypeId=${param.feeTypeId}`, param, { ...config, requestBaseUrl: baseUrl }),
};
// 项目收支汇总
export const projectSummary = {
	// 查询当前项目的收支汇总数据
	getByProjectId: (param = {}, config = {}) =>
		post(`/o/erp/projectSummary/getByProjectId?comId=${param.comId}&projectId=${param.projectId}&projectName=${param.projectName}`, param, { ...config, requestBaseUrl: baseUrl }),
	// 导出项目的收支汇总数据
	exportProjectSummary: (param = {}, config = {}) => post(`/o/erp/projectSummary/exportProjectSummary`, param, { ...config, requestBaseUrl: baseUrl }),
};
// 公司收支汇总
export const companySummary = {
	// 分页查询企业收支合同汇总数据
	getByComId: (param = {}, config = {}) => post('/o/erp/companySummary/getByComId', param, { ...config, requestBaseUrl: baseUrl }),
	// 导出企业收支合同汇总数据
	exportCompanySummary: (param = {}, config = {}) =>
		post(`/o/erp/companySummary/exportCompanySummary?comId=${param.comId}&companyName=${param.companyName}`, param, { ...config, requestBaseUrl: baseUrl }),

	// 查询公司收支汇总数据
	list(param = {}, config = {}) {
		return post('/o/erp/companySummary/list', param, { ...config, requestBaseUrl: baseUrl });
	},
};
// 收支台账
export const contractParameter = {
	// 分页查询收支台账
	listPage: (param = {}, config = {}) => post('/o/erp/contractParameter/listPage', param, { ...config, requestBaseUrl: baseUrl }),
	// 导出收支台账
	exportContParam: (param = {}, config = {}) => post(`/o/erp/contractParameter/exportContParam`, param, { ...config, requestBaseUrl: baseUrl }),
	// 生成最新的合同台账数据
	flushContParameterData: (param = {}, config = {}) =>
		post(`/o/erp/contractParameter/flushContParameterData?comId=${param.comId}&projectId=${param.projectId}`, param, { ...config, requestBaseUrl: baseUrl }),
	// 获取单个台账
	get: (param = {}, config = {}) => post('/o/erp/contractParameter/get', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同请款接口
export const buildFounds = {
	// 获取无合同支付列表
	list: (param = {}, config = {}) => post('erp/pay/buildFounds/list', param, { ...config, requestBaseUrl: baseUrl }),
	// 创建一条无合同支付
	create: (param = {}, config = {}) => post('erp/pay/buildFounds/create', param, { ...config, requestBaseUrl: baseUrl }),
	// 更新一条无合同支付数据
	update: (param = {}, config = {}) => post('erp/pay/buildFounds/update', param, { ...config, requestBaseUrl: baseUrl }),
	// 查看用户是否可以修改支付数据
	getCanUpdate: (param = {}, config = {}) => post('/erp/pay/buildApproval/getCanUpdate', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取一条支付数据详情
	get: (param = {}, config = {}) => post('erp/pay/buildFounds/get', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取合同支付的期次和累计合同金额
	init: (param = {}, config = {}) => post('erp/pay/buildFounds/init', param, { ...config, requestBaseUrl: baseUrl }),
	// 判断合同是否可以添加
	canAdd: (param = {}, config = {}) => post('erp/pay/buildFounds/canAdd', param, { ...config, requestBaseUrl: baseUrl }),
	getReport: (param = {}, config = {}) => post('erp/pay/buildFounds/getReport', param, { ...config, requestBaseUrl: baseUrl }),
	getContList: (param = {}, config = {}) => post('erp/pay/buildFounds/getContList', param, { ...config, requestBaseUrl: baseUrl }),
	downLoadFile: (param = {}, config = {}) => post('erp/pay/buildFounds/downLoadFile', param, { ...config, requestBaseUrl: baseUrl }),
	// 修改实收金额
	updateActualAmount: (param = {}, config = {}) => post('/erp/pay/buildFounds/updateActualAmount ', param, { ...config, requestBaseUrl: baseUrl }),
};
export const buildApproval = {
	// 请款支付信息提交
	create: (param = {}, config = {}) => post('erp/pay/buildApproval/create', param, { ...config, requestBaseUrl: baseUrl }),
	start: (param = {}, config = {}) => post('/erp/pay/buildApproval/start', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同请款
export const buildApprovalNode = {
	// 查看支付数据当前审批人
	currentNode: (param = {}, config = {}) => post('/erp/pay/buildApprovalNode/currentNode', param, { ...config, requestBaseUrl: baseUrl }),
	// 获取当前审批流
	initNodeList: (param = {}, config = {}) => post('/o/erp/vendorAppr/approvalNode/initNodeList', param, { ...config, requestBaseUrl: baseUrl }),
	// 提交审批
	agree: (param = {}, config = {}) => post('/erp/pay/buildApprovalNode/agree', param, { ...config, requestBaseUrl: baseUrl }),
	// 回退审批
	reject: (param = {}, config = {}) => post('/erp/pay/buildApprovalNode/reject', param, { ...config, requestBaseUrl: baseUrl }),
};

export const buildApprovalLog = {
	// 查看合同请款操作记录
	list: (param = {}, config = {}) => post('/erp/pay/buildApprovalLog/list', param, { ...config, requestBaseUrl: baseUrl }),
};
// 合同结算
export const settlement = {
	// 支出：http://api.jizhibao.club/o/erp/disburseContract/disburseAppList
	disburseAppList: (param = {}, config = {}) => post('/o/erp/disburseContract/disburseAppList', param, { ...config, requestBaseUrl: baseUrl }),
	// 收入http://api.jizhibao.club/o/erp/incomeContract/incomeAppList
	incomeAppList: (param = {}, config = {}) => post('/o/erp/incomeContract/incomeAppList', param, { ...config, requestBaseUrl: baseUrl }),
};
export const buildContract = {
	// 支出收入通用获取原始，变更，补充合同详情
	appGetContBasicItem: (param = {}, config = {}) => post('/o/erp/buildContract/appGetContBasicItem', param, { ...config, requestBaseUrl: baseUrl }),
};
export const openDoc = {
	// 获取分享的详情
	share: (param = {}, config = {}) => get(`/weboffice/openDoc/share/${param}`, '', { ...config, requestBaseUrl: baseUrl }),
};
