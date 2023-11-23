$(document).ready(function () {
	// 숫자만 입력
	$('.numeric').numeric('positiveInteger');
	// 영문 숫자 _ . 만 입력
	$('.alphanum').alphanum({
		allowSpace: false,
		allow: '_.'
	}).css('ime-mode', 'disabled');
	// 영문 숫자 _  만 입력
	$('.alphanum2').alphanum({
		allowSpace: false,
		allow: '_'
	}).css('ime-mode', 'disabled');
	// IP :.  만 입력
	$('.alphanum3').alphanum({
		allowSpace: false,
		allow: ':.'
	}).css('ime-mode', 'disabled');
    // 한글입력제거
	$('.nothangul').keyup(function() {
		var inputVal = $(this).val();
		$(this).val(inputVal.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/gi,''));
	});
    // 대문자로만
	$('.upper').keyup(function() {
		$(this).val($(this).val().toUpperCase());
	});
	// 파이 그래프
	$('.pie').peity('pie', {
		fill: ['#E53E37', '#F2DEDE', '#ffffff'],
		radius: 10
	});
	// 프로그래스 바
	$('.progress .progress-bar').progressbar();
	// 버튼 툴팁
	$('[data-toggle="tooltip"]').tooltip();
	// 오류 알림 설정
	toastr.options = {
		closeButton: true,
		progressBar: true,
		showMethod: 'slideDown',
		timeOut: 4000
    };

	// 화면이 768px 일때 사이드 메뉴를 축소시킨다.
	if ($(this).width() < 769) {
		$('body').addClass('body-small');
	} else {
		$('body').removeClass('body-small');
	}
	// 사이드 메뉴
	$('#side-menu').metisMenu();
	// 사이드 메뉴 축소
	$('.navbar-minimalize').click(function () {
		$('body').toggleClass('mini-navbar');
		smoothlyMenu();
	});
	// 사이트 설정 버튼 클릭 시
	$('.site-view').click(function () {
		$('.site-config-box').toggleClass('show');
		$('.site-view > i').toggleClass('fa-chevron-left').toggleClass('fa-chevron-right');
		$('.site-view').toggleClass('').toggleClass('active');
	});
	// 기간 검색 달력 폼
	$('.input-daterange').datepicker({
		language: 'kr',
		format: 'yyyy-mm-dd',
		todayBtn: 'linked',
		clearBtn: true,
		todayHighlight: true,
        forceParse: false,
        autoclose: true
	});
	// 단일 달력 폼
	$('.input-group.date').datepicker({
		language: 'kr',
		format: 'yyyy-mm-dd',
		todayBtn: 'linked',
		clearBtn: true,
		todayHighlight: true,
		forceParse: false,
		autoclose: true
	});

	// 박스 숨기기
	$('.collapse-link').click(function () {
		var ibox = $(this).closest('div.ibox');
		var button = $(this).find('i');
		var content = ibox.find('div.ibox-content');
			content.slideToggle(200);
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			ibox.toggleClass('').toggleClass('border-bottom');
			setTimeout(function () {
				ibox.resize();
				ibox.find('[id^=map-]').resize();
			}, 50);
	});

	// 드롭다운 버튼 선택 시
	$('.dropdown-menu a').click(function() {
		$('#'+$(this).data('form')).val($(this).data('val'));
		$('#'+$(this).data('form')+'NM').val($(this).text());
		$('#'+$(this).data('form')+'Text').text($(this).text());
		$(this).parent().dropdown('toggle');
		return false;
	});

	// 휴지통 개수 파악
	// if ($('#wastebasketsCount').length > 0) {
	// 	ajaxForm('post', '/siiru/include/find.php', {'type':'W'}, '', '', function(data) {
	// 		$('#wastebasketsCount').text(data.data_arr.wCount);
	// 	});
	// }

  // 해상도 변화에 따른 액션
	fix_height();

	// 상단으로 이동하는 버튼
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#scroll-top').addClass('in');
			$('#scroll-top').fadeIn();
		} else {
			$('#scroll-top').removeClass('in');
			$('#scroll-top').fadeOut();
		}
	});
	$('#scroll-top').click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
    });

	// 모달은 레아아웃 밖으로 뺀다.
	$('.modal').appendTo('body');
    // 스크롤 관련
    $('.scroll-container').slimScroll({
        height: '100%'
    });
	// 화면 리사이즈
	$(window).bind('load resize scroll', function () {
		if (!$('body').hasClass('body-small')) {
			fix_height();
		}
	});

	// validator 기본셋팅
	$.validator.setDefaults({
		errorElement: 'span',
		errorClass: 'help-block',
		invalidHandler: function(form, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				validator.errorList[0].element.focus();
			}
		},
		highlight: function (element, errorClass, validClass) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorPlacement: function (error, element) {
			if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});
	$.validator.addMethod('time24', function(value, element) {
		if (value !== '') {
			return /^([01]?[0-9]|2[0-3])(:[0-5][0-9]){1}$/.test(value);
		} else {
			return true;
		}
	}, '올바른 시간을 입력하세요.');
	$.validator.addMethod('firstalpha', function(value, element) {
		if (value !== '') {
			return /(^[a-zA-Z])/.test(value);
		} else {
			return true;
		}
	}, '첫글자는 영문만 입력하실수 있습니다.');
});

// 화면이 768px 일때 사이드 메뉴를 축소시킨다.
$(window).bind('resize', function () {
	if ($(this).width() < 769) {
		$('body').addClass('body-small');
	} else {
		$('body').removeClass('body-small');
	}
});

// 사이드 메뉴의 전체 높이
function fix_height() {
	var navbarHeigh = $('nav.navbar-default').height();
	var wrapperHeigh = $('#page-wrapper').height();
	if (navbarHeigh > wrapperHeigh) {
		if (!$('body').hasClass('body-small')) {
			$('#page-wrapper').css('min-height', navbarHeigh + 'px');
		} else {
			$('#page-wrapper').css('min-height', $(window).height() + 'px');
		}
	}
	if (navbarHeigh < wrapperHeigh) {
		$('#page-wrapper').css('min-height', $(window).height() + 'px');
	}
}

// 사이드 메뉴 효과
function smoothlyMenu() {
	if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
		$('#side-menu').hide();
		setTimeout(function () {
			$('#side-menu').fadeIn(500);
		}, 100);
	} else {
		$('#side-menu').removeAttr('style');
	}
}

// Code Mirror
function codeMirror(as_type, as_id, as_readOnly, as_multi) {
	if (as_multi != 'Y') $('.CodeMirror').remove();

	CodeMirror.commands.autocomplete = function(cm) {
		var doc = cm.getDoc();
		var POS = doc.getCursor();
		var mode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(POS).state).mode.name;
		if (mode == 'xml') {
			CodeMirror.showHint(cm, CodeMirror.hint.html);
		} else if (mode == 'javascript') {
			CodeMirror.showHint(cm, CodeMirror.hint.javascript);
		} else if (mode == 'css') {
			CodeMirror.showHint(cm, CodeMirror.hint.css);
		} else if (mode == 'sql') {
			CodeMirror.showHint(cm, CodeMirror.hint.sql);
		}
	};

	var languageMode = '';
	if (as_type == 'htmlmixed') {
		languageMode = {
			name: 'htmlmixed',
			scriptTypes: [
				{matches: /\/x-handlebars-template|\/x-mustache/i, mode: null},
				{matches: /(text|application)\/(x-)?vb(a|script)/i, mode: 'vbscript'}
			]
		};
	} else {
		languageMode = as_type;
	}

	var codeEditor = CodeMirror.fromTextArea(document.getElementById(as_id), {
		lineNumbers: true,
		lineWrapping: true,
		styleActiveLine: true,
		highlightSelectionMatches: {showToken: /\w/},
		mode: languageMode,
		matchBrackets: true,
		matchTags: {bothTags: true},
		autoCloseTags: true,
		autoCloseBrackets: true,
		value: document.documentElement.innerHTML,
		scrollbarStyle: 'simple',
		readOnly: as_readOnly,
		extraKeys: {
			'Ctrl-Space': 'autocomplete',
			'Alt-Space': 'autocomplete',
			'Ctrl-J': 'toMatchingTag',
			'Alt-F': 'findPersistent'
		}
	});

	return codeEditor;
}

// 폼 전송 [form method, json url, form data, swal or toastr, validate, output]
function ajaxForm(as_type, as_url, as_formData, as_alert, validate, out_data) {
	var ls_processData = true;
	var ls_contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
	if ($.type(as_formData) === 'object') {
		if ( as_formData instanceof FormData) {
			ls_processData = false;
			ls_contentType = false;
		}
	}
	$.ajax({
		type : as_type,
		url : as_url,
		cache : false,
		data : as_formData,
		processData : ls_processData,
		contentType: ls_contentType,
		dataType : 'json',
		success : function(data) {
			if (data.errChk == 'N') {
				if (($.type(data.successTitle) !== 'undefined') && (data.successTitle !== '')) {
					if (as_alert == 'swal') {
						swal({
							title: data.successTitle,
							text: data.successMsg,
							type: 'success',
							timer: 1000,
							showConfirmButton: false,
							html: true
						});
					} else {
						// success, info, warning, error
			      toastr.success(data.successMsg, data.successTitle);
					}
					if (($.type(data.redirect) !== 'undefined') && (data.redirect !== '')) {
						// 메세지를 뿌리기 위해 딜레이
						setTimeout(function() {
							if (data.redirect == 'reload') {
								document.location.reload(true);
							} else {
								document.location.href = data.redirect;
							}
						}, 1000);
					}
				} else {
					if (($.type(data.redirect) === 'undefined') || (data.redirect === '')) {
					} else if (data.redirect == 'reload') {
						document.location.reload(true);
					} else {
						document.location.href = data.redirect;
					}
				}
			} else {
				var form_err = [];
				var errCount = 0;
				if ($.type(data.input_arr) != 'undefined') {
					$.each(data.input_arr, function(input_name, input_msg) {
						if (input_msg.focus) $('#'+input_name).focus();
						form_err[input_name] = input_msg.msg;
						errCount++;
					});
				}
				if (errCount > 0) validate.showErrors(form_err);
				if (($.type(data.errTitle) !== 'undefined') && (data.errTitle !== '')) {
					if (as_alert == 'swal') {
						swal({
							title: data.errTitle,
							text: data.errMsg,
							type: 'error',
							showConfirmButton: true,
							confirmButtonClass: 'btn-danger',
							html: true
						});
					} else {
						// success, info, warning, error
			            toastr.error(data.errMsg, data.errTitle);
					}
				}
			}
			if ($.type(out_data) === 'function') out_data(data);
		},
		error : function(xhr,status,error) {
			if (as_alert == 'swal') {
				swal({
					title: 'ajaxForm Error',
					text: '['+xhr.status+'] ' + error,
					type: 'error',
					showConfirmButton: true,
					confirmButtonClass: 'btn-danger'
				});
			} else {
				// success, info, warning, error
	            toastr.error('['+xhr.status+'] ' + error, 'ajaxForm Error');
			}
		}
	});
}

// 폼이동
function formRedirect(form, redirect) {
	var formId = form;
	if ($.trim(formId) === '') formId = 'pageForm';
	$('#'+formId).attr('action', redirect);
	$('#'+formId).submit();
}

// 트리메뉴
function showTreeMenu(as_treeID, as_callurl, out_data) {
	$('#'+as_treeID).jstree({
		'core' : {
			'multiple' : false,
			'check_callback' : true,
			'force_text' : true,
			'data' : {
				'type' : 'post',
				'url' : as_callurl,
				'data' : function (node) {
					return {'id' : node.id};
				}
			},
		},
		'plugins' : ['state', 'types', 'search'],
		'types' : {
			'default' : {
				'icon' : 'fa fa-folder'
			},
			'children' : {
				'icon' : 'fa fa-file-o'
			},
			'organization' : {
				'icon' : 'fa fa-sitemap'
			}
		}
	})
	.on('select_node.jstree', function (e, data) {
		if (data && data.selected && data.selected.length) {
			if ($.type(out_data) === 'function') out_data(data.node);
		}
	});
}

// 만족도 별 표시
function starView(ai_avg) {
	var j;
	var ret = ''; var allstar = 0; var halfstar = 0; var nonestar = 0;

	allstar = parseInt(ai_avg/20);
	halfstar = parseInt(((ai_avg/20) - parseInt(ai_avg/20))*10);
	if (halfstar >= 5) {
		halfstar = 1;
		nonestar = 4 - allstar;
	} else {
		halfstar = 0;
		nonestar = 5 - allstar;
	}
	for (j=0; j<allstar; j++) ret+= '<i class="fa fa-star text-info"></i>';
	for (j=0; j<halfstar; j++) ret+= '<i class="fa fa-star-half-o text-info"></i>';
	for (j=0; j<nonestar; j++) ret+= '<i class="fa fa-star-o text-info"></i>';

	return ret;
}

// 파일 확장자별 아이콘 정리
function fileExtIcon(as_file) {
	var file_icon = 'fa-file-o';
	if ((as_file === '') || ($.type(as_file) === 'undefined')) return file_icon;

	var file_ext = as_file.slice(as_file.lastIndexOf('.')+1).toLowerCase();

	if ((file_ext == 'xls') || (file_ext == 'xlsx')) {
		file_icon = 'fa-file-excel-o';
	} else if ((file_ext == 'ppt') || (file_ext == 'pptx')) {
		file_icon = 'fa-file-powerpoint-o';
	} else if ((file_ext == 'doc') || (file_ext == 'docx')) {
		file_icon = 'fa-file-word-o';
	} else if (file_ext == 'pdf') {
		file_icon = 'fa-file-pdf-o';
	} else if ((file_ext == 'txt') || (file_ext == 'css') || (file_ext == 'js')) {
		file_icon = 'fa-file-text-o';
	} else if ((file_ext == 'gif') || (file_ext == 'jpg') || (file_ext == 'jpeg') || (file_ext == 'png')) {
		file_icon = 'fa-file-image-o';
	} else if ((file_ext == 'mp3') || (file_ext == 'ogg') || (file_ext == 'wav') || (file_ext == 'mid')) {
		file_icon = 'fa-file-audio-o';
	} else if ((file_ext == 'mp4') || (file_ext == 'ogv') || (file_ext == 'avi') || (file_ext == 'mpg') || (file_ext == 'wmv') || (file_ext == 'mpeg') || (file_ext == 'asf') || (file_ext == 'asx')) {
		file_icon = 'fa-file-video-o';
	} else if ((file_ext == 'zip') || (file_ext == 'rar') || (file_ext == 'alz')) {
		file_icon = 'fa-file-archive-o';
	} else if ((file_ext == 'jsp') || (file_ext == 'php') || (file_ext == 'htm') || (file_ext == 'html')) {
		file_icon = 'fa-file-code-o';
	} else {
		file_icon = 'fa-file-o';
	}

	return file_icon;
}

// 숫자 3자리 단위마다 콤마(comma)
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Chart.js - line
function chartLine(chartId, labels, totalData, visitData, pageData) {
	var data = null;
	if (visitData == 'menu') {
		data = {
			labels: labels,
			datasets: [
				{
					label: '접속수',
					backgroundColor: 'rgba(103,192,103,0.1)',
					borderColor: 'rgba(103,192,103,1)',
					pointBorderColor: 'rgba(255,255,255,1)',
					pointBackgroundColor: 'rgba(103,192,103,1)',
					data: totalData
				}
			]
		};
	} else {
	 	data = {
			labels: labels,
			datasets: [
				{
					label: '접속수',
					backgroundColor: 'rgba(103,192,103,0.1)',
					borderColor: 'rgba(103,192,103,1)',
					pointBorderColor: 'rgba(255,255,255,1)',
					pointBackgroundColor: 'rgba(103,192,103,1)',
					data: totalData
				},
				{
					label: '방문자수',
					backgroundColor: 'rgba(153,204,255,0.1)',
					borderColor: 'rgba(153,204,255,1)',
					pointBorderColor: 'rgba(255,255,255,1)',
					pointBackgroundColor: 'rgba(153,204,255,1)',
					data: visitData
				},
				{
					label: '페이지 접속수',
					backgroundColor: 'rgba(255,153,153,0.1)',
		            borderColor: 'rgba(255,153,153,1)',
					pointBorderColor: 'rgba(255,255,255,1)',
		            pointBackgroundColor: 'rgba(255,153,153,1)',
					data: pageData
				}
			]
		};
	}
	var options = {
		responsive: true,
		tooltips: {
			mode: 'label',
			callbacks: {
				label: function(tooltipItem, data) {
					return data.datasets[tooltipItem.datasetIndex].label +' : ' + numberWithCommas(tooltipItem.yLabel);
				}
			}
		},
		elements: {
			point: {
				radius: 4,
				hoverRadius: 6
			}
		}
	};
	$('.chartjs-hidden-iframe').remove();
	$('#'+chartId).remove();
	$('#chart').append('<canvas id="'+chartId+'" height="120"></canvas>');
	var canvas = document.querySelector('#'+chartId);
	var ctx = canvas.getContext('2d');
	new Chart(ctx, {
		type: 'line',
		data: data,
		options: options
	});
}

// Chart.js - pie
function chartPie(chartId, labels, statsData) {
	var color = ['58,133,191','103,192,103','102,199,226','242,182,88','222,94,89','192,192,192'];
	var backgroundColor = [], hoverBackgroundColor = [];
	var c = 0;
	for (var i=0;i<statsData.length;i++) {
		backgroundColor.push('rgba('+color[c]+',0.8)');
		hoverBackgroundColor.push('rgba('+color[c]+',1)');
		// 프로그래스바 추출
		c = (c == 5) ? 0 : c + 1;
	}
	var data = {
		labels: labels,
		datasets: [{
			data: statsData,
			backgroundColor: backgroundColor,
			hoverBackgroundColor: hoverBackgroundColor
		}]
	};
	var options = {
		responsive: true,
		tooltips: {
			callbacks: {
				label: function(tooltipItem, data) {
					return data.labels[tooltipItem.index] +' : ' + numberWithCommas(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
				}
			}
		}
	};
	$('.chartjs-hidden-iframe').remove();
	$('#'+chartId).remove();
	$('#chart').append('<canvas id="'+chartId+'" height="250"></canvas>');
	var canvas = document.querySelector('#'+chartId);
	var ctx = canvas.getContext('2d');
	new Chart(ctx, {
		type: 'pie',
		data: data,
		options: options
	});
}

// 윈도우 오픈
function openWindow(theURL,theName,theTop,theLeft,theWidth,theHeight,theScroll,theResizable) {
	window.open(theURL, theName,'top='+theTop+',left='+theLeft+',width='+theWidth+',height='+theHeight+',marginwidth=0,marginheight=0,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars='+theScroll+',resizable='+theResizable);
	return false;
}
