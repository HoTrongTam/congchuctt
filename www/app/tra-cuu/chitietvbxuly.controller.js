/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.tracuu')
        .controller('TCVBXuLyCtrl', tcVBXuLyCtrl);

    tcVBXuLyCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', '$q',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'TraCuuFtr', 'File', '$cordovaFile'
    ];

    function tcVBXuLyCtrl(
        $scope, $rootScope, $state, $filter, $q,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, TraCuuFtr, File, $cordovaFile
    ) {
        $scope.title = "Chi tiết văn bản";
        $scope.tabIndex = 0;
        $scope.onTabChange = function (tabIndex) {
            $scope.tabIndex = tabIndex;

        };
        // Ham load chi tiet van ban den

        $scope.loadchitietvbcden = function (params) {

            TraCuuFtr.laychitietvbden(params).then(function (data) {

                $scope.dataCTVBD = JSON.parse(data);
                $scope.VBdenfile = $scope.dataCTVBD.filedinhkems;

            }, function (err) {
                Popup.e("Lỗi kết nối tới máy chủ");
            });
        };

        // Ham load chi tiet van ban di
        $scope.loadchitietvbcdi = function (params) {
            TraCuuFtr.laychitietvbdi(params).then(function (data) {

                $scope.dataCTVBDi = JSON.parse(data);
                $scope.VBdifile = $scope.dataCTVBDi.filedinhkems;

            }, function (err) {
                Popup.e("Lỗi kết nối tới máy chủ");
            });
        };

        // Ham lay file va mo file 

        // Load qua trinh xu ly van ban den
        $scope.xulyvbden = function (params) {

            TraCuuFtr.layxulyvbden(params).then(function (data) {


                $scope.xlvbden = JSON.parse(data);

            }, function (err) {
                Popup.e("Lỗi kết nối tới máy chủ");
            });
        }
        // Load qua trinh xu ly van ban den

        // Load qua trinh xu ly van ban di
        $scope.xulyvbdi = function (params) {

            TraCuuFtr.layxulyvbdi(params).then(function (data) {


                $scope.xlvbdi = JSON.parse(data);

            }, function (err) {
                Popup.e("Lỗi kết nối tới máy chủ");
            });
        }
        // Load qua trinh xu ly van ban di


        $scope.openFile = function (params) {
            $scope.paramsFile = {
                "resourcecode": params.resourcecode,
                "primkey": params.primkey,
                "fileid": params.fileid
            }
            // Neu van ban den
            if ($scope.tabIndex == 0) {

                TraCuuFtr.layfilevbden($scope.paramsFile).then(function (data) {
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
                    Popup.e("Lỗi server không xác định");
                });

            }

            else if ($scope.tabIndex == 1) {

                TraCuuFtr.layfilevbdi($scope.paramsFile).then(function (data) {
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
                    Popup.e("Lỗi server không xác định");
                });
            }

        }

        // Ham lay file va mo file 
        $scope.$on('$ionicView.loaded', function () {
            if ($rootScope.chilindexTraCuu == 0) {
                $scope.loadchitietvbcden($state.params.VanbandenID);
                $scope.xulyvbden($state.params.VanbandenID);
            }
            else {
                $scope.loadchitietvbcdi($state.params.VanbandiID);
                $scope.xulyvbdi($state.params.VanbandiID);
            }

        });

        $scope.$on('$ionicView.enter', function () {
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
