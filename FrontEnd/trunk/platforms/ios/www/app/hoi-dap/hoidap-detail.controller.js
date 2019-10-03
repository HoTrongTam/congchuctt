
/**
 * procedure list controller
 * @2017
 **/



(function() {
'use strict';


angular
	.module('FTravel.hoidap')
	.controller('HoiDapDetailCtrl', hoiDapDetailCtrl)
;

hoiDapDetailCtrl.$inject = [
	'$scope', '$rootScope', '$state', '$timeout', '$filter',
	'CONST', 'LSFtr', 'Popup', 'MasterFtr','HoiDapFtr','Datetime'
];

function hoiDapDetailCtrl (
	$scope, $rootScope, $state, $timeout, $filter,
	CONST, LSFtr, Popup, MasterFtr,HoiDapFtr,Datetime
) {
	$scope.title = 'Chi tiết câu hỏi';

	$scope.detail = {};
	$scope.intCauHoiID = $state.params.id;
	$scope.dt = Datetime;
	$scope.getDetail = function () {
		HoiDapFtr.getChiTietCauHoi($scope.intCauHoiID).then(function (rep) {
			$scope.detail = rep;
			//console.log(rep);
		},function (err) {
			Popup.e(err);
		});
	}
	$scope.$on('$ionicView.loaded', function() {
		$scope.getDetail();
	});

	$scope.$on('$ionicView.enter', function() {
	});

	$scope.$on('$ionicView.leave', function() {
	});

}


})();
