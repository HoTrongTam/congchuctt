/*
* PushNotification controller
* Auth: ThanhTN
*/

(function() {
'use strict';


angular
	.module('FTravel.push')
	.controller('PushCtrl', pushController)
;

pushController.$inject = [
	'$scope', '$rootScope', '$state', '$ionicHistory', '$ionicListDelegate',
	'CONST', 'PushFtr'
];

function pushController (
	$scope, $rootScope, $state, $ionicHistory, $ionicListDelegate,
	CONST, PushFtr
) {
	// list
	$scope.list = [];
	$scope.noMoreItemsAvailable = false;
	$scope.pageCurr = 0;
	$scope.hasError = false;

	$scope.getList = function(callback) {
		var params = {
			offset		: $scope.pageCurr * CONST.pageSize,
			limit		: CONST.pageSize
		};
		PushFtr.getList(params, callback);
	};

	// Event
	$scope.doRefresh = function(callback) {
		$scope.pageCurr = 0;
		$scope.noMoreItemsAvailable = false;
		$scope.list = [];

		$scope.loadMore();
	};

	$scope.loadMore = function() {
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.$broadcast('scroll.refreshComplete');
		if(!$scope.noMoreItemsAvailable) {
		}
	};

	$scope.onItemTapped = function(item) {
	};

	$scope.onDeleteTapped = function(item) {
		$ionicListDelegate.closeOptionButtons();
	};

	$scope.$on('$ionicView.loaded', function() {
	});

	$scope.$on('$ionicView.enter', function() {
	});

	$scope.$on('$ionicView.leave', function() {
	});
}


})();
