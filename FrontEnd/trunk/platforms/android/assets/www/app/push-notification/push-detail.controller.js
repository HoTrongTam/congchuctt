/*
* Push-Detail controller
* @2017
*/

(function() {
'use strict';


angular
	.module('FTravel.push')
	.controller('PushDetailCtrl', pushDetailCtrl)
;

pushDetailCtrl.$inject = [
	'$scope', '$state', '$ionicHistory',
	'PushFtr', 'CONST'
];

function pushDetailCtrl (
	$scope, $state, $ionicHistory,
	PushFtr, CONST
) {
	$scope.title = 'PUSH DETAIL';
	$scope.item = $state.params.item;

	$scope.getDetail = function() {
		// PushFtr.getDetail($scope.item.pushID, function(status, msg, data){
		// 	$scope.detail = data;
		// 	if(!$scope.detail.viewed)
		// 		PushFtr.setViewed($scope.item.pushID ,function(status, msg, data){});
		// });
	};

	// Event
	$scope.doRefresh = function() {
		$scope.getDetail();
	};

	$scope.onDeleteTapped = function() {
	};

	$scope.$on('$ionicView.loaded', function() {
	});

	$scope.$on('$ionicView.enter', function() {
		$scope.getDetail();
	});

	$scope.$on('$ionicView.leave', function() {
	});
}


})();
