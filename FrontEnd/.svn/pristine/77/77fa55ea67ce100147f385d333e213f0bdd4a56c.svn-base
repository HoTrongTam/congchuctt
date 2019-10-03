
/**
 * search controller
 * ThanhTN
 * @2017
 **/



(function() {
'use strict';


angular
	.module('FTravel.procedure')
	.controller('SearchCtrl', searchCtrl)
;

searchCtrl.$inject = [
	'$scope', '$rootScope', '$state',
	'CONST'
];

function searchCtrl (
	$scope, $rootScope, $state,
	CONST
) {
	console.log('SearchCtrl called');

	$scope.title = 'Tìm kiếm';

	$scope.search_txt = '';

	$scope.search = function() {
		$state.go('app.procedure-list', {});
	};

	$scope.$on('$ionicView.loaded', function() {
	});

	$scope.$on('$ionicView.enter', function() {
	});

	$scope.$on('$ionicView.leave', function() {
	});

}


})();
