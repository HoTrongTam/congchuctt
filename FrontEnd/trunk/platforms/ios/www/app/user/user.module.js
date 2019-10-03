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

			// .state("app.sign-in", {
			// 	url: "/sign-in",
			// 	cache: false,
			// 	views: {
			// 		"menuContent": {
			// 			templateUrl: "app/user/login.view.html",
			// 			controller: "LoginCtrl"
			// 		}
			// 	}
			// })

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
						templateUrl: "app/user/change-user-profile.view.html",
						controller: "ChangeUserProfileCrl"
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

			.state("app.tin-tuc-detail", {
				url: "/tin-tuc-detail",
				params: { id:null, item:null },
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/news-detail.view.html",
						controller: "NewsDetailCtrl"
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

			.state("app.tra-cuu-lich-lanh-dao", {
				url: "/tra-cuu-lich-lanh-dao",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/tra-cuu-lich-lanh-dao.view.html",
						controller: "LichLanhDaoCtrl"
					}
				}
			})
			
			.state("app.thong-bao", {
				url: "/thong-bao",
				cache: false,
				views: {
					"menuContent": {
						templateUrl: "app/user/thong-bao.view.html",
						controller: "ThongBaoCrl"
					}
				}
			})

		;
	});


})();
