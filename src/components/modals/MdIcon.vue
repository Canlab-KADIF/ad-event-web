<template>
	<div class="ibox">
		<div class="ibox-title">
			<div class="row">
				<div class="col-md-2">
					<h3>아이콘 선택</h3>
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
				<div v-for="(item, idx) in iconList" class="col-sm-3 m-t-sm p-t-7" :key="idx">
					<span class="btn btn-info" @click="fnSelectedIcon(item)">
						<i class="fa icon-lg" :class="' ' + item"></i>
					</span>
					<span class="btn btn-default" @click="fnSelectedIcon(item)">
						{{ item }}
					</span>
				</div>
			</div>
		</div>
		<div class="ibox-footer text-right">
			<div class="actionBtn btn-group" role="group">
				<button type="button" class="btn btn-default" @click="fnCloseModal()">
					<i class="fa fa-times"></i> 닫기
				</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'MdIcon',
	props: {
		// eslint-disable-next-line vue/require-prop-type-constructor
		sendData: '',
	},
	data() {
		return {
			iconList: this.sendData,
		};
	},
	created() {
		// 데이터를 가져온다
		this.fnInit();
	},
	methods: {
		fnInit() {
			// console.log(this.iconList);
		},
		fnSelectedIcon(item) {
			this.$emit('selected', 'icon', item);
			this.$parent.$emit('close-modal');
		},
		fnCloseModal() {
			this.$parent.$emit('close-modal');
		},
	},
};
</script>
