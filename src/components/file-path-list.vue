<template>
	<div class="path-wrap">
		<div class="path-part">
			<span v-for="(item, index) of list" :key="item.dirId" class="path-span">
				<span @click="$emit('click', index)" :class="{ 'path-last-span': index > 0 && list.length === index + 1 }">{{ item.dirName }}</span>
				<!-- <span class="path-span" v-show="list.length - 1 > index">{{ separator }}</span> -->
				<van-icon class="iconfont" v-show="list.length - 1 > index" class-prefix="icon" name="jzb-app-pointsto" size="12px" color="rgb(172, 171, 180)" style="margin-left:5px " />
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FilePathList',
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			},
		},
		separator: { type: String, default: '>' },
	},
};
</script>

<style scoped lang="less">
.path-wrap {
	width: 100vw;
	background: #fff;
	::-webkit-scrollbar {
		display: none;
	}
	.path-part {
		padding: 15px 32px;
		height: 32px;
		line-height: 32px;
		overflow: auto;
		text-align: left;
		font-size: 28px;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		display: flex;
		align-items: center;
		.path-span {
			padding: 0;
			margin: 0 2px;
			color: black;
		}
	}
	.path-span:nth-of-type(1) {
		font-weight: 600;
	}
	.path-last-span {
		color: #1989f9;
	}
}
</style>
