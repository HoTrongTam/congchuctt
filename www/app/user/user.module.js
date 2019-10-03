/*
* User module
* Auth: ThanhTN
*/


(function() {
"use strict";


angular
	.module("FTravel.user", [])
	.config(function($stateProvider) {

		$stateProvider

			.state("app.intro", {
				url: "/intro",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/intro.view.html",
						controller: "IntroCtrl"
					}
				}
			})
			
			.state("app.danhba",{
				url: "/danhba",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/danh-ba/ds-danhba.view.html",
						controller: "DanhBaListCtrl"
					}
				}
			})
			.state("app.config", {
				url: "/config",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/config.view.html",
						controller: "ConfigCtrl"
					}
				}
			})

			.state("app.user-register", {
				url: "/user-register",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/user-register.view.html",
						controller: "UserRegisterCtrl"
					}
				}
			})

			.state("app.home", {
				url: "/home",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/home.view.html",
						controller: "HomeCtrl"
					}
				}
			})

			.state("app.user-profile", {
				url: "/user-profile",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/user-profile.view.html",
						controller: "UserProfileCtrl"
					}
				}
			})

			.state("app.change-user-profile", {
				url: "/change-user-profile/:userId",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/change-password.view.html",
						controller: "ChangeUserProfileCrl"
					}
				}
			})

			.state("app.login", {
				url: "/login",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/login.view.html",
						controller: "LoginCtrl"
					}
				}
			})

			.state("app.about", {
				url: "/about",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/about.view.html",
						controller: "AboutCtrl"
					}
				}
			})

			.state("app.huong-dan-su-dung", {
				url: "/huong-dan-su-dung",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/huong-dan-su-dung.view.html",
						controller: "HDSDCtrl"
					}
				}
			})

		

		;
	});


})();
