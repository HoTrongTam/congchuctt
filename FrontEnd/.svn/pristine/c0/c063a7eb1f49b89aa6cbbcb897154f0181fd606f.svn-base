/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.xulycongviec", [])
    .config(function($stateProvider) {

        $stateProvider

            .state("app.ds-xulycongviec", {
                url: "/ds-xulycongviec",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/xu-ly-cong-viec/ds-xulycongviec.view.html",
                        controller: "XuLyCongViecListCtrl"
                    }
                }
            })

            .state("app.chuyenxuly", {
                url: "/chuyenxuly",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/xu-ly-cong-viec/chuyenxuly.view.html",
                        controller: "ChuyenXuLyCtrl"
                    }
                }
            })

            .state("app.chitietvbxuly", {
                url: "/chitietvbxuly",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/xu-ly-cong-viec/chitietvbxuly.view.html",
                        controller: "ChiTietVBXuLyCtrl"
                    }
                }
            })
        
            .state("app.chitiethoso", {
                url: "/chitiethoso",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/xu-ly-cong-viec/chitiethoso.view.html",
                        controller: "ChiTietHoSoCtrl"
                    }
                }
            })
        
            .state("app.chitietvbchidao", {
                url: "/chitietvbchidao",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/xu-ly-cong-viec/chitietvbchidao.view.html",
                        controller: "ChiTietVBChiDaoCtrl"
                    }
                }
            })
        
            .state("app.travb", {
                url: "/travb",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "/app/xu-ly-cong-viec/travb.view.html",
                        controller: "TraVBCtrl"
                    }
                }
            })
        
        ;

    });

})();