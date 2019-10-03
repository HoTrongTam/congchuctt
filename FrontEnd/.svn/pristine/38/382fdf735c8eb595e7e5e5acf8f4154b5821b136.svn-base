/**
 * document detail controller
 * @2017
 **/

(function() {
'use strict';


angular
    .module('FTravel.document')
    .controller('TinhHinhXuLyHSCtrl', tinhHinhXuLyHSCtrl)
;

tinhHinhXuLyHSCtrl.$inject = [
    '$scope', '$state', 'File', '$ionicModal',
    'CONST', 'DocumentFtr', '$ionicPopup', 'MasterFtr', 'API',
    'ProcedureFtr', 'UserFtr', '$q', 'Native','Popup', 'Datetime'
];

function tinhHinhXuLyHSCtrl(
    $scope, $state, File, $ionicModal,
    CONST, DocumentFtr, $ionicPopup, MasterFtr, API,
    ProcedureFtr, UserFtr, $q, Native, Popup, Datetime
) {
    $scope.title = 'tình hình xử lý hồ sơ';

    $scope.dt = Datetime;

    $scope.hoSo = $state.params.hoSo;

    $scope.detail = {};

    $scope.getMaster = function() {
    };

    $scope.getDetail = function() {
		var _params = {
			hoSoID : $scope.hoSo.HoSoID,
			soBienNhan : $scope.hoSo.SoBienNhan || '',
			maTraCuu : $scope.hoSo.MaTraCuu || ''
		};
		DocumentFtr.getChiTiet(_params).then(function(rep){
			$scope.detail = rep || {};
            // $scope.roleEdit = (rep.TinhTrang === 'VTH' || rep.TinhTrang === 'BSH');
			$scope.$broadcast('scroll.refreshComplete');
		}, function(err){
			Popup.e(err);
			$scope.$broadcast('scroll.refreshComplete');
		});
    };

    $scope.doRefresh = function() {
        $scope.getDetail();
    };

    $scope.$on('$ionicView.loaded', function() {});

    $scope.$on('$ionicView.enter', function() {
    });

    $scope.$on('$ionicView.leave', function() {
    });

    //start: fusionchart
    $scope.myDataSource_chart_xuly = {
        "chart": {
            //"paletteColors": "#34a853,#ea4335, #4285f4",
            //"enableSmartLabels": "0", an line noi value
            "startingAngle":"0",//"90",
            "showLabels": "0",
            "showLegend": "1",
            "valueFontSize": "12",
            "legendItemFontSize":"12",
            "captionPadding" : "0",
            "chartLeftMargin" : "0",
            "chartRightMargin" : "0",
            "chartTopMargin" : "0",
            "chartBottomMargin": "0",
            "showPercentInTooltip": "1",
            "decimals": "1",
            "useDataPlotColorForLabels": "1",
            "pieRadius": "75",
            "theme": "fint"
        },
        "data": [
            //code chỉ cần đổi số value, không đổi label & color (màu đang set theo trạng thái label)
            { "label": "Đúng hạn", "value": "136343", "color":"#34a853"},
            { "label": "Quá hạn", "value": "19730", "color":"#ea4335"},
            { "label": "Trước hạn", "value": "428502", "color":"#4285f4"}
        ]
    };

    $scope.myDataSource_chart_thuly = {
        "chart": {
        "bgColor":"#ffffff",
        "canvasBgColor": "#ffffff",
        "use3DLighting": "0",
        "showborder": "0",
        "baseFontColor": "#555555",
        "baseFontSize": "11",
        "outCnvBaseFontColor": "#aaaaaa",
        "showYAxisLine": "1",
        "yAxisLineColor": "#e5e5e5",
        "paletteColors": "#4285f4,#34a853",
        "plotSpacePercent": "30",
        "showCanvasBorder": "0",
        "usePlotGradientColor": "0",
        "plotBorderAlpha": "10",
        "legendBorderAlpha": "0",
        "legendShadow": "0",
        "valueFontColor": "#333333",
        "showXAxisLine": "1",
        "divlineColor": "#dddddd",
        "divLineDashed": "1",
        "showAlternateVGridColor": "0",
        "bgColor": "#ffffff"
       
    },
    "categories": [
        {
            "category": [
                { "label": "Tháng 1"},
                { "label": "Tháng 2"},
                { "label": "Tháng 3"},
                { "label": "Tháng 4"},
                { "label": "Tháng 5"},
                { "label": "Tháng 6"},
                { "label": "Tháng 7"},
                { "label": "Tháng 8"},
                { "label": "Tháng 9"},
                { "label": "Tháng 10"},
                { "label": "Tháng 11"},
                { "label": "Tháng 12"}
                
            ]
        }
    ],
    "dataset":[
        {
            "seriesname": "Tiếp nhận",
            "data": [
                { "value": "27813"},
                { "value": "43014"},
                { "value": "55277"},
                { "value": "48339"},
                { "value": "53224"},
                { "value": "51834"},
                { "value": "55608"},
                { "value": "60818"},
                { "value": "53159"},
                { "value": "54109"},
                { "value": "52343"},
                { "value": "29037"}
            ]
        },
        {
            "seriesname": "Xử lý",
            "data": [
                { "value": "29738"},
                { "value": "42009"},
                { "value": "54842"},
                { "value": "47688"},
                { "value": "52850"},
                { "value": "51242"},
                { "value": "55655"},
                { "value": "59918"},
                { "value": "53151"},
                { "value": "53588"},
                { "value": "51220"},
                { "value": "28402"}
            ]
        }
    ]
    };
    //  end: fusionchart

}


})();
