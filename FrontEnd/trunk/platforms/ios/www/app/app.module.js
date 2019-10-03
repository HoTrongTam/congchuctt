// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('FTravel', ['ionic', 'ngCordova',
	// 'app.templates', // do not edit manual
	'environment',
	'ionic-toast',
	'mobiscroll-datetime',
	'mobiscroll-select',
	'mobiscroll-form',
	'ng-fusioncharts',

	'FTravel.factory',
	'FTravel.controllers',
	'FTravel.api',

	'FTravel.hoidap',
	'FTravel.master',
	'FTravel.user',
	'FTravel.document',
	'FTravel.build',
	'FTravel.procedure'
])

.run(function($rootScope, $ionicPlatform, $state, $ionicHistory, $ionicPopup, File) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); // don't support iOS
			cordova.plugins.Keyboard.disableScroll(true);
		}

		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			// StatusBar.hide();
			// StatusBar.styleDefault();
			// StatusBar.styleLightContent();
			// if (ionic.Platform.isAndroid()
			StatusBar.backgroundColorByHexString("#212936");
		}

		if(window.cordova) {
			// $(function() {
		    // 	FastClick.attach(document.body);
			// });
			// window.addEventListener("statusTap", function (e) {
			// 		$ionicScrollDelegate.scrollTop(true);
			// 	e.preventDefault();
			// });
			File.getFilePath();

			// codePush.sync();

			// hockeyapp.start(
			// 	// successCallback: function
			// 	null,
            //
			// 	// errorCallback: function
			// 	null,
            //
			// 	// appId: string
			// 	ionic.Platform.isIOS() ? "7a379a1651814c2ba1cb2a3dccd11410": "53f35d9b700549a99f89f9dcd1fb677f",
            //
			// 	// autoSend?: boolean,
			// 	true,
            //
			// 	// checkForUpdateMode?: hockeyapp.checkForUpdateMode,
			// 	hockeyapp.checkForUpdateMode.CHECK_ON_STARTUP,
            //
			// 	// ignoreDefaultHandler?: boolean
			// 	true,
            //
			// 	// createNewFeedbackThread?: boolean
			// 	null,
            //
			// 	// loginMode?: hockeyapp.loginMode
			// 	null,
            //
			// 	// appSecret?: string
			// 	null
			// );
		}

		// DB.init();
		// window.addEventListener("statusTap", function (e) {
        //     e.preventDefault();
        // }, false );

		if( ionic.Platform.isAndroid() ) {
			$ionicPlatform.registerBackButtonAction(function () {
				var _state = $state.current.name;
				if ( _state === 'app.intro' || _state === 'app.home') {
		            var p = $ionicPopup.confirm({
		              	title: '<strong>Thoát ứng dụng</strong>',
		              	template: 'Bạn có muốn thoát ứng dụng?'
		            });

					p.then(function(ok) {
		              	if (ok) navigator.app.exitApp();
		            });
				// } else if(_state == 'app.document-detail') {
				// 	$rootScope.$emit('DocumentDetailCtrl.closeSelectedBox',{});
	          	} else $ionicHistory.goBack();
			}, 100);
	  	}

		// $(document).ready(function () {
		// 	$('input').on('keyup', function(e) {
		// 		var theEvent = e || window.event;
		// 		var keyPressed = theEvent.keyCode || theEvent.which;
		// 		if (keyPressed == 13) {
		// 			cordova.plugins.Keyboard.close();
		// 		}
		// 		return true;
		// 	});
		// });

	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $logProvider, $compileProvider, envServiceProvider, CONST
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
	$urlRouterProvider.otherwise('/app/home');
	//  $urlRouterProvider.otherwise('/app/sign-in');
})

.directive("filesInput", function() {
  	return {
	    require: "ngModel",
	    link: function postLink(scope,elem,attrs,ngModel) {
	      	elem.on("change", function(e) {
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
