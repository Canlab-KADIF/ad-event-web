<template>
	<div>
		<div class="row border-bottom white-bg page-heading">
			<div class="col-lg-12">
				<h2>회원 관리</h2>
				<ol class="breadcrumb">
					<li>
						<a href="javascript:;">Main</a>
					</li>
					<li class="active">
						<strong>기본 설정</strong>
					</li>
				</ol>
			</div>
		</div>

		<div class="wrapper wrapper-content animated fadeIn">
			<div class="row">
				<div class="col-lg-12">
					<form role="form" id="syForm" class="form-horizontal">
						<div class="ibox">
							<div class="ibox-title">
								<h3 class="menuSelectView text-info"><span id="textDs">&nbsp;</span></h3>
								<div class="ibox-tools">
									<div class="btn-toolbar" role="toolbar">
										<form role="form" class="form-horizontal" id="syForm">
											<input type="hidden" id="fileTP" name="fileTP" value="" />
											<input type="hidden" id="fileNM" name="fileNM" value="" />
										</form>
										<div class="actionBtn btn-group" role="group">
											<button
												class="moveBtn btn btn-sm btn-primary"
												type="button"
												@click="fnGoUser()"
											>
												회원관리로 이동
											</button>
											<!-- <button class="btn btn-sm btn-warning" type="button" data-toggle="modal" data-target="#renameModal"><i class="fa fa-terminal"></i> 이름변경</button>
											<button class="downLoadBtn btn btn-sm btn-info" data-action="Down" type="button" disabled=""><i class="fa fa-download"></i> 파일 다운로드</button>
											<button class="btn btn-sm btn-danger" data-action="Delete" type="button" disabled=""><i class="fa fa-times"></i> 폴더/파일 삭제</button> -->
										</div>
									</div>
								</div>
							</div>

							<div class="ibox-content">
								<vue-dropzone
									ref="myVueDropzone"
									id="dropzone"
									:options="dropzoneOptions"
									@vdropzone-file-added="fnSendFile"
								></vue-dropzone>
							</div>
						</div>
					</form>
				</div>

				<div class="col-lg-12">
					<div class="ibox">
						<div class="ibox-title">
							<div class="row">
								<form role="form" name="syForm">
									<div class="col-md-3">
										<p class="stat-header text-info">{{ totalCount }} 건</p>
									</div>
									<div class="col-md-6"></div>

									<div class="col-md-3 text-right"></div>
								</form>
							</div>
						</div>
						<div class="ibox-content">
							<div class="table-responsive">
								<table class="table table-hover">
									<thead>
										<tr>
											<th scope="col">회원명</th>
											<th scope="col">회원ID</th>
											<th scope="col">회원 구분</th>
											<th scope="col">시</th>
											<th scope="col">구</th>
										</tr>
									</thead>
									<tbody>
										<!-- <tr .loginyn == 'N'} class="throughline"{/}> -->
										<tr v-for="(item, index) in itemList" @click="goToPage(item.seq)" :key="index">
											<th scope="row">{{ item.userName }}</th>
											<td>{{ item.userId }}</td>
											<td>{{ item.userLevel }}</td>
											<td>{{ item.si }}</td>
											<td>{{ item.gu }}</td>
										</tr>

										<tr v-if="itemList.length < 1">
											<td colspan="7"><p class="nomenu text-center">데이터가 없습니다.</p></td>
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
// import PageNavigation from '@/components/PageNavigation';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import { PostSGnFileUpload } from '@/api/index';

export default {
	components: {
		vueDropzone: vue2Dropzone,
	},
	data() {
		return {
			todayDt: new Date().toISOString().slice(0, 10),
			totalCount: 0,
			itemList: [],
			upfiles: '',
			images: '',
			method: 'post',
			// url: process.env.NODE_ENV=='local' ? process.env.VUE_APP_API_LOCAL + '/gn/pj/asset' : process.env.VUE_APP_API_PROD + '/gn/pj/asset',
			dropzoneOptions: {
				url:
					process.env.NODE_ENV == 'local'
						? process.env.VUE_APP_API_LOCAL + '/gn/pj/asset'
						: process.env.VUE_APP_API_PROD + '/gn/pj/asset',
				// url: process.env.VUE_APP_API_PROD + '/gn/fileUpload', // api url
				// url: process.env.VUE_APP_API_LOCAL + '/gn/fileUpload', // api url
				acceptedFiles: '.xlsx',
				method: 'post',
				autoProcessQueue: false, // 수동으로 전송
				dictRemoveFile: '삭제',
				dictCancelUpload: '취소',
				dictCancelUploadConfirmation: '파일 업로드를 취소하시겠습니까?',
				dictDefaultMessage: 'Drag&Drop or Click!!',
				thumbnailWidth: 150,
				maxFilesize: 0.5,
				headers: { Authorization: this.$store.state.token },
			},
		};
	},
	watch: {},
	created() {
		// 데이터를 가져온다
		this.initData();
	},
	methods: {
		initData() {
			console.log(process.env.VUE_APP_API_LOCAL);
			console.log(process.env.NODE_ENV);
			console.log('url : ', this.dropzoneOptions.url);
		},
		fnSendFile(f) {
			this.upfiles = f;

			const formData = {
				file: this.upfiles,
			};

			PostSGnFileUpload(formData)
				.then(res => {
					const data = res.data;
					this.totalCount = data['totalCount'];
					this.itemList = data['itemList'];
				})
				.catch(err => {
					swal({
						title: '회원 등록',
						text:
							'회원 등록에 실패 하였습니다 (' +
							err.response.status +
							', ' +
							err.response.data.error +
							')',
						type: 'error',
						timer: 2000,
						showConfirmButton: false,
					});
				});
		},
		fnGoUser() {
			this.$router.push('/gn/sy/user/list');
		},
	},
};
</script>
<style>
.dropzone .dz-preview .dz-progress {
	height: 0 !important;
}
</style>
