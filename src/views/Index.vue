<template>
	<div class="index">
		<!-- <scroll class="scroll">
			<ul v-for="(item, index) in moduleData" :key="index">
				<li>
					<van-collapse v-model="item.activeNames" :is-link="false" :border="false">
						<van-collapse-item :title="item.title" name="1">
							<div v-for="(pagesItem, pagesIndex) in item.pages" :key="pagesIndex" class="pagesItem" @click="goRouter(pagesItem)">
								<van-image :src="pagesItem.icon" />
								<p>{{ pagesItem.name }}</p>
							</div>
						</van-collapse-item>
					</van-collapse>
				</li>
			</ul>
		</scroll> -->
		<router-view></router-view>
	</div>
</template>

<script>
/* eslint-disable */
import scroll from '@/components/scroll.vue';
import { auth } from '@/api/api';
const fileMainPath = '/fileMain';
export default {
	data() {
		return {
			querys: '',
			// username: 'zwy-002',
			// username: 'zjjf',
			// username: '2022031085572334',
			// username: 'hbcs-fj',
            // username: '20220407978',
            username: 'jzb0945',
            uid: 'jzb0945',
			// username: 'hnyjh-yz-01',
			password: 'jzb1234',
			loading: true,
			msg: '',
		};
	},
	components: {
		scroll,
	},
	created() {
		console.log('标识最新');
		if (process.env.VUE_APP_CURRENTMODE === 'development' || !this.$route.query.isApp) {
			this.login();
		} else {
			this.querys = {
				userid: this.$route.query.userid,
				comid: this.$route.query.comid,
				token: this.$route.query.token,
				isApp: this.$route.query.isApp,
			};
		}
		if (this.$route.query.isApp) {
			this.$nextTick(() => {
				this.$appApi.setTitle('合同管理');
				this.$appApi.changeRightBtn({
					type: 'HIDE',
				});
			});
		}
	},
	methods: {
		login() {
			auth.loginByPwd({
				username: this.username,
				// uid: this.uid,
				password: this.password,
			})
				.then(res => {
					if (res.code === '30000') {
						this.querys = {
							userid: res.userId,
							comid: res.comId,
							token: res.token,
							isApp: this.$route.query.isApp,
						};
						this.loading = false;
						this.goRouter();
					} else {
						this.loading = true;
						this.msg = res.msg;
					}
				})
				.catch(() => {
					this.loading = true;
					this.msg = '登录接口出现错误，找后台处理';
				});
		},
		goRouter() {
			this.$router.push({ path: fileMainPath, query: this.querys });
		},
	},
};
</script>
<style lang="less" scoped>
// .index {
// 	.scroll {
// 		background: rgb(247, 247, 247);
// 		ul {
// 			padding: 20px 20px 0 20px;
// 			li {
// 				background: #fff;
// 				border-radius: 10px;
// 				/deep/ .van-collapse-item__title {
// 				}
// 				/deep/ .van-collapse-item__title::after {
// 					display: none !important;
// 				}
// 				/deep/.van-cell {
// 					border-radius: 10px;
// 				}
// 				/deep/ .van-collapse-item__content {
// 					display: flex;
// 					flex-wrap: wrap;
// 					padding: 0 0 20px 0;
// 					border-radius: 0 0 10px 10px;
// 					border-top: 1px solid #ebedf0;
// 					.pagesItem {
// 						width: 25%;
// 						text-align: center;
// 						font-size: 14px;
// 						color: #333;
// 						margin-top: 20px;
// 						p {
// 							margin-top: 10px;
// 							font-size: 24px;
// 						}
// 						.van-image {
// 							width: 100%;
// 							// text-align: center;
// 							display: flex;
// 							justify-content: center;
// 							img {
// 								width: 35%;
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 		ul:last-child {
// 			padding-bottom: 20px;
// 		}
// 	}
// }
</style>
