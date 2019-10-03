
/**
 * procedure detail controller
 * @2017
 **/



(function() {
'use strict';


angular
	.module('FTravel.procedure')
	.controller('ProcedureDetailCtrl', procedureDetailCtrl)
;

procedureDetailCtrl.$inject = [
	'$scope', '$rootScope', '$state', '$ionicHistory',
	'CONST', 'Popup', 'API', 'File',
	'ProcedureFtr', 'UserFtr'
];

function procedureDetailCtrl (
	$scope, $rootScope, $state, $ionicHistory,
	CONST, Popup, API, File,
	ProcedureFtr, UserFtr
) {
	$scope.title = "Chi tiết thủ tục";
	// $rootScope.show_NopHoSobtn1 = true;
	$scope.id = $state.params.id;
	$scope.thuTuc = $state.params.item;

	$scope.detail = {};

	$scope.getDetail = function() {
		var _params = {
			thuTucID:$scope.thuTuc.ThuTucID
			// thuTucHanhChinhID:$scope.thuTuc.ThuTucHanHChinhID,
			// donViID:$scope.thuTuc.DonViID
		};

		ProcedureFtr.getChiTiet(_params).then(function(data) {
			$scope.detail = data;
			$scope.$broadcast('scroll.refreshComplete');
		}, function(err) {
			Popup.e(err);
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.createDocumentOntap = function() {
		$scope.$broadcast('createDocumentOntap');
	};

	$scope.doRefresh = function () {
		$scope.getDetail();
	};

	$scope.showFullConntent = function(title, content) {
		Popup.showContent($scope, title, content, true);
	};

	$scope.openFile = function(fileName, fileID) {
		var _url = encodeURI( API.base + '/DVC/downloadBieuMauHS?fileName=' + fileID );
		File.open2(_url, fileName);
	};

	$scope.$on('$ionicView.loaded', function() {
	});

	$scope.goToCreateHoSo = function() {
		if(!$rootScope.user) {
			Popup.c('Vui lòng đăng nhập để sử dụng!', function(ok){
				if(ok) UserFtr.openSignin($scope);
			});
		} else {
			$state.go('app.document-detail', { mode: 'new', thuTuc: $scope.detail });
		}
	};

	$scope.$on('$ionicView.enter', function() {
		$scope.doRefresh();
	});

	$scope.$on('$ionicView.leave', function() {
	});

}


})();
