/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.quyhoach", [])
    .config(function($stateProvider) {

        $stateProvider

            .state("app.ds-quyhoach", {
                url: "/ds-quyhoach",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/quy-hoach/ds-quyhoach.view.html",
                        controller: "QuyHoachListCtrl"
                    }
                }
            })
            .state("app.ds-quyhoachcongdan", {
                url: "/ds-quyhoachcongdan",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/quy-hoach/ds-quyhoachcongdan.view.html",
                        controller: "QuyHoachCongDanListCtrl"
                    }
                }
            })

        ;

    });

})();