/*
 * @Author: your name
 * @Date: 2022-02-11 09:53:47
 * @LastEditTime: 2022-02-22 10:35:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \project\erpVue\vue-measure-h5\src\api\oplog.js
 */
/*
 * oplog.js
 * 操作日志接口
 * date: 2021-02-05
 * version: 1.0.0-SNAPSHOT
 */
import { post } from '@/network/axios';

//  操作记录
export const oplog = {
	//  查询操作分类
	//  查询全部分类，一级为模块、二级为功能、三级为操作
	category: (param = {}, config = {}) => post('/oplog/oplog/category', param, config),
	//  获取操作记录详情
	get: (param = {}, config = {}) => post('/oplog/oplog/get', param, config),
	//  查询最后操作用户
	latestOpUsers: (param = {}, config = {}) => post('/oplog/oplog/latestOpUsers', param, config),
	//  分页查询操作记录
	listPaged: (param = {}, config = {}) => post('/oplog/oplog/listPaged', param, config),
	//  推送操作记录
	push: (param = {}, config = {}) => post('/oplog/oplog/push', param, config),
};

export default { oplog };
