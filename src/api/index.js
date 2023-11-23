import axios from 'axios';
import store from '../store/index';
import { setInterceptors } from './common/interceptors';

function createAxiosService() {
	var apiHost = '';
	if (process.env.NODE_ENV === 'local') {
		apiHost = process.env.VUE_APP_API_LOCAL;
	} else if (process.env.NODE_ENV === 'development') {
		apiHost = process.env.VUE_APP_API_DEV;
	} else {
		// production
		apiHost = process.env.VUE_APP_API_PROD;
	}
	console.log(process.env.NODE_ENV + '/ apiHost : ', apiHost);
	const axiosService = axios.create({
		// API url
		baseURL: apiHost,
		headers: {
			Authorization: store.state.token,
		},
	});
	return setInterceptors(axiosService);
}
const axiosService = createAxiosService();

// ########################################################################################################################
// /auth API
// ########################################################################################################################
// login & logout & join
function PostLogin(params) {
	return axiosService.post('/login', params);
}
function PostLogout(params) {
	return axiosService.post('/logout', params);
}
// function PostJoin(params) {
// 	return axiosService.post('/join', params);
// }

// ########################################################################################################################
// /gn
// ########################################################################################################################
function GetIndex() {
	return axiosService.get('/gn/index');
}
function PutIndex(params) {
	return axiosService.put('/gn/index', params);
}
function GetGnMenuList(params) {
	return axiosService.get('/gn/menuList' + params);
}
function GetGnCheckDuplicate(params) {
	return axiosService.get('/gn/checkDuplicate' + params);
}
// ####################################################################
// /gn/sy
// ####################################################################
// function GetSyConfig(params) {
// 	return axiosService.get('/gn/sy/config' + params);
// }
// function GetSyConfigReceipt(params) {
// 	return axiosService.get('/gn/sy/configReceipt' + params);
// }
// function PostSyConfigReceipt(params) {
// 	return axiosService.post('/gn/sy/configReceipt', params);
// }
// function PutSyConfigReceipt(params) {
// 	return axiosService.put('/gn/sy/configReceipt', params);
// }
// function GetSyConfigNotice(params) {
// 	return axiosService.get('/gn/sy/configNotice' + params);
// }
// function PutSyConfigNotice(params) {
// 	return axiosService.put('/gn/sy/configNotice', params);
// }
// function GetSyConfigLimit(params) {
// 	return axiosService.get('/gn/sy/configLimit' + params);
// }
// function PutSyConfigLimit(params) {
// 	return axiosService.put('/gn/sy/configLimit', params);
// }

function GetSyMenu(params) {
	return axiosService.get('/gn/sy/menu' + params);
}
function PostSyMenu(params) {
	return axiosService.post('/gn/sy/menu', params);
}
function PutSyMenu(params) {
	return axiosService.put('/gn/sy/menu', params);
}
function DeleteSyMenu(params) {
	return axiosService.delete('/gn/sy/menu' + params);
}
function PutSyMenuMove(params) {
	return axiosService.put('/gn/sy/menuMove', params);
}

function GetSyUserList(params) {
	return axiosService.get('/gn/sy/userList' + params);
}
function GetSyUser(params) {
	return axiosService.get('/gn/sy/user' + params);
}
function PostSyUser(params) {
	return axiosService.post('/gn/sy/user', params);
}
function PutSyUser(params) {
	return axiosService.put('/gn/sy/user', params);
}
function DeleteSyUser(params) {
	return axiosService.delete('/gn/sy/user' + params);
}
function PutSyUserResetPassword(params) {
	return axiosService.put('/gn/sy/userResetPassword', params);
}

function GetSyCodeList(params) {
	return axiosService.get('/gn/sy/common' + params);
}
function PostSyCode(params) {
	return axiosService.post('/gn/sy/common', params);
}
function PutSyCode(params) {
	return axiosService.put('/gn/sy/common', params);
}
function DeleteSyCode(params) {
	return axiosService.delete('/gn/sy/common' + params);
}
function PutSyCodeMove(params) {
	return axiosService.put('/gn/sy/commonMove', params);
}
// ####################################################################
// /gn/pj
// ####################################################################
function GetPjDamageList(params) {
	return axiosService.get('/gn/pj/damageList' + params);
}
function GetPjDamage(params) {
	return axiosService.get('/gn/pj/damage' + params);
}
function PostPjDamage(params) {
	return axiosService.post('/gn/pj/damage', params, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
}
function PutPjDamage(params) {
	return axiosService.put('/gn/pj/damage', params, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
}
function DeletePjDamage(params) {
	return axiosService.delete('/gn/pj/damage' + params);
}

function GetPjRoadMap(params) {
	return axiosService.get('/gn/pj/roadMap' + params);
}

// function GetPjCategory(params) {
// 	return axiosService.get('/gn/pj/category' + params);
// }
// function PostPjCategory(params) {
// 	return axiosService.post('/gn/pj/category', params);
// }
// function PutPjCategory(params) {
// 	return axiosService.put('/gn/pj/category', params);
// }
// function DeletePjCategory(params) {
// 	return axiosService.delete('/gn/pj/category' + params);
// }

// function GetPjKeyword(params) {
// 	return axiosService.get('/gn/pj/keyword' + params);
// }
// function PostPjKeyword(params) {
// 	return axiosService.post('/gn/pj/keyword', params);
// }
// function PutPjKeyword(params) {
// 	return axiosService.put('/gn/pj/keyword', params);
// }
// function DeletePjKeyword(params) {
// 	return axiosService.delete('/gn/pj/keyword' + params);
// }

// function GetPjStoreList(params) {
// 	return axiosService.get('/gn/pj/storeList' + params);
// }
// function GetPjStore(params) {
// 	return axiosService.get('/gn/pj/store' + params);
// }
// function PostPjStore(params) {
// 	return axiosService.post('/gn/pj/store', params);
// }
// function PutPjStore(params) {
// 	return axiosService.put('/gn/pj/store', params);
// }
// function DeletePjStore(params) {
// 	return axiosService.delete('/gn/pj/store' + params);
// }

// function GetPjContentsList(params) {
// 	return axiosService.get('/gn/pj/contentsList' + params);
// }
// function GetPjContents(params) {
// 	return axiosService.get('/gn/pj/contents' + params);
// }
// function PostPjContents(params) {
// 	return axiosService.post('/gn/pj/contents', params, {
// 		headers: { 'Content-Type': 'multipart/form-data' },
// 	});
// }
// function PutPjContents(params) {
// 	return axiosService.put('/gn/pj/contents', params);
// }
// function DeletePjContents(params) {
// 	return axiosService.delete('/gn/pj/contents' + params);
// }
// ####################################################################
// /gn/sa
// ####################################################################

// ####################################################################
// 모달
// ####################################################################
function GetMdCategoryList(params) {
	return axiosService.get('/gn/mdCategoryList' + params);
}
function GetMdKeywordList(params) {
	return axiosService.get('/gn/mdKeywordList' + params);
}
export {
	// ######################################################################################################################
	// guest
	// ######################################################################################################################
	PostLogin,

	// ######################################################################################################################
	// user
	// ######################################################################################################################
	PostLogout,

	// ######################################################################################################################
	// gn
	// ######################################################################################################################
	GetGnMenuList,
	GetIndex,
	PutIndex,
	GetGnCheckDuplicate,
	// ####################################################################
	// gn/sy
	// ####################################################################
	// GetSyConfig,
	// GetSyConfigReceipt,
	// PostSyConfigReceipt,
	// PutSyConfigReceipt,
	// GetSyConfigNotice,
	// PutSyConfigNotice,
	// GetSyConfigLimit,
	// PutSyConfigLimit,
	GetSyMenu,
	PostSyMenu,
	PutSyMenu,
	DeleteSyMenu,
	PutSyMenuMove,
	GetSyUserList,
	GetSyUser,
	PostSyUser,
	PutSyUser,
	DeleteSyUser,
	PutSyUserResetPassword,
	GetSyCodeList,
	PostSyCode,
	PutSyCode,
	DeleteSyCode,
	PutSyCodeMove,

	// ####################################################################
	// gn/pj
	// ####################################################################
	GetPjDamageList,
	GetPjDamage,
	PostPjDamage,
	PutPjDamage,
	DeletePjDamage,
	GetPjRoadMap,
	// GetPjCategory,
	// PostPjCategory,
	// PutPjCategory,
	// DeletePjCategory,
	// GetPjKeyword,
	// PostPjKeyword,
	// PutPjKeyword,
	// DeletePjKeyword,
	// GetPjStoreList,
	// GetPjStore,
	// PostPjStore,
	// PutPjStore,
	// DeletePjStore,
	// GetPjContentsList,
	// GetPjContents,
	// PostPjContents,
	// PutPjContents,
	// DeletePjContents,

	// ####################################################################
	// gn/sa
	// ####################################################################

	// ####################################################################
	// modal
	// ####################################################################
	GetMdCategoryList,
	GetMdKeywordList,
};
