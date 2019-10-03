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
                cache: true,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/tra-cuu/ds-tracuu.view.html",
                        controller: "TraCuuListCtrl"
                    }
                }
            })
            .state("app.tracuuchitietvbxuly", {
                url: "/ds-tracuu/chitietvbxuly",
                cache: false,
                params: { mode: 'read', sreach: null, VanbandenID:null, VanbandiID:null },
                views: {
                    "menuContent": {
                        templateUrl: "app/tra-cuu/chitietvbxuly.view.html",
                        controller: "TCVBXuLyCtrl"
                    }
                }
            })

            .state("app.tracuuchitiethoso", {
                url: "/ds-tracuu/chitiethoso",
                cache: false,
                params: { mode: 'read', sreach: null , HosoID: null},
                views: {
                    "menuContent": {
                        templateUrl: "app/tra-cuu/chitiethoso.view.html",
                        controller: "CTHoSoCtrl"
                    }
                }
            })

            .state("app.tracuuchitietvbchidao", {
                url: "/ds-tracuu/chitietvbchidao",
                cache: false,
                params: { mode: 'read', sreach: null, Loaivb:null, ChidaoID:null, Congviecid:null},
                views: {
                    "menuContent": {
                        templateUrl: "app/tra-cuu/chitietvbchidao.view.html",
                        controller: "CTVBChiDaoCtrl"
                    }
                }
            })
        ;

    });

})();