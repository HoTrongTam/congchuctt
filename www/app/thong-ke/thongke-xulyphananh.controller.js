/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeXuLyPhanAnhCtrl', thongKeXuLyPhanAnhCtrl);

    thongKeXuLyPhanAnhCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', 'ThongKeFtr',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeXuLyPhanAnhCtrl(
        $scope, $rootScope, $state, $filter, ThongKeFtr,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH XỬ LÝ PHẢN ÁNH";
        $scope.myDataSource_thongke = {};
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
            $scope.funcTKPAKienNghi($scope.formdate.month, $scope.formdate.year);
        };
        $scope.onChangeMonths = function (id) {
            $scope.formdate.month = id;
            $scope.funcTKPAKienNghi($scope.formdate.month, $scope.formdate.year);
        }
        //

        $scope.funcTKPAKienNghi = function (month, year) {
            $scope.formTKPAKienNghi = {
                "phongBanID": "",
                "nam": year,
                "thang": month
            }
            ThongKeFtr.getTKPAKienNghi($scope.formTKPAKienNghi).then(function (data) {
                console.log(data);
                if (data.NhanMoi == null && data.TongChuaXuLy == null &&
                    data.TongDaXuLy == null && data.PhanTramChuaXuLy == 0 && data.PhanTramDaXuLy == 0) {
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
                            "defaultCenterLabel": data.NhanMoi + "",
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
                                "label": "Đã xử lý " + data.TongDaXuLy,
                                "value": Math.round(data.PhanTramDaXuLy) || ""
                            },
                            {
                                "label": "Chưa xử lý " + data.TongChuaXuLy,
                                "value": Math.round(data.PhanTramChuaXuLy) || ""
                            }
                        ]
                    };
                }
            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê xử lý phản ánh");
            })
        }
        $scope.$on('$ionicView.loaded', function () {
            $scope.funcTKPAKienNghi($scope.formdate.month, $scope.formdate.year);
        });

        $scope.$on('$ionicView.enter', function () {});

        $scope.$on('$ionicView.leave', function () {});

    }


})();