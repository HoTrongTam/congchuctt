/*
* procedure controller
* @2017
*/

(function() {
'use strict';


angular
	.module('FTravel.procedure')
	.factory('ProcedureFtr', procedureFtr)
;

procedureFtr.$inject = [
	'$http','$q',
	'API', 'CONST', 'API_CONST', 'LSFtr'
];

function procedureFtr(
	$http, $q,
	API, CONST, API_CONST, LSFtr
) {
	var self = this;

	self.filters_def = {
		"ThuTucID": null,
		"DonViID": null,
		"MaDonVi": null,
		"TenDonVi": null,
		"ThuTucHanhChinhID": null,
		"TenThuTuc": null,
		"LinhVucID": null,
		"MaLinhVuc": null,
		"TenLinhVuc": null,
		"MucDo": [1,2,3,4],
		"TimKiemKhongDau": null,
		"PageNum": 1,
		"PageSize": CONST.PAGE_SIGN
	};

	self.getFilterDef = function() {
		return Object.assign({}, self.filters_def);
	};

	self.getDanhSach = function(params, page) {
		params.PageNum = page;

		return API.call( API_CONST.procedure.getDanhSach, params, params.PageNum > 1 );
	};

	self.getSLThuTuc = function(params) {
		return API.call( API_CONST.procedure.getSLThuTuc, params, params.PageNum > 1 );
	};

	self.getDSDonVi = function(params) {
		return API.call( API_CONST.procedure.getDSDonVi, params, params.PageNum > 1 );
	};

	self.getChiTiet = function(params) {
		// var _params = {
		// 	MaThuTuc: maThuTuc
		// };
		return API.call( API_CONST.procedure.getChiTiet, params );
	};

	return self;
}


})();
