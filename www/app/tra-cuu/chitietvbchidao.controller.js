/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.tracuu')
        .controller('CTVBChiDaoCtrl', ctVBChiDaoCtrl);

    ctVBChiDaoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'TraCuuFtr', 'File', '$cordovaFile'
    ];

    function ctVBChiDaoCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, TraCuuFtr, File, $cordovaFile
    ) {
        $scope.title = "Chi tiết văn bản chỉ đạo";
        $scope.tabIndex = 0;
        $scope.ctchidaoID = {
            chitietchidaoID: $state.params.ChidaoID,
            chitietloaivn: $state.params.Loaivb,
            chitietcongviecID: $state.params.Congviecid
        };
        $scope.inputvbcd = "{\"chidaoid\":" + $scope.ctchidaoID.chitietchidaoID + "," + "\"loaivanban\": " + $scope.ctchidaoID.chitietloaivn + "}";
        $scope.onTabChange = function (indexID) {
            $scope.tabIndex = indexID; 
        };
        // Ham lay chi tiet van ban chi dao
        $scope.loadchitietvbcd = function (params) {
            TraCuuFtr.ctchidaotracuu(params).then(function (data) {
                $scope.DataVBCD = JSON.parse(data);
                $scope.VBCDfile = $scope.DataVBCD.filedinhkems;
            }, function (err) {
                Popup.e("Lỗi kết nối tới máy chủ");
            })
        };
        // Ham load qua trinh xu ly van ban chi dao
        $scope.loadxulyvanbanchidao = function (params) {
            TraCuuFtr.layxulyvbchidao(params).then(function (data) {
                $scope.Dataxulycd = JSON.parse(data);
            }, function (err) {
                Popup.e("Lỗi kết nối tới máy chủ");
            })
        };
        // Open file van ban chi dao
        $scope.openFile = function (params) {
            $scope.paramsFile = {
                "resourcecode": params.resourcecode,
                "primkey": params.primkey,
                "fileid": params.fileid
            }
            TraCuuFtr.layfilechidao($scope.paramsFile).then(function (data) {
                var rest = data.filename.substring(0, data.filename.lastIndexOf(".") + 1);
                var nameFile = rest.split('.')[0];
                var typeFile = data.filename.substring(data.filename.lastIndexOf(".") + 1, data.filename.length);
                var base = File.base64toBlob(data.base64, '.' + typeFile.toLowerCase());
                $scope.localDownloadPath = cordova.file.externalDataDirectory;
                if (ionic.Platform.isIOS()) {
                    $scope.localDownloadPath = cordova.file.documentsDirectory;
                } else if (ionic.Platform.isAndroid()) {
                    if (cordova.file.externalDataDirectory == null) {
                        $scope.localDownloadPath = cordova.file.dataDirectory;
                    }
                }
                $cordovaFile.writeFile($scope.localDownloadPath, nameFile + '.' + typeFile.toLowerCase(), base, true)
                    .then(function (success) {
                        // success
                        cordova.plugins.fileOpener2.open(
                            $scope.localDownloadPath + '/' + nameFile + '.' + typeFile.toLowerCase(),
                            File.getFileMIMEType(data.filename),
                            {
                                error: function () { Popup.e("Không thể mở file hoặc thiết bị chưa cài ứng dụng đọc dạng file này") },
                                success: function () { }
                            }
                        );
                    }, function (error) {
                        Popup.e("Không thể ghi file, kiểm tra bộ nhớ thiết bị!");
                    });
            }, function (err) {
                Popup.e("Lỗi server không xác định");
            });
        }
        $scope.$on('$ionicView.loaded', function () {
            $scope.loadchitietvbcd($scope.inputvbcd);
            $scope.loadxulyvanbanchidao($scope.ctchidaoID.chitietcongviecID);
        });
        $scope.$on('$ionicView.enter', function () {});
        $scope.$on('$ionicView.leave', function () {});

    }


})();
