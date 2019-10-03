/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.lichcongtac", [])
    .config(function($stateProvider) {

        $stateProvider

            .state("app.ds-lichcongtac", {
                url: "/ds-lichcongtac",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/lich-cong-tac/ds-lichcongtac.view.html",
                        controller: "LichCongTacListCtrl"
                    }
                }
            })

            .state("app.chitietlichcongtac", {
                url: "/chitietlichcongtac",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/lich-cong-tac/chitietlichcongtac.view.html",
                        controller: "ChiTietLichCongTacCtrl"
                    }
                }
            })

        ;

    });

})();