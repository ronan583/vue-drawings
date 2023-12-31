<template>
	<div ref="scroll" class="scroll" :style="{ top: top, bottom: bottom }">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
	props: {
		/**
		 * 1-滚动的时候会派发scroll事件，会截流。
		 * 2-滚动的时候实时派发scroll事件，不会截流。
		 * 3-除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
		 */
		probeType: {
			type: Number,
			default: 3,
		},
		//  点击列表是否派发click事件
		click: {
			type: Boolean,
			default: true,
		},
		//  是否开启横向滚动
		scrollX: {
			type: Boolean,
			default: false,
		},
		//  是否派发滚动事件
		listenScroll: {
			type: Boolean,
			default: false,
		},
		//  列表的数据
		data: {
			type: Array,
			default: null,
		},
		/** * 是否派发滚动到底部的事件，用于上拉加载 */
		pullup: {
			type: Boolean,
			default: false,
		},
		/** * 是否派发顶部下拉的事件，用于下拉刷新 */
		pulldown: {
			type: Boolean,
			default: false,
		},
		/** * 是否派发列表滚动开始的事件 */
		beforeScroll: {
			type: Boolean,
			default: false,
		},
		/** * 当数据更新后，刷新scroll的延时。 */
		refreshDelay: {
			type: Number,
			default: 20,
		},
		top: {
			type: String,
			default: '0px',
		},
		bottom: {
			type: String,
			default: '0px',
		},
	},
	mounted() {
		// 保证在DOM渲染完毕后初始化better-scroll
		setTimeout(() => {
			this.initScroll();
		}, 20);
	},
	methods: {
		initScroll() {
			if (!this.$refs.scroll) {
				return;
			}
			// better-scroll的初始化
			this.scroll = new BScroll(this.$refs.scroll, {
				useTransition: false,
				probeType: this.probeType,
				pullUpLoad: this.pullup,
				pullDownRefresh: this.pulldown ? { threshold: 50, stop: 50 } : this.pulldown,
				click: this.click,
				scrollX: this.scrollX,
			});
			// 是否派发滚动事件
			if (this.listenScroll) {
				const me = this;
				this.scroll.on('scroll', pos => {
					me.$emit('scroll', pos);
				});
			}
			// 是否派发滚动到底部事件，用于上拉加载
			if (this.pullup) {
				this.scroll.on('pullingUp', () => {
					// 滚动到底部
					if (this.scroll.y <= this.scroll.maxScrollY + 50) {
						this.$emit('pullUpEnd');
					}
				});
			}
			// 是否派发顶部下拉事件，用于下拉刷新
			if (this.pulldown) {
				this.scroll.on('pullingDown', () => {
					// 下拉动作
					this.$emit('pullDownEnd');
				});
			}
			// 是否派发列表滚动开始的事件
			if (this.beforeScroll) {
				this.scroll.on('beforeScrollStart', () => {
					this.$emit('beforeScroll');
				});
			}
		},
		disable() {
			/* eslint-disable */
			// 代理better-scroll的disable方法
			this.scroll && this.scroll.disable();
		},
		enable() {
			// 代理better-scroll的enable方法
			this.scroll && this.scroll.enable();
		},
		refresh() {
			// 代理better-scroll的refresh方法
			this.scroll && this.scroll.refresh();
		},
		scrollTo(x, y, time) {
			this.scroll && this.scroll.scrollTo(x, y, time);
		},
		// 上拉加载更多数据加载完成
		finishPullUp() {
			this.scroll && this.scroll.finishPullUp();
		},
		// 下拉刷新数据加载完成
		finishPullDown() {
			this.scroll && this.scroll.finishPullDown();
		},
	},
	watch: {
		// 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
		data() {
			setTimeout(() => {
				this.refresh();
			}, this.refreshDelay);
		},
	},
};
</script>
<style lang="less" scoped>
.scroll {
	position: absolute;
	left: 0;
	right: 0;
	overflow: hidden;
}
</style>
