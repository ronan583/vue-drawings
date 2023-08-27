<template>
	<div class="type-wrap">
		<div class="type-part" ref="wrapper">
			<ul class="type-ul" ref="typeUl">
				<li class="type-item" v-for="item of fileTypeList" :key="item.id">
					<div class="type-img">
						<van-icon class="iconfont catalog-icon" class-prefix="icon" :name="item.iconName" size="30px" :color="item.color" />
					</div>
					<div class="type-text type-text__type">{{ item.text }}</div>
					<div class="type-text type-text__count">{{ `${getFileCount(item.fieldName)}` }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FileTypeList',
	props: {
		resGroupCount: {
			default: () => {
				return {};
			},
			type: Object,
		},
	},
	// watch: {
	// 	resGroupCount: {
	// 		handler(oValue) {},
	// 		deep: true,
	// 	},
	// },

	data() {
		return {
			fileTypeList: [
				{ id: '1', name: 'gongdan', text: '文件', count: '0', fieldName: 'resTotal', iconName: 'Icon-Type-File', color: 'rgb(247, 192, 11)' },
				// { id: '2', name: 'folder', text: '文件夹', count: '0', fieldName: 'dirTotal' , iconName: 'jzb-app-excel'},
				{ id: '3', name: 'picture', text: '图片', count: '0', fieldName: 'totalImage', iconName: 'Icon-Type-Img', color: 'rgb(142, 205, 7)' },
				{ id: '4', name: 'word', text: 'Word', count: '0', fieldName: 'totalWord', iconName: 'Icon-Type-Word', color: 'rgb(25, 137, 249)' },
				{ id: '5', name: 'excel', text: 'Excel', count: '0', fieldName: 'totalExcel', iconName: 'jzb-app-excel2', color: 'rgb(19, 170, 87)' },
				{ id: '6', name: 'ppt', text: 'PPT', count: '0', fieldName: 'totalPpt', iconName: 'jzb-app-ppt', color: 'rgb(220, 103, 74)' },
				{ id: '7', name: 'pdf', text: 'PDF', count: '0', fieldName: 'totalPdf', iconName: 'Icon-Type-Pdf', color: 'rgb(237, 68, 41)' },
				{ id: '8', name: 'audio', text: '音频', count: '0', fieldName: 'totalAudio', iconName: 'Icon-Type-music', color: 'rgb(238, 86, 195)' },
				{ id: '9', name: 'video', text: '视频', count: '0', fieldName: 'totalVideo', iconName: 'jzb-app-video2', color: 'rgb(128, 100, 240)' },
				{ id: '10', name: 'other', text: '其它', count: '0', fieldName: 'totalUnkown', iconName: 'jzb-app-other', color: 'rgb(25, 137, 249)' },
			],
		};
	},
	computed: {
		// getFileCount(fType) {
		// 	if (!fType) {
		// 		return 'UNNOKW';
		// 	}
		// 	const resCount = this.resGroupCount[fType] || 0;
		// 	return resCount > 9999 ? '9999+' : resCount;
		// },
	},
	methods: {
		getFileCount(fType) {
			if (!fType) {
				return 'UNNOKW';
			}
			if (!this.resGroupCount) return '-';
			const resCount = this.resGroupCount[fType] || 0;

			return resCount > 9999 ? '9999+' : resCount;
		},
	},
};
</script>

<style lang="less" scoped>
.type-wrap {
	height: 170px;
	width: 100vw;
	margin: auto;
	margin-bottom: 5px;
	background: #fff;
	overflow: auto hidden;
	// box-shadow: 1px 0 5px #747171d8;
	box-sizing: border-box;

	.type-part {
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		text-align: center;
		font-size: 26px;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		.type-ul {
			white-space: nowrap;
			height: 100%;
			overflow-x: auto;
			overflow-y: hidden;
			.type-item {
				position: relative;
				display: inline-block;
				height: 100%;
				margin: 0 0.15rem;
				.type-img {
					overflow: hidden;
					width: 96px;
					.img {
						width: 100%;
					}
				}
				.type-text {
					// margin-top: 0.05rem;
					line-height: 0.4rem;
					font-size: 24px;
					margin-bottom: 5px;
					height: 0.4rem;
				}
				.type-text__type {
					color: #626572;
				}
				.type-text__count {
					color: #a2a6b1;
				}
			}
		}
	}
}
</style>
