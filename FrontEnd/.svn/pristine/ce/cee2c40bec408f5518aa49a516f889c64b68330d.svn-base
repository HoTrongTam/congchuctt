/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.thongbao", [])
    .config(function($stateProvider) {

        $stateProvider

            .state("app.ds-thongbao", {
                url: "/ds-thongbao",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/thong-bao/ds-thongbao.view.html",
                        controller: "ThongBaoListCtrl"
                    }
                }
            })

            .state("app.chitietthongbao", {
                url: "/chitietthongbao",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/thong-bao/chitietthongbao.view.html",
                        controller: "ChiTietThongBaoCtrl"
                    }
                }
            })

        ;

    });

})();