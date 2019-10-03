/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.xulycongviec')
        .controller('ChiTietThongBaoCtrl', chiTietThongBaoCtrl);

    chiTietThongBaoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', 'File', '$sce',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup', '$cordovaFile',
        'MasterFtr', 'UtilsFtr', 'ThongBaoFtr'
    ];

    function chiTietThongBaoCtrl(
        $scope, $rootScope, $state, $filter, File, $sce,
        CONST, LSFtr, Loader, Datetime, Popup, $cordovaFile,
        MasterFtr, UtilsFtr, ThongBaoFtr
    ) {
        $scope.title = "Chi tiết thông báo";
        $scope.ctthongbaoID = {
            thongBaoNoiBoID: $state.params.ThongbaoID
        }
        $scope.Chitietthongbao = function (params) {
            ThongBaoFtr.getCTThongBao(params).then(function (obj) {
                $scope.htmlBind = $sce.trustAsHtml(obj.NoiDung);
                $scope.DataCTTB = obj;
                $scope.datafile = obj.ListFile
            }, function (err) {
                Popup.e("Lỗi kết nối lấy chi tiết thông báo");
            })
        }
        $scope.openFile = function (item) {
            $scope.paramsFile = {
                "fileID": item.TenFile
            }

            $scope.filetype = item.TenFile.substring(item.TenFile.lastIndexOf(".") + 1, item.TenFile.length);
            $scope.filename = item.TenFile.substring(0, item.TenFile.lastIndexOf("."));
            ThongBaoFtr.getfiledinhkem($scope.paramsFile).then(function (data) {
                var base = File.base64toBlob(data, '.' + $scope.filetype.toLowerCase());
                $scope.localDownloadPath = cordova.file.externalDataDirectory;
                if (ionic.Platform.isIOS()) {
                    $scope.localDownloadPath = cordova.file.documentsDirectory;
                } else if (ionic.Platform.isAndroid()) {
                    if (cordova.file.externalDataDirectory == null) {
                        $scope.localDownloadPath = cordova.file.dataDirectory;
                    }
                }
                $cordovaFile.writeFile($scope.localDownloadPath, $scope.filename + '.' + $scope.filetype.toLowerCase(), base, true)
                    .then(function (success) {
                        cordova.plugins.fileOpener2.open(
                            $scope.localDownloadPath + '/' + $scope.filename + '.' + $scope.filetype.toLowerCase(),
                            File.getFileMIMEType(item.TenFile),
                            {
                                error: function () { Popup.e("Không thể mở file hoặc thiết bị chưa cài ứng dụng đọc dạng file này") },
                                success: function () { }
                            }
                        );
                    }, function (error) {
                        Popup.e("Không thể ghi file, kiểm tra bộ nhớ thiết bị!");
                    });
            }, function (err) {
                Popup.e("Lỗi kết nối tải file thông báo");
            });
        }
        $scope.$on('$ionicView.loaded', function () {
            $scope.Chitietthongbao($scope.ctthongbaoID);

        });

        $scope.$on('$ionicView.enter', function () {
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
