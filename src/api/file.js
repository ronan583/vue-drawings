/*
 * file.js
 * 统一文件接口
 * date: 2021-02-26
 * version: 1.0.1-SNAPSHOT
 */
import { post } from '@/network/axios';

//  文件上传服务
export const fileupload = {
	//  上传业务文件
	//  上传永久非公开文件，并且与某个业务标识(bizkey)绑定
	uploadBiz: (param = {}, config = {}) => post('/file/fileupload/uploadBiz', param, config),
	//  批量上传业务文件
	//  上传永久非公开文件，并且与某个业务标识(bizkey)绑定
	uploadBizMulti: (param = {}, config = {}, query) => post(`/file/fileupload/uploadBizMulti${query}`, param, config),
	//  上传公开文件
	//  公开文件有固定的文件地址，允许任何人访问
	uploadOpen: (param = {}, config = {}) => post('/file/fileupload/uploadOpen', param, config),
	//  批量上传公开文件
	//  公开文件有固定的文件地址，允许任何人访问
	uploadOpenMulti: (param = {}, config = {}) => post('/file/fileupload/uploadOpenMulti', param, config),
	//  上传安全文件
	//  安全文件指内部非公开文件，没有公开的访问地址，只允许通过权限验证的用户访问
	uploadSecure: (param = {}, config = {}) => post('/file/fileupload/uploadSecure', param, config),
	//  批量上传安全文件
	//  安全文件指内部非公开文件，没有公开的访问地址，只允许通过权限验证的用户访问
	uploadSecureMulti: (param = {}, config = {}) => post('/file/fileupload/uploadSecureMulti', param, config),
	//  上传临时文件
	//  临时文件会在24小时之后自动删除，临时文件可以通过bind接口转化为永久文件，biztype是业务类型，也是存储路径
	uploadTemp: (param = {}, config = {}) => post('/file/fileupload/uploadTemp', param, config),
	//  批量上传临时文件
	//  临时文件会在24小时之后自动删除，临时文件可以通过bind接口转化为永久文件，biztype是业务类型，也是存储路径
	uploadTempMulti: (param = {}, config = {}) => post('/file/fileupload/uploadTempMulti', param, config),
};
//  文件服务
export const file = {
	//  批量获取文件详情
	batchGet: (param = {}, config = {}) => post('/file/file/batchGet', param, config),
	//  批量获取业务文件地址URL
	batchGetBizFile: (param = {}, config = {}) => post('/file/file/batchGetBizFile', param, config),
	//  批量获取业务文件地址
	batchGetBizFileDetail: (param = {}, config = {}) => post('/file/file/batchGetBizFileDetail', param, config),
	//  绑定文件
	//  绑定文件到某个业务对象上，一个文件可以绑定多个业务对象；如果绑定的是临时文件，则自动转换为永久文件。
	bind: (param = {}, config = {}) => post('/file/file/bind', param, config),
	//  清理失效的临时文件
	clearExpiredTempFiles: (param = {}, config = {}) => post('/file/file/clearExpiredTempFiles', param, config),
	//  删除文件
	//  没有被业务引用的文件才允许删除
	delete: (param = {}, config = {}) => post('/file/file/delete', param, config),
	//  删除业务文件
	deleteBizFile: (param = {}, config = {}) => post('/file/file/deleteBizFile', param, config),
	//  获取文件详情
	get: (param = {}, config = {}) => post('/file/file/get', param, config),
	//  获取业务文件详情
	getBizFile: (param = {}, config = {}) => post('/file/file/getBizFile', param, config),
	//  上传文件
	//  注意：此接口已转移至更简洁的[文件上传服务]<br/> 业务标识：由业务类型(biztype)和页业务ID(bizid)两个字段组成，例如：user/avatar/123，可以指ID为123的用户的头像<br/> 存储路径：支持多层，多层之间使用'/'分割，前后不能有'/'<br/> 是否临时文件：临时文件会在24小时之后失效，请注意不允许临时文件关联业务对象，即temp=true时bizkey不能有值<br/> 是否公开文件：公开文件会有公开的访问链接，非公开文件只能通过临时链接访问，公开文件与非公开文件一旦设定则不可转换<br/> 是否生成临时地址：针对非公开文件起作用，生成临时访问文件的链接，该链接的有效时间是1小时，可以利用这个参数生成<br/> 现有的biztype：<br/> 用户头像：user/avatar<br/> 用户签名：user/sign<br/> 用户身份证正面（头像面）：user/idcard/front<br/> 用户身份证反面（国徽面）：user/idcard/back<br/> 单位LOGO：com/logo<br/> 单位营业执照：com/license<br/>
	upload: (param = {}, config = {}) => post('/file/file/upload', param, config),
};
// 资料目录
export const dir = {
	// 跨桶复制资料目录
	acrossCopy: (param = {}, config = {}) => post('/file/dir/acrossCopy', param, config),
	// 批量移动目录
	multiMove: (param = {}, config = {}) => post('/file/dir/multiMove', param, config),
	// 批量删除资料目录
	batchRemove: (param = {}, config = {}) => post('/file/dir/batchRemove', param, config),
	// 批量更新资料目录
	batchUpdate: (param = {}, config = {}) => post('/file/dir/batchUpdate', param, config),
	// 清空资料目录
	// 注意：清空桶下的全部目录以及文件，此接口仅在开发测试环境开放
	clear: (param = {}, config = {}) => post('/file/dir/clear', param, config),
	// 复制资料目录
	copy: (param = {}, config = {}) => post('/file/dir/copy', param, config),
	// 创建资料目录
	create: (param = {}, config = {}) => post('/file/dir/create', param, config),
	// 创建一个桶
	// 只进行一次初始化，如果桶中没有数据，则会进行初始化；如果桶中已经有数据了，则不会进行初始化，而是直接返回资料目录。
	createBucket: (param = {}, config = {}) => post('/file/dir/createBucket', param, config),
	// 创建资料目录树
	createTree: (param = {}, config = {}) => post('/file/dir/createTree', param, config),
	// 批量目录文件数
	// 批量获取目录文件数
	dirResCount: (param = {}, config = {}) => post('/file/dir/dirResCount', param, config),
	// 导出目录
	exportExcel: (param = {}, config = {}) => post('/file/dir/exportExcel', param, config),
	// 获取资料目录
	get: (param = {}, config = {}) => post('/file/dir/get', param, config),
	// 根据路径获取资料目录
	// 根据传入的path匹配到一个目录，path[0]的条件匹配一级目录、path[1]的条件匹配二级目录、以此类推；注意：如果根据条件能够匹配到唯一目录，则返回匹配到的目录及其子目录；否则会返回响应的错误状态码。
	getByPath: (param = {}, config = {}) => post('/file/dir/getByPath', param, config),
	// 导入目录
	importExcel: (param = {}, config = {}) => post('/file/dir/importExcel', param, config),
	// 导入资料目录
	// 只进行一次导入，如果桶中没有数据，则会进行导入；如果桶中已经有数据了，则不会进行导入，而是直接返回资料目录。
	impt: (param = {}, config = {}) => post('/file/dir/impt', param, config),
	// 初始化资料目录
	// 只进行一次初始化，如果桶中没有数据，则会进行初始化；如果桶中已经有数据了，则不会进行初始化，而是直接返回资料目录。
	init: (param = {}, config = {}) => post('/file/dir/init', param, config),
	// 查询资料目录
	list: (param = {}, config = {}) => post('/file/dir/list', param, config),
	// 移动资料目录
	move: (param = {}, config = {}) => post('/file/dir/move', param, config),
	// 删除资料目录
	remove: (param = {}, config = {}) => post('/file/dir/remove', param, config),
	// 资料目录排序
	sort: (param = {}, config = {}) => post('/file/dir/sort', param, config),
	// 更新资料目录
	update: (param = {}, config = {}) => post('/file/dir/update', param, config),
	// 更新额外属性
	updateProps: (param = {}, config = {}) => post('/file/dir/updateProps', param, config),
	batchUpdateDir: (param = {}, config = {}) => post('/file/dir/batchUpdateDir', param, config),
	dirSearch: (param = {}, config = {}) => post('/file/dir/dirSearch', param, config),
	// 批量更新目录类型
	multiUpdateType: (param = {}, config = {}) => post('/file/dir/multiUpdateType', param, config),
	// 根据资料目录获取路径请求
	getPathByDir: (param = {}, config = {}) => post('/file/dir/getPathByDir', param, config),
	// 同步删除文件夹
	syncDelete: (param = {}, config = {}) => post('/file/dir/syncDelete', param, config),
	// 同步上传文件夹
	syncUpload: (param = {}, config = {}) => post('/file/dir/syncUpload', param, config),
	// 同步更新文件夹
	syncUpdate: (param = {}, config = {}) => post('/file/dir/syncUpdate', param, config),
	// 获取需要同步的目录Id(目标桶对应名称的目录id)
	syncId: (param = {}, config = {}) => post('/file/dir/syncId', param, config),

	// 根据目录Ids批量获取根目录请求
	multiGetPath: (param = {}, config = {}) => post('/file/dir/multiGetPath', param, config),
	// 查询资料目录并默认创建初始化目录列表
	listAndCreateDefault: (param = {}, config = {}) => post('/file/dir/listAndCreateDefault', param, config),
	// 批量下载文件(包含文件夹)
	multiDownload: (param = {}, config = {}) => post('/file/dir/multiDownload', param, config),
	// 统计文件类型
	searchDirList: (param = {}, config = {}) => post('/file/dir/search', param, config),
};

// 资料档案
export const res = {
	// 导出资料
	// 返回进度信息(多个阶段，每个阶段都是独立的进度，三个阶段是依次进行的)，调用方使用进度ID查询进度，完成后result.file_url返回整个桶中所有资料的压缩包
	asyncExpt: (param = {}, config = {}) => post('/file/res/asyncExpt', param, config),
	// 导出HTML
	// 返回进度信息，调用方使用进度ID查询进度，完成后result.html返回匹配到的所有资料的网页版本
	asyncExptHtml: (param = {}, config = {}) => post('/file/res/asyncExptHtml', param, config),
	// 批量更新资料
	batchUpdate: (param = {}, config = {}) => post('/file/res/batchUpdate', param, config),
	// 创建资料
	create: (param = {}, config = {}) => post('/file/res/create', param, config),
	// 获取资料
	get: (param = {}, config = {}) => post('/file/res/get', param, config),
	// 资料修订记录
	histories: (param = {}, config = {}) => post('/file/res/histories', param, config),
	// 导入资料
	impt: (param = {}, config = {}) => post('/file/res/impt', param, config),
	// 查询资料列表
	list: (param = {}, config = {}) => post('/file/res/list', param, config),
	// 分页查询资料
	listPaged: (param = {}, config = {}) => post('/file/res/listPaged', param, config),
	// 移动资料
	move: (param = {}, config = {}) => post('/file/res/move', param, config),
	// 还原资料
	recover: (param = {}, config = {}) => post('/file/res/recover', param, config),
	// 回收站
	recyclebin: (param = {}, config = {}) => post('/file/res/recyclebin', param, config),
	// 查询相关资料
	// 查询与传入资料相似的资料，目前只是简单的查询前后几个资料，之后可以实现AI智能关联
	relates: (param = {}, config = {}) => post('/file/res/relates', param, config),
	// 删除资料
	// 删除的资料会进入回收站
	multiRemove: (param = {}, config = {}) => post('/file/res/multiRemove', param, config),
	remove: (param = {}, config = {}) => post('/file/res/remove', param, config),
	// 资料排序
	sort: (param = {}, config = {}) => post('/file/res/sort', param, config),
	// 资料传输
	// 将多个桶中的资料导入到另一个桶中相同的目录中， 注意：在目标桶中根据code进行匹配，不会生成新的目录，
	transfer: (param = {}, config = {}) => post('/file/res/transfer', param, config),
	// 更新资料
	update: (param = {}, config = {}) => post('/file/res/update', param, config),
	// 删除资料
	delete: (param = {}, config = {}) => post('/file/res/delete', param, config),
	// 所有资料更新排序
	updateSort: (param = {}, config = {}) => post('/file/res/updateSort', param, config),
	// 跨桶复制资料
	acrossCopy: (param = {}, config = {}) => post('/file/res/acrossCopy', param, config),
	// 统计用户上传的文件数量
	uploadCount: (param = {}, config = {}) => post('/file/res/uploadCount', param, config),
	statsUserRes: (param = {}, config = {}) => post('/file/res/statsUserRes', param, config),
	getComRes: (param = {}, config = {}) => post('/file/res/getComRes', param, config),
	getLatelyPage: (param = {}, config = {}) => post('/file/res/getLatelyPage', param, config),
	statsAmount: (param = {}, config = {}) => post('/file/res/statsAmount', param, config),
	// 同步删除文件
	syncDelete: (param = {}, config = {}) => post('/file/res/syncDelete', param, config),
	// 同步上传文件
	syncUpload: (param = {}, config = {}) => post('/file/res/syncUpload', param, config),
	// 同步更新文件
	syncUpdate: (param = {}, config = {}) => post('/file/res/syncUpdate', param, config),
	// 获取需要同步的资料Id(目标桶对应名称的资料id)
	syncId: (param = {}, config = {}) => post('/file/res/syncId', param, config),
	// 报告预览
	asyncExptReport: (param = {}, config = {}) => post('/file/res/asyncExptReport', param, config),
};

// 合同级应用
export const contApp = {
	// 获取(初始化)合同级应用
	ensure: (param = {}, config = {}) => post('/app/contApp/ensure', param, config),
};
// 企业级应用
export const comApp = {
	// 获取(初始化)企业级应用
	ensure: (param = {}, config = {}) => post('/app/comApp/ensure', param, config),
};
// 系统级应用
export const sysApp = {
	// 获取(初始化)企业级应用
	ensure: (param = {}, config = {}) => post('/app/sysApp/ensure', param, config),
};

export default { fileupload, file, contApp, res };
