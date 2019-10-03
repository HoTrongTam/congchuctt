(function () {
    'use strict';

    angular
        .module('FTravel.thongke')
        .controller('ThongKeXuPhatHanhChinhCtrl', thongKeXuPhatHanhChinhCtrl);

    thongKeXuPhatHanhChinhCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', 'ThongKeFtr',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeXuPhatHanhChinhCtrl(
        $scope, $rootScope, $state, $filter, ThongKeFtr,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH XỬ PHẠT HÀNH CHÍNH";
        $scope.myDataSource_thongke = {};
        //Xu ly thang nam
        var date = new Date();
        $scope.current = date.getFullYear();
        $scope.yearArray = [];
        var start = $scope.current - 4;
        var end = $scope.current;
        for (var i = start; i <= end; i++) {
            $scope.yearArray.push(i);
        }
        $scope.formdate = { year: $scope.current }
        $scope.countSelectedYears = $scope.current;
        $scope.onChangeYears = function (id) {
            $scope.formdate.year = id
            $scope.funcXuPhatHanhChinh($scope.formdate.year);
        };
        //
        $scope.funcXuPhatHanhChinh = function (year) {
            var formXPHC = {
                "linhVucID": "",
                "nam": year,
                "thang": ""
            }
            ThongKeFtr.getTKXPHanhChinh(formXPHC).then(function (data) {
                console.log(data);
                if (data.length == 0) {
                    $scope.myDataSource_thongke = {
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
                            "defaultCenterLabel": "Không có dữ liệu để hiển thị",
                            "maxBarHeight": "20",
                            "xAxisLineColor": "#fff",
                            "xAxisNameBorderDashed": "0"
                        },
                        "data":[{
                            "label": "",
                            "value": ""
                        }]
                    };
                } else {
                    $scope.arrayData = [];
                    angular.forEach(data, function (item) {
                        var child = {
                            "label": item.TenLinhVuc,
                            "value": item.SoLuong
                        }
                        $scope.arrayData.push(child);
                    });
                    $scope.myDataSource_thongke = {
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
                        "data": $scope.arrayData

                    };
                }

            }, function (err) {
                Popup.e("Lỗi kết nối dữ liệu thống kê xử phạt hành chính");
            });
        }


        $scope.$on('$ionicView.loaded', function () {
            $scope.funcXuPhatHanhChinh($scope.formdate.year);
        });

        $scope.$on('$ionicView.enter', function () { });

        $scope.$on('$ionicView.leave', function () { });

    }


})();