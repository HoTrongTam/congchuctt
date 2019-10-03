/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.document", [])
    .config(function($stateProvider) {

		$stateProvider

            .state("app.document-list", {
    			url: "/document-list",
    			cache: false,
    			params: {mode:'read', sreach:null},
    			views: {
    				"menuContent": {
    					templateUrl: "app/quan-ly-ho-so/document-list.view.html",
    					controller: "DocumentListCtrl"
    				}
    			}
            })

            .state("app.document-detail", {
                url: "/document-detail",
                cache: false,
                params: { mode: 'detail', id: null, item: null, hoSo: null, thuTuc: null, soBienNhan: null, maTraCuu: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/quan-ly-ho-so/document-detail.view.html",
                        controller: "DocumentDetailCtrl"
                    }
                }
            })

        ;
    });


})();
