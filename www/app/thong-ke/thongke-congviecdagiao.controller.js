/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeCongViecDaGiaoCtrl', thongKeCongViecDaGiaoCtrl);

    thongKeCongViecDaGiaoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', 'ThongKeFtr',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeCongViecDaGiaoCtrl(
        $scope, $rootScope, $state, $filter, ThongKeFtr,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ CÔNG VIỆC";
        $scope.myDataSource_thongke = {};
        $scope.tabIndex = 0;
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
                $scope.funcTKCVDaGiao($scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.funcTKCVDaGiao($scope.formdate.month, $scope.formdate.year);
            }
        };
        $scope.onChangeMonths = function (id) {
            $scope.formdate.month = id;
            if ($scope.tabIndex == 0) {
                $scope.funcTKCVDaGiao($scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.funcTKCVDaGiao($scope.formdate.month, $scope.formdate.year);
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
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.funcTKCVDaGiao($scope.formdate.month, $scope.formdate.year);
                    break;
                case 1:
                    // $scope.monthcurrent = date.getMonth();
                    // $scope.current = date.getFullYear();
                    // $scope.formdate.month = $scope.monthcurrent + 1;
                    // $scope.formdate.year = $scope.current;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.funcTKCVDaGiao($scope.formdate.month, $scope.formdate.year);
                    break;
                default:
                    break;
            }
        };
        $scope.funcTKCVDaGiao = function (month, year) {
            if ($scope.tabIndex == 0) {
                $scope.formCVDaGiao = {
                    "nguoiGiaoID":1070,
                    "nam": year,
                    "thang": month
                }
                ThongKeFtr.getTKCVDaGiaoNew($scope.formCVDaGiao).then(function (data) {
                    if (data.ChuaXuLy == null && data.DaXuLy == null &&
                        data.PhanTramChuaXuLy == 0 && data.PhanTramDaXuLy == 0 &&
                        data.Tong == null || data.Tong == 0) {
                        $scope.myDataSource_thongke = {
                            "chart": {
                                "paletteColors": "#5B9AD4,#A4A4A4",
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
                                "centerLabel": "$label: $value%",
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
                                "paletteColors": "#5B9AD4,#A4A4A4",
                                "bgColor": "#ffffff",
                                "showBorder": "0",
                                "showValues": "0",
                                "use3DLighting": "0",
                                "showShadow": "0",
                                "enableSmartLabels": "0",
                                "startingAngle": "310",
                                "showLabels": "0",
                                "showPercentValues": "2",
                                "defaultCenterLabel": "Tổng: " + data.Tong,
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
                                "label": "Đã xử lý " + Math.round(data.PhanTramDaXuLy) + "%",
                                "value": Math.round(data.PhanTramDaXuLy)
                            },
                            {
                                "label": "Chưa xử lý " + Math.round(data.PhanTramChuaXuLy)+ "%",
                                "value": Math.round(data.PhanTramChuaXuLy)
                            }
                            ]
                        };
                    }
                    console.log(data);
                }, function (err) {
                    Popup.e("Lỗi kết nối dữ liệu thống kê công việc");
                });
            } else if ($scope.tabIndex == 1) {
                $scope.formCVDaNhan = {
                    "nguoiNhanID":1070 ,
                    "nam": year,
                    "thang": month
                }
                ThongKeFtr.getTKCVDaNhan($scope.formCVDaNhan).then(function (data) {
                    if (data.ChuaXuLy == null && data.DaXuLy == null &&
                        data.PhanTramChuaXuLy == 0 && data.PhanTramDaXuLy == 0 &&
                        data.Tong == null || data.Tong == 0) {
                        $scope.myDataSource_thongke = {
                            "chart": {
                                "paletteColors": "#5B9AD4,#A4A4A4",
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
                                "centerLabel": "$label: $value%",
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
                                "paletteColors": "#5B9AD4,#A4A4A4",
                                "bgColor": "#ffffff",
                                "showBorder": "0",
                                "showValues": "0",
                                "use3DLighting": "0",
                                "showShadow": "0",
                                "enableSmartLabels": "0",
                                "startingAngle": "310",
                                "showLabels": "0",
                                "showPercentValues": "2",
                                "defaultCenterLabel": "Tổng: " + data.Tong,
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
                                "label": "Đã xử lý " + Math.round(data.PhanTramDaXuLy) + "%",
                                "value": Math.round(data.PhanTramDaXuLy)
                            },
                            {
                                "label": "Chưa xử lý " + Math.round(data.PhanTramChuaXuLy) + "%",
                                "value": Math.round(data.PhanTramChuaXuLy)
                            }
                            ]
                        };
                    }
                    console.log(data);
                }, function (err) {
                    Popup.e("Lỗi kết nối dữ liệu thống kê công việc");
                });
            }
        }

        $scope.$on('$ionicView.loaded', function () {
            $scope.funcTKCVDaGiao($scope.monthcurrent + 1, $scope.current);
        });

        $scope.$on('$ionicView.enter', function () { });

        $scope.$on('$ionicView.leave', function () { });

    }


})();