/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeDanhGiaHaiLongCtrl', thongKeDanhGiaHaiLongCtrl);

    thongKeDanhGiaHaiLongCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeDanhGiaHaiLongCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ KẾT QUẢ ĐÁNH GIÁ HÀI LÒNG";
        $scope.myDataSource_thongke = {
            "chart": {
                "paletteColors": "#6FAC49,#4671C3,#FFBF03",
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
                "defaultCenterLabel": "1.004",
                "centerLabel": "$label: $value",
                "centerLabelFontSize": "16",
                "useDataPlotColorForLabels": "1",
                "baseFontSize": "12"
            },
            "data": [
                {
                    "label": "Hài lòng",
                    "value": "800"
                },
                {
                    "label": "Bình thường",
                    "value": "154"
                },
                {
                    "label": "Không hài lòng",
                    "value": "54"
                }
            ]
        };


        
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
