/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeChuyenNganhCtrl', thongKeChuyenNganhCtrl);

    thongKeChuyenNganhCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', '$ionicSlideBoxDelegate' ,
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeChuyenNganhCtrl(
        $scope, $rootScope, $state, $filter, $ionicSlideBoxDelegate,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ CHUYÊN NGÀNH ";
        $scope.tabIndex = 0;
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };
        $scope.onTabChange = function (tabIndex) {
            $scope.tabIndex = tabIndex;
            switch (tabIndex) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                default:
                    break;
            }
        };
        $scope.myDataSource_thongke = {
            "chart": {
                "paletteColors": "#538AC4,#FF6602,#A4A4A4",
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
                "defaultCenterLabel": "400 Hồ sơ ĐKKD",
                "centerLabel": "$label: $value văn bản",
                "centerLabelFontSize": "16",
                "useDataPlotColorForLabels": "1",
                "baseFontSize": "12"
            },
            "data": [
                {
                    "label": "Cấp mới",
                    "value": "500"
                },
                {
                    "label": "Thay đổi",
                    "value": "370"
                },
                {
                    "label": "Tạm ngưng",
                    "value": "130"
                }
            ]
        };
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
            "data": [
                {
                    "label": "Cấp mới",
                    "value": "500"
                },
                {
                    "label": "Thay đổi",
                    "value": "370"
                },
                {
                    "label": "Tạm ngưng",
                    "value": "130"
                }
            ]
        };
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
                "defaultCenterLabel": "28.000 Hộ kinh doanh Tổng vốn 36150 tỷ vnđ",
                "centerLabel": "Đã xử lý: $value",
                "centerLabelFontSize": "14",
                "centerLabelColor": "#009900",
                "showTooltip": "0",
                "decimals": "0",
                "showLegend": "1",
                "legendPosition": "right",
                "legendItemFontSize": "13",
                "legendShadow": "0",
                "legendBorderAlpha": "0",
                "labelPosition": "0"
            },
            "data": [
                {
                    "label": "Bình Thuận",
                    "value": "370"
                },
                {
                    "label": "Phú Mỹ",
                    "value": "370"
                },
                {
                    "label": "Phú Nhuận",
                    "value": "370"
                },
                {
                    "label": "Tân Hưng",
                    "value": "370"
                },
                {
                    "label": "Tân khiểng",
                    "value": "370"
                },
                {
                    "label": "Tân Phong",
                    "value": "370"
                },
                {
                    "label": "Tân Phú",
                    "value": "370"
                },
                {
                    "label": "Tân Quy",
                    "value": "370"
                }
            ]
        };
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
            "data": [
                {
                    "label": "Bình Thuận",
                    "value": "1370"
                },
                {
                    "label": "Phú Mỹ",
                    "value": "370"
                },
                {
                    "label": "Phú Nhuận",
                    "value": "370"
                },
                {
                    "label": "Tân Hưng",
                    "value": "370"
                },
                {
                    "label": "Tân khiểng",
                    "value": "370"
                },
                {
                    "label": "Tân Phong",
                    "value": "370"
                },
                {
                    "label": "Tân Phú",
                    "value": "370"
                },
                {
                    "label": "Tân Quy",
                    "value": "370"
                }
            ]
        };
        
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
