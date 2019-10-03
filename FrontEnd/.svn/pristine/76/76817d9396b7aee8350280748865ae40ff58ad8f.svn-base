
/**
 * Dashboard controller
 * @2017
 **/



(function() {
'use strict';


angular
	.module('FTravel.user')
	.controller('HDSDCtrl', hDSDCtrl)
;

hDSDCtrl.$inject = [
	'$scope', '$rootScope', '$state', '$ionicSlideBoxDelegate',
	'API', 'File', 'UserFtr', 'Popup'
];

function hDSDCtrl (
	$scope, $rootScope, $state, $ionicSlideBoxDelegate,
	API, File, UserFtr, Popup
) {
	$scope.title = 'HƯỚNG DẪN SỬ DỤNG';

	$scope.dsHDSD = [];

	UserFtr.getHDSD().then(function(rep){
		$scope.dsHDSD = rep;
	}, function(err){
		Popup.e(err);
	});

	$scope.openFile = function(fileName, fileID) {
		fileName = $scope.dsHDSD[0].TenConfig;
		fileID = $scope.dsHDSD[0].GiaTri;
		var _url = encodeURI( API.base + '/DVC/downloadBieuMauHS?fileName=' + fileID );
		File.open2(_url, fileID);
	};

	$scope.$on('$ionicView.loaded', function() {
	});

	$scope.$on('$ionicView.enter', function() {
	});

	$scope.$on('$ionicView.leave', function() {
	});

}


})();
