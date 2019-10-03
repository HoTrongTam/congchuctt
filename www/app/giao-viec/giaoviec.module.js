/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.giaoviec", [])
    .config(function($stateProvider) {

		$stateProvider

            .state("app.ds-giaoviec", {
                url: "/ds-giaoviec",
    			cache: false,
    			params: {mode:'read', sreach:null},
    			views: {
    				"menuContent": {
                        templateUrl: "app/giao-viec/ds-giaoviec.view.html",
                        controller: "GiaoViecListCtrl"
    				}
    			}
            })
            
            .state("app.chitietgiaoviec", {
                url: "/chitietgiaoviec",
                cache: false,
                params: { giaoViecID: null, tinhtrang: null, isDaGiao: null,index: null},
                views: {
                    "menuContent": {
                        templateUrl: "app/giao-viec/chitietgiaoviec.view.html",
                        controller: "ChiTietGiaoViecCtrl"
                    }
                }
            })

            .state("app.nhapgiaoviec", {
                url: "/nhapgiaoviec",
                cache: false,
                params: {  giaoViecID: null, tinhtrang: null, isID: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/giao-viec/nhapgiaoviec.view.html",
                        controller: "NhapGiaoViecCtrl"
                    }
                }
            })

        ;
    });


})();
