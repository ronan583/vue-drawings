<template>
	<div class="jzb-flexpage-vertical jzb-page filemain">
		<header>
			<van-field v-model="projectContName" class="company" is-link readonly label="选择合同段" placeholder="选择合同段" @click="openChooseProjContWin" />
			<div class="flex-between">
				<form action="" style="width:100%">
					<van-search class="flex1" v-model.trim="searchValue" placeholder="请输入目录/资料名称关键字搜索" @blur="onSearch" @focus="onFocus" @clear="handleClearSearch"></van-search>
				</form>
				<van-button style="width:50px;margin-right:10px" type="info" size="small" @click="onSearch">
					搜索
				</van-button>
			</div>
		</header>
		<!-- <button @click="refreshPage">test</button> -->
		<main class="mainauto">
			<!-- 文件路径-导航栏 -->
			<FilePathList @click="onClickPath" :list="mainPathList" />
			<!-- 分隔槽 -->
			<div class="u-gap"></div>
			<!-- <div class="file-block" :style="{ height: isShowOptBtns || isShowAddBtns ? 'calc(100% - 195px)' : 'calc(100% - 130px)' }"> -->
			<div class="file-block" :style="{ height: isShowOptBtns || isShowAddBtns ? 'calc(100% - 130px)' : 'calc(100% - 60px)' }">
				<div v-show="searchShow" class="result-wrap">
					<div class="result-part">搜索结果 ({{ searchResultCount }})</div>
				</div>
				<van-checkbox-group v-model="checkboxResult" class="checkbox-group" ref="checkGroup" @change="handleCheckChange">
					<van-cell-group class="cell-group">
						<van-cell class="cell-item" v-for="(item, index) in fileCatalogList" :key="item.id" clickable @click="onClickCell(item)">
							<div class="cell-item-icon">
								<van-icon class="iconfont catalog-icon" class-prefix="icon" :name="resTypeToIcon(item.type).name" size="32px" :color="resTypeToIcon(item.type).color" />
							</div>
							<div class="cell-item-up">
								<div class="cell-item--title">{{ !item.resId && (item.resTotal || item.resTotal === 0) ? `${item.title}（${item.resTotal}）` : item.title }}</div>
								<div class="cell-item--desc">
									<span>{{ item.modifiedTime }}</span>
								</div>
								<div class="cell-item--desc">
									<span class="item-span--desc" @click.stop="onClickCellPath(item)">{{ item.path }}</span>
									<span></span>
								</div>
							</div>
							<template #right-icon>
								<div @click.stop="handleCheckClick" style="width:40px" v-show="!['NEWGROUP', 'NOGROUP'].includes(item.type)">
									<!-- <van-checkbox :name="index" style="width:40px;height:40px;justify-content:center;align-items:center" label-disabled /> -->
									<van-checkbox :name="index" style="justify-content:center;" label-disabled />
								</div>
							</template>
						</van-cell>
						<van-empty description="暂无数据" v-if="fileCatalogList.length < 1" />
					</van-cell-group>
				</van-checkbox-group>
				<!-- </van-list> -->
			</div>
			<div class="upload-view" v-show="isUploadShow" style="pointer-events:none">
				<van-icon class="iconfont add-btn" class-prefix="icon" name="Icon-Upload" @click="onClickAdd" size="64px" color="rgb(25, 137, 249)" style="pointer-events:visiblePainted" />
			</div>
			<van-popup class="opt-btns-view opt-view" v-model="isShowOptBtns" :lockScroll="false" round :overlay="false" position="bottom" duration="0.1">
				<!-- <van-popup class="opt-btns-view opt-view" v-model="isShowOptBtns" round :overlay="false" position="bottom" duration="0.1"> -->
				<div v-for="item in optConfig" :key="item.name" v-show="item.availible">
					<van-button plain class="opt-btn" block @click="item.operation">
						<van-icon class="iconfont btn-icon" class-prefix="icon" :name="resTypeToIcon(item.name).name" size="20px" :color="resTypeToIcon(item.name).color" />
						{{ item.text }}
					</van-button>
				</div>
			</van-popup>
			<!-- </div> -->
			<van-popup
				class="opt-btns-view add-view"
				v-model="isShowAddBtns"
				round
				:overlay-style="{ background: 'rgba(0,0,0,0.4)' }"
				position="bottom"
				duration="0.1"
				@click-overlay="isUploadShow = true"
			>
				<div class="btn-view">
					<van-button plain class="opt-btn" block @click="onAddFolder">
						<van-icon class="iconfont btn-icon" class-prefix="icon" :name="resTypeToIcon('folder').name" size="24px" :color="resTypeToIcon('folder').color" />
						新建文件夹
					</van-button>
				</div>
				<div v-show="isUploadBtnShow" class="btn-view">
					<!-- accept="application/x-AutoCAD,.dwg,.cpx,.zjxm,.gbq6,.gqi4,.gtj,.qdg4,.cgc,.hntbj,.dxf,.dwf,.dwt,.bak" -->
					<van-uploader
						accept="application/acad,.dwg,.cpx,.zjxm,.gbq6,.gqi4,.gtj,.qdg4,.cgc,.hntbj,.dxf,.dwf,.dwt,.bak"
						:before-read="beforeRead"
						:after-read="handlerAfterRead"
						:max-count="9"
						:max-size="FILE_MAX_SIZE"
						@oversize="onOversize"
						multiple
					>
						<van-button plain class="opt-btn" block>
							<van-icon class="iconfont btn-icon" class-prefix="icon" :name="resTypeToIcon('dwg').name" size="25px" :color="resTypeToIcon('dwg').color" />
							上传文件
						</van-button>
					</van-uploader>
				</div>
			</van-popup>
			<van-popup v-model="showMoveFilePropup" round closeable position="bottom" :style="{ height: '85%', overflow: 'hidden' }">
				<!-- <van-popup v-model="showMoveFilePropup" round position="bottom" :style="{ height: '85%', overflow: 'hidden' }"> -->
				<div class="pop-title">调拨文件</div>
				<div class="pop-desc">{{ `将已选择的${checkboxResult.length}项移动到当前位置` }}</div>
				<div class="move-propup-hd">
					<FilePathList @click="handlerPathClick" :list="filePathList" />
				</div>
				<div class="move-propup-container">
					<van-cell-group>
						<van-cell class="cell-item" v-for="item in moveTargetDirList" :key="item.dirId" clickable @click="onClickDir(item)">
							<div class="cell-item-icon">
								<van-icon class="iconfont catalog-icon" class-prefix="icon" :name="resTypeToIcon(item.type).name" size="30px" :color="resTypeToIcon(item.type).color" />
							</div>
							<div class="cell-item-up">
								<div class="cell-item--title">{{ item.dirName }}</div>
							</div>
						</van-cell>
						<!-- <van-empty description="暂无数据" v-if="moveTargetDirList.length === 0" /> -->
					</van-cell-group>
				</div>
				<div class="btns">
					<van-button type="info" block @click="confimMove">确认</van-button>
				</div>
			</van-popup>
			<van-popup class="edit-popup" v-model="isEditFileShow" round @closed="onEditPopupClose" :close-on-click-overlay="false">
				<div class="pop-title">{{ getEditFormTitle() }}</div>
				<van-form validate-first @failed="onFailed" @submit="confirmEdit" ref="editForm">
					<!-- <van-form validate-first @failed="onFailed"> -->
					<van-field
						class="edit-field"
						v-model.trim="editValue"
						label="名称"
						name="validator"
						placeholder="请输入名称"
						:rules="[{ validator: editValidator, message: '输入内容不得为空，长度不超过30字符', required: true, trigger: 'onChange' }]"
					/>
					<div class="van-dialog__footer">
						<div class="edit-btn">
							<van-button block type="default" native-type="button" @click="onEditPopupClose" style="border-bottom-left-radius:16px">取消</van-button>
						</div>
						<div class="edit-btn edit-submit">
							<van-button block type="default" native-type="submit" style="border-bottom-right-radius:16px">提交</van-button>
							<!-- <van-button block type="default" @click="confirmEdit">提交</van-button> -->
						</div>
					</div>
				</van-form>
			</van-popup>
		</main>
	</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { Dialog } from 'vant'; // ImagePreview
import { project } from '@/api/project';
import FilePathList from '@/components/file-path-list.vue';
import { dir, res as resApi, contApp, fileupload } from '@/api/file';
import { typeToIcon, NO_GROUP, NEW_GROUP, GetRequestParams } from '@/utils/utils';
import { getFileType, Constants } from '@/utils/constants';
import { net } from '@/api/net';

const [SYS, CUSTOM, B_AREA, CD_AREA, ALL] = ['SYSTEM_CATALOG', 'CUSTOM_CATALOG', 'B_AREA', 'CD_AREA', 'ALL'];
const catalogItemType = { sys: 'SYSTEM_CATALOG', custom: 'CUSTOM_CATALOG' };
const rootPath = { dirName: '全部', dirId: '', type: ALL };
// NEW_GROUP：最新上传
// NO_GROUP：未分类
const NEW_GROUP_DIR = { dirId: NEW_GROUP, type: '', dirName: '最新上传', dirPid: '', resTotal: 0, childrenCatTree: [] };
const NEW_GROUP_DIR_PATH = { dirId: NEW_GROUP, type: NEW_GROUP, dirName: '最新上传', dirPid: '' };
const NO_GROUP_DIR = { dirId: NO_GROUP, type: '', dirName: '未分类', dirPid: '', resTotal: '-', childrenCatTree: [] };
const NO_GROUP_DIR_PATH = { dirId: NEW_GROUP, type: NO_GROUP, dirName: '未分类', dirPid: '' };
// 特殊节点：
const SPECIAL_NODE = [NEW_GROUP, NO_GROUP];

const FILE_MAX_SIZE = 20 * 1024 * 1024; // 30 MB

const validFilType = fileName => {
	const type = getFileType(fileName);
	// this.$total.error(`【${fileName}】文件格式不支持上传`);
	return type !== 'UNKOWN';
};

let prveParams = null;
export default {
	components: {
		FilePathList,
	},
	data() {
		return {
			FILE_MAX_SIZE,
			// 桶id
			customBucketId: '', // 桶id
			currContId: '',

			// 单位项目合同个人信息
			userId: '',
			comId: '',
			token: '',

			projId: '',
			projName: '',
			contId: '',
			contName: '',
			projectList: '',
			contractList: '',

			// 页面状态
			currCatDirPid: '',
			specialFlagDirId: '', // 记录在哪个目录进入特殊节点
			bucketType: '', // 当前目录类型（系统、自定义、未分类、全部文件等）
			fileCatalogList: [], // 文件列表数据
			searchShow: false, // 显示搜索内容

			// 显示操作按钮
			isUploadShow: true, // 显示加号按钮
			isShowOptBtns: false, // 显示底部功能按钮组
			isShowAddBtns: false, // 显示上传、新建文件夹按钮组
			isUploadBtnShow: false, // 显示上传文件按钮
			isEditFileShow: false, // 显示新建文件夹、修改名称弹窗

			// 表单
			editFormType: '',
			editValue: '',
			optConfig: [
				{ name: 'edit', text: '修改', availible: false, icon: '', operation: this.onEdit },
				{ name: 'delete', text: '删除', availible: false, icon: '', operation: this.handlerDelFile },
				{ name: 'move', text: '调拨', availible: false, icon: '', operation: this.onMove },
				{ name: 'share', text: '分享', availible: false, icon: '', operation: this.callShare },
				{ name: 'download', text: '下载', availible: false, icon: '', operation: this.handleDownload },
			],
			// 特殊路径判断标志 使用switchUnderFlag控制不要直接操作
			underAllNode: false, // 图宝不用
			underNoGroup: false,
			underNewGroup: false,

			// 搜索值
			searchValue: '',
			searchResultCount: '',
			// 缓存搜索值
			cacheSearchValue: '',

			mainPathList: [],
			checkboxResult: [],
			sourceBucketIds: [],
			resGroupCount: {},
			// 文件业务类型 system or custom
			bizType: 'system',
			// 调拨文件夹列表 弹出层
			showMoveFilePropup: false,
			filePathList: [],
			currentPathIndex: -1,
			// 调拨目标目录列表
			moveTargetDirList: [],
			previewImgList: [],

			projectContName: '',
		};
	},
	watch: {
		showMoveFilePropup(newValue) {
			if (newValue) {
				this.initMoveTargetDirList();
				this.$appApi.changeRightBtn({
					type: 'HIDE',
				});
			} else {
				this.handleShowRightBtn();
			}
		},
	},
	created() {
		this.$nextTick(() => {
			this.$appApi.changeRightBtn({
				type: 'CLICK',
				title: '全选',
				func: 'checkAll',
			});
			this.$appApi.addEventRightBtn(() => {
				this.testRightBtn();
			}, 'checkAll');
		});
	},
	mounted() {
		const that = this;
		// 设置 APP端 调用 h5 端 监听事件
		setTimeout(() => {
			this.getProjectList();
			api.addEventListener(
				{
					name: 'handlerProjContChange',
				},
				ret => {
					// value 格式： {"projName":"湘府高速","projId":"e56bbb93-f899-4de8-bf82-b64bee60425c","title":["清单分项"],"conid":["794e2bdd-f734-43a4-8e21-95dbde917d00"],"comaId":["E899C1DD-2A0F-4B09-9F80-FFB29269EF59"],"combName":["清单分项"]}
					console.log('--------------------');
					console.log(JSON.stringify(ret));
					// eslint-disable-next-line prefer-destructuring
					that.projectContName = ret.value.title[0];
					that.onContChange({ contId: ret.value.conid[0].toUpperCase() });
					// console.log('档宝 存储项目合同id ' + ret.value.projId.toUpperCase() + '  ' + ret.value.conid[0].toUpperCase());
					localStorage.setItem('DRAWING-PROJ-ID', ret.value.projId.toUpperCase());
					localStorage.setItem('DRAWING-CONT-ID', ret.value.conid[0].toUpperCase());
				}
			);
			api.addEventListener({ name: 'handleOpenContList' }, ret => {
				console.log('---------图宝handleOpenContList-----------');
				console.log(JSON.stringify(ret));
			});
			// 本地浏览器测试
			// that.projectContName = '测试测试测试测试测试测试测试测试测试测试';
			// that.onContChange({ contId: '358E35ED-72D7-4FC9-8B1E-A63DAC6C7779' });
		}, 500);
	},
	methods: {
		// 调起APP分享
		callShare() {
			const selectItem = this.fileCatalogList[this.checkboxResult[0]];
			let params;
			if (selectItem.resId) {
				params = `{objId:"${selectItem.resId}",objType:"RES",type:"TEMP",objBucketId:"${this.customBucketId}",url:"${process.env.VUE_APP_PAGEURL}/res/s"}`;
			} else {
				params = `{objId:"${selectItem.dirId}",objType:"DIR",type:"TEMP",objBucketId:"${this.customBucketId}",url:"${process.env.VUE_APP_PAGEURL}/res/s"}`;
			}
			console.log(`share(${params})`);
			setTimeout(() => {
				api.execScript({
					name: api.winName,
					script: `share(${params})`,
				});
			}, 500);
		},
		getProjectList() {
			const params = { comId: this.$route.query.comid, userId: this.$route.query.userid };
			project.listBrief(params).then(res => {
				if (res.code === '30000') {
					// console.log('------------合同列表' + JSON.stringify(res.rows));
					if (res.list.length === 0) {
						this.$toast('当前无项目，请去创建');
						this.handleNoProjCont();
						return;
					}
					this.projectList = res.list;
					const projId = localStorage.getItem('DRAWING-PROJ-ID');
					// console.log('档宝本地读取项目id  ' + projId);
					// console.log('档宝 请求的项目列表  ' + JSON.stringify(this.projectList));
					// 如果本地无项目缓存，则跳转到选择项目合同页
					if (!projId) {
						// 要么跳转到选择项目合同页面，要么默认选择第一个，看需求是哪种
						// this.openChooseProjContWin(true);
						this.projId = res.list[0].projId;
						this.projName = res.list[0].projName;
						localStorage.setItem('DRAWING-PROJ-ID', this.projId);
						this.getContractList();
						return;
					}
					// 如果有本地缓存，则查找当前单位人员的项目是否包含缓存的项目
					// 不包含 则跳转到选择项目合同，包含 则查项目下的合同
					const proj = res.list.find(item => {
						return item.projId === projId;
					});
					// console.log('查找项目  ' + JSON.stringify(proj));
					if (!proj) {
						// 要么跳转到选择项目合同页面，要么默认选择第一个，看需求是哪种
						// this.openChooseProjContWin(true);
						this.projId = res.list[0].projId;
						this.projName = res.list[0].projName;
						localStorage.setItem('DRAWING-PROJ-ID', this.projId);
						this.getContractList();
						return;
					}
					this.projId = proj.projId;
					this.projName = proj.projName;
					this.getContractList();
				} else {
					this.$toast(res.msg);
				}
			});
		},
		async getContractList() {
			// isgenerator=> 1:查询结算合同
			const params = `projid=${this.projId}&isgenerator=0&userid=${this.$route.query.userid}`;
			const res = await net.ProjContContract(params); // 获取结算合同
			// console.log('------------' + JSON.stringify(res.rows));
			if (res.rows.length > 0) {
				this.contractList = res.rows;
				const contId = localStorage.getItem('DRAWING-CONT-ID');
				// console.log('读取合同id  ' + contId);
				// console.log('请求的合同列表  ' + JSON.stringify(this.contractList));
				if (!contId) {
					// 要么跳转到选择项目合同页面，要么默认选择第一个，看需求是哪种
					// this.openChooseProjContWin(true);
					this.contId = res.rows[0].cont_id.toUpperCase();
					this.contName = res.rows[0].cont_name;
					localStorage.setItem('DRAWING-CONT-ID', this.contId);
					this.projectContName = this.contName;
					this.onContChange({ contId: this.contId });
					return;
				}
				const cont = res.rows.find(item => {
					return item.cont_id.toUpperCase() === contId;
				});
				// console.log('查找合同  ' + JSON.stringify(cont));
				if (!cont) {
					// 要么跳转到选择项目合同页面，要么默认选择第一个，看需求是哪种
					// this.openChooseProjContWin(true);
					this.contId = res.rows[0].cont_id.toUpperCase();
					this.contName = res.rows[0].cont_name;
					localStorage.setItem('DRAWING-CONT-ID', this.contId);
					this.projectContName = this.contName;
					this.onContChange({ contId: this.contId });
					return;
				}
				this.contId = cont.cont_id.toUpperCase();
				this.contName = cont.cont_name;
				// localStorage.setItem('JZB_CONTRACT_ID', cont.cont_id);
				// localStorage.setItem('JZB_CONTRACT_NAME', cont.cont_name);
				this.projectContName = cont.cont_name;
				this.onContChange({ contId: this.contId });
			} else {
				this.handleNoProjCont();
				this.contName = '';
				this.contId = '';
				this.contractList = [];
				this.$toast('当前无合同，请去创建');
			}
		},
		// 合同段选择代码
		openChooseProjContWin() {
			// if (isToast) {
			// 	this.$toast('请选择项目合同');
			// }
			setTimeout(() => {
				api.execScript({
					name: api.winName,
					script: `chooseProjContWin('handlerProjContChange')`,
				});
			}, 500);
		},
		// 调起原生APP 合同段选择
		openAppContListWin() {
			setTimeout(() => {
				api.execScript({
					name: api.winName,
					script: `openContListWin('handleOpenContList')`,
				});
			}, 500);
		},
		async onContChange({ contId }) {
			if (contId) {
				this.contId = contId;
				this.customBucketId = await this.getContAppEnsure(this.contId);
				// todo 重置underFlag、listOption、分类数量
				// this.showRootCatalog();
				this.queryRootList();
				this.initPath();
				this.switchUnderFlag();
			} else {
				// 无合同
				this.fileCatalogList = [];
				this.resGroupCount = [];
				this.mainPathList = [];
			}
		},
		async queryRootList() {
			this.getFileCatalog('', catalogItemType.custom);
		},
		// #region =====调拨功能相关=====
		// 确认移动
		async confimMove() {
			// 调拨的路径层级至少三级

			if (this.filePathList.length < 2) {
				this.$toast('当前目录不支持调拨，请选择下级文件夹');
				return;
			}

			const moveResIds = new Map();
			const moveDirIds = new Map();
			let tempCatItem = null;

			this.checkboxResult.forEach(index => {
				tempCatItem = this.fileCatalogList[index];
				if (tempCatItem.resId) {
					moveResIds.set(tempCatItem.resId, tempCatItem.sort);
				} else {
					moveDirIds.set(tempCatItem.dirId, tempCatItem.sort);
				}
			});
			const { dirId: targetDirId } = this.filePathList[this.currentPathIndex];
			// 自定义分类 注：this.currSysFileCat.sys 代表是否调拨到 系统目录下
			// let targetBucketId = ''; // 目标桶Id 如果值存在 代表调拨操作为 跨桶操作
			/**
			 * contBucketId ： 系统目录桶Id
			 * sysDirCustomBucketId: 自定义目录
			 * currSysFileCat.sys : 判断调拨的目标桶是否为系统目录，反之 自定义目录
			 * bucketId：当前数据来源桶Id（需要被调拨的数据桶）
			 */
			this.$toast({
				duration: 0,
				type: 'loading',
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
			});
			// 调拨目标是否在当前桶内操作
			const saveMoveFolder = this.saveMoveFolder(moveDirIds, this.customBucketId, targetDirId);
			const saveMoveFile = this.saveMoveFile(moveResIds, this.customBucketId, targetDirId);
			const moveRes = await Promise.all([saveMoveFolder, saveMoveFile]);
			if (moveRes[0] && moveRes[1]) {
				this.$toast.success('调拨成功');
				this.showMoveFilePropup = false;
				// 刷新数据
				setTimeout(() => {
					this.refreshPage();
				}, 800);
				// 关闭弹窗
				// this.isShowOptBtns = false;
			}
		},
		// 文件夹移动
		async saveMoveFolder(dirMap, bucketId, newDirPid) {
			// 移动之前需要,需要先对目标目录做移动操作
			try {
				if (dirMap.size === 0) return true;
				const oDir = {};
				dirMap.forEach((value, key) => {
					oDir[key] = value;
				});
				const params = {
					bucketId,
					dirMap: oDir,
					newDirPid,
				};
				const result = await dir.multiMove(params);

				if (result.code !== '30000') {
					this.$toast(result.msg);
					return false;
				}
				return true;
			} catch (error) {
				return false;
			}
		},
		// 文件移动
		async saveMoveFile(resMap, bucketId, newDirPid) {
			try {
				if (resMap.size === 0) return true;
				const params = {
					bucketId,
					dirId: newDirPid,
					resIds: [...Array.from(resMap.keys())],
				};

				const result = await resApi.move(params);
				// if (result.code === '99999') {
				// 	this.$toast('文件已在该目录下');
				// 	return false;
				// }

				if (result.code !== '30000') {
					this.$toast(result.msg);
					return false;
				}
				return true;
			} catch (error) {
				return false;
			}
		},
		// 跨桶复制目录--实现跨桶调拨
		async acrossCopyDir(sourceBucketId, targetBucketId, sourceDirIdList, targetDirPid) {
			if (sourceDirIdList.length === 0) {
				return true;
			}
			const params = {
				sourceBucketId,
				targetBucketId,
				fetchRes: true,
				sourceDirIdList,
				targetDirPid,
				duplicateOpType: 'UPDATE',
				duplicateRuleType: 'DIR_NAME',
				updateProps: true,
			};
			const copyRes = await dir.acrossCopy(params);

			if (copyRes.code !== '30000') {
				this.$toast.fail(copyRes.msg);
				return false;
			}
			const removeResult = await this.removeDir({ bucketId: sourceBucketId, dirIds: sourceDirIdList, force: true });
			// 删除文件夹
			return removeResult;
		},
		// 跨桶复制资料--实现跨桶调拨
		async acrossCopyRes(sourceBucketId, targetBucketId, resIds, targetDirPid) {
			if (resIds.length === 0) {
				return true;
			}
			const params = { sourceBucketId, targetBucketId, resIds, targetDirId: targetDirPid, duplicateOpType: 'UPDATE' };
			const copyRes = await resApi.acrossCopy(params);
			if (copyRes.code !== '30000') {
				this.$toast.fail(copyRes.msg);
				return false;
			}
			const removeResult = await this.removeRes({ bucketId: sourceBucketId, resIds });
			// 删除文件
			return removeResult;
		},
		// 移动目录点击
		async onClickDir(dirCell) {
			this.$toast({
				duration: 200,
				type: 'loading',
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
			});
			this.filePathList.push(dirCell);
			// const tempList = await this.fetchMoveDirList(dirCell);
			// this.moveTargetDirList = JSON.parse(JSON.stringify(tempList));
			this.moveTargetDirList = await this.fetchMoveDirList(dirCell);
			// console.log('-----------------------' + JSON.stringify(this.moveTargetDirList));
			this.currentPathIndex = this.filePathList.length - 1;
			this.$toast.clear();
		},
		// 点击路径
		async handlerPathClick(pathIndex) {
			if (this.currentPathIndex === pathIndex) {
				return;
			}

			this.currentPathIndex = pathIndex;

			const pathItem = this.filePathList[pathIndex];
			if (pathItem.dirId === 'ROOT_DIR') {
				this.initMoveTargetDirList();
				return;
			}
			// 裁剪掉 mainPathList
			this.filePathList.splice(pathIndex + 1);
			// 查询对应列表
			try {
				this.moveTargetDirList = await this.fetchMoveDirList(pathItem);
			} catch (ex) {
				this.$toast.fail('程序异常，请稍后再试');
				this.moveTargetDirList = [];
			}
		},
		async initMoveTargetDirList() {
			this.filePathList = [{ ...rootPath, dirId: 'ROOT_DIR' }];
			const tempList = await this.getDirList({ bucketId: this.customBucketId, depth: 1, fetchRes: true, countRes: true });
			this.moveTargetDirList = tempList.filter(item => item.type !== 1);
		},
		// 发送请求获取 目录列表
		async fetchMoveDirList({ dirId, bucketId }) {
			const isIncludeBFolder = this.checkboxResult.some(idx => {
				const tempItem = this.fileCatalogList[idx];
				return tempItem.type === 2;
			});
			console.log('------------当前选中的包含', isIncludeBFolder);
			try {
				const requestParams = {
					dirPid: dirId, // 单桶查询，配合bucketId 查询 非必选
					bucketId, // 单桶查询
					depth: 1,
				};
				const res = await dir.list(requestParams);
				if (res.code !== '30000') {
					res.list = [];
					this.$toast.fail(res.msg);
				}
				// 如果选中包含B区目录，则不在调拨目录展示C区type=1的文件夹
				// 如果是首层，也要过滤 type = 1 的目录
				if (isIncludeBFolder || dirId === this.customBucketId) {
					return res.list.filter(item => item.type !== 1);
				}
				return res.list;
			} catch (ex) {
				this.$toast.fail('程序异常，请稍后再试');
				// throw new Error('接口查询异常');
				return [];
			}
		},
		// #endregion
		handlerDelFile() {
			// 判断是否有勾选列表
			if (this.checkboxResult.length === 0) {
				// 提示
				this.$toast('请勾选需要删除的文件');
				return;
			}

			Dialog.confirm({
				title: '删除',
				message: '是否继续删除这些文件?',
				confirmButtonColor: '#1989fa',
			}).then(async () => {
				const resIds = [];
				const dirIds = [];
				let tempCatItem = null;
				this.checkboxResult.forEach(index => {
					tempCatItem = this.fileCatalogList[index];
					if (tempCatItem.resId) {
						resIds.push(tempCatItem.resId);
					} else {
						dirIds.push(tempCatItem.dirId);
					}
				});
				// console.log('---------删除resIds和dirIds', resIds, dirIds);
				const requestParams = {
					bucketId: this.customBucketId,
					// force: true,
					dirIds,
					resIds,
				};
				const removeRes = await Promise.all([this.removeDir(requestParams), this.removeRes(requestParams)]);
				if (removeRes[0] && removeRes[1]) {
					this.$toast.success('删除成功');
					// 刷新数据
					setTimeout(() => {
						this.refreshPage();
					}, 800);
				}
			});
		},
		async removeRes(params) {
			try {
				if (params.resIds.length === 0) return true;
				const result = await resApi.multiRemove(params);
				if (result.code !== '30000') {
					this.$toast.fail(result.msg);
					return false;
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		async removeDir(params) {
			try {
				if (params.dirIds.length === 0) return true;
				const result = await dir.batchRemove(params);
				if (result.code !== '30000') {
					this.$toast.fail(result.msg);
					return false;
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		handleCheckClick() {
			// console.log('复选框点击', this.checkboxResult);
		},
		getEditFormTitle() {
			if (this.editFormType === 'add') {
				return '新建文件夹';
			}
			if (this.editFormType === 'editF') {
				return '修改文件夹名称';
			}
			if (this.editFormType === 'editR') {
				return '修改图纸名称';
			}
			return '';
		},
		onAddFolder() {
			this.showEditForm(true, 'add');
		},
		onEdit() {
			if (this.checkboxResult.length !== 1) {
				console.log('非单选，选中出错');
				return;
			}
			const selectItem = this.fileCatalogList[this.checkboxResult[0]];
			if (selectItem.resId) {
				this.showEditForm(true, 'editR');
				let idx = selectItem.title.lastIndexOf('.');
				if (idx === -1) {
					idx = selectItem.title.length;
				}
				this.editValue = selectItem.title.substring(0, idx);
			} else {
				this.showEditForm(true, 'editF');
				this.editValue = selectItem.title;
			}
		},
		editValidator(value) {
			console.log(value);
			console.log(this.editValue);
			return value.length <= 30 && value.length > 0;
		},
		onFailed(errorInfo) {
			console.log('failed', errorInfo);
		},
		// type 'editF': 编辑文件夹  'editR': 编辑文件  'add': 新增文件夹
		showEditForm(isShow, type) {
			if (isShow) {
				this.editFormType = type;
				this.isEditFileShow = true;
			} else {
				this.isEditFileShow = false;
				setTimeout(() => {
					this.editValue = '';
					this.$refs.editForm.resetValidation();
				}, 300);
			}
		},
		onEditPopupClose() {
			this.showEditForm(false);
		},
		// 新建文件夹、修改文件和文件夹名称的统一提交方法
		async confirmEdit() {
			// console.log('---------------');
			// this.testRightBtn();
			if (this.editFormType === 'add') {
				const params = {
					bucketId: this.customBucketId,
					bucketType: 1, // 0默认、1企业资料、2项目资料、3合同资
					dirPid: this.currCatDirPid,
					dirName: this.editValue,
					type: 2,
				};
				if (this.bucketType === B_AREA) {
					const folderList = this.fileCatalogList.filter(item => item.dirId && !SPECIAL_NODE.includes(item.type));
					params.sort = folderList.length + 1;
				} else if (this.bucketType === CD_AREA) {
					params.type = 1;
					params.sort = 1;
				}
				try {
					const result = await dir.create(params);
					if (result.code !== '30000') {
						this.$toast.fail(result.msg);
					} else this.$toast.success('新建成功');
				} catch (error) {
					this.$toast.fail(error);
					console.log(error);
				}
			} else if (this.editFormType === 'editF' || this.editFormType === 'editR') {
				const selectItem = this.fileCatalogList[this.checkboxResult[0]];
				console.log(selectItem.title);
				let result;
				if (selectItem.resId) {
					// 是文件资料
					let extName;
					if (selectItem.title.lastIndexOf('.') === -1) {
						extName = '';
					} else {
						extName = selectItem.title.substring(selectItem.title.lastIndexOf('.'), selectItem.title.length);
					}
					console.log(extName);
					const newTitle = `${this.editValue}${extName}`;
					const params = {
						bucketId: this.customBucketId,
						resId: selectItem.resId,
						title: newTitle,
					};
					result = await resApi.update(params);
				} else {
					// 是文件夹
					const params = {
						dirId: selectItem.dirId,
						dirName: this.editValue,
					};
					result = await dir.update(params);
				}
				if (result.code === '30000') {
					this.$toast.success('修改名称成功');
				} else {
					this.$toast.fail(result.msg);
				}
			}
			this.showEditForm(false);
			this.isShowAddBtns = false;
			setTimeout(() => {
				this.refreshPage();
			}, 800);
		},
		onMove() {
			this.showMoveFilePropup = true;
		},
		handleDownload() {
			const selectItem = this.fileCatalogList[this.checkboxResult[0]];
			const urlDownload = `${process.env.VUE_APP_BASEURL}/file/download/res/${selectItem.resId}?token=${GetRequestParams().token}`;
			console.log(selectItem, urlDownload);
			// iOS打开url乱码
			// window.location.href = urlDownload;
			this.downloadCAD(urlDownload, selectItem.title);
		},
		downloadCAD(downUrl, title) {
			api.execScript({
				name: api.winName,
				script: `downFile( '${downUrl}', '${title}', false)`,
				// script: `downloadCADFile( '${downUrl}', '${title}')`,
			});
		},
		// 手机不支持blob下载
		// downloadFile(fileUrl, fileName) {
		// 	// 浏览器支持fetch则用blob下载，避免浏览器点击a标签，跳转到新页面预览的行为
		// 	if (window.fetch) {
		// 		fetch(fileUrl)
		// 			.then(res => res.blob())
		// 			.then(blob => {
		// 				const a = document.createElement('a');
		// 				const url = window.URL.createObjectURL(blob);
		// 				a.href = url;
		// 				a.download = fileName;
		// 				a.click();
		// 			});
		// 	} else {
		// 		const a = document.createElement('a');
		// 		a.href = fileUrl;
		// 		a.target = '_blank';
		// 		a.download = fileName;
		// 		a.click();
		// 	}
		// },
		handleCheckChange(names) {
			const change = JSON.parse(JSON.stringify(names));
			// 刷新页面调用了toggleAll，change被触发，需要加层级判断
			const underSpecial = this.underNoGroup || this.underNewGroup || this.underAllNode;
			if (this.bucketType === B_AREA) {
				if (change.length === 1) {
					this.configOptBtn(['edit', 'delete']);
				} else if (change.length > 1) {
					this.configOptBtn(['delete']);
				}
			} else if (this.bucketType === CD_AREA) {
				if (change.length === 1) {
					const selectItem = this.fileCatalogList[this.checkboxResult[0]];
					if (selectItem.resId) {
						this.configOptBtn(['edit', 'delete', 'move', 'share', 'download']);
					} else {
						this.configOptBtn(['edit', 'delete', 'move', 'share']);
					}
				} else if (change.length > 1) {
					this.configOptBtn(['delete', 'move']);
				}
				// if (this.underNewGroup) {
				// 	this.isUploadShow = false;
				// }
			} else if (underSpecial) {
				this.isUploadShow = false;
				if (change.length === 1) {
					const selectItem = this.fileCatalogList[this.checkboxResult[0]];
					if (selectItem.resId) {
						this.configOptBtn(['edit', 'delete', 'share', 'download']);
					} else {
						this.configOptBtn(['edit', 'delete', 'share']);
					}
				} else if (change.length > 1) {
					this.configOptBtn(['delete']);
				}
			}
			this.handleShowRightBtn();
		},
		handleShowRightBtn() {
			const change = this.checkboxResult;
			// 控制右上角按钮
			if (this.fileCatalogList.length > 0) {
				if (change.length === 0) {
					// console.log('收起');
					this.setRightBtnStatus(1);
					this.isShowOptBtns = false;
					this.isUploadShow = true;
					// this.$toast('right btn 全选');
				} else if (change.length > 0 && change.length < this.fileCatalogList.length) {
					this.isShowOptBtns = true;
					this.isUploadShow = false;
					// this.$toast('right btn 取消勾选');
					this.setRightBtnStatus(1);
				} else {
					this.isShowOptBtns = true;
					this.isUploadShow = false;
					// this.$toast('right btn 取消勾选');
					this.setRightBtnStatus(2);
				}
			} else {
				// this.$toast('right btn 隐藏');
				this.setRightBtnStatus(0);
				this.isShowOptBtns = false;
				this.isUploadShow = true;
			}
			// 最新上传之只支持修改分享
			if (this.underNewGroup) {
				this.isUploadShow = false;
			}
		},
		// status 0: 隐藏 1：全选 2：取消全选
		setRightBtnStatus(status) {
			switch (status) {
				case 0:
					this.$appApi.changeRightBtn({
						type: 'HIDE',
					});
					break;
				case 1:
					this.$appApi.changeRightBtn({
						type: 'CLICK',
						title: '全选',
						func: 'checkAll',
					});
					this.$appApi.addEventRightBtn(() => {
						this.handleAllCheck();
					}, 'checkAll');
					break;
				case 2:
					this.$appApi.changeRightBtn({
						type: 'CLICK',
						title: '取消勾选',
						func: 'uncheckAll',
					});
					this.$appApi.addEventRightBtn(() => {
						this.handleAllUncheck();
					}, 'uncheckAll');
					break;
				default:
					break;
			}
		},
		handleAllCheck() {
			this.$refs.checkGroup.toggleAll(true);
			console.log(this.checkboxResult);
		},
		handleAllUncheck() {
			this.clearCheckGroup();
		},
		configOptBtn(optArr) {
			for (let index = 0; index < this.optConfig.length; index += 1) {
				const element = this.optConfig[index];
				if (optArr.includes(element.name)) {
					element.availible = true;
				} else element.availible = false;
			}
		},
		onClickAdd() {
			this.isUploadShow = false;
			this.isShowAddBtns = true;
		},
		// 返回布尔值
		beforeRead(file) {
			console.log(file);
			const idx = file.name.lastIndexOf('.');
			if (idx === -1) {
				// this.$toast.fail('请上传CAD格式的文件！');
				this.htmlToast();
				return false;
			}
			const ext = file.name.substring(idx, file.name.length);
			if (getFileType(ext) === 'CAD') {
				return true;
			}
			// this.$toast.fail('请上传CAD格式的文件！');
			this.htmlToast();
			return false;
		},
		// 文件上传完成
		handlerAfterRead(files) {
			let fileList = [];
			if (files instanceof Array) {
				fileList = files;
			} else if (files instanceof Object) {
				fileList.push(files);
			}
			const newFileList = fileList.filter(({ file }) => validFilType(file.name));
			// console.log('newFileList', newFileList);
			this.$toast({
				duration: 0,
				type: 'loading',
				message: '文件上传中...',
				forbidClick: true,
				loadingType: 'spinner',
			});
			this.uploadFileFn(newFileList);
		},

		// 4.5 组装上传文件列表的数据
		async uploadFileFn(fileList) {
			if (!fileList || fileList.length === 0) {
				this.$toast.clear();
				return;
			}
			const that = this;
			const formData = new FormData();
			fileList.forEach(({ file }) => {
				formData.append('file', file);
			});
			const sendQuery = `?bizkey=${this.bizType}/${that.currCatDirPid}/${uuidv4()}`;
			try {
				const uploadRes = await fileupload.uploadBizMulti(
					formData,
					{
						headers: { 'content-type': 'application/x-www-form-urlencoded' },
					},
					sendQuery
				);
				console.log('upload result', uploadRes);
				if (uploadRes.code !== '30000') {
					throw new Error(uploadRes.msg);
				}
				// 组装文件名和扩展名
				uploadRes.files.forEach(file => {
					file.name = `${file.name}.${file.fileFormat}`;
				});
				const resList = await this.imptFileRes(uploadRes.files);
				console.log('----------导入结果', resList);
				this.$toast.clear();
				if (resList.length > 0) {
					this.refreshPage();
					// console.log(`导入成功=>${resList.length}`);
				}
				this.getDirList(prveParams);
				this.isShowAddBtns = false;
			} catch (ex) {
				this.$toast.clear();
				console.error('ex =>', ex);
				this.$toast.fail(ex.message);
			}
		},
		// 导入上传文件到资料库中
		async imptFileRes(files) {
			const resList = files.map(file => {
				return {
					dirId: this.currCatDirPid,
					fileId: file.id,
					bizid: uuidv4,
					biztype: file.bizkey.substr(0, 16),
					title: file.name,
					props: {
						settle_cont_checked: '0',
					},
				};
			});
			const requestParams = {
				list: resList,
				bucketId: this.customBucketId,
			};
			const imptRes = await resApi.impt(requestParams);
			if (imptRes.code !== '30000') {
				throw new Error(imptRes.msg);
			}
			return imptRes.resources;
		},
		// 文件预览
		previewFile(fileInfo) {
			const { type, bucketId, resId, title } = fileInfo;
			// todo 判断props
			// if (data.props && data.settle_from_res_id) {
			// 	restId = data.settle_from_res_id;
			// }
			const resType = getFileType(type);
			if (resType !== 'CAD') {
				this.$message.error('图纸中只支持预览CAD, 当前格式不支持预览');
				return;
			}
			const appToken = GetRequestParams().token;
			const urlLook = `${process.env.VUE_APP_PAGEURL}/res/drawing/PreviewCAD?jtype=${resType}&jbucketId=${bucketId || ''}&jresId=${resId}&token=${appToken}`;
			console.log(urlLook);

			setTimeout(() => {
				api.execScript({
					name: api.winName,
					script: `previewCadFile( '${urlLook}', '${title}')`,
				});
			}, 300);
		},
		onOversize() {
			this.$toast(`大于${20}M，请去PC端上传`);
		},

		async fetchDirList(requestParams) {
			try {
				const res = await dir.searchDirList(requestParams);
				if (res.code === '30000') {
					this.resGroupCount = res.resGroupCount;
				} else {
					// this.$toast.fail(res.msg);
					console.log(res.msg);
				}
			} catch (ex) {
				this.$toast.fail('程序异常');
				throw new Error('程序异常');
			}
		},
		//  获取合同级应用桶
		async getContAppEnsure(contId = '', appName = Constants.appName.Drawing_2D_BUCKET) {
			try {
				const resBody = await contApp.ensure({ contId, appName });
				if (resBody.code !== '30000') {
					this.$toast(resBody.msg);
					return '';
				}
				return resBody.app.bucketId;
			} catch (errMsg) {
				console.error('errMsg', errMsg);
				return '';
			}
		},
		async onClickCell(cell) {
			console.log('---------点击cell', cell);
			// 重置
			if (!cell) return;
			if (!cell.resId) {
				this.bucketType = '';
				if (cell.bucketId) {
					this.getFileCatalog(cell.dirId, cell.type, cell.sys, cell.bucketId);
				} else if (cell.dirPid && SPECIAL_NODE.includes(cell.type)) {
					this.getFileCatalog(cell.dirPid, cell.type);
				} else {
					this.getFileCatalog(cell.dirId, cell.type, cell.sys);
				}
			} else {
				this.previewFile(cell);
			}
			// 自定义目录下未分类单元格
		},
		// sys bucketId参数可能会用到
		// async getFileCatalog(dirId, type, sys = false, bucketId = '') {
		async getFileCatalog(dirId, type) {
			let resultList;
			// let params = { bucketId: this.customBucketId, depth: 1, fetchRes: true, countRes: true };
			let params = { bucketId: this.customBucketId, depth: 1, fetchRes: true, countAllRes: true };
			this.$toast({
				duration: 0,
				type: 'loading',
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
			});
			// console.log('--------getFileCatalog', type, code);
			if (type === catalogItemType.custom) {
				this.bucketType = B_AREA;
				params = { ...params };
				resultList = await this.getDirList(params);
				this.currCatDirPid = this.customBucketId;
			} else if (Number(type) === 2 || Number(type) === 1) {
				this.bucketType = CD_AREA;
				params = { dirPid: dirId, ...params };
				resultList = await this.getDirList(params);
				this.currCatDirPid = dirId;
			} else if (type === NEW_GROUP) {
				this.bucketType = NEW_GROUP;
				resultList = await this.getAllResourceFile(dirId);
				this.currCatDirPid = dirId;
				this.isUploadShow = false;
			} else if (type === NO_GROUP) {
				this.bucketType = NO_GROUP;
				params = { dirPid: dirId, ...params };
				resultList = await this.getDirList(params);
				this.currCatDirPid = dirId;
				this.isUploadShow = false;
			}
			if (SPECIAL_NODE.includes(type)) {
				this.switchUnderFlag(type);
				// 记录特殊节点所在的dirId
				this.setSpecialFlagId(dirId);
			}
			this.$toast.clear();
			this.clearSearch();
			this.showCatalogList(resultList);
			this.clearCheckGroup();
			this.showPathList();
		},
		// 沿用档宝方法，未适配图宝
		async refreshPage() {
			if (this.contId === '') {
				console.log('-----------当前无合同');
				return;
			}
			let resultList;
			let params;
			this.$toast({
				duration: 0,
				type: 'loading',
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
			});
			if (this.bucketType === NEW_GROUP) {
				resultList = await this.getAllResourceFile(this.currCatDirPid);
			} else if (this.bucketType === SYS || this.bucketType === CUSTOM) {
				params = {
					bucketId: this.customBucketId,
					depth: 1,
				};
				resultList = await this.getDirList(params);
			} else {
				params = {
					bucketId: this.customBucketId,
					dirPid: this.currCatDirPid,
					countAllRes: true,
					depth: 1,
					fetchRes: true,
				};
				resultList = await this.getDirList(params);
			}
			this.$toast.clear();
			this.clearSearch();
			this.showCatalogList(resultList);
			this.clearCheckGroup();
			this.showPathList();
		},
		// fetchRes = false
		async getDirList(params) {
			prveParams = { ...params };
			const result = await dir.list(params);
			// const result = await dir.searchDirList(params);
			try {
				if (result.code !== '30000') {
					if (result.code === '20051') {
						await this.initBucketId();
						const resList = await this.getDirList(params);
						return resList;
					}
					this.$toast(result.msg);
					return [];
				}
				// if (fetchRes)
				// 自定义目录请求结果处理（包含未分类条目）
				if (this.bucketType === B_AREA) {
					this.isUploadShow = true;
					this.isUploadBtnShow = false;
					NEW_GROUP_DIR.dirPid = this.customBucketId;
					NEW_GROUP_DIR.type = NEW_GROUP;
					const fn2 = item => item.type === 2;
					const fn1 = item => item.type === 1;
					const hasDir = result.list.some(fn1);
					NEW_GROUP_DIR.resTotal = result.resGroupCount.resTotal;
					let rootList = [NEW_GROUP_DIR, ...result.list.filter(fn2)];
					const resList = await resApi.list({ bucketId: this.customBucketId, dirId: this.customBucketId });
					if ((result.code === '30000' && resList.list.length > 0) || hasDir) {
						NO_GROUP_DIR.dirPid = this.customBucketId;
						NO_GROUP_DIR.type = NO_GROUP;
						rootList = [NEW_GROUP_DIR, NO_GROUP_DIR, ...result.list.filter(fn2)];
					}
					return rootList;
				}
				// C区
				if (this.bucketType === CD_AREA) {
					this.isUploadShow = true;
					this.isUploadBtnShow = true;
					// 从全局搜索来的 bucketId需要设置
					const resourceList = result.resource;

					if (!resourceList) return result.list;
					return [...result.list, ...resourceList];
				}
				// 未分类（自定义目录下）
				if (this.bucketType === NEW_GROUP) {
					this.isUploadShow = false;
					const fn1 = item => item.type === 1;
					const type1Items = result.list.filter(fn1);
					const resourceList = result.resource;
					if (!resourceList) return type1Items;
					return [...type1Items, ...resourceList];
				}
				// C区未分类
				if (this.bucketType === NO_GROUP) {
					const fn1 = item => item.type === 1;
					const type1Items = result.list.filter(fn1);
					const resourceList = result.resource;
					if (!resourceList) return type1Items;
					return [...type1Items, ...resourceList];
				}
				return result.list;
			} catch (err) {
				this.$toast(err);
				console.log(err);
				return [];
			}
		},
		handleNoProjCont() {
			this.isUploadShow = false;
		},
		// 初始化目录，目录未找到时调用
		async initBucketId() {
			const params = { bucketId: this.customBucketId };
			const result = await dir.createBucket(params);
			if (result.code !== '30000') {
				this.$toast(result.msg);
			}
		},
		async getAllResourceFile(dirPid) {
			const params = {
				bucketId: this.customBucketId,
				dirId: dirPid,
				fetchChilds: true,
			};
			try {
				// 先使用list，后面用listPaged优化
				const resBody = await resApi.list(params);
				if (resBody.code !== '30000') {
					this.$toast(resBody.msg);
					return [];
				}
				return resBody.list;
			} catch (err) {
				this.$toast(err);
				console.log(err);
				return [];
			}
		},
		showCatalogList(list) {
			console.log('当前bucket type: ', this.bucketType);
			// 获取图片类型文件地址， 用于图片预览
			const previewImgList = [];

			this.fileCatalogList = list.map(item => {
				// 如果是文件夹
				if (!item.resId) {
					const { dirName: title, modifiedTime, dirId, type, code, dirPid, bucketId, sort, sys, resTotal } = item;
					return { title, modifiedTime, dirId, type, code, dirPid, bucketId, sort, sys, resTotal };
				}

				// 如果是文件资料
				const { title, modifiedTime, fileId, resId, type, bucketId, sort } = item;
				if (type === 'IMAGE') {
					previewImgList.push(`${process.env.VUE_APP_BASEURL}/file/download/previewRes/${resId}`);
				}
				return { title, modifiedTime, fileId, resId, type, bucketId, sort };
			});
			this.previewImgList = previewImgList;
		},
		initPath() {
			this.mainPathList = [];
		},
		async showPathList() {
			const params = { bucketId: this.customBucketId, dirIds: [this.currCatDirPid] };
			const resMap = await dir.multiGetPath(params);
			if (Object.hasOwnProperty.call(resMap.map, this.currCatDirPid)) {
				const result = resMap.map[this.currCatDirPid];
				this.mainPathList = [...this.deepDirPathName(result)];
				// console.log(this.mainPathList);
			}
		},
		// 递归获取目录路径名称
		deepDirPathName(oDirData) {
			const that = this;
			if (!oDirData) {
				return '';
			}
			let pathItems = [];
			// eslint-disable-next-line prefer-const
			let { dirName, type, dirId, code, sys } = oDirData;
			// console.log('------路径递归节点pid', oDirData);
			// 根目录名称特殊处理
			if (dirId === this.customBucketId) {
				dirName = '全部';
				type = catalogItemType.custom;
			}
			pathItems = [{ dirName, type, dirId, code, sys }];
			// 自定义目录下 加未分类
			if (dirId === this.customBucketId && this.underNewGroup) {
				NEW_GROUP_DIR_PATH.dirPid = this.customBucketId;
				pathItems.push(NEW_GROUP_DIR_PATH);
			}
			// B区自定义目录后加未分类 再剔除multiGetPath中返回的“系统目录”
			else if (dirId === this.customBucketId && this.underNoGroup) {
				// NO_GROUP_DIR_PATH.dirPid = this.currCatDirPid;
				if (dirId === this.specialFlagDirId) {
					NO_GROUP_DIR_PATH.dirPid = dirId;
					pathItems.push(NO_GROUP_DIR_PATH);
				}
			}
			if (oDirData.children && oDirData.children.length > 0) {
				pathItems = pathItems.concat([...that.deepDirPathName(oDirData.children[0])]);
			}
			// console.log('--------路径是：', ...pathItems);
			return pathItems;
		},
		onClickPath(idx) {
			// 重置
			this.bucketType = [];
			const pathItem = this.mainPathList[idx];
			// 特殊路径switch
			if (pathItem.type && SPECIAL_NODE.includes(pathItem.type)) {
				this.switchUnderFlag(pathItem.type);
			}
			// 点击路径节点为：系统目录、自定义目录、B区目录时，重置underFlag
			if (pathItem.type === 3 || pathItem.sys || pathItem.type === SYS || pathItem.type === CUSTOM) {
				this.switchUnderFlag();
			}
			if (SPECIAL_NODE.includes(pathItem.type)) {
				this.getFileCatalog(pathItem.dirPid, pathItem.type, pathItem.sys);
			} else {
				this.getFileCatalog(pathItem.dirId, pathItem.type, pathItem.sys);
			}
		},
		resTypeToIcon(type) {
			return typeToIcon(type);
		},
		onFocus() {
			this.cacheSearchValue = this.searchValue;
		},
		async onSearch() {
			if (this.searchValue === '') {
				return;
			}
			const params = {
				bucketId: this.customBucketId,
				dirPid: this.currCatDirPid,
				fetchRes: true, // 查询资料
				// depth: 1,
				groupCount: true,
				countRes: true,
				countDir: true,
				keyWord: this.searchValue,
			};
			this.$toast({
				duration: 0,
				type: 'loading',
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
			});
			this.fileCatalogList = [];
			const resBody = await dir.searchDirList(params);
			if (resBody.code !== '30000') {
				this.$toast('搜索错误！');
				this.searchResultCount = 0;
				return;
			}
			// 清除状态
			this.$toast.clear();
			this.searchShow = true;
			if (resBody.searchs.length === 0) {
				this.searchResultCount = 0;
				return;
			}
			// cell中的path处理函数
			const pathFn = path => {
				if (!path) return '';
				const pathArr = path.split('>');
				pathArr[0] = '全部';
				const len = pathArr.length;
				if (len < 3) {
					return `位置：${pathArr[0]} >`;
				}
				return `位置：${pathArr[len - 3]} - ${pathArr[len - 2]} >`;
			};
			// 筛选D区（type为1）
			let searchList = [];
			searchList = resBody.searchs.filter(item => {
				return item.dirType === 1 || item.exptType === 'RES';
			});
			if (!searchList) {
				this.searchResultCount = 0;
			} else {
				this.searchResultCount = searchList.length;
			}
			// 修改对象结构+文件夹和资料分类排序
			const dirs = [];
			const ress = [];
			searchList.forEach(item => {
				if (item.exptType === 'DIR') {
					dirs.push({ title: item.name, dirId: item.dirId, type: item.dirType, path: pathFn(item.path), dirPid: item.dirPid, bucketId: item.bucketId, sys: item.sys });
				} else if (item.exptType === 'RES') {
					ress.push({ title: item.name, dirId: item.id, resId: item.id, type: item.type, path: pathFn(item.path), dirPid: item.dirId, bucketId: item.bucketId });
				}
			});
			this.fileCatalogList = [...dirs, ...ress];
			// 显示文件目录
			// this.fileCatalogList = searchList;
		},
		handleClearSearch() {
			this.clearSearch();
			this.refreshPage();
		},
		clearCheckGroup() {
			this.$refs.checkGroup.toggleAll(false);
			this.checkboxResult = [];
		},
		clearSearch() {
			this.searchShow = false;
			this.searchValue = '';
		},
		onClickCellPath(cell) {
			console.log('-----------点击搜索cell', cell);
			if (!cell.bucketId) return;
			// type参数传2，因为D区的上级dir的type是2
			this.getFileCatalog(cell.dirPid, 2, false, cell.bucketId);
		},
		// 切换under查看全部、未分类
		switchUnderFlag(status) {
			if (status === NEW_GROUP) {
				this.underAllNode = false;
				this.underNewGroup = true;
				this.underNoGroup = false;
			} else if (status === NO_GROUP) {
				this.underAllNode = false;
				this.underNewGroup = false;
				this.underNoGroup = true;
			} else {
				this.underAllNode = false;
				this.underNewGroup = false;
				this.underNoGroup = false;
			}
		},
		// 修改特殊节点dirId方法
		setSpecialFlagId(id) {
			this.specialFlagDirId = id;
		},
		htmlToast() {
			this.$toast({
				message: `<div><i class="iconfont icon icon-shuomingwenzi" style="color:rgb(255,255,255);font-size:16px;margin-right:5px;transform:rotate(180deg);-webkit-transform:rotate(180deg);display:inline-block"></i><span>请上传CAD格式的文件！</span></div>`,
				type: 'html',
			});
		},
		testToast(str) {
			this.$toast(str);
		},
	},
};
</script>

<style lang="less" scoped>
.company {
	/deep/ .van-field__control {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 30px;
		// font-size: 0.6rem;
	}
	/deep/ .van-cell__title {
		font-size: 30px;
		// font-size: 0.6rem;
	}
	/deep/ .van-field__label {
		margin-right: 2px;
	}
}
.filemain {
	background: #fff;
	overflow: hidden;
	height: 100vh;
	.flex-between {
		padding: 0px;
		.flex1 {
			padding: 22px 32px 18px 32px;
		}
	}
	.upload-view {
		position: relative;
		// position: absolute;
		bottom: 0px;
		width: 100%;
		text-align: center;
		.add-btn {
			position: absolute;
			right: 100px;
			top: -180px;
		}
	}
	.opt-btns-view {
		display: flex;
		position: absolute;
		// bottom: 10px;
		width: 100%;
		text-align: center;
		> div {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: justify;
			flex: 1;
			padding: 0 10px;
			height: 100%;
		}
		.opt-btn {
			// border-radius: 10px;
			border: 0;
			// width: 200px;
			.btn-icon {
				display: block;
				margin-bottom: 8px;
			}
		}
		.van-button--normal {
			font-size: 26px;
			padding: 0;
		}
	}
	.opt-view {
		height: 130px;
	}
	.add-view {
		height: 180px;
	}
}
/deep/ .van-search > .van-search__content {
	border-radius: 10px;
	background: #f3f4f6;
}

.mainauto {
	width: 100%;
	overflow: hidden;
	height: 100%;
}
.u-gap {
	width: 100%;
	height: 20px;
	background: #f3f3f3;
}
.file-block {
	width: 100%;
	height: calc(100% - 200px);
	// box-shadow: 1px 0 5px #747171d8;
	overflow: auto;
	.result-wrap {
		background: #fff;
		height: 62px;
		.result-part {
			padding: 30px 0px 0px 30px;
			height: 32px;
			line-height: 32px;
			text-align: left;
			font-size: 28px;
			white-space: nowrap;
			font-weight: bold;
		}
	}
	// .checkbox-group {
	// 	overflow-y: auto;
	// 	height: calc(100% - 62px);
	// }
}
.cell-group {
	// overflow: auto;
	overflow-y: auto;
	padding: 0;
	border-radius: 0.2rem;
}

.cell-title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 1.5rem;
	border-bottom: 1px solid #ccc;
}
.cell-title-left {
	font-size: 0.65rem;
	font-weight: 600;
}

.cell-item {
	align-items: center;
	height: 120px;
	border-bottom: 1px solid #ccc;
	/deep/ .van-cell__value {
		display: flex;
		flex-flow: nowrap row;
	}
}
.cell-item-up {
	align-self: center;
	width: 90%;
}

.cell-item-icon {
	display: inline-block;
	text-align: center;
	height: 96px;
	line-height: 96px;
}
.cell-item-icon .iconfont {
	color: #409eff;
}

.cell-item-wrap {
	flex: 1;
	margin-left: 0.5rem;
	overflow: hidden;
}

.cell-item--title {
	// height: 0.8rem;
	// line-height: 0.6rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 26px;
	padding-left: 0.2rem;
}

.cell-item--desc {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24px;
	color: #999;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-left: 0.2rem;
	line-height: 22px;
	.item-span--desc {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.cell-item--desc-right {
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
}
.cell-item--desc-right span {
	display: block;
	width: 40px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.edit-popup {
	height: 380px;
	width: 80%;
	overflow: hidden;
	/deep/ .van-field__label {
		width: 80px;
		margin-right: 5px;
		color: #000;
	}
	/deep/ .van-field--error {
		::placeholder {
			color: #c8c9cc;
		}
	}
	/deep/ .van-field--error .van-field__control {
		color: #323233;
	}

	// /deep/ .van-field__value {
	// 	border-style: solid;
	// 	border: 0px;
	// 	border-bottom: 1px;
	// 	border-color: #111;
	// }
	.edit-field {
		margin-top: 40px;
	}
	.van-dialog__footer {
		display: flex;
		overflow: hidden;
		position: fixed;
		width: 100%;
		bottom: -1px;
	}
	.edit-btn {
		flex: 1;
	}
	.edit-submit {
		/deep/ .van-button__text {
			color: #1989fa;
		}
	}
}
.pop-title {
	margin-top: 35px;
	margin-bottom: 20px;
	text-align: center;
	font-size: 30px;
	line-height: 40px;
	font-weight: bold;
}
.pop-desc {
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 40px;
	line-height: 26px;
	font-size: 24px;
	color: #626572;
}
.move-propup-hd {
	width: 100%;
	height: 40px;
	margin-top: 5px;
}
.move-propup-container {
	height: calc(100% - 310px);
	max-height: calc(100% - 310px);
	width: 100%;
	margin-top: 20px;
	box-sizing: border-box;
	box-shadow: 1px 0 5px #ccc;
	// overflow: hidden scroll;
	overflow-x: hidden;
	// .cell-item {
	// 	height: auto;
	// }
}
.btns {
	padding: 10px 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.header-title {
	height: 50px;
	line-height: 30px;
	text-align: center;
	font-size: 34px;
	padding: 20px 20px;
}

.expire-row {
	display: flex;
	align-items: center;
	height: 50px;
}

.expire-col {
	width: 50%;
	font-size: 30px;
}

.expire-col-left {
	padding-left: 30px;
}

.expire-col-right {
	padding-left: 30px;
}

input[name='expTime'] {
	margin-right: 5px;
}

.end_date {
	border: 1px solid #ddd;
	height: 50px;
	line-height: 50px;
	padding-left: 20px;
	width: 100px;
}

.operate-btn {
	display: flex;
	align-items: center;
	justify-content: space-around;
	position: absolute;
	width: 100%;
	bottom: 40px;
}
</style>
