/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeDanhGiaHaiLongCtrl', thongKeDanhGiaHaiLongCtrl);

    thongKeDanhGiaHaiLongCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', 'ThongKeFtr',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeDanhGiaHaiLongCtrl(
        $scope, $rootScope, $state, $filter, ThongKeFtr,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ KẾT QUẢ ĐÁNH GIÁ HÀI LÒNG";
        $scope.myDataSource_thongke = {};
        var date = new Date();
        $scope.monthcurrent = date.getMonth();
        $scope.current = date.getFullYear();
        $scope.monthArray = [];
        $scope.yearArray = [];
        $scope.formVBDen = {};
        $scope.maDonViQ7 = "778";
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
            // $scope.funcDGHaiLong($scope.formdate.month, $scope.formdate.year);
            var startofWeeek = new Date($scope.formdate.year, $scope.formdate.month - 1, 1);
            var endofWeeek = new Date($scope.formdate.year, $scope.formdate.month, 0);
            $scope.funcDGHaiLong(moment(startofWeeek).format("DD/MM/YYYY"), moment(endofWeeek).format("DD/MM/YYYY"));
        };
        $scope.onChangeMonths = function (id) {
            $scope.formdate.month = id;
            var startofWeeek = new Date($scope.formdate.year, $scope.formdate.month - 1, 1);
            var endofWeeek = new Date($scope.formdate.year, $scope.formdate.month, 0);
            $scope.funcDGHaiLong(moment(startofWeeek).format("DD/MM/YYYY"), moment(endofWeeek).format("DD/MM/YYYY"));
        }


        $scope.funcDGHaiLong = function (start, end) {
            $scope.formDGHaiLong = {
                "tuNgay": start,
                "denNgay": end,
                "maDonVi": $scope.maDonViQ7
            }
            ThongKeFtr.getTKDGHaiLong($scope.formDGHaiLong).then(function (data) {
                // alert(data[0]);
                data = data[0];
                // var sumTong = data.BinhThuong + data.HaiLong + data.KhongHaiLong;
                if (data === undefined) {
                    // sumTong = '';
                    $scope.myDataSource_thongke = {};
                    $scope.myDataSource_thongke = {
                        "chart": {
                            "paletteColors": "#6FAC49,#4671C3,#FFBF03",
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
                            "label": "Hài lòng",
                            "value": ""
                        },
                        {
                            "label": "Bình thường",
                            "value": ""
                        },
                        {
                            "label": "Không hài lòng",
                            "value": ""
                        }
                        ]
                    };
                } else {
                    $scope.myDataSource_thongke = {
                        "chart": {
                            "paletteColors": "#6FAC49,#4671C3,#FFBF03",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "2",
                            "defaultCenterLabel": parseInt(data.SCHaiLong, 10) + parseInt(data.SCBinhThuong,10) + parseInt(data.SCKhongHaiLong, 10) + "",
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
                            "label": "Hài lòng " + data.SCHaiLong,
                            "value": Math.round(data.SCHaiLong) || 0
                        },
                        {
                            "label": "Bình thường " + data.SCBinhThuong,
                            "value": Math.round(data.SCBinhThuong) || 0
                        },
                        {
                            "label": "Không hài lòng " + data.SCKhongHaiLong,
                            "value": Math.round(data.SCKhongHaiLong) || 0
                        }
                        ]
                    };
                }
            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê đánh giá hài lòng");
            })
        }

        $scope.$on('$ionicView.loaded', function () {
            var startofWeeek = new Date($scope.current, $scope.monthcurrent, 1);
            var endofWeeek = new Date($scope.current, $scope.monthcurrent + 1, 0);
            $scope.funcDGHaiLong(moment(startofWeeek).format("DD/MM/YYYY"), moment(endofWeeek).format("DD/MM/YYYY"));

        });

        $scope.$on('$ionicView.enter', function () { });

        $scope.$on('$ionicView.leave', function () { });

    }


})();