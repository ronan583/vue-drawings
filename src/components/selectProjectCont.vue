<template>
	<div class="selectProject">
		<van-field v-model="projectFieldValue" class="company" is-link readonly label="项目" placeholder="暂无项目" @click="showProjectCascader" />
		<van-popup v-model="projectShow" round position="bottom">
			<!-- :options="companyOptions" -->
			<van-cascader
				v-model="cascaderProjectValue"
				title="请选择项目"
				:options="projectOption"
				:field-names="projFiledName"
				active-color="#1989fa"
				@close="projectShow = false"
				@finish="onProjectFinish"
			/>
		</van-popup>
		<div class="contbox">
			<van-field class="lastField" v-model="contFieldValue" is-link readonly label="合同" placeholder="暂无合同" @click="showContCascader" />
		</div>
		<van-popup v-model="contShow" round position="bottom">
			<van-cascader v-model="cascaderContValue" title="请选择合同" :options="contOptions" :field-names="contFieldNames" active-color="#1989fa" @close="contShow = false" @finish="onContFinish" />
		</van-popup>
	</div>
</template>

<script>
import { cacheSelect, GetRequestParams } from '@/utils/utils';
import { COM_APP_NAME } from '@/utils/constants';
import { project, contSettle } from '@/api/project';
import { net } from '@/api/net';

export default {
	data() {
		return {
			// 公司选择弹窗显隐
			projectShow: false,
			// 公司选择展示值
			projectFieldValue: '',
			// 公司选择值
			cascaderProjectValue: '',
			projFiledName: {
				text: 'projName',
				value: 'projId',
			},
			contFieldNames: {
				text: 'cont_name',
				value: 'cont_id',
			},
			// 缓存的公司id是否存在公司接口数据中
			isCompanyExist: false,
			// 公司选择值缓存
			isCompanyCache: '',
			// 项目选择弹窗显隐
			contShow: false,
			// 项目选择展示值
			contFieldValue: '',
			// 项目选择值
			cascaderContValue: '',
			// 项目选择数据
			contOptions: [],
			// 公司选择值缓存
			isProjectCache: '',
			projectOption: [],
		};
	},
	props: {
		isLoadMask: {
			type: Boolean,
			default: true,
		},
		iscompany: {
			type: Boolean,
			default: false,
		},
		isproject: {
			type: Boolean,
			default: true,
		},
	},
	computed: {},
	watch: {
		async cascaderContValue() {
			let currCont = null;
			if (this.contOptions.length > 0) {
				currCont = this.contOptions.find(item => {
					return this.cascaderContValue === item.cont_id;
				});
			}
			if (!currCont) {
				this.$emit('contChange', {});
				return;
			}
			if (currCont.cont_id) {
				this.$emit('contChange', { contId: currCont.cont_id.toUpperCase() });
			}
			// 判断合同是否为结算合同
			// if (currCont.settle_bucket_id) {
			// 	this.$emit('contChange', {
			// 		contBucketId: currCont.settle_bucket_id.toUpperCase(),
			// 		contId: currCont.cont_id.toUpperCase(),
			// 	});
			// } else {
			// 	const result = await this.setContSettle(currCont.cont_id);
			// 	if (result.code === '30000' && result.settleBucketId) {
			// 		this.$emit('contChange', {
			// 			contBucketId: result.settleBucketId.toUpperCase(),
			// 			contId: currCont.cont_id.toUpperCase(),
			// 		});
			// 	}
			// }
		},
	},

	async created() {
		// this.getCompanyData();
		this.curiscompany = this.iscompany;
		this.getProjectList();
	},
	methods: {
		async setContSettle(contId) {
			if (!contId) {
				this.$toast('请选择合同');
				return '';
			}

			this.$toast({
				type: 'loading',
				message: '正在设置结算合同...',
				forbidClick: true,
				loadingType: 'spinner',
			});

			const requestParams = {
				contId,
				synComTemplate: { comId: GetRequestParams().comid, sourceAppName: COM_APP_NAME, targetAppName: 'sysDirCustomBucketId' },
			};
			const response = await contSettle.settle(requestParams);
			this.$toast.clear();
			if (response.code !== '30000') {
				this.$toast(response.msg);
				this.$emit('contChange', {});
			}
			// 刷新合同列表
			this.getContractList();
			return response;
		},
		// 项目选择完成
		onProjectFinish({ selectedOptions }) {
			console.log('-----选择项目', selectedOptions);
			this.projectShow = false;
			this.projectFieldValue = selectedOptions[selectedOptions.length - 1].projName;
			this.cascaderProjectValue = selectedOptions[selectedOptions.length - 1].projId;
			// storage.setLocalStorage 方法会带引号，与getLocalProjectName冲突
			localStorage.setItem('JZB_PROJECT_ID', selectedOptions[selectedOptions.length - 1].projId);
			localStorage.setItem('JZB_PROJECT_NAME', selectedOptions[selectedOptions.length - 1].projName);
			if (this.isCompanyCache !== this.cascaderProjectValue) {
				if (this.isLoadMask) {
					// this.$toast({
					// 	duration: 0,
					// 	type: 'loading',
					// 	message: '加载中...',
					// 	forbidClick: true,
					// 	loadingType: 'spinner',
					// });
				}
				// this.getProjectData();
				this.getContractList();
			}
			this.isCompanyCache = this.cascaderProjectValue;
		},
		// 项目选择完成
		onContFinish({ selectedOptions }) {
			this.contShow = false;
			this.contFieldValue = selectedOptions[selectedOptions.length - 1].cont_name;
			localStorage.setItem('JZB_CONTRACT_ID', selectedOptions[selectedOptions.length - 1].cont_id);
			localStorage.setItem('JZB_CONTRACT_NAME', selectedOptions[selectedOptions.length - 1].cont_name);
			if (this.isProjectCache !== this.cascaderContValue) {
				if (this.isLoadMask) {
					// this.$toast({
					// 	duration: 0,
					// 	type: 'loading',
					// 	message: '加载中...',
					// 	forbidClick: true,
					// 	loadingType: 'spinner',
					// });
				}
			}
			this.isProjectCache = this.cascaderContValue;
		},
		getProjectList() {
			const params = { comId: this.$route.query.comid, userId: this.$route.query.userid };
			project.listBrief(params).then(res => {
				if (res.code === '30000') {
					if (res.list.length === 0) {
						return;
					}
					this.projectOption = res.list;
					const projId = cacheSelect.getLocalProjectName(res.list, 'projId', 'JZB_PROJECT_ID');
					const proj = res.list.find(item => {
						return item.projId === projId;
					});
					this.cascaderProjectValue = proj.projId;
					this.projectFieldValue = proj.projName;
					cacheSelect.setLocalProjectName(proj.projName);
					// if (isLoadCont) {
					this.getContractList();
					// }
				} else {
					this.$toast(res.msg);
				}
			});
		},
		async getContractList() {
			// showLoading();
			// isgenerator=> 1:查询结算合同
			const params = `projid=${this.cascaderProjectValue}&isgenerator=0&userid=${this.$route.query.userid}`;
			const res = await net.ProjContContract(params); // 获取结算合同
			// hideLoading();
			if (res.rows.length > 0) {
				this.contOptions = res.rows;
				const contId = cacheSelect.getLocalProjectName(res.rows, 'cont_id', 'JZB_CONTRACT_ID');
				// console.log('----rows', res.rows);
				const cont = res.rows.find(item => {
					return item.cont_id === contId;
				});
				localStorage.setItem('JZB_CONTRACT_ID', cont.cont_id);
				localStorage.setItem('JZB_CONTRACT_NAME', cont.cont_name);
				this.contFieldValue = cont.cont_name;
				this.cascaderContValue = cont.cont_id;
			} else {
				this.cascaderContValue = '';
				this.contFieldValue = '';
				this.contOptions = [];
			}
		},
		// 显示选择公司弹窗
		showProjectCascader() {
			if (this.projectOption.length > 0) {
				this.projectShow = true;
			}
		},
		// 显示项目选择弹窗
		showContCascader() {
			if (this.contOptions.length > 0) {
				this.contShow = true;
			}
		},
	},
};
</script>

<style lang="less" scoped>
.selectProject {
	border-bottom: 1px solid #f1f1f1;
	/deep/.van-field {
		padding: 10px 34px;
		.van-field__label {
			width: 80px;
			color: #626572;
		}
	}
	// /deep/ .van-field__control {
	// 	text-align: right;
	// }
	/deep/.van-cell::after {
		left: 20px;
		right: 20px;
	}
	/deep/.van-tabs__line {
		width: 200%;
	}
	.lastField::before {
		position: absolute;
		box-sizing: border-box;
		content: ' ';
		pointer-events: none;
		right: 20px;
		bottom: 0;
		left: 20px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	.contbox .van-cell::after {
		border-bottom: none !important;
	}
	.contbox {
		position: relative;
		// .simple {
		// 	position: absolute;
		// 	top: 16px;
		// 	width: 0.66667rem;
		// 	right: 60px;
		// 	color: #1989fa;
		// }
	}
	.company {
		transition: 0.2s ease-out;
		/deep/.van-field__control {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.lastField {
		/deep/.van-field__control {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.hdcompany {
		height: 0;
		padding: 0 20px;
		visibility: hidden;
	}
}
</style>
