/*
* const module
* @2017
*/


(function () {
	'use strict';


	angular
		.module('FTravel.factory')

		.constant('CONST', {
			// do not edit
			VERSION: '0.0.1',
			APP_REVISION: '49018',
			APP_MODE: 'production',
			MODE: 'api',
			IS_DEVICE: false,
			// do not edit
			APP_CODE: 'DVC',
			BASE_DEV		: 'https://congchuc-quan7mb.tphcm.gov.vn',
			BASE_LOGIN		: 'https://congchuc-quan7.tphcm.gov.vn',
			BASE_MOBILECC	: 'https://mobile-quan7.tphcm.gov.vn',
			// BASE_DEV		: 'http://14.161.0.65:1112',
			// BASE_LOGIN		: 'http://14.161.0.65',
			// BASE_MOBILECC	: 'https://mobile-quan7.tphcm.gov.vn',
			// BASE_LOGIN: 'http://10.86.222.113',
			// BASE_MOBILECC: 'http://10.86.142.186:8080',
			// BASE_DEV: 'http://10.86.222.113:1112',
			// BASE_DEV: 'http://10.86.142.133:9001',
			// BASE_LOGIN		: 'http://10.86.142.133:6001',
			//
			BASE_DGHL: 'https://danhgiahailong.hochiminhcity.gov.vn',
			BASE_PRO: 'http://10.86.222.250:8080/portal-service/rest/portal/action',
			DATE_FORMAT: 'DD/MM/YYYY',
			DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
			TIME_FORMAT: 'HH:mm',
			IS_24H: true,
			PAGE_SIGN: 20,
			APP_TAG: 'FIS.CONG_CHUC_QUAN7',
			WORK_PLACE_TAG: 'FIS.WORK_PLACE_TAG',
			LANG: 'vn',
			FILTERS: {},
			STATE: '',
			FB_APP_ID: '',
			ANDROID_API_KEY: 'AIzaSyDTo2d5O8HZeQb-nZXOR4w3De9htQ4YuaI',
			SENDER_ID: '705242480679',
			ANDROID_PACKAGE_NAME: 'com.fpt.congchucquan7',

			PATH_PRODUCT_IMAGE: 'cdvfile://localhost/persistent/product/images/',

			TIMEOUT: 50000, //15s
		})

		.constant('DB_CONFIG', {
			user_table: 'user',
			img_daidien: 'hinhdaidien',
			name: 'DB',
			tables: [{
				name: 'user',
				columns: [
					{ name: 'id', type: 'integer primary key autoincrement' },
					{ name: 'userID', type: 'integer' },
					{ name: 'name', type: 'VARCHAR' },
					{ name: 'password', type:'VARCHAR'}
				]
			},
			{
				name: 'hinhdaidien',
				columns: [
					{ name: 'id', type: 'integer primary key autoincrement' },
					{ name: 'idx', type: 'integer' }
				]
			}]
		});


})();
