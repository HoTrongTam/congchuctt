/*
 * document module
 */


(function () {
    "use strict";


    angular
        .module("FTravel.xulycongviec", [])
        .config(function ($stateProvider) {

            $stateProvider

                .state("app.ds-xulycongviec", {
                    url: "/ds-xulycongviec",
                    cache: true,
                    params: { id: null, item: null },
                    views: {
                        "menuContent": {
                            templateUrl: "app/xu-ly-cong-viec/ds-xulycongviec.view.html",
                            controller: "XuLyCongViecListCtrl"
                        }
                    }
                })

                .state("app.chuyenxuly", {
                    url: "/chuyenxuly",
                    cache: false,
                    params: { congviecid: null, loaivanban: null, congviecchaid: null, xulychinh: null },
                    views: {
                        "menuContent": {
                            templateUrl: "app/xu-ly-cong-viec/chuyenxuly.view.html",
                            controller: "ChuyenXuLyCtrl"
                        }
                    }
                })

                .state("app.chitietvbxuly", {
                    url: "/chitietvbxuly",
                    cache: false,
                    params: { id: null, loaivanban: null, congviecchaid: null, xulychinhid: null },
                    views: {
                        "menuContent": {
                            templateUrl: "app/xu-ly-cong-viec/chitietvbxuly.view.html",
                            controller: "ChiTietVBXuLyCtrl"
                        }
                    }
                })

                .state("app.chitiethoso", {
                    url: "/chitiethoso",
                    cache: false,
                    params: { id: null, item: null },
                    views: {
                        "menuContent": {
                            templateUrl: "app/xu-ly-cong-viec/chitiethoso.view.html",
                            controller: "ChiTietHoSoCtrl"
                        }
                    }
                })

                .state("app.chitietvbchidao", {
                    url: "/chitietvbchidao",
                    cache: false,
                    params: { congviecid: null, chidaoid: null, loaivanban: null, vanbanid: null },
                    views: {
                        "menuContent": {
                            templateUrl: "app/xu-ly-cong-viec/chitietvbchidao.view.html",
                            controller: "ChiTietVBChiDaoCtrl"
                        }
                    }
                })

                .state("app.travb", {
                    url: "/travb",
                    cache: false,
                    params: { congviecid: null, loaivanban: null, sovb: null, noidung: null },
                    views: {
                        "menuContent": {
                            templateUrl: "app/xu-ly-cong-viec/travb.view.html",
                            controller: "TraVBCtrl"
                        }
                    }
                })

                .state("app.chuyenhoso", {
                    url: "/chuyenhoso",
                    cache: false,
                    params: { congviecid: null, sobiennhan: null, loaihoso: "", nguoidaidien: "" },
                    views: {
                        "menuContent": {
                            templateUrl: "app/xu-ly-cong-viec/chuyenhoso.view.html",
                            controller: "ChuyenHSCtrl"
                        }
                    }
                })

                .state("app.trahs", {
                    url: "/trahoso",
                    cache: false,
                    params: { congviecid: null, sobiennhan: null, loaihoso: "", nguoidaidien: "" },
                    views: {
                        "menuContent": {
                            templateUrl: "app/xu-ly-cong-viec/trahs.view.html",
                            controller: "TraHSCtrl"
                        }
                    }
                })

                ;

        });

})();
