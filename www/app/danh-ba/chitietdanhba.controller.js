/**
 * search controller
 * ThanhTN
 * @2017
 **/



(function () {
	'use strict';


	angular
		.module('FTravel.danhba')
		.controller('ChiTietDanhBaCtrl', chiTietDanhBaCtrl);

	chiTietDanhBaCtrl.$inject = [
		'$scope', '$rootScope', '$state', 'Popup',
		'CONST', 'DanhBaFtr'
	];

	function chiTietDanhBaCtrl(
		$scope, $rootScope, $state, Popup,
		CONST, DanhBaFtr
	) {
		$scope.title = 'CHI TIẾT DANH BẠ';
		$scope.userID = $state.params.UserID;

		$scope.Chitietdanhba = function (params) {
			DanhBaFtr.getCTDanhBa(params).then(function (obj) {
				$scope.charfisrtname = obj.HoTen.substring(0, 1);
				$scope.DataCT = obj;
			}, function (err) {
				Popup.e("Lỗi kết nối lấy chi tiết danh bạ");
			})
		}
		$scope.onZaloClick = function () {
			var storeUrlios = "itms-apps://itunes.apple.com/nl/app/blackboard-mobile-learn/id579523206?mt=8";
			var appIdios = "zalo://";
			var storeUrlandroid = "market://details?id=com.zing.zalo";
			var appIdandroid = "com.zing.zalo";

			if (ionic.Platform.isAndroid()) {
				var sApp = startApp.set(
					{
						"action": "ACTION_MAIN",
						"package": "com.zing.zalo",
						"intentstart": "startActivity",
					});
				sApp.start(function () {
				}, function (error) {
					console.log(error);
					Popup.e("Không tìm thấy ứng dụng Zalo");
					window.open(storeUrlandroid, '_system');
				});
			} else {
				if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
					var sApp = startApp.set(appIdios);			
					sApp.start(function (msg) {
						console.log(msg);
					}, function (error) {
						Popup.e("Không tìm thấy ứng dụng Zalo");
						window.open(storeUrlios, '_system');
					});
				}
			}
		}
		$scope.$on('$ionicView.loaded', function () {
			$scope.Chitietdanhba($scope.userID);
		});

		$scope.$on('$ionicView.enter', function () { });

		$scope.$on('$ionicView.leave', function () { });

	}


})();