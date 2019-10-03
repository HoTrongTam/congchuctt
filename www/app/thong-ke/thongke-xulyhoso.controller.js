/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeXuLyHoSoCtrl', thongKeXuLyHoSoCtrl);

    thongKeXuLyHoSoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', 'ThongKeFtr',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeXuLyHoSoCtrl(
        $scope, $rootScope, $state, $filter, ThongKeFtr,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH XỬ LÝ HỒ SƠ ";
        $scope.dataTKHoSo = {};
        $scope.myDataSource_thongke = {};
        $scope.dataChiTietLinhVuc = "";
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
        $scope.formdate = { month: $scope.monthcurrent + 1, year: $scope.current }
        $scope.countSelectedMonths = $scope.monthArray[$scope.monthcurrent];
        $scope.countSelectedYears = $scope.current;
        $scope.onChangeYears = function (id) {
            $scope.formdate.year = id
            $scope.funcXuLyHoSo($scope.formdate.month, $scope.formdate.year);
            $scope.funcXuLyHoSoChiTietLinhVuc($scope.formdate.month, $scope.formdate.year);
        };
        $scope.onChangeMonths = function (id) {
            $scope.formdate.month = id;
            $scope.funcXuLyHoSo($scope.formdate.month, $scope.formdate.year);
            $scope.funcXuLyHoSoChiTietLinhVuc($scope.formdate.month, $scope.formdate.year);
        }
        $scope.btnClickCaNam = function(){
            $scope.funcXuLyHoSo("", $scope.formdate.year);
            $scope.funcXuLyHoSoChiTietLinhVuc("", $scope.formdate.year);
        }
        $scope.funcXuLyHoSo = function (month, year) {
            $scope.formTKHS = {
                "linhVucID": "",
                "nam": year,
                "thang": month
            }
            ThongKeFtr.getTKXLHoSo($scope.formTKHS).then(function (data) {
                console.log(data);
                //
                if (data.BoSung == null && data.ChuaXuLyQuaHan == null
                    && data.ChuaXuLyTrongHan == null && data.DaXuLyDungHan == null
                    && data.DaXuLyTreHan == null) {
                    $scope.dataTKHoSo = "";
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
                            "defaultCenterLabel":  "Không có dữ liệu để hiển thị",
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
                    $scope.dataTKHoSo = data;
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
                            "defaultCenterLabel":  "Đã xử lý: " + (data.TongDaXuLy || ""),
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
                        "data": [
                            {
                                "label": "Tổng nhận mới: " + (data.NhanMoi || ""),
                                "value": Math.round((data.PhanTramDaXuLy || ""))
                            },
                            {
                                "label": "Tổng tồn trước: " + (data.TonTruoc || ""),
                                "value": Math.round((data.PhanTramChuaXuLy || ""))
                            }
                        ]
                    };
                }
            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê xử lý hồ sơ");
            });
        }
        $scope.funcXuLyHoSoChiTietLinhVuc = function(month, year){
            $scope.formTKHSChiTietLinhVuc = {
                "linhVucID": "",
                "nam": year,
                "thang": month
            }
            ThongKeFtr.getTKXLHoSoChiTietLinhVuc($scope.formTKHSChiTietLinhVuc).then(function(dataLV){
                console.log(dataLV);
                if(dataLV !== undefined && dataLV !== ""){
                    $scope.dataChiTietLinhVuc = dataLV;
                }else{
                    $scope.dataChiTietLinhVuc = "";
                }
            }, function(error){
                console.log(error);
            });
        }
        $scope.$on('$ionicView.loaded', function () {
            $scope.funcXuLyHoSo($scope.formdate.month, $scope.formdate.year);
            $scope.funcXuLyHoSoChiTietLinhVuc($scope.formdate.month, $scope.formdate.year);
        });

        $scope.$on('$ionicView.enter', function () {
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
