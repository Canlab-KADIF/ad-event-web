<template>
	<div>
		<div class="row border-bottom white-bg dashboard-header">
			<div class="col-lg-12">
				<div id="statView" class="row m-t-sm">
					<div class="col-lg-6">
						<div id="chart">
							<!-- <LineChart
								:chart-options="dailyChartOptions"
								:chart-data="dailyChartData"
								:height="height"
							/> -->
							<LineChart
								:chart-options="dailyChartOptions"
								:chart-data="dailyChartData"
								:height="height"
							/>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="row">
							<div class="col-xs-6">
								<ul class="stat-list">
									<li class="vistits-mainTotal text-right">
										<p class="text-info">
											<small>진행상태 전체</small><br />
											<span id="visitTotal">{{ total | comma }}</span>
										</p>
									</li>
									<template>
										<li v-for="item in totalProgressList" :key="item.codeValue">
											<p class="no-margins vistits-main">
												<small>{{ item.progressNm }}</small>
												<span id="pageToday" class="pull-right">{{ item.progressCount }}</span>
											</p>
											<div class="progress progress-mini active">
												<div
													id="pageTodayProgress"
													class="progress-bar progress-bar-striped"
													:class="item.progressClass"
													:data-transitiongoal="item.progressRate"
													:aria-valuenow="item.progressRate"
													:style="`width: ${item.progressRate}%`"
												>
													{{ item.progressRate }}%
												</div>
											</div>
										</li>
									</template>
								</ul>
							</div>
							<div class="col-xs-6">
								<ul class="stat-list">
									<li class="vistits-mainTotal text-right">
										<p class="text-danger">
											<small>파손종류 전체</small><br />
											<span id="pageTotal">{{ total | comma }}</span>
										</p>
									</li>
									<template>
										<li v-for="item in totalDamageList" :key="item.codeValue">
											<p class="no-margins vistits-main">
												<small>{{ item.damageNm }}</small>
												<span id="pageToday" class="pull-right">{{ item.damageCount }}</span>
											</p>
											<div class="progress progress-mini active">
												<div
													id="pageTodayProgress"
													class="progress-bar progress-bar-striped"
													:class="item.damageClass"
													:data-transitiongoal="item.damageRate"
													:aria-valuenow="item.damageRate"
													:style="`width: ${item.damageRate}%`"
												>
													{{ item.damageRate }}%
												</div>
											</div>
										</li>
									</template>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="wrapper wrapper-content">
			<div class="row">
				<div class="col-lg-12">
					<div class="ibox animated fadeIn">
						<div class="ibox-title">
							<h3 class="stat-view"><a href="#">최근 목록</a></h3>
							<div class="ibox-tools"></div>
						</div>
						<div class="ibox-content stat-view">
							<div class="table-responsive">
								<table class="table table-hover">
									<thead>
										<tr>
											<th scope="col" class="text-center">이미지</th>
											<th scope="col" class="text-center">위도(lat)</th>
											<th scope="col" class="text-center">경도(lng)</th>
											<th scope="col" class="text-center">파손구분</th>
											<th scope="col" class="text-center">진행상태</th>
											<th scope="col" class="text-center">등록일</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-for="item in itemList"
											@click="fnGoPage(item.damageNo)"
											:key="item.damageNo"
										>
											<td class="text-center">
												<template v-if="item.listImage">
													<img :src="item.listImage.filePath" width="100" />
												</template>
												<template v-else>
													<img src="/gn/images/noimage.jpg" width="100" />
												</template>
											</td>
											<td class="text-center">{{ item.lat }}</td>
											<td class="text-center">{{ item.lng }}</td>
											<td class="text-center">
												<span
													v-for="(damage, idx) in item.damageTpList"
													class="btn btn-sm btn-default m-xxs"
													style="cursor: auto"
													:key="idx"
													>{{ damage.codeName }}</span
												>
											</td>
											<td class="text-center">
												<span
													v-if="item.progressTp == 1"
													class="btn btn-sm btn-info m-xxs"
													style="cursor: auto"
													>{{ item.progressNm }}</span
												>
												<span
													v-else-if="item.progressTp == 2"
													class="btn btn-sm btn-primary m-xxs"
													style="cursor: auto"
													>{{ item.progressNm }}</span
												>
												<span
													v-else-if="item.progressTp == 9"
													class="btn btn-sm btn-danger m-xxs"
													style="cursor: auto"
													>{{ item.progressNm }}</span
												>
											</td>

											<td class="text-center">{{ item.insertDt }}</td>
										</tr>

										<tr v-if="itemList.length < 1">
											<td colspan="6">
												<p class="nomenu text-center">데이터가 없습니다.</p>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<MdLoading v-if="loadingTp"></MdLoading>
	</div>
</template>
<script>
import { GetIndex } from '@/api/index';
import MdLoading from '@/components/modals/MdLoading.vue';

// import { Bar } from 'vue-chartjs';
import { Line as LineChart } from 'vue-chartjs/legacy';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
);

export default {
	// components: { MdLoading, Bar, LineChart },
	components: { MdLoading, LineChart },
	data() {
		return {
			loadingTp: false,

			total: 0,
			yesterday: 0,
			today: 0,
			colorList: [
				'rgba(54, 162, 235)',
				'rgba(75, 192, 192)',
				'rgba(255, 205, 86)',
				'rgba(255, 99, 132)',
			],
			dailyDamageLabel: [],
			dailyDamageQty: [],
			dailyChartData: {},
			// dailyChartData: {
			// 	labels: ['09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07'],
			// 	datasets: [
			// 		{
			// 			label: '포트홀',
			// 			data: [1, 2, 3, 4, 5, 6, 7],
			// 			backgroundColor: 'rgba(54, 162, 235)',
			// 			borderColor: 'rgb(54, 162, 235)',
			// 		},
			// 	],
			// },
			dailyChartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				lineTension: 0.4,
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
			height: 400,
			itemList: [],
			damageTypeList: [],
			totalDamageList: [],
			totalProgressList: [],
		};
	},
	filters: {
		comma(val) {
			return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
	},
	created() {
		// 데이터를 가져온다
		this.fnInit();
	},
	methods: {
		fnInit() {
			let params = '';
			this.loadingTp = true;
			GetIndex(params)
				.then(res => {
					const data = res.data;
					// console.log(data);
					this.dailyDamageLabel = data.dailyDamageLabel;
					this.dailyDamageQty = data.dailyDamageQty;
					this.fnDailyChartData();
					this.damageTypeList = data.damageTypeList;
					this.total = data.total;
					this.today = data.today;
					this.yesterday = data.yesterday;
					this.itemList = data.damageList;
					this.totalDamageList = data.totalDamageList;
					this.totalProgressList = data.totalProgressList;
				})
				.catch(err => {
					this.$swal.fire({
						title: '정보 ',
						html:
							'정보를 가져오는데 실패 하였습니다 (' +
							err.response.status +
							' ' +
							err.response.data.error +
							')',
						icon: 'error',
						timer: 2000,
						showConfirmButton: false,
					});
				})
				.finally(() => {
					this.loadingTp = false;
				});
		},
		fnDailyChartData() {
			for (let i = 0; i < this.dailyDamageQty.length; i++) {
				this.dailyDamageQty[i]['backgroundColor'] = this.colorList[i];
				this.dailyDamageQty[i]['borderColor'] = this.colorList[i];
			}

			this.dailyChartData = {
				labels: this.dailyDamageLabel,
				datasets: this.dailyDamageQty,
			};
		},
		fnGoPage(no) {
			if (no > 0) {
				this.$router.push('/gn/pj/damage/view/' + no);
			}
		},
	},
};
</script>
