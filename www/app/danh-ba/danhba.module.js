/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.danhba", [])
    .config(function($stateProvider) {

        $stateProvider

            .state("app.ds-danhba", {
                url: "/ds-danhba",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/danh-ba/ds-danhba.view.html",
                        controller: "DanhBaListCtrl"
                    }
                }
            })

            .state("app.chitietdanhba", {
                url: "/chitietdanhba",
                cache: false,
                params: { UserID: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/danh-ba/chitietdanhba.view.html",
                        controller: "ChiTietDanhBaCtrl"
                    }
                }
            })
        
        ;

    });

})();