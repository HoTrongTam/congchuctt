/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeXuLyHoSoCtrl', thongKeXuLyHoSoCtrl);

    thongKeXuLyHoSoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeXuLyHoSoCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH XỬ LÝ HỒ SƠ ";
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
                "defaultCenterLabel": "Đã xử lý: 3000",
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
                    "label": "Tổng tồn mới: 2500",
                    "value": "2500"
                },
                {
                    "label": "Tổng tồn trước: 850",
                    "value": "850"
                }
            ]
        };


        
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
