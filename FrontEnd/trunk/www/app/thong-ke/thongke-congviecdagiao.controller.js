/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeCongViecDaGiaoCtrl', thongKeCongViecDaGiaoCtrl);

    thongKeCongViecDaGiaoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeCongViecDaGiaoCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ CÔNG VIỆC ĐÃ GIAO";
        $scope.myDataSource_thongke = {
            "chart": {
                "paletteColors": "#5B9AD4,#A4A4A4",
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
                "defaultCenterLabel": "Đã giao: 150",
                "centerLabel": "$label: $value",
                "centerLabelFontSize": "16",
                "useDataPlotColorForLabels": "1",
                "baseFontSize": "12"
            },
            "data": [
                {
                    "label": "Đã xử lý",
                    "value": "120"
                },
                {
                    "label": "Chưa xử lý",
                    "value": "30"
                }
            ]
        };


        
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
