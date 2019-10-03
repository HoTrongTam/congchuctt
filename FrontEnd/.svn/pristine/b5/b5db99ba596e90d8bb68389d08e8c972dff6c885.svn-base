/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeXuLyPhanAnhCtrl', thongKeXuLyPhanAnhCtrl);

    thongKeXuLyPhanAnhCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeXuLyPhanAnhCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH XỬ LÝ PHẢN ÁNH";
        $scope.myDataSource_thongke = {
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
                "defaultCenterLabel": "Đã tiếp nhận: 1050 phản ánh",
                "centerLabel": "$label: $value",
                "centerLabelFontSize": "16",
                "useDataPlotColorForLabels": "1",
                "baseFontSize": "12"
            },
            "data": [
                {
                    "label": "Đã xử lý",
                    "value": "630"
                },
                {
                    "label": "Chưa xử lý",
                    "value": "420"
                }
            ]
        };


        
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
