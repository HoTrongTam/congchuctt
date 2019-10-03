/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeChuyenNganhCtrl', thongKeChuyenNganhCtrl);

    thongKeChuyenNganhCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', '$ionicSlideBoxDelegate',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'ThongKeFtr'
    ];

    function thongKeChuyenNganhCtrl(
        $scope, $rootScope, $state, $filter, $ionicSlideBoxDelegate,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, ThongKeFtr
    ) {
        $scope.title = "THỐNG KÊ CHUYÊN NGÀNH ";
        $scope.nameLV = "Lĩnh Vực Kinh Tế";
        $scope.tabIndex = 1;
        $scope.flag = false;
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
                $scope.tinhhinhcapphep($scope.formdate.month, $scope.formdate.year);
                $scope.capphepxaydung($scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.diabankinhte();
                $scope.dientichxaydung();
            } else if ($scope.tabIndex == 2) {
                $scope.nganhnghekinhte();
            }

        };
        $scope.onChangeMonths = function (id) {
            $scope.formdate.month = id;
            if ($scope.tabIndex == 0) {
                $scope.tinhhinhcapphep($scope.formdate.month, $scope.formdate.year);
                $scope.capphepxaydung($scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.diabankinhte();
                $scope.dientichxaydung();
            } else if ($scope.tabIndex == 2) {
                $scope.nganhnghekinhte();
            }
        }
        //
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
            $scope.tabIndex = 0;
            $scope.capphepxaydung($scope.formdate.month, $scope.formdate.year);
            $scope.nameLV = "Lĩnh Vực Xây Dựng";
            $scope.flag = true;    
            if ($scope.flag == true) {
                var date = new Date();
                $scope.monthcurrent = date.getMonth();
                $scope.current = date.getFullYear();
                $scope.formdate.month = $scope.monthcurrent + 1;
                $scope.formdate.year = $scope.current;
                $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                $scope.countSelectedYears = $scope.formdate.year;
            }
        };
        $scope.previous = function () {
            $scope.tabIndex = 1;
            $ionicSlideBoxDelegate.previous();
            $scope.nameLV = "Lĩnh Vực Kinh Tế";
            $scope.flag = true;
            if ($scope.flag == true) {
                var date = new Date();
                $scope.monthcurrent = date.getMonth();
                $scope.current = date.getFullYear();
                $scope.formdate.month = $scope.monthcurrent + 1;
                $scope.formdate.year = $scope.current;
                $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                $scope.countSelectedYears = $scope.formdate.year;
            }
        };
        $scope.onTabChange = function (tabIndex) {
            $scope.tabIndex = tabIndex;
            switch (tabIndex) {
                case 0:
                    $scope.flag = false;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.tinhhinhcapphep($scope.formdate.month, $scope.formdate.year);
                    $scope.capphepxaydung($scope.formdate.month, $scope.formdate.year);
                    break;
                case 1:
                    $scope.flag = false;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.diabankinhte($scope.formdate.month, $scope.formdate.year);
                    $scope.dientichxaydung($scope.formdate.month, $scope.formdate.year);

                    break;
                case 2:
                    $scope.flag = false;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.nganhnghekinhte($scope.formdate.month, $scope.formdate.year);
                    break;
                default:
                    break;
            }

        };

        $scope.myDataSource_thongke = {};
        $scope.myDataSource_thongke1 = {};
        $scope.myDataSource_thongke2 = {};
        $scope.myDataSource_thongke3 = {};
        $scope.myDataSource_thongke4 = {};
        $scope.myDataSource_thongke5 = {};
        $scope.myDataSource_thongke6 = {};


        // Lay du lieu api

        // Thong ke tinh hinh cap phep
        $scope.tinhhinhcapphep = function (month, year) {

            $scope.formTHcapphep = {
                nam: year,
                thang: month
            }
            ThongKeFtr.layTinhhinhcapphep($scope.formTHcapphep).then(function (obj) {

                $scope.dataCapphep = obj;
                ///////////////

                if ($scope.dataCapphep.CapMoi == null) {
                    //// Hien thi char
                    $scope.myDataSource_thongke = {
                        "chart": {
                            "paletteColors": "#E86F21,#4D92D1",
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

                    //////////////
                    $scope.myDataSource_thongke = {
                        "chart": {
                            "paletteColors": "#538AC4,#FF6602,#A4A4A4",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "2",
                            "defaultCenterLabel": $scope.dataCapphep.TongSoHoSo + " Hồ sơ ĐKKD",
                            "centerLabel": "$label: $value văn bản",
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
                            "label": "Cấp mới ",
                            "value": $scope.dataCapphep.PhanTramCapMoi
                        },
                        {
                            "label": "Thay đổi ",
                            "value": $scope.dataCapphep.PhanTramThayDoi
                        },
                        {
                            "label": "Tạm ngưng ",
                            "value": $scope.dataCapphep.PhanTramTamNgung
                        }
                        ]
                    };
                }




                //////////////
                $scope.myDataSource_thongke1 = {
                    "chart": {
                        "paletteColors": "#538AC4,#FF6602,#A4A4A4",
                        "bgColor": "#ffffff",
                        "showBorder": "0",
                        "use3DLighting": "0",
                        "showShadow": "0",
                        "usePlotGradientColor": "0",
                        "borderAlpha": "20",
                        "canvasBorderAlpha": "0",
                        "showAxisLines": "1",

                    },
                    "data": [{
                        "label": "Cấp mới ",
                        "value": $scope.dataCapphep.CapMoi
                    },
                    {
                        "label": "Thay đổi ",
                        "value": $scope.dataCapphep.ThayDoi
                    },
                    {
                        "label": "Tạm ngưng ",
                        "value": $scope.dataCapphep.TamNgung
                    }
                    ]
                };


                //////////////
            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê chuyên nghành");
            })
        }

        // Thong ke dia ban kinh te
        $scope.diabankinhte = function () {

            // So phuongID va so thang dang bi nghich
            $scope.formDBkinhte = "phuongID=&nam="+$scope.current+"&thang=";

            ThongKeFtr.layDiabankinhte($scope.formDBkinhte).then(function (obj) {

                $scope.dataDiaban = obj;
                console.log(obj);
                var Total = 0;
                var Popu = 0;


                for (var i = 0; i < obj.length; i++) {
                    Total = Total + obj[i].SoVon;
                    Popu = Popu + obj[i].SoHoKinhDoanh;
                }

                if (Total == 0) {
                    //// Hien thi char
                    $scope.myDataSource_thongke2 = {
                        "chart": {
                            "paletteColors": "#E86F21,#4D92D1",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "1",
                            "smartLineColor": "#0075c2",
                            "startingAngle": "310",
                            "showLabels": "1",
                            "showPercentValues": "1",
                            "showLegend": "0",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0",
                            "showPercentValues": "1",
                            "showPercentInTooltip": "0",
                            "defaultCenterLabel": "Không có dữ liệu để hiển thị",
                            "centerLabel": "$label: $value%",
                            "centerLabelFontSize": "16",
                            "useDataPlotColorForLabels": "1",
                            "baseFontSize": "12"
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
                    $scope.arrayData = [];
                    if($scope.dataDiaban !== null || $scope.dataDiaban !== "undefined"){
                        angular.forEach($scope.dataDiaban, function (item) {
                            var child = {
                                "label": item.TenPhuong + " : " + item.SoHoKinhDoanh,
                                "value": item.SoHoKinhDoanh
                            }
                            $scope.arrayData.push(child);
                        });
                    }
                    $scope.myDataSource_thongke2 = {
                        "chart": {
                            "paletteColors": "#CB66FF,#FBE4D5,#3580C7,#F0F0F0,#6F339F,#6FAC49,#2A5E90,#A1511F,#636363,#987202",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "1",
                            "defaultCenterLabel": Popu + " Hộ kinh doanh Tổng vốn " + Total + " tỷ vnđ ",
                            "centerLabel": "Đã xử lý: $value",
                            "centerLabelFontSize": "14",
                            "centerLabelColor": "#009900",
                            "showTooltip": "0",
                            "decimals": "0",
                            "showLegend": "1",
                            "legendPosition": "bottom",
                            "legendItemFontSize": "13",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0",
                            "labelPosition": "0"
                        },
                        "data": $scope.arrayData
                    };
                }

            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê chuyên nghành");
            })
        }

        // Thong ke nganh nghe kinh te
        $scope.nganhnghekinhte = function () {
            $scope.formNNkinhte = "linhVucID=&nam=2018&thang=";

            ThongKeFtr.laynganhnghekinhte($scope.formNNkinhte).then(function (obj) {
                $scope.tongsokinhdoanh = obj.TongHoSoKinhDoanh;
                console.log(obj);
                $scope.dataNghanhNghe = obj;
                /////////////////////////
                if ($scope.tongsokinhdoanh == null || $scope.tongsokinhdoanh == 0) {
                    //// Hien thi char
                    $scope.myDataSource_thongke3 = {
                        "chart": {
                            "paletteColors": "#E86F21,#4D92D1",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "1",
                            "smartLineColor": "#0075c2",
                            "startingAngle": "310",
                            "showLabels": "1",
                            "showPercentValues": "1",
                            "showLegend": "0",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0",
                            "showPercentValues": "1",
                            "showPercentInTooltip": "0",
                            "defaultCenterLabel": "Không có dữ liệu để hiển thị",
                            "centerLabel": "$label: $value%",
                            "centerLabelFontSize": "16",
                            "useDataPlotColorForLabels": "1",
                            "baseFontSize": "12"
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
                    $scope.arrayDataNghanhNghe = [];
                    if($scope.dataNghanhNghe !== null || $scope.dataNghanhNghe !== "undefined"){
                        angular.forEach($scope.dataNghanhNghe.listTKCN, function (item) {
                            var child = {
                                "label": item.TenLinhVuc + " : " + item.SoHoKinhDoanh,
                                "value": item.SoHoKinhDoanh
                            }
                            $scope.arrayDataNghanhNghe.push(child);
                        });
                    }
                    $scope.myDataSource_thongke3 = {
                        "chart": {
                            "paletteColors": "#00CBFF",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "usePlotGradientColor": "0",
                            "borderAlpha": "20",
                            "canvasBorderAlpha": "0",
                            "showAxisLines": "0",
                            "showXAxisLine": "0",
                            "showYAxisValues": "0",
                            "showPlotBorder": "0",
                            "placeValuesInside": "0",
                            "maxBarHeight": "20",
                            "xAxisLineColor": "#fff",
                            "xAxisNameBorderDashed": "0"
                        },
                        "data": $scope.arrayDataNghanhNghe
                    };

                }
                /////////////////////////
            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê chuyên nghành");
            })
        }

        // Thong ke tinh hinh cap phep xay dung
        $scope.capphepxaydung = function (month, year) {

            $scope.formXDcapphep = {
                nam: year,
                thang: month
            }
            ThongKeFtr.laytinhhinhcapphepxaydung($scope.formXDcapphep).then(function (obj) {
                $scope.dataCapphepxd = obj;

                /////////////////

                if (obj.CapMoi == null) {
                    //// Hien thi char
                    $scope.myDataSource_thongke4 = {
                        "chart": {
                            "paletteColors": "#E86F21,#4D92D1",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "1",
                            "smartLineColor": "#0075c2",
                            "startingAngle": "310",
                            "showLabels": "1",
                            "showPercentValues": "1",
                            "showLegend": "0",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0",
                            "showPercentValues": "1",
                            "showPercentInTooltip": "0",
                            "defaultCenterLabel": "Không có dữ liệu để hiển thị",
                            "centerLabel": "$label: $value%",
                            "centerLabelFontSize": "16",
                            "useDataPlotColorForLabels": "1",
                            "baseFontSize": "12"
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
                    //////////////
                    $scope.myDataSource_thongke4 = {
                        "chart": {
                            "paletteColors": "#538AC4,#FF6602,#A4A4A4,#ff9999,#3366ff",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "2",
                            "defaultCenterLabel": obj.TongHoSo + " Hồ sơ Xây dựng",
                            "centerLabel": "$label: $value văn bản",
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
                            "label": "Cấp mới ",
                            "value": obj.PhanTramCapMoi
                        },
                        {
                            "label": "Cấp lại ",
                            "value": obj.PhanTramCapLai
                        },
                        {
                            "label": "Điều chỉnh ",
                            "value": obj.PhanTramDieuChinh
                        },
                        {
                            "label": "Gia hạn ",
                            "value": obj.PhanTramGiaHan
                        },
                        {
                            "label": "Sửa chữa, cải tạo ",
                            "value": obj.PhanTramSuaChuaCaiTao
                        }
                        ]
                    };

                }

                //////////////
                $scope.myDataSource_thongke5 = {
                    "chart": {
                        "paletteColors": "#538AC4,#FF6602,#A4A4A4,#ff9999,#3366ff",
                        "bgColor": "#ffffff",
                        "showBorder": "0",
                        "use3DLighting": "0",
                        "showShadow": "0",
                        "usePlotGradientColor": "0",
                        "borderAlpha": "20",
                        "canvasBorderAlpha": "0",
                        "showAxisLines": "1",

                    },
                    "data": [{
                        "label": "Cấp mới ",
                        "value": obj.CapMoi
                    },
                    {
                        "label": "Cấp lại ",
                        "value": obj.CapLai
                    },
                    {
                        "label": "Điều chỉnh ",
                        "value": obj.DieuChinh
                    },
                    {
                        "label": "Gia hạn ",
                        "value": obj.GiaHan
                    },
                    {
                        "label": "Sửa chữa, cải tạo ",
                        "value": obj.SuaChuaCaiTao
                    }
                    ]
                };


            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê chuyên nghành");
            })
        }

        // Thong ke dien tich xay dung
        $scope.dientichxaydung = function () {
            $scope.formdtxaydung = "nam=&thang=";

            ThongKeFtr.laydientichxaydung($scope.formdtxaydung).then(function (obj) {
                /////////////////////
                if (obj.Tong == null || obj.Tong == 0) {
                    //// Hien thi char
                    $scope.myDataSource_thongke4 = {
                        "chart": {
                            "paletteColors": "#E86F21,#4D92D1",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "1",
                            "smartLineColor": "#0075c2",
                            "startingAngle": "310",
                            "showLabels": "1",
                            "showPercentValues": "1",
                            "showLegend": "0",
                            "legendShadow": "0",
                            "legendBorderAlpha": "0",
                            "showPercentValues": "1",
                            "showPercentInTooltip": "0",
                            "defaultCenterLabel": "Không có dữ liệu để hiển thị",
                            "centerLabel": "$label: $value%",
                            "centerLabelFontSize": "16",
                            "useDataPlotColorForLabels": "1",
                            "baseFontSize": "12"
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


                    $scope.myDataSource_thongke6 = {
                        "chart": {
                            "paletteColors": "#538AC4,#FF6602,#A4A4A4",
                            "bgColor": "#ffffff",
                            "showBorder": "0",
                            "showValues": "0",
                            "use3DLighting": "0",
                            "showShadow": "0",
                            "enableSmartLabels": "0",
                            "startingAngle": "310",
                            "showLabels": "0",
                            "showPercentValues": "2",
                            "defaultCenterLabel": " Tổng diện tích : " + obj.Tong + " m2",
                            "centerLabel": "$label: $value văn bản",
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
                            "label": "Đã xây dựng: " + obj.DaXayDung + " m2",
                            "value": obj.PhanTramDaXayDung
                        },
                        {
                            "label": "Chưa xây dựng: " + obj.ChuaXayDung + " m2",
                            "value": obj.PhanTramChuaXayDung
                        }

                        ]
                    };
                }
                /////////////////////
            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê chuyên nghành");
            })
        }

        $scope.$on('$ionicView.loaded', function () {
            // $scope.tinhhinhcapphep($scope.formdate.month, $scope.formdate.year);
            $scope.diabankinhte($scope.formdate.month, $scope.formdate.year);
            $scope.dientichxaydung($scope.formdate.month, $scope.formdate.year);
        });

        $scope.$on('$ionicView.enter', function () { 
           
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();