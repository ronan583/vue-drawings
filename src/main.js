import Vue from 'vue';
//  全局注册指令 -- 非必须
/* eslint-disable */
import 'lib-flexible';
import appApi from './utils/appApi';
import App from './App.vue';
import router from './router';
import '@/assets/style/main.less';
// 引入字体图标库
import '@/assets/font/iconfont.css';


Vue.config.productionTip = false;
Vue.prototype.$appApi = appApi;
Vue.prototype.$bus = new Vue();
new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
