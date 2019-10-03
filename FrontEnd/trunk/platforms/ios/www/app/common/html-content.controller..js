
/**
 * procedure controller
 * ThanhTN
 * @2017
 **/



(function() {
'use strict';


angular
	.module('FTravel.factory')
	.controller('HtmlContentCtrl', htmlContentCtrl)
;

htmlContentCtrl.$inject = [
	'$scope', '$state',
	'CONST'
];

function htmlContentCtrl (
	$scope, $state,
	CONST
) {
	console.log('HtmlContentCtrl called');

	$scope.title = "";


	$scope.downloadFileTapped = function(file_url) {
	};

	$scope.$on('$ionicView.loaded', function() {});

	$scope.$on('$ionicView.enter', function() {});

	$scope.$on('$ionicView.leave', function() {});

}


})();
