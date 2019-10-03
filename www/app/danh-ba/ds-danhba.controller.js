/**
 * search controller
 * ThanhTN
 * @2017
 **/



(function () {
	'use strict';


	angular
		.module('FTravel.danhba')
		.controller('DanhBaListCtrl', danhBaListCtrl);

	danhBaListCtrl.$inject = [
		'$scope', '$rootScope', '$state',
		'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
		'MasterFtr', 'UtilsFtr', 'DanhBaFtr', '$ionicHistory', '$ionicLoading'
	];

	function danhBaListCtrl(
		$scope, $rootScope, $state,
		CONST, LSFtr, Loader, Datetime, Popup,
		MasterFtr, UtilsFtr, DanhBaFtr, $ionicHistory, $ionicLoading
	) {
		$scope.title = "DANH BẠ";
		$scope.danhba_form = {
			'danhba': '',
		};
		$scope.isLoadMore = false;
		var numberSize = 20;
		var numberIndex = 1;
		$scope.formdanhba = "&pageSize=" + numberSize + "&pageIndex=" + numberIndex;
		$scope.mydanhba = [];
		$scope.timkiemDanhba = function () {
			$ionicHistory.clearCache();
			numberIndex = 1;
			$scope.mydanhba = [];
			$scope.isLoadMore = false;
			$scope.loadDanhBa();
		};
		$scope.gotoChitietdanhba = function (userid) {
			$state.go('app.chitietdanhba', {
				UserID: userid
			});
		}
		$scope.title = 'DANH SÁCH DANH BẠ';

		$scope.search = function () {
			$state.go('app.procedure-list', {});
		};

		$scope.loadDanhBa = function () {
			if (!$scope.isLoadMore) {
				$scope.formdanhba = $scope.danhba_form.danhba + "&pageSize=" + numberSize + "&pageIndex=" + numberIndex;
				
				DanhBaFtr.getDanhba($scope.formdanhba).then(function (data) {
				if ( data != ""){		
					if (data.length < numberSize || data.length === 0)
						$scope.isLoadMore = true;
					else
						++numberIndex;

					if ($scope.danhba_form.danhba) {
						$scope.mydanhba = [];
					}

					for (var i = 0; i < data.length; i++) {
						var char = (data[i].HoTen).substring(0, 1);
						if (char == "Ă" || char == "Â") {
							char = "A";
						}
						else if (char == "Đ") {
							char = "D";
						}
						else if (char == "Ê") {
							char = "E";
						}
						else if (char == "Ô" || char == "Ơ") {
							char = "O";
						}
						else if (char == "Ư") {
							char = "U";
						}
						data[i].charName = char;
						$scope.mydanhba.push(data[i]);
					}
				
				
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.$broadcast('scroll.refreshComplete');
				}
					else{
						Popup.e("Không tìm thấy danh bạ phù hợp");
	
					}
				}, function (err) {
					Popup.e("Lỗi kết nối lấy danh sách danh bạ");
				});
			}
		};

		$scope.$on('$ionicView.loaded', function () {
			$scope.loadDanhBa();
		});

		$scope.$on('$ionicView.enter', function () { });

		$scope.$on('$ionicView.leave', function () { });

	}


})();