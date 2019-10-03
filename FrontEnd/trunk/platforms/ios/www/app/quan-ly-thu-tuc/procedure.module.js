/*
* procedure module
* Auth: ThanhTN
*/


(function() {
"use strict";


angular
	.module("FTravel.procedure", [])
	.config(function($stateProvider) {

		$stateProvider

			.state("app.procedure-list", {
				url: "/procedure-list",
				cache: true,
				params: { item: null, id: null, mode: null },
				views: {
					"menuContent": {
						templateUrl: "app/quan-ly-thu-tuc/procedure-list.view.html",
						controller: "ProcedureListCtrl"
					}
				}
			})

			.state("app.procedure-detail", {
				url: "/procedure-detail",
				cache: false,
				params: { item: null, id: null },
				views: {
					"menuContent": {
						templateUrl: "app/quan-ly-thu-tuc/procedure-detail.view.html",
						controller: "ProcedureDetailCtrl"
					}
				}
			})

			.state("app.search", {
				url: "/search",
				cache: false,
				params: { },
				views: {
					"menuContent": {
						templateUrl: "app/quan-ly-thu-tuc/search.view.html",
						controller: "SearchCtrl"
					}
				}
			})

		;
	});


})();
