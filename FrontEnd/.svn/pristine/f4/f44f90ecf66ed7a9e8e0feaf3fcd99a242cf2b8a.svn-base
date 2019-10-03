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
		'CONST'
	];

	function danhBaListCtrl(
		$scope, $rootScope, $state,
		CONST
	) {
		$scope.title = 'DANH SÁCH DANH BẠ';

		$scope.search = function () {
			$state.go('app.procedure-list', {});
		};

		$scope.$on('$ionicView.loaded', function () {});

		$scope.$on('$ionicView.enter', function () {});

		$scope.$on('$ionicView.leave', function () {});

	}


})();