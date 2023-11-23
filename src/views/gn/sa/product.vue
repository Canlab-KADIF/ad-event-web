<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>균종별 공급 현황</h2>
				<ol class="breadcrumb">
					<li>
						<a href="/">Main</a>
					</li>
					<li class="active">
						<strong>통계</strong>
					</li>
				</ol>
			</div>
		</div>
		<div class="wrapper wrapper-content animated fadeIn">
			<div class="row">
				<div class="col-lg-12">
					<div class="ibox">
						<div class="ibox-title">
							<div class="row">
								<div class="col-md-3">
									<div class="input-daterange input-group input-group-sm" id="datepicker">
										<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
										<input type="date" class="form-control" ref="searchSDT" v-model="searchSDT" @change="search" />
										<span class="input-group-addon"> ~ </span>
										<input type="date" class="form-control" ref="searchEDT" v-model="searchEDT" :min="searchSDT" @change="search" />
									</div>
								</div>
								<div class="col-sm-6 text-right"></div>
								<div class="col-sm-1">
									<button type="button" class="btn btn-sm btn-success" @click="downloadExcel">
										<i class="fa fa-floppy-o"></i> 엑셀
									</button>
								</div>
							</div>
						</div>
						<div class="ibox-content">
							<div class="table-responsive">
								<table class="table table-hover table-middle table-bordered text-right" id="saTable">
									<thead style="text-align-last:center;">
										<tr>
											<th scope="col">구분</th>
											<th scope="col">이름</th>
											<template v-for="(item,idx) in productList">
												<th scope="col">{{ item.productName }}({{item.productUnitNm}}}</th>
											</template>
											<th scope="col">합계</th>
											<th scope="col">가격</th>
										</tr>

									</thead>
									<tbody>

										<tr v-for="(item,idx) in itemList">
											<td align="center">{{ idx + 1 }}</td>
											<td align="center">{{ item.codeName }}</td>

											<template v-for="sub in item.productList">
												<td>{{ sub.volume }} </td>
											</template>
											<td>{{ item.sumVolume }}</td>
											<td>{{ item.sumPrice | comma }}</td>
										</tr>
										<tr>
											<td align="center" colspan="2"><strong>합계</strong></td>
											<td><strong>{{ product1 | comma }}</strong></td>
											<td><strong>{{ product2 | comma }}</strong></td>
											<td><strong>{{ product3 | comma }}</strong></td>
											<td><strong>{{ product4 | comma }}</strong></td>
											<td><strong>{{ product5  | comma }}</strong></td>
											<td><strong>{{ totalVolume | comma }}</strong></td>
											<td><strong>{{ totalPrice | comma }}</strong></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import { GetSaProduct } from '@/api/index';

export default {
	data() {
		return {
			searchSDT: new Date().toISOString().slice(0, 7) + '-01',
			searchEDT: new Date().toISOString().slice(0, 10),
			productList: [],
			itemList:[],
			productCount: 0,
			total: [],

			product1: 0,
			product2: 0,
			product3: 0,
			product4: 0,
			product5: 0,
			totalPrice: 0,
			totalVolume: 0
    }
	},
	filters: {
		comma(val) {
			return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	},
	created() {
		this.initData();

	},
	methods: {
		initData() {
			let params = ''
			if(this.searchSDT != '' && this.searchEDT != '') {
				if(this.searchSDT > this.searchEDT) {
					toastr.error('검색시작일이 검색종료일 보다 큽니다', '입력 오류');
					this.$refs.searchSDT.focus();
					return false;
				}

				params = '?searchSDT=' + this.searchSDT + '&searchEDT=' + this.searchEDT;
			}
			this.product1 = 0
			this.product2 = 0
			this.product3 = 0
			this.product4 = 0
			this.product5 = 0
			this.totalPrice = 0
			this.totalVolume = 0
			GetSaProduct(params)
				.then(res => {
					const data = res.data;
					this.itemList = data.itemList
					this.productList = data.productList
					this.productCount = data.productCount

					this.total = []
					for(let i=0; i<this.itemList.length; i++) {
						// for(let j=0; j<this.itemList[i]['productList'].length; j++) {

						// }
						this.product1 += this.itemList[i]['productList'][0]['volume']
						this.product2 += this.itemList[i]['productList'][1]['volume']
						this.product3 += this.itemList[i]['productList'][2]['volume']
						this.product4 += this.itemList[i]['productList'][3]['volume']
						this.product5 += this.itemList[i]['productList'][4]['volume']
						this.totalPrice += this.itemList[i]['sumPrice']
						this.totalVolume += this.itemList[i]['sumVolume']
					}



				})
				.catch(err => {
					console.log(err.error.response);
				});
			},
			search(){
				this.initData()
			},

			downloadExcel(){
				var XLSX = require("xlsx");
				var excelData = XLSX.utils.table_to_sheet(document.getElementById('saTable')); // table id를 넣어주면된다
				var workBook = XLSX.utils.book_new(); // 새 시트 생성
				XLSX.utils.book_append_sheet(workBook, excelData, '균종별공급현황');  // 시트 명명, 데이터 지정
				XLSX.writeFile(workBook, this.searchSDT.replace('-','')+'_균종별공급현황.xlsx'); // 엑셀파일 만듬

			}

	},
};
</script>
