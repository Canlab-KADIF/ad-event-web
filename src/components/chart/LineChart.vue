<template>
	<line-chart :chart-data="chartData" :chart-options="options"></line-chart>
</template>
<script>
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
	extends: LineChart,
	name: 'LineChart',
	components: { LineChart },
	props: {
		chartData: {
			type: Object,
		},
		options: {
			type: Object,
		},
	},
	data() {
		return {
			// chartData: {
			// 	labels: ['탄수화물', '단백질', '지방'],
			// 	datasets: [
			// 		{
			// 			label: '권장 섭취량',
			// 			backgroundColor: ['#ffce56', '#37a2eb', '#fe6484'],
			// 			data: [],
			// 		},
			// 	],
			// },
			// chartOptions: {
			// 	responsive: true,
			// 	maintainAspectRatio: false,
			// },
		};
	},
};
</script>
