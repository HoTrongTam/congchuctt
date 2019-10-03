/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeGiaiQuyetDonThuCtrl', thongKeGiaiQuyetDonThuCtrl);

    thongKeGiaiQuyetDonThuCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeGiaiQuyetDonThuCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "THỐNG KÊ TÌNH HÌNH GIẢI QUYẾT ĐƠN THƯ";
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
                "defaultCenterLabel": "Đã xử lý: 200",
                "centerLabel": "Đã xử lý: $value",
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
                    "label": "Tổng tồn mới: 200",
                    "value": "200"
                },
                {
                    "label": "Tổng tồn trước: 50",
                    "value": "50"
                }
            ]
        };


        
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
