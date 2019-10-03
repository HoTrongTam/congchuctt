/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.giaoviec')
        .controller('NhapGiaoViecCtrl', nhapGiaoViecCtrl);

    nhapGiaoViecCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', '$ionicModal',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', '$q', 'DanhBaFtr', 'GiaoViecFtr'
    ];

    function nhapGiaoViecCtrl(
        $scope, $rootScope, $state, $filter, $ionicModal,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, $q, DanhBaFtr, GiaoViecFtr
    ) {
        $scope.title = "Nhập giao việc";
        $scope.isIDNhap = $state.params.isID;
        var nguoigiao = $rootScope.userinfo.HoTen;
        var idGiaoViec = $state.params.giaoViecID;
        $scope.dsCaNhan = [];
        var date = new Date();
        $scope.daycurrent = date.getDate();
        $scope.formdanhba = "" + "&pageSize=" + 1000000 + "&pageIndex=" + 1;
        $scope.formmodal = {
            "ThoiHanXuLy": null,
            "nguoinhanid": "",
            "NoiDungGiao": ""

        }
        var files = [];
        $scope.fileNames = [];
        $scope.fileNameType = [];
        DanhBaFtr.getDanhba($scope.formdanhba).then(function (data) {
            console.log(data);
            // var data = JSON.parse(rep) || [];
            for (var i = 0; i < data.length; i++) {
                var item = {
                    "value": data[i].UserID,
                    "text": data[i].HoTen
                }
                $scope.dsCaNhan.push(item);
            }
        }, function (err) {
            Popup.e("Lỗi kết nối lấy danh sách danh bạ");
        });

    
        // $scope.addfile = function (file, item) {
        //     if (item == 1) {
        // $scope.fileName1 = file[0].name;
        // $scope.fileNames.push($scope.fileName1);
        //     }
        //     var formdataFile = new FormData();
        //     formdataFile.append('filedata', file[0]);
        //     formdataFile.append("file", file[0]);

        //     var fileInfo = {
        //         "index": item,
        //         "formDataFile": formdataFile
        //     }
        //     files.push(fileInfo);
        //     console.log(files);
        //     var request = new XMLHttpRequest();
        //     request.open("POST", "http://foo.com/submitform.php");
        //     request.send(files[0].formDataFile);
        // };
     
        $scope.dsCN = {
            theme: 'material',
            display: 'center',
            data: $scope.dsCaNhan,
            select: 'multiple',
            filter: true,
            placeholder: 'Nhấn để chọn danh sách',
            cssClass: 'mobiscroll1-21',
            multiline: 2,
            filterEmptyText: "Không tìm thấy.",
            filterPlaceholderText: 'Tìm kiếm',
            setText: "ĐẶT",
            cancelText: 'HỦY',
            onSet: function (valueText, inst) {
                selectedText(valueText, inst);
            },
            onBeforeShow: function (event, inst) {
                beforeSelect(event, inst);
            }
        };
        var beforeSelect = function (event, inst) {
            if ($scope.tempNguoixulys == undefined) {
                inst.clear();
            }

        }
        var selectedText = function (data, inst) {
            $scope.tempNguoixulys = [];
            $scope.dsDuocGiao = [];
            $scope.dsIDDuocGiao = [];
            var lstNguoinhan = inst.getVal(true);
            if (lstNguoinhan.length > 0) {
                var lstTennguoinhan = data.valueText.split(',');
                for (var i = 0; i < lstNguoinhan.length; i++) {
                    var nguoinhanxuly = {
                        "NguoiNhanID": lstNguoinhan[i],
                        "NguoiNhan": lstTennguoinhan[i]
                    }
                    $scope.tempNguoixulys.push(nguoinhanxuly);
                    $scope.dsDuocGiao.push(nguoinhanxuly.NguoiNhan);
                    $scope.dsIDDuocGiao.push(nguoinhanxuly.NguoiNhanID);
                }
                console.log($scope.dsIDDuocGiao);
                $timeout(function () {
                    $scope.tempNguoixulys;$scope.dsDuocGiao;$scope.dsIDDuocGiao;
                }, 300);
            } else {
                inst.clear();
            }
        }
        $scope.addfile = function (file) {
            $scope.avatarname = file[0].name;
            $scope.avatartype = file[0].type;
            $scope.type = $scope.avatartype.split('/')[1];
            $scope.fileName1 = file[0].name;
            $scope.fileNames.push($scope.fileName1);
            files.push(file);
            var deferred = $q.defer();
            var fr = new FileReader();
            fr.onload = function (e) {
                deferred.resolve(e.target.result);
                $scope.avatarbase64 = e.target.result.substring(e.target.result.indexOf(",") + 1, e.target.result.length);
                $scope.fomrUpload = {
                    "FileID": "",
                    "Type": $scope.type,
                    "Base64": $scope.avatarbase64
                }
                GiaoViecFtr.upload($scope.fomrUpload).then(function (data) {
                    $scope.idFile = data;
                    Popup.t("Tải file thành công");
                    $scope.fomrDataFile = $scope.fileName1 + '|' + $scope.idFile;
                    $scope.fileNameType.push($scope.fomrDataFile);
                }, function (error) {
                    console.log(error);
                    Popup.t("Tải file thất bại");
                });

            };
            fr.readAsDataURL(file[0]);
            return deferred.promise;
        }
        $scope.removeFile = function (index) {
            files.splice(index, 1);
            $scope.fileNames.splice(index, 1);
        }
        // $scope.insert = function () {
        //     var _msg_err = '';
        //     if (typeof $scope.formmodal.NoiDungGiao == 'undefined' || $scope.formmodal.NoiDungGiao.length <= 0) {
        //         _msg_err += 'Chưa nhập nội dung giao việc</br>';
        //     } else if (typeof $scope.formmodal.ThoiHanXuLy == 'undefined' || $scope.formmodal.ThoiHanXuLy.length <= 0) {
        //         _msg_err += 'Chưa chọn ngày</br>';
        //     } else if ($scope.tempNguoixulys == null || $scope.tempNguoixulys == undefined) {
        //         _msg_err += 'Chưa chọn người nhận</br>';
        //     } else {
        //         // console.log($scope.tempNguoixulys);
        //         $scope.fomrGiaoViec = {
        //             "GiaoViecID": idGiaoViec,
        //             "NguoiGiaoID": $rootScope.UserID,
        //             "NguoiGiao": nguoigiao,
        //             "NoiDungGiao": $scope.formmodal.NoiDungGiao,
        //             "NguoiDuocGiao": "",
        //             "ThoiHanXuLy": $scope.formmodal.ThoiHanXuLy,
        //             "FileDinhKem": $scope.fileNameType.join("/"),
        //             "TinhTrangID": 0,
        //             "DonViID": 1,
        //             "CreatedDate": null,
        //             "CreatedByID": null,
        //             "ModifiedDate": null,
        //             "ModifiedByID": null,
        //             "NguoiNhan": $scope.tempNguoixulys
        //         }
        //         console.log($scope.fomrGiaoViec);
        //         GiaoViecFtr.themMoiGiaoViec($scope.fomrGiaoViec).then(function (data) {
        //             Popup.t("Lưu giao việc thành công");
        //         }, function (error) {
        //             Popup.e("Lưu giao việc thất bại");
        //             console.log(error);
        //         });
        //     }

        //     if (_msg_err !== '') {
        //         Popup.e(_msg_err);
        //         return false;
        //     }
        // }
        $scope.save = function () {
            var _msg_err = '';
            if (typeof $scope.formmodal.NoiDungGiao == 'undefined' || $scope.formmodal.NoiDungGiao.length <= 0) {
                _msg_err += 'Chưa nhập nội dung giao việc</br>';
            } else if (typeof $scope.formmodal.ThoiHanXuLy == 'undefined' || $scope.formmodal.ThoiHanXuLy == null) {
                _msg_err += 'Chưa chọn ngày</br>';
            } else if ($scope.tempNguoixulys == null || $scope.tempNguoixulys == undefined) {
                _msg_err += 'Chưa chọn người nhận</br>';
            } else {
                // console.log($scope.tempNguoixulys);
                $scope.fomrGiaoViec = {
                    "GiaoViecID": 0,
                    "NguoiGiaoID": $rootScope.UserID,
                    "NguoiGiao": nguoigiao,
                    "NoiDungGiao": $scope.formmodal.NoiDungGiao,
                    "NguoiDuocGiao": $scope.dsDuocGiao.join(","),
                    "ThoiHanXuLy": moment($scope.formmodal.ThoiHanXuLy).format('DD/MM/YYYY'),
                    "FileDinhKem": $scope.fileNameType.join("/"),
                    "DonViID": 1,
                    "CreatedDate": null,
                    "CreatedByID": null,
                    "ModifiedDate": null,
                    "ModifiedByID": null,
                    "NguoiNhan": $scope.tempNguoixulys,
                    "TinhTrangID":0
                }
                console.log($scope.fomrGiaoViec);
                GiaoViecFtr.themMoiGiaoViec($scope.fomrGiaoViec).then(function (data) {
                    Popup.t("Lưu giao việc thành công");
                    var paramsFireBase = {
                        "message":$scope.formmodal.NoiDungGiao,
                        "key": $scope.dsIDDuocGiao.join(",")
                    }
                    GiaoViecFtr.sendInfoFireBase(paramsFireBase).then(function(dataFireBase){
                        console.log(dataFireBase);
                    },function(err){
                        console.log(err);
                    });
                    $state.go("app.ds-giaoviec");
                }, function (error) {
                    Popup.e("Lưu giao việc thất bại");
                    console.log(error);
                });
            }

            if (_msg_err !== '') {
                Popup.e(_msg_err);
                return false;
            }
        }
        $scope.$on('$ionicView.loaded', function () { });

        $scope.$on('$ionicView.enter', function () {
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
