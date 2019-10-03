/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeGiaiQuyetDonThuCtrl', thongKeGiaiQuyetDonThuCtrl);

    thongKeGiaiQuyetDonThuCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', 'ThongKeFtr',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeGiaiQuyetDonThuCtrl(
        $scope, $rootScope, $state, $filter, ThongKeFtr,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH GIẢI QUYẾT ĐƠN THƯ";
        $scope.myDataSource_thongke = {};
        $scope.dataTKGQDonThu = {};
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
        $scope.formdate = { month: $scope.monthcurrent + 1, year: $scope.current }
        $scope.countSelectedMonths = $scope.monthArray[$scope.monthcurrent];
        $scope.countSelectedYears = $scope.current;
        $scope.onChangeYears = function (id) {
            $scope.formdate.year = id
            $scope.funcTKGQDonThu($scope.formdate.month, $scope.formdate.year);
        };
        $scope.onChangeMonths = function (id) {
            $scope.formdate.month = id;
            $scope.funcTKGQDonThu($scope.formdate.month, $scope.formdate.year);
        }
        //

        $scope.funcTKGQDonThu = function (month, year) {
            $scope.formTKGQDonThu = {
                "nam": year,
                "thang": month
            }
            ThongKeFtr.getTKGQDonThu($scope.formTKGQDonThu).then(function (data) {
                console.log(data);
                if (data.PhanTramChuaXuLy == 0 && data.PhanTramDaXuLy == 0 && data.TongDaXuLy == null) {
                    $scope.dataTKGQDonThu = {};
                    $scope.myDataSource_thongke = {
                        "chart": {
                            "paletteColors": "#6FAC49,#FFD866",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "1",
                            "defaultCenterLabel": "Không có dữ liệu để hiển thị",
                            "centerLabel": "Đã xử lý: $value",
                            "centerLabelBold": "1",
                            "showTooltip": "0",
                            "decimals": "0",
                            "showLegend": "1",
                            "legendPosition": "bottom",
                            "legendItemFontSize": "13",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0"
                        },
                        "data": [
                            {
                                "label": "Tổng nhận mới: ",
                                "value": ""
                            },
                            {
                                "label": "Tổng tồn trước: " ,
                                "value": ""
                            }
                        ]
                    };
                } else {
                    $scope.dataTKGQDonThu = data;
                    $scope.myDataSource_thongke = {
                        "chart": {
                            "paletteColors": "#6FAC49,#FFD866",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "1",
                            "defaultCenterLabel": data.TongDaXuLy + "Tổng đã xử lý",
                            "centerLabel": "$label",
                            "centerLabelBold": "1",
                            "showTooltip": "0",
                            "decimals": "0",
                            "showLegend": "1",
                            "legendPosition": "bottom",
                            "legendItemFontSize": "13",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0"
                        },
                        "data": [
                            {
                                "label": "Tổng nhận mới: " + data.NhanMoi,
                                "value": data.PhanTramDaXuLy
                            },
                            {
                                "label": "Tổng tồn trước: " + data.TonTruoc,
                                "value": data.PhanTramChuaXuLy
                            }
                        ]
                    };
                }
            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê giải quyết đơn thư");
            });
        }

        $scope.$on('$ionicView.loaded', function () {
            $scope.funcTKGQDonThu($scope.formdate.month, $scope.formdate.year);
        });

        $scope.$on('$ionicView.enter', function () {
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
