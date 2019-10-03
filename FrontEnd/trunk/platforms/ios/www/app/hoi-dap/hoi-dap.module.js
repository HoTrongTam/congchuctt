/*
 * procedure module
 * Auth: ThanhTN
 */


(function() {
    "use strict";


    angular
        .module("FTravel.hoidap", [])
        .config(function($stateProvider) {

            $stateProvider

                .state("app.hoidap-list", {
                url: "/hoidap-list",
                cache: true,
                params: {
                    item: null,
                    id: null,
                    mode: null
                },
                views: {
                    "menuContent": {
                        templateUrl: "app/hoi-dap/hoidap-list.view.html",
                        controller: "HoiDapListCtrl"
                    }
                }
            })

            .state("app.hoidap-detail", {
                url: "/hoidap-detail",
                cache: false,
                params: {
                    id: null
                },
                views: {
                    "menuContent": {
                        templateUrl: "app/hoi-dap/hoidap-detail.view.html",
                        controller: "HoiDapDetailCtrl"
                    }
                }
            });
        });


})();