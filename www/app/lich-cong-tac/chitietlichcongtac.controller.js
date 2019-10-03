/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.lichcongtac')
        .controller('ChiTietLichCongTacCtrls', chiTietLichCongTacCtrl);

    chiTietLichCongTacCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', '$q', '$cordovaFile','$ionicHistory',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup', 'File',
        'MasterFtr', 'UtilsFtr', 'LichCongTac'
    ];

    function chiTietLichCongTacCtrl(
        $scope, $rootScope, $state, $filter, $q, $cordovaFile,$ionicHistory,
        CONST, LSFtr, Loader, Datetime, Popup, File,
        MasterFtr, UtilsFtr, LichCongTac
    ) {
        $scope.title = "CHI TIẾT LỊCH CÔNG TÁC";
        $scope.idLCT = $state.params.lichcongtacid;
        $scope.idLCTCN = $state.params.lichcongtaccnid;
        if ($scope.idLCT !== null) {
            LichCongTac.getCTLichUyBan($scope.idLCT).then(function (data) {
                $scope.fomrdataLCTUyBan = JSON.parse(data);
            }, function (err) {
                Popup.e("Lỗi kết nối lấy lịch công tác ủy ban");
            });
        } else if ($scope.idLCTCN !== null) {
            //Popup.e("Không có dữ liệu để hiển thị");
            LichCongTac.getCTLichCaNhan($scope.idLCTCN).then(function (data) {
                $scope.fomrdataLCTUyBan = JSON.parse(data);
            }, function (err) {
                Popup.e("Lỗi kết nối lấy lịch công tác cá nhân");
            });
        } else {
            Popup.e("Không có dữ liệu để hiển thị");
        }
        $scope.openFile = function (resource, primkey, fileid) {
            $scope.paramsFile = {
                "resourcecode": resource,
                "primkey": primkey,
                "fileid": fileid
            }
            LichCongTac.getFileLCT($scope.paramsFile).then(function (data) {
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
                        // error
                        Popup.e("Không thể ghi file, kiểm tra bộ nhớ thiết bị!");
                    });
            }, function (err) {
                Popup.e("Lỗi kết nối tải file lịch công tác");
            });
        }

        $scope.$on('$ionicView.loaded', function () {
        });

        $scope.$on('$ionicView.enter', function () {
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
