
/*
* PushNotification module
* @2017
*/


(function() {
'use strict';


angular
	.module('FTravel.push', [])
	.config(function($stateProvider) {

		$stateProvider
			.state('app.push', {
				url: '/push',
				cache: true,
				views: {
					'menuContent': {
						templateUrl: 'app/push-notification/push.view.html',
						controller: 'PushCtrl'
					}
				}
			})
			.state('app.push-detail', {
				url: '/push-detail',
				cache: false,
				params: { item: '' },
				views: {
					'menuContent': {
						templateUrl: 'app/push-notification/push-detail.view.html',
						controller: 'PushDetailCtrl'
					}
				}
			})
		;

	});


})();
