<template>
	<div class="col-lg-12">
		<div class="ibox">
			<div class="ibox-title">
				<div class="row">
					<div class="col-md-4">
						<h3>카테고리 선택</h3>
					</div>
				</div>
				<div class="col-md-8">
					<div class="input-group">
						<div class="input-group-btn searchDrop"></div>
					</div>
				</div>
			</div>
			<div class="ibox-content">
				<div class="row">
					<div class="col-md-2">
						<div class="checkbox checkbox-info checkbox-inline">
							<input
								type="checkbox"
								id="category_all"
								v-model="allChecked"
								@click="fnCheckedAll($event.target.checked)"
							/>
							<label for="category_all">전체</label>
						</div>
					</div>
					<div class="col-md-8">
						<template v-if="itemList.length < 1">
							<div class="text-center">
								<span class="btn btn-default" @click="fnSetKeyword()">
									<i class="fa fa-edit"></i> 카테고리 등록
								</span>
							</div>
						</template>
						<template v-else>
							<div class="form-group">
								<div
									v-for="(item, idx) in itemList"
									class="checkbox checkbox-info checkbox-inline col-sm-3"
									:key="idx"
								>
									<input
										type="checkbox"
										:id="'keyword_' + item.keywordNo"
										:value="item.keywordNo"
										v-model="checked"
										@change="fnChecked($event.target.checked, item.keywordNo)"
									/>
									<label :for="'keyword_' + item.keywordNo" :key="item.keywordNo">{{
										item.title
									}}</label>
								</div>
							</div>
						</template>
						<!-- <p class="help-block">
							<small>{{ checked }}</small>
						</p> -->
					</div>
				</div>
			</div>
			<div class="ibox-footer text-right">
				<div class="actionBtn btn-group" role="group">
					<button type="button" class="btn btn-info" @click="fnKeywordSelected()">
						<i class="fa fa-times"></i> 선택
					</button>
					<button type="button" class="btn btn-default" @click="fnCloseModal()">
						<i class="fa fa-times"></i> 닫기
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { GetMdKeywordList } from '@/api/index';
export default {
	name: 'MdKeyword',
	props: {
		// eslint-disable-next-line vue/require-prop-type-constructor
		sendData: '',
	},
	data() {
		return {
			keywordList: this.sendData,
			itemList: [],
			checked: [],
			checkedList: [],
			allChecked: false,
		};
	},
	created() {
		// 데이터를 가져온다
		this.fnInitData();
	},
	methods: {
		fnInitData() {
			if (this.keywordList.length > 0) {
				for (let i = 0; i < this.keywordList.length; i++) {
					this.checked.push(this.keywordList[i]['keywordNo']);
				}
			}
			const params = '';
			GetMdKeywordList(params)
				.then(res => {
					const data = res.data;
					this.itemList = data.itemList;
					if (this.itemList.length == this.keywordList.length) {
						this.allChecked = true;
					}
				})
				.catch(err => {
					this.$swal.fire({
						title: '키워드 ',
						html:
							'키워드를 가져오는데 실패 하였습니다 (' +
							err.response.status +
							' ' +
							err.response.data.error +
							')',
						icon: 'error',
						timer: 2000,
						showConfirmButton: false,
					});
				});
		},
		fnCheckedAll(tp) {
			this.allChecked = tp;

			if (this.allChecked) {
				for (let i = 0; i < this.itemList.length; i++) {
					let chkItem = this.checked.find(el => el == this.itemList[i]['keywordNo']);

					if (chkItem === undefined) {
						// 중복 아니면 저장
						this.checked.push(this.itemList[i]['keywordNo']);
					}
				}
			} else {
				this.checked = [];
			}
		},
		fnChecked(tp, no) {
			if (tp) {
				let chkItem = this.checked.find(el => el == no);
				if (chkItem === undefined) {
					this.checked.push(no);
				}
			} else {
				this.checked.slice(0, -1);
			}
			// 전체 checkbox 제어
			if (this.checked.length == this.itemList.length) {
				this.allChecked = true;
			} else {
				this.allChecked = false;
			}
		},
		fnKeywordSelected() {
			this.checked.sort();
			for (let i = 0; i < this.checked.length; i++) {
				this.itemList.forEach(el => {
					if (this.checked[i] == el.keywordNo) {
						this.checkedList.push(el);
					}
				});
				// console.log(this.checked[i]);
			}
			this.$emit('selected', 'keyword', this.checkedList);
			this.$parent.$emit('close-modal');
		},
		fnSetKeyword() {
			this.$parent.$emit('close-modal');
			this.$router.push('/gn/pj/keyword');
		},
		fnCloseModal() {
			this.$parent.$emit('close-modal');
		},
	},
};
</script>
