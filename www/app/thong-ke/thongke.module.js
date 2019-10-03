/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.thongke", [])
    .config(function($stateProvider) {

        $stateProvider

            .state("app.ds-thongke", {
                url: "/ds-thongke",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/ds-thongke.view.html",
                        controller: "ThongKeListCtrl"
                    }
                }
            })

            .state("app.thongke-giaiquyetdonthu", {
                url: "/thongke-giaiquyetdonthu",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/thongke-giaiquyetdonthu.view.html",
                        controller: "ThongKeGiaiQuyetDonThuCtrl"
                    }
                }
            })

            .state("app.thongke-danhgiahailong", {
                url: "/thongke-danhgiahailong",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/thongke-danhgiahailong.view.html",
                        controller: "ThongKeDanhGiaHaiLongCtrl"
                    }
                }
            })

            .state("app.thongke-congviecdagiao", {
                url: "/thongke-congviecdagiao",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/thongke-congviecdagiao.view.html",
                        controller: "ThongKeCongViecDaGiaoCtrl"
                    }
                }
            })

            .state("app.thongke-xulyphananh", {
                url: "/thongke-xulyphananh",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/thongke-xulyphananh.view.html",
                        controller: "ThongKeXuLyPhanAnhCtrl"
                    }
                }
            })

            .state("app.thongke-xulyhoso", {
                url: "/thongke-xulyhoso",
                cache: false,
                params: {},
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/thongke-xulyhoso.view.html",
                        controller: "ThongKeXuLyHoSoCtrl"
                    }
                }
            })

            .state("app.thongke-xulyvanban", {
                url: "/thongke-xulyvanban",
                cache: false,
                params: { },
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/thongke-xulyvanban.view.html",
                        controller: "ThongKeXuLyVanBanCtrl"
                    }
                }
            })

            .state("app.thongke-chuyennganh", {
                url: "/thongke-chuyennganh",
                cache: false,
                params: { mode: 'read', sreach: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/thongke-chuyennganh.view.html",
                        controller: "ThongKeChuyenNganhCtrl" 
                    }
                },
                reload: true
            })

            .state("app.thongke-xuphathanhchinh", {
                url: "/thongke-xuphathanhchinh",
                cache: false,
                params: {
                    mode: 'read',
                    sreach: null
                },
                views: {
                    "menuContent": {
                        templateUrl: "app/thong-ke/thongke-xuphathanhchinh.view.html",
                        controller: "ThongKeXuPhatHanhChinhCtrl"
                    }
                }
            })
        ;

    });

})();