/*
 * document module
 */


(function () {
    "use strict";


    angular
        .module("FTravel.phananhkiennghi", [])
        .config(function ($stateProvider) {

            $stateProvider

                .state("app.ds-phananh-kiennghi", {
                    url: "/ds-phananh-kiennghi",
                    cache: false,
                    params: {
                        id: null,
                        item: null
                    },
                    views: {
                        "menuContent": {
                            templateUrl: "app/phananh-kiennghi/ds-phananh-kiennghi.view.html",
                            controller: "PhanAnhKienNghiListCtrl"
                        }
                    }
                })

                .state("app.chitiet-phananhkiennghi", {
                    url: "/chitiet-phananhkiennghi",
                    cache: false,
                    params: {
                        id: null,
                        tinhtrang: null
                    },
                    views: {
                        "menuContent": {
                            templateUrl: "app/phananh-kiennghi/chitiet-phananhkiennghi.view.html",
                            controller: "ChiTietPhanAnhKienNghiCtrl"
                        }
                    }
                });
        });

})();