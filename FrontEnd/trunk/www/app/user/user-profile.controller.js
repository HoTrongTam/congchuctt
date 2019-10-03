(function () {
	'use strict';


	angular
		.module('FTravel.user')
		.controller('UserProfileCtrl', userProfileCtrl);

	userProfileCtrl.$inject = [
		'$scope', '$rootScope', '$state', '$ionicHistory', '$ionicPopup',
		'CONST', 'LSFtr', 'Popup', 'UserFtr'
	];

	function userProfileCtrl(
		$scope, $rootScope, $state, $ionicHistory, $ionicPopup,
		CONST, LSFtr, Popup, UserFtr) {
		$scope.hasImg = false;
		$scope.tabActive = 1;
		$scope.opentab = function (tabActive) {
			$scope.tabActive = tabActive;
		};

	}


})();