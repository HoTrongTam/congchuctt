/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeXuLyVanBanCtrl', thongKeXuLyVanBanCtrl);

    thongKeXuLyVanBanCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', 'ThongKeFtr',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeXuLyVanBanCtrl(
        $scope, $rootScope, $state, $filter, ThongKeFtr,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH XỬ LÝ VĂN BẢN ";
        $scope.tabIndex = 0;
        $scope.myDataSource_thongke = {};
        $scope.myDataSource_thongke1 = {};
        $scope.dataTKVBDen = {};
        //Xu ly thang nam
        var date = new Date();
        $scope.monthcurrent = date.getMonth();
        $scope.current = date.getFullYear();
        $scope.monthArray = [];
        $scope.yearArray = [];
        $scope.formVBDen = {};
        var start = $scope.current - 4;
        var end = $scope.current;
        $scope.daycurrent = date.getDate();
        for (var i = 1; i <= 12; i++) {
            $scope.monthArray.push(i);
        }
        for (var i = start; i <= end; i++) {
            $scope.yearArray.push(i);
        }
        $scope.formdate = {
            month: $scope.monthcurrent + 1,
            year: $scope.current
        }
        $scope.countSelectedMonths = $scope.monthArray[$scope.monthcurrent];
        $scope.countSelectedYears = $scope.current;
        $scope.onChangeYears = function (id) {
            $scope.formdate.year = id
            if ($scope.tabIndex == 0) {
                $scope.funcGetTKVBDen($scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.funcGetTKVBDi($scope.formdate.month, $scope.formdate.year);
            }

        };
        $scope.onChangeMonths = function (id) {
            $scope.formdate.month = id;
            if ($scope.tabIndex == 0) {
                $scope.funcGetTKVBDen($scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.funcGetTKVBDi($scope.formdate.month, $scope.formdate.year);
            }
        }
        //
        $scope.onTabChange = function (tabIndex) {
            $scope.tabIndex = tabIndex;
            switch (tabIndex) {
                case 0:
                    // $scope.monthcurrent = date.getMonth();
                    // $scope.current = date.getFullYear();
                    // $scope.formdate.month = $scope.monthcurrent + 1;
                    // $scope.formdate.year = $scope.current;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month-1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.funcGetTKVBDen($scope.formdate.month, $scope.formdate.year);
                    break;
                case 1:
                    // $scope.monthcurrent = date.getMonth();
                    // $scope.current = date.getFullYear();
                    // $scope.formdate.month = $scope.monthcurrent + 1;
                    // $scope.formdate.year = $scope.current;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month-1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.funcGetTKVBDi($scope.formdate.month, $scope.formdate.year);
                    break;
                default:
                    break;
            }
        };
        $scope.onClickCaNamVBDen = function(){
            $scope.funcGetTKVBDen("",$scope.formdate.year);
        }
        $scope.onClickCaNamVBDi = function(){
            $scope.funcGetTKVBDi("",$scope.formdate.year);
        }
        $scope.funcGetTKVBDen = function (month, year) {
            $scope.formVBDen = {
                "phongBanID": "",
                "nam": year,
                "thang": month
            }
            ThongKeFtr.getTKVBDen($scope.formVBDen).then(function (data) {
                $scope.dataTKVBDen = data;
                console.log(data);
                var sumVB = data.TongDaXuLy + data.TongChuaXuLy;
                if (data.ChuaXuLyQuaHan == null && data.ChuaXuLyTrongHan == null &&
                    data.DaXuLyDungHan == null && data.DaXuLyTreHan == null &&
                    data.PhanTramChuaXuLy == 0 && data.PhanTramDaXuLy == 0 &&
                    data.TongChuaXuLy == null && data.TongDaXuLy == null) {
                    $scope.myDataSource_thongke = {
                        "chart": {
                            "paletteColors": "#538AC4,#FF6602",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "2",
                            "defaultCenterLabel": "Không có dữ liệu để hiển thị",
                            "centerLabel": "$label: ",
                            "centerLabelFontSize": "14",
                            "centerLabelBold": "1",
                            "showTooltip": "0",
                            "decimals": "0",
                            "showLegend": "1",
                            "legendPosition": "bottom",
                            "legendItemFontSize": "13",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0"
                        },
                        "data": [{
                                "label": "Đã xử lý",
                                "value": ""
                            },
                            {
                                "label": "Chưa xử lý",
                                "value": ""
                            }
                        ]
                    };
                } else {
                    $scope.myDataSource_thongke = {
                        "chart": {
                            "paletteColors": "#538AC4,#FF6602",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "2",
                            "defaultCenterLabel": sumVB + "",
                            "centerLabel": "$label ",
                            "centerLabelFontSize": "14",
                            "centerLabelBold": "1",
                            "showTooltip": "0",
                            "decimals": "0",
                            "showLegend": "1",
                            "legendPosition": "bottom",
                            "legendItemFontSize": "13",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0"
                        },
                        "data": [{
                                "label": "Đã xử lý " + Math.round(data.PhanTramDaXuLy)+ "%" || "",
                                "value": Math.round(data.PhanTramDaXuLy) || ""
                            },
                            {
                                "label": "Chưa xử lý " + Math.round(data.PhanTramChuaXuLy)+ "%" || "",
                                "value": Math.round(data.PhanTramChuaXuLy) || ""
                            }
                        ]
                    };
                }

            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê văn bản đến");
                $scope.myDataSource_thongke = {};
            });
        }
        $scope.funcGetTKVBDi = function (month, year) {
            $scope.formTKVBDi = {
                "phongBanID": "",
                "nam": year,
                "thang": month
            }
            ThongKeFtr.getTKVBDi($scope.formTKVBDi).then(function (data) {
                console.log(data);
                $scope.dataTKVBDi = data;
                if (data.ChoPhatHanh == null && data.DaPhatHanh == null &&
                    data.PhanTramChoPhatHanh == 0 && data.PhanTramDaPhatHanh == 0 &&
                    data.TongVanBan == null) {
                    $scope.dataTKVBDi = "";
                    $scope.myDataSource_thongke1 = {
                        "chart": {
                            "paletteColors": "#558138,#FFBF03",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "2",
                            "defaultCenterLabel": "Không có dữ liệu để hiển thị",
                            "centerLabel": "$label: $value",
                            "centerLabelFontSize": "14",
                            "centerLabelBold": "1",
                            "showTooltip": "0",
                            "decimals": "0",
                            "showLegend": "1",
                            "legendPosition": "bottom",
                            "legendItemFontSize": "13",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0"
                        },
                        "data": [{
                                "label": "Đã phát hành " + Math.round(data.PhanTramDaPhatHanh) + "%" || "",
                                "value": data.DaPhatHanh || ""
                            },
                            {
                                "label": "Chờ phát hành " + Math.round(data.PhanTramChoPhatHanh) + "%" || "",
                                "value": data.ChoPhatHanh || ""
                            }
                        ]
                    };
                } else {
                    $scope.myDataSource_thongke1 = {
                        "chart": {
                            "paletteColors": "#558138,#FFBF03",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "2",
                            "defaultCenterLabel": data.TongVanBan + " văn bản",
                            "centerLabel": "$label",
                            "centerLabelFontSize": "14",
                            "centerLabelBold": "1",
                            "showTooltip": "0",
                            "decimals": "0",
                            "showLegend": "1",
                            "legendPosition": "bottom",
                            "legendItemFontSize": "13",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0"
                        },
                        "data": [{
                                "label": "Đã phát hành: " + Math.round(data.PhanTramDaPhatHanh) + "%" || "",
                                "value": data.DaPhatHanh || ""
                            },
                            {
                                "label": "Chờ phát hành: " + Math.round(data.PhanTramChoPhatHanh) + "%" || "",
                                "value": data.ChoPhatHanh || ""
                            }
                        ]
                    };
                }
            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê văn bản đi");
                $scope.myDataSource_thongke1 = {};
            })
        }

        $scope.$on('$ionicView.loaded', function () {
            // $scope.monthcurrent = date.getMonth();
            // $scope.current = date.getFullYear();
            $scope.funcGetTKVBDen($scope.monthcurrent + 1, $scope.current);
        });

        $scope.$on('$ionicView.enter', function () {});

        $scope.$on('$ionicView.leave', function () {});

    }


})();