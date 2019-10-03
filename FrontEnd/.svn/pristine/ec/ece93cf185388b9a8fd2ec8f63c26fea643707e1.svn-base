/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.tracuu", [])
    .config(function($stateProvider) {

        $stateProvider

            .state("app.ds-tracuu", {
                url: "/ds-tracuu",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/tra-cuu/ds-tracuu.view.html",
                        controller: "TraCuuListCtrl"
                    }
                }
            })
        ;

    });

})();