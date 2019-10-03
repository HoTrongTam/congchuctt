/**
 * document detail controller
 * @2017
 **/

(function() {
'use strict';


angular
    .module('FTravel.document')
    .controller('ThongKeHSCtrl', thongKeHSCtrl)
;

thongKeHSCtrl.$inject = [
    '$scope', '$state', 'File', '$ionicModal',
    'CONST', 'DocumentFtr', '$ionicPopup', 'MasterFtr', 'API',
    'ProcedureFtr', 'UserFtr', '$q', 'Native','Popup', 'Datetime'
];

function thongKeHSCtrl(
    $scope, $state, File, $ionicModal,
    CONST, DocumentFtr, $ionicPopup, MasterFtr, API,
    ProcedureFtr, UserFtr, $q, Native, Popup, Datetime
) {
    $scope.title = 'thống kê hs nộp qua mạng';

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
     $scope.myDataSource6 = {
        "chart": {
            "valueFontAlpha":"0", 
            "chartLeftMargin" : "10",
            "chartRightMargin" : "10",
            "labelFontColor" : "#999999",
            "showLegend" : "1",
            "legendItemFontColor" : "#999999",
            "outCnvBaseFontColor" :"#999999",
            "showplotborder": "1",
            "baseFontColor": "#999999",
            "plotBorderColor" :"#f5f5f5",
            "plotBorderThickness" :"0.5",
            "xAxisLabelsOnTop": "1",
            "plottooltext": "<div id='nameDiv' style='font-size: 12px; border-bottom: 1px dashed #666666; font-weight:bold; padding-bottom: 3px; margin-bottom: 5px; display: inline-block; color: #888888;' >$rowLabel :</div>{br}Số VB đã nộp qua mạng : <b>$dataValue</b>{br}Lĩnh vực: $columnLabel",
            "baseFontColor": "#333333",
            "baseFont": "Helvetica Neue,Arial",
            "toolTipBorderRadius": "2",
            "toolTipPadding": "5",
            "theme": "fint"
        },
        "rows": {
            "row": [
                { "id": "row_1", "label": "Ban QLĐHDA xây dựng Chính quyền điện tử"},
                { "id": "row_2", "label": "Ban Quản lý Khu kinh tế"},
                { "id": "row_3", "label": "Ủy ban nhân dân Thành phố Móng Cái"},
                { "id": "row_4", "label": "Ủy ban nhân dân Thành phố Hạ Long"},
                { "id": "row_5", "label": "Ủy ban nhân dân huyện Ba Chẽ"},
                { "id": "row_6", "label": "Ủy ban nhân dân huyện Bình Liêu"},
                { "id": "row_7", "label": "Ủy ban nhân dân huyện Hoành Bồ"},
                { "id": "row_8", "label": "Ủy ban nhân dân Thành phố Uông Bí"}
            ]
        },
        "columns": {
            "column": [
                { "id": "col_1", "label": "Hướng dẫn sử dụng"},
                { "id": "col_2", "label": "Lao động"},
                { "id": "col_3", "label": "Công thương"},
                { "id": "col_4", "label": "Lao động, thương binh và xã hội"},
                { "id": "col_5", "label": "Kế hoạch và Đầu tư"},
                { "id": "col_6", "label": "Xây dựng"},
                { "id": "col_7", "label": "Đất đai"},
                { "id": "col_8", "label": "Viễn thông và internet"},
                { "id": "col_9", "label": "Du lịch"},
                { "id": "col_10", "label": "Hộ tịch"},
                { "id": "col_11", "label": "Kiểm lâm"},
                { "id": "col_12", "label": "Giáo dục và đào tạo"},
                { "id": "col_13", "label": "Nội vụ"},
                { "id": "col_14", "label": "Tài chính kế toán"},
                { "id": "col_15", "label": "Giao thông vận tải"},
                { "id": "col_16", "label": "Văn hóa thông tin"},
                { "id": "col_17", "label": "Thủy sản"},
                { "id": "col_18", "label": "An toàn vệ sinh thực phẩm"},
                { "id": "col_19", "label": "Chứng thực"},
                { "id": "col_20", "label": "Văn hóa cơ sở"},
                { "id": "col_21", "label": "Y tế dự phòng"},
                { "id": "col_22", "label": "Công nghiệp tiêu dùng"},
                { "id": "col_23", "label": "Lưu thông hàng hoá trong nước"},
                { "id": "col_24", "label": "Tư pháp"},
                { "id": "col_25", "label": "Tài chính kế hoạch"},
                { "id": "col_26", "label": "Y tế"},
                { "id": "col_27", "label": "Thành lập và hoạt động"},
                { "id": "col_28", "label": "An ninh trật tự"},
                { "id": "col_29", "label": "Thuế"},
                { "id": "col_30", "label": "Nông nghiệp và phát triển nông thôn"}
            ]
        },
        "dataset": [
            {
                "data": [
                    { "rowid": "row_1", "columnid": "col_1", "value": "2"},
                    //nếu không có value thì không cần add

                    { "rowid": "row_2", "columnid": "col_2", "value": "1"},
                    { "rowid": "row_2", "columnid": "col_3", "value": "1"},
                    { "rowid": "row_2", "columnid": "col_4", "value": "137"},
                    { "rowid": "row_2", "columnid": "col_5", "value": "2"},
                    { "rowid": "row_3", "columnid": "col_3", "value": "11"},
                    { "rowid": "row_3", "columnid": "col_4", "value": "11"},
                    { "rowid": "row_3", "columnid": "col_6", "value": "4"},
                    { "rowid": "row_3", "columnid": "col_7", "value": "15"},
                    { "rowid": "row_3", "columnid": "col_8", "value": "4"},
                    { "rowid": "row_3", "columnid": "col_10", "value": "2"},
                    { "rowid": "row_3", "columnid": "col_11", "value": "2"},
                    { "rowid": "row_3", "columnid": "col_12", "value": "1"},
                    
                    { "rowid": "row_3", "columnid": "col_13", "value": "5"},
                    { "rowid": "row_3", "columnid": "col_14", "value": "26"},
                    { "rowid": "row_3", "columnid": "col_15", "value": "1"},
                    { "rowid": "row_3", "columnid": "col_16", "value": "78"},
                    { "rowid": "row_3", "columnid": "col_17", "value": "1"},
                    { "rowid": "row_3", "columnid": "col_18", "value": "26"},
                    { "rowid": "row_3", "columnid": "col_19", "value": "3"},
                    { "rowid": "row_3", "columnid": "col_20", "value": "126"},
                    { "rowid": "row_3", "columnid": "col_21", "value": "1"},

                    { "rowid": "row_4", "columnid": "col_3", "value": "12"},
                    { "rowid": "row_4", "columnid": "col_4", "value": "1"},
                    { "rowid": "row_4", "columnid": "col_6", "value": "5"},
                    { "rowid": "row_4", "columnid": "col_7", "value": "2"},
                    { "rowid": "row_4", "columnid": "col_10", "value": "1"},
                    { "rowid": "row_4", "columnid": "col_12", "value": "1"},
                    { "rowid": "row_4", "columnid": "col_22", "value": "2"},
                    { "rowid": "row_4", "columnid": "col_23", "value": "7"},
                    { "rowid": "row_4", "columnid": "col_24", "value": "5"},
                    { "rowid": "row_4", "columnid": "col_25", "value": "57"},
                    { "rowid": "row_4", "columnid": "col_26", "value": "8"},
                    { "rowid": "row_4", "columnid": "col_27", "value": "40"},

                    { "rowid": "row_5", "columnid": "col_3", "value": "1"},
                    { "rowid": "row_5", "columnid": "col_7", "value": "4"},
                    { "rowid": "row_5", "columnid": "col_12", "value": "2"},
                    { "rowid": "row_5", "columnid": "col_16", "value": "3"},
                    { "rowid": "row_5", "columnid": "col_25", "value": "5"},
                    { "rowid": "row_5", "columnid": "col_26", "value": "2"},
                    { "rowid": "row_5", "columnid": "col_28", "value": "4"},

                    { "rowid": "row_6", "columnid": "col_3", "value": "2"},
                    { "rowid": "row_6", "columnid": "col_24", "value": "2"},
                    { "rowid": "row_6", "columnid": "col_25", "value": "1"},
                    { "rowid": "row_6", "columnid": "col_29", "value": "1"},

                    { "rowid": "row_7", "columnid": "col_3", "value": "3"},
                    { "rowid": "row_7", "columnid": "col_6", "value": "1"},
                    { "rowid": "row_7", "columnid": "col_16", "value": "2"},
                    { "rowid": "row_7", "columnid": "col_18", "value": "3"},
                    { "rowid": "row_7", "columnid": "col_24", "value": "196"},
                    { "rowid": "row_7", "columnid": "col_25", "value": "9"},
                    { "rowid": "row_7", "columnid": "col_26", "value": "1"},

                    { "rowid": "row_8", "columnid": "col_3", "value": "26"},
                    { "rowid": "row_8", "columnid": "col_4", "value": "12"},
                    { "rowid": "row_8", "columnid": "col_6", "value": "11"},
                    { "rowid": "row_8", "columnid": "col_16", "value": "38"},
                    { "rowid": "row_8", "columnid": "col_24", "value": "7"},
                    { "rowid": "row_8", "columnid": "col_25", "value": "346"},
                    { "rowid": "row_8", "columnid": "col_26", "value": "144"},
                    { "rowid": "row_8", "columnid": "col_29", "value": "17"},
                    { "rowid": "row_8", "columnid": "col_30", "value": "16"}
                ]
            }
        ],
        "colorrange": {
            "gradient": "1",
            "minvalue": "0",
            "code": "ffffff",
            "startlabel": "",
            "endlabel": "",
            "color": [
                {
                    "code":"c1daf6",
                    "minvalue": "1",
                    "maxvalue": "200"
                },
                {
                    "code": "7aaaef",
                    "minvalue": "0",
                    "maxvalue": "5"
                },
                {
                    "code":"3e86ec",
                    "minvalue": "6",
                    "maxvalue": "10"
                },
                {
                    "code":"2c68d4",
                    "minvalue": "11",
                    "maxvalue": "50"
                },
                {
                    "code":"1559d4",
                    "minvalue": "51",
                    "maxvalue": "150"
                }
            ]
        }
    };
    //end: fusionchart

}


})();
