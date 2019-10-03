/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeXuLyVanBanCtrl', thongKeXuLyVanBanCtrl);

    thongKeXuLyVanBanCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeXuLyVanBanCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH XỬ LÝ VĂN BẢN ";
        $scope.tabIndex = 0;
        $scope.onTabChange = function (tabIndex) {
            $scope.tabIndex = tabIndex;
            switch (tabIndex) {
                case 0:
                    break;
                case 1:
                    break;
                default:
                    break;
            }
        };
        $scope.myDataSource_thongke = {
            "chart": {
                "paletteColors": "#538AC4,#FF6602",
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
                "defaultCenterLabel": "4000 văn bản đến",
                "centerLabel": "$label: $value văn bản",
                "centerLabelFontSize": "16",
                "useDataPlotColorForLabels": "1",
                "baseFontSize": "12"
            },
            "data": [
                {
                    "label": "Đã xử lý",
                    "value": "3200"
                },
                {
                    "label": "Chưa xử lý",
                    "value": "800"
                }
            ]
        };
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
                "showPercentValues": "1",
                "defaultCenterLabel": "5000 văn bản",
                "centerLabel": "Đã xử lý: $value",
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
                    "label": "Đã phát hành: 80%",
                    "value": "4500"
                },
                {
                    "label": "Chờ phát hành: 20%",
                    "value": "500"
                }
            ]
        };

        
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
