import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/index',
		name: 'index',
		component: () => import('@/views/Index.vue'),
	},
	// 图宝首页
	{
		path: '/fileMain',
		name: 'main',
		component: () => import('@/views/fileMain/index.vue'),
	},
];
const router = new VueRouter({
	mode: 'history',
	base: '/drawing',
	routes,
});
export default router;
