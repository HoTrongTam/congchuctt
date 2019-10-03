// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('FTravel', ['ionic', 'ngCordova',
	// 'app.templates', // do not edit manual
	'environment',
	'ionic-toast',
	'ion-tree-list',
	'mobiscroll-datetime',
	'mobiscroll-select',
	'mobiscroll-form',
	'ng-fusioncharts',
	'ion-tree-list',
	'FTravel.factory',
	'FTravel.controllers',
	'FTravel.api',
	'FTravel.master',
	'FTravel.user',
	'FTravel.giaoviec',
	'FTravel.xulycongviec',
	'FTravel.lichcongtac',
	'FTravel.danhba',
	'FTravel.thongbao',
	'FTravel.tracuu',
	'FTravel.quyhoach',
	'FTravel.thongke',
	'FTravel.phananhkiennghi',
	'FTravel.sqlite'
])

	.run(function ($rootScope, $ionicPlatform, $state, $ionicHistory, DB, DB_CONFIG, $ionicPopup, File) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false); // don't support iOS
				cordova.plugins.Keyboard.disableScroll(false);
			}

			if (window.StatusBar) {
				// StatusBar.styleLightContent();
				StatusBar.overlaysWebView(false);
				StatusBar.backgroundColorByHexString("#1f2933");
				ionic.Platform.fullScreen(true, true);
			}
			if (window.cordova) {
				File.getFilePath();
			}
			// FCMPlugin.getToken(function (token) {
			// 	if(token == null || token == undefined){
			// 		FCMPlugin.onTokenRefresh(function (token2) {
			// 			console.log('reg token2: ' + token2);
			// 			$rootScope.OsKey = token2;
			// 			// alert(token);
			// 		}, function (err) {
			// 			console.log('error retrieving token: ' + err);
			// 		});	
			// 	}else{
			// 		$rootScope.OsKey = token;
			// 		console.log('reg token: ' + $rootScope.OsKey);
			// 	}
			// 	// alert(token);
			// }, function (err) {
			// 	console.log('error retrieving token: ' + err);
			// });
								
			if (window.cordova) {
				File.getFilePath();
			}
			DB.init();
			DB.select(DB_CONFIG.user_table).then(function (res) {
				if (res !== null) {
					$state.go('app.home');
					$rootScope.password = res.password;
					// alert($rootScope.password);
				} else {
					$state.go('app.login');
				}
			});
			if (ionic.Platform.isAndroid()) {
				$ionicPlatform.registerBackButtonAction(function () {
					var _state = $state.current.name;
					if (_state === 'app.intro' || _state === 'app.home') {
						var p = $ionicPopup.confirm({
							title: '<strong>Thoát ứng dụng</strong>',
							template: 'Bạn có muốn thoát ứng dụng?',
							cancelText: 'Thoát',
							okText: 'Đồng ý'
						});

						p.then(function (ok) {
							if (ok) navigator.app.exitApp();
						});
						// } else if(_state == 'app.document-detail') {
						// 	$rootScope.$emit('DocumentDetailCtrl.closeSelectedBox',{});
					} else $ionicHistory.goBack();
				}, 100);
			}

		});
	})

	.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $logProvider, $compileProvider, envServiceProvider, CONST
	) {
		// $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
		// var jsScrolling = (ionic.Platform.isAndroid() ) ? false : true;
		$ionicConfigProvider.scrolling.jsScrolling(false);
		$ionicConfigProvider.backButton.previousTitleText(false);
		$ionicConfigProvider.backButton.text('');
		// $ionicConfigProvider.tabs.position('bottom');
		$ionicConfigProvider.views.swipeBackEnabled(false);

		if (CONST.APP_MODE === 'production') {
			$logProvider.debugEnabled(false);
			$compileProvider.debugInfoEnabled(false);
		} else {
		}

		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				cache: true,
				templateUrl: 'app/main.html',
				controller: 'MainCtrl'
			})
			;

		// set the domains and variables for each environment
		envServiceProvider.config({
			vars: {
				development: {
					base: CONST.BASE_DEV
				},
				production: {
					base: CONST.BASE_PRO
				}
			}
		});

		// run the environment check, so the comprobation is made
		// before controllers and services are built
		envServiceProvider.check();
		envServiceProvider.set(CONST.APP_MODE);

		// if none of the above states are matched, use this as the fallback
		// $urlRouterProvider.otherwise('/app/dashboard');
		// $urlRouterProvider.otherwise('/app/intro');

		// $urlRouterProvider.otherwise('/app/home');
		$urlRouterProvider.otherwise('/app/login');

	})

	.directive("filesInput", function () {
		return {
			require: "ngModel",
			link: function postLink(scope, elem, attrs, ngModel) {
				elem.on("change", function (e) {
					var files = elem[0].files;
					ngModel.$setViewValue(files);
				})
			}
		}
	})

	// .directive('autofocus', function($timeout) {
	//   return {
	//     link: function(scope, element, attrs) {
	//       $timeout(function() {
	//         element[0].focus();
	// 	}, 250);
	//     }
	//   };
	// })

	;
