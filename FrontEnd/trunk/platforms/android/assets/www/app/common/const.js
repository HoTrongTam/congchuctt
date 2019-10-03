/*
* const module
* @2017
*/


(function() {
'use strict';


angular
	.module('FTravel.factory')

	.constant('CONST', {
		// do not edit
		VERSION:'0.0.1',
		APP_REVISION:'49018',
		APP_MODE:'production',
		MODE:'api',
		IS_DEVICE:false,
		// do not edit

		APP_CODE		: 'DVC',
		BASE_DEV		: 'http://10.86.222.250:8080/portal-service/rest/portal/action/post',
		BASE_PRO		: 'http://10.86.222.250:8080/portal-service/rest/portal/action/post',
		DATE_FORMAT		: 'DD/MM/YYYY',
		DATETIME_FORMAT	: 'DD/MM/YYYY HH:mm',
		TIME_FORMAT		: 'HH:mm',
		IS_24H			: true,
		PAGE_SIGN		: 20,
		APP_TAG			: 'FIS.DICH_VU_CONG',
		WORK_PLACE_TAG	: 'FIS.WORK_PLACE_TAG',
		LANG			: 'vn',
		FILTERS 		: {},
		STATE			: '',

		FB_APP_ID		: '',
		ANDROID_API_KEY	: 'AIzaSyDTo2d5O8HZeQb-nZXOR4w3De9htQ4YuaI',
		SENDER_ID		: '705242480679',
		ANDROID_PACKAGE_NAME: 'com.fpt.dichvucong',

		PATH_PRODUCT_IMAGE: 'cdvfile://localhost/persistent/product/images/',

		TIMEOUT			: 15000, //15s
		MA_TINH_TRANG : [
			{ code: 'VTN', name:'Hồ sơ chưa gửi' },
			{ code: 'THS', name:'Hồ sơ đã gửi' },
			{ code: 'DXL', name:'Hồ sơ đang được xử lý' },
			{ code: 'BSH', name:'Yêu cầu bổ sung hồ sơ' },
			{ code: 'DHT', name:'Hồ sơ đã hoàn tất' }
		],
		USER_DEMO: {
			KhachHangID : '312321',
			UserName : 'ten_user',
			HoTen : 'Nguyen Van A',
			GioiTinh : 'G',
			NgaySinh : '12',
			ThangSinh : '12',
			NamSinh : '1987',
			CMND : '90129321',
			NgayCap : '12/12/2002',
			NoiCap : 'HCM',
			DienThoai : '0987654321',
			Email : 'thanh@gmail.com',
			ChoOHienTai : '2121 Cao Thang, Q3',
			TenDoanhNghiep : 'FPT',
			SoDKKD : '1212412',
			EmailDN : 'doanhnghiep@gmail.com',
			DienThoaiDN : '0812324422',
			LoaiDangKy : 'Co phan',
			TinhThanhID: '14'
		},
		KEY 			: '2A0592D2-2F07-4A',
		IV 				: '2A0592D2-2F07-4A'
	})

	.constant('DB_CONFIG', {
    	name: 'DB',
    	tables: [
	      	{
	            table: 'table_name',
	            columns: [
	                { column: 'id', type: 'integer primary key' },
					{ column: 'name', type: 'VARCHAR'}
	            ]
			}
    	]
	})
;


})();
