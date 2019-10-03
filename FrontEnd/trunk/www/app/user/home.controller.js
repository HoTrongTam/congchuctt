/**
 * home controller
 * @2017
 **/



(function () {
	'use strict';


	angular
		.module('FTravel.user')
		.controller('HomeCtrl', homeCtrl);

	homeCtrl.$inject = [
		'$scope', '$rootScope', '$state', '$ionicHistory', '$ionicPlatform', '$ionicPopup',
		'CONST', 'Datetime', 'Popup',
		'MasterFtr', 'UserFtr'
	];

	function homeCtrl(
		$scope, $rootScope, $state, $ionicHistory, $ionicPlatform, $ionicPopup,
		CONST, Datetime, Popup,
		MasterFtr, UserFtr
	) {
		$scope.title = "Dịch vụ công";

		$scope.dt = Datetime;
		$scope.dsTinTuc = [];
		$scope.documents = [];
		$scope.procedures = [];

		$scope.dsDonVi = [];
		$scope.noMoreItemsAvailable = false;
		$scope.pageNo = 1;

		$scope.sorter = [
			'-NgayDangKy'
		];

		var isLoading = false;
		// $scope.loadMore = function() {
		// 	if(!isLoading&&!$scope.noMoreItemsAvailable) {
		// 		MasterFtr.getDSTinTuc($scope.pageNo).then(function(rep) {
		// 			(rep.length < CONST.PAGE_SIGN || rep.length <= 0) ? $scope.noMoreItemsAvailable = true: ++$scope.pageNo;

		// 			$scope.dsTinTuc = $scope.dsTinTuc.concat(rep);

		// 			$scope.$broadcast('scroll.infiniteScrollComplete');
		// 			$scope.$broadcast('scroll.refreshComplete');

		// 			isLoading = false;
		// 		}, function(err) {
		// 			$scope.noMoreItemsAvailable = true;
		// 			isLoading = false;
		// 			Popup.e(err);

		// 			$scope.$broadcast('scroll.infiniteScrollComplete');
		// 			$scope.$broadcast('scroll.refreshComplete');
		// 		});
		// 	}
		// };

		$scope.doRefresh = function () {
			$scope.pageNo = 1;
			$scope.noMoreItemsAvailable = false;
			$scope.dsTinTuc = [];

			// $scope.loadMore();
		};

		$scope.form = {
			sreach: ''
		};

		$scope.onTraCuuHoSoSubmit = function (sreach) {
			// if(!$rootScope.user) {
			// 	Popup.c('Vui lòng đăng nhập để sử dụng!', function(ok){
			// 		if(ok) UserFtr.openSignin($scope);
			// 	});
			// 	return;
			// }

			//$state.go('app.document-list', {mode: 'sreach', sreach: $scope.form.sreach});
			$state.go('app.document-detail', {
				soBienNhan: $scope.form.sreach,
				maTraCuu: $scope.form.sreach
			})
		};

		$scope.onTinTucTapped = function (item) {
			$state.go('app.tin-tuc-detail', {
				item: item
			});
		};

		$scope.onDocumentItemTapped = function (item) {
			$state.go('app.document-detail', {
				"DocumentId": item.DocumentId,
				"MaTinhTrang": item.MaTinhTrang
			});
		};

		$scope.onThuTucList = function (item) {
			$state.go('app.procedure-list', {});
		}

		$scope.onBuildRegisterTapped = function (item) {
			$state.go('app.build-register', {});
		}

		$scope.onDonViTapped = function (item) {
			// $ionicHistory.nextViewOptions({ historyRoot: true });
			// $state.go('app.customer-contract', {location: 'replace'});
			// $rootScope.$emit('FilterCtrl.reset', {});
			$state.go('app.procedure-list', {
				item: item,
				id: item.MaDonVi
			});
		};

		$scope.getCodeName = function (item) {
			if (!item.MaTraCuu || item.MaTraCuu === '')
				return 'Chưa cấp số BN';

			return item.MaTraCuu + " | " + item.SoBienNhan;
		};

		$scope.$on('$ionicView.loaded', function () {});

		$scope.$on('$ionicView.enter', function () {
			// if($rootScope.user)
			//     DocumentFtr.getDanhSach().then(function(data) {
			// 		$scope.documents = data
			// 	}, function(err) {
			//         Popup.e(err);
			//     });
			// MasterFtr.getDSTinTuc().then(function(data) {
			// 	$scope.dsTinTuc = data
			// }, function(err) {
			//     Popup.e(err);
			// });
			$ionicPlatform.ready(function () {
				$scope.doRefresh();
			});
		});

		$scope.$on('$ionicView.leave', function () {});

		$scope.showAlert = function () {

			var alertPopup = $ionicPopup.alert({
				title: 'Thông Báo',
				template: 'Tính năng này đang được phát triển'
			});

			alertPopup.then(function (res) {
				// Custom functionality....
			});
		};

	}


})();