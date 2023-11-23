<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>미생물 신청 및 공급대장</h2>
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
								<div class="col-sm-12 text-center">
									<span><h2>미생물 신청 및 공급대장</h2></span>
								</div>
							</div>
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
											<th scope="col" rowspan="2">연번</th>
											<th scope="col" rowspan="2">서명</th>
											<th scope="col" rowspan="2">주소</th>
											<th scope="col" rowspan="2">핸드폰</th>
                      <th scope="col" rowspan="2">결제</th>
											<th scope="col" :colspan="productCount">작목(ℓ}</th>
                      <th scope="col" rowspan="2">신청량(ℓ}</th>
											<th scope="col" rowspan="2">공급량(ℓ}</th>
                      <th scope="col" rowspan="2">수입금액(원)</th>
										</tr>
                    <tr>
                      <template v-for="item in productList" >
												<th scope="col">{{ item.productName }}</th>
											</template>
                    </tr>
									</thead>
									<tbody>
                    <tr>
                      <td align="center" colspan="5"><strong>합 계</strong></td>
                      <template v-for="t in totalList">
                        <td><strong>{{ t | comma }}</strong></td>
                      </template>
                    </tr>
										<tr v-for="item in itemList">
											<td align="center">{{ item.no }}</td>
											<td align="center">{{ item.userName }}</td>
											<td align="left">{{ item.address }}</td>
											<td align="center">{{ item.userId }}</td>
                      <td align="center">{{ item.issuecompanyNm }}</td>
											<template v-for="sub in item.buyList">
												<td>{{ sub.volume }} </td>
											</template>
											<td>{{ item.sumVolume }}</td>
											<td>{{ item.sumVolume }}</td>
                      <td>{{ item.sumPrice | comma }}</td>
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
import { GetSaSupply } from '@/api/index';

export default {
	data() {
		return {
			searchSDT: new Date().toISOString().slice(0, 10),
			searchEDT: new Date().toISOString().slice(0, 10),
      now: new Date().toISOString().slice(0, 10),
			productList: [],
			itemList:[],
			productCount: 0,
      totalList: []
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

			GetSaSupply(params)
				.then(res => {
					const data = res.data;
					this.itemList = data.itemList
					this.productList = data.productList
					this.productCount = data.productCount
					this.totalList = data.totalList

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
        var title = '미생물 생산 공급 현황 현황(' + this.now + ').xlsx'
				var excelData = XLSX.utils.table_to_sheet(document.getElementById('saTable')); // table id를 넣어주면된다
				var workBook = XLSX.utils.book_new(); // 새 시트 생성
				XLSX.utils.book_append_sheet(workBook, excelData, '미생물 생산 공급 현황 현황');  // 시트 명명, 데이터 지정
				XLSX.writeFile(workBook, title); // 엑셀파일 만듬
			}

	},
};
</script>
