<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
import { GetRequestParams } from '@/utils/utils';
import { user } from '@/api/api';

export default {
	name: 'app',
	data() {
		return {
			// 用户信息
			userInfo: {},
			userid: undefined,
			comid: undefined,
		};
	},
	watch: {
		$route() {
			this.userid = GetRequestParams().userid;
			this.comid = GetRequestParams().comid;
		},
		comid() {
			this.getUser();
		},
	},
	provide() {
		return {
			getUserInfo: () => {
				return this.userInfo;
			},
		};
	},

	methods: {
		// 获取底层用户信息
		getUser() {
			if (this.userid || this.comid) {
				// user.getUser({ userId: this.userid.toLowerCase(), comId: this.comid.toLowerCase() }).then(res => {
				user.getUser({ userId: this.userid, comId: this.comid }).then(res => {
					if (res.code === '30000') {
						this.userInfo = { ...res };
					}
				});
			}
		},
	},
};
</script>
<style lang="less">
.page {
	height: 100vh;
	display: flex;
	flex-direction: column;
	main {
		overflow: auto;
		flex: 1;
		position: relative;
	}
}
</style>
