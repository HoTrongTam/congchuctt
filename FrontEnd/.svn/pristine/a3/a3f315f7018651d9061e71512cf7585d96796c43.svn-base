/**
 * home controller
 * @2017
 **/



(function() {
'use strict';


angular
    .module('FTravel.user')
    .controller('Home2Ctrl', home2Ctrl)
;

home2Ctrl.$inject = [
    '$scope', '$rootScope', '$state', '$ionicHistory', '$ionicPlatform',
    'CONST', 'Datetime', 'Popup',
    'DocumentFtr', 'ProcedureFtr', 'MasterFtr', 'UserFtr'
];

function home2Ctrl(
    $scope, $rootScope, $state, $ionicHistory, $ionicPlatform,
    CONST, Datetime, Popup,
    DocumentFtr, ProcedureFtr, MasterFtr, UserFtr
) {
    $scope.title = "Dịch vụ công";

    $scope.dt = Datetime;
	$scope.filterModel = DocumentFtr.getFilterDef();

    $scope.dsTinTuc = [];
    $scope.documents = [];
    $scope.procedures = [];

	$scope.dsDonVi = [];
	$scope.noMoreItemsAvailable = false;
	$scope.pageNo = 1;

    $scope.sorter = [
        '-NgayDangKy'
    ];


    $scope.$on('$ionicView.loaded', function() {
	});

    $scope.$on('$ionicView.enter', function() {
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
		$ionicPlatform.ready(function(){
			//$scope.doRefresh();
		});
    });

    $scope.$on('$ionicView.leave', function() {
	});

    $scope.options = {
	  loop: false,
	  effect: 'fade',
	  speed: 3000,//1000 ~ 1 giay
	  autoplay: 2000,
	};
}


})();
