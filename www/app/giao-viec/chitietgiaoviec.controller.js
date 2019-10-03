/**
 * document list controller
 * @2017
 **/



(function () {
  'use strict';


  angular
    .module('FTravel.giaoviec')
    .controller('ChiTietGiaoViecCtrl', chiTietGiaoViecCtrl);

  chiTietGiaoViecCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter', '$q',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'GiaoViecFtr', 'File', '$cordovaFile'
  ];

  function chiTietGiaoViecCtrl(
    $scope, $rootScope, $state, $filter, $q,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, GiaoViecFtr, File, $cordovaFile
  ) {
    $scope.title = "CHI TIẾT GIAO VIỆC";
    var giaoViecID = $state.params.giaoViecID;
    var tinhTrang = $state.params.tinhtrang;
    var index = $state.params.index;
    $scope.nguoiXuLy = $rootScope.userinfo.HoTen;
    $scope.trangthai = tinhTrang;
    $scope.trangthai2 = index;
    $scope.dataChiTiet = "";
    $scope.arrFileDinhKem = [];
    $scope.dataChiTietXL = "";
    $scope.dataChiTietLuu = "";
    $scope.arrFileDinhKemXL = [];
    var files = [];
    $scope.fileNames = [];
    $scope.fileNameType = [];
    var fileDinhKem;
    console.log($rootScope.userinfo.HoTen);
    $scope.form = {
      "giaoViecID": ""
    }
    $scope.fomr2 = {
      "giaoViecID": "",
      "nguoiNhanID": ""
    }
    $scope.formNhacnho = {
      "noidungnhacnho": ""
    }
    $scope.loadPage = function () {
      $scope.arrFileDinhKem = [];
      $scope.danhSachFile = "";
      $scope.form.giaoViecID = giaoViecID;
      $scope.fomr2.giaoViecID = giaoViecID;
      $scope.fomr2.nguoiNhanID = $rootScope.UserID;
      if (tinhTrang == 0 && index == 0) {
        GiaoViecFtr.chiTietDuocGiao($scope.form).then(function (dataCXL) {
          console.log(dataCXL);
          $scope.dataChiTiet = dataCXL;
          if ($scope.dataChiTiet !== null) {
            var namefile = $scope.dataChiTiet.FileDinhKem.split('/');
            angular.forEach(namefile, function (item) {
              var namefile2 = item.split('|');
              var dinhkemChiTiet = {
                "name": namefile2[0],
                "id": namefile2[1]
              }
              $scope.arrFileDinhKem.push(dinhkemChiTiet);
            });
          }
          $scope.danhSachFile = $scope.arrFileDinhKem;
          console.log($scope.arrFileDinhKem);
        }, function (error) {
          console.log(error);
        });
        GiaoViecFtr.chiTietDaGiao($scope.fomr2).then(function (dataDXL) {
          console.log(dataDXL);
          if (dataDXL !== null || dataDXL !== undefined) {
            $scope.dataChiTietLuu = dataDXL;
            $scope.formNhacnho.noidungnhacnho = $scope.dataChiTietLuu[0].NoiDungXuLy;
            if ($scope.dataChiTietLuu[0].FileDinhKem !== null || $scope.dataChiTietLuu[0].FileDinhKem !== undefined) {
              var tenFile = $scope.dataChiTietLuu[0].FileDinhKem.split("/");
              // var tenFile2 = tenFile.split("|")[0];
              angular.forEach(tenFile, function (item) {
                var tenFile2 = item.split('|');
                $scope.fileNames.push(tenFile2[0]);
              });

            }
          }
        }, function (error) {
          console.log(error);
        });
      } else if (tinhTrang == 1 && index == 0 || tinhTrang == 1 && index == 1) {
        GiaoViecFtr.chiTietDuocGiao($scope.form).then(function (dataCXL) {
          console.log(dataCXL);
          $scope.dataChiTiet = dataCXL;
          if ($scope.dataChiTiet !== null) {
            var namefile = $scope.dataChiTiet.FileDinhKem.split('/');
            angular.forEach(namefile, function (item) {
              var namefile2 = item.split('|');
              var dinhkemChiTiet = {
                "name": namefile2[0],
                "id": namefile2[1]
              }
              $scope.arrFileDinhKem.push(dinhkemChiTiet);
            });
          }
          $scope.danhSachFile = $scope.arrFileDinhKem;
        }, function (error) {
          console.log(error);
        });
        GiaoViecFtr.chiTietDaGiao($scope.form).then(function (dataDXL) {
          console.log(dataDXL);
          if (dataDXL !== null) {
            angular.forEach(dataDXL, function (item) {
              if(item.FileDinhKem === "null"  || item.FileDinhKem === null){
               
               
              }else{
                var tenFile = item.FileDinhKem.split("/");
                angular.forEach(tenFile,function(item2){
                  var tenFile2DXL = item2.split("|");
                  var dinhkemChiTiet = {
                    "name": tenFile2DXL[0],
                    "id": tenFile2DXL[1]
                  }
                  $scope.arrFileDinhKemXL.push(dinhkemChiTiet);
                });
              }
            });
            $scope.dataChiTietXL = dataDXL;
          }
        }, function (error) {
          console.log(error);
        });
      } else if (tinhTrang == 0 && index == 1) {
        GiaoViecFtr.chiTietDuocGiao($scope.form).then(function (dataCXL) {
          console.log(dataCXL);
          $scope.dataChiTiet = dataCXL;
          if ($scope.dataChiTiet !== null) {
            var namefile = $scope.dataChiTiet.FileDinhKem.split('/');
            angular.forEach(namefile, function (item) {
              var namefile2 = item.split('|');
              var dinhkemChiTiet = {
                "name": namefile2[0],
                "id": namefile2[1]
              }
              $scope.arrFileDinhKem.push(dinhkemChiTiet);
            });
          }
          $scope.danhSachFile = $scope.arrFileDinhKem;
        }, function (error) {
          console.log(error);
        });
        GiaoViecFtr.chiTietDaGiao($scope.form).then(function (dataDXL) {
          console.log(dataDXL);
          if (dataDXL !== null) {
            angular.forEach(dataDXL, function (item) {
              var tenFile = item.FileDinhKem.split("/");
              var tenFile2 = tenFile.split('|');
              $scope.arrFileDinhKemXL.push(tenFile2[0]);
            });
            $scope.dataChiTietXL = dataDXL;
            console.log($scope.dataChiTietXL[0].FileDinhKem);
          }
        }, function (error) {
          console.log(error);
        });
      }
    }
    $scope.tranfer = function () {
      // console.log($scope.fileNameType.join("/"));
      var _msg_err = '';
      if (typeof $scope.formNhacnho.noidungnhacnho == 'undefined' || $scope.formNhacnho.noidungnhacnho.length <= 0)
        _msg_err += 'Chưa nhập nội dung </br>';
      if (_msg_err !== '') {
        Popup.e(_msg_err);
        return false;
      }
      $scope.fomrSaveChiTiet = {
        "ChiTietGiaoViecID": 0,
        "GiaoViecID": $scope.form.giaoViecID,
        "NguoiNhanID": $rootScope.UserID,
        "NguoiNhan": $scope.dataChiTiet.NguoiDuocGiao,
        "NoiDungXuLy": $scope.formNhacnho.noidungnhacnho,
        "NgayXuLy": $scope.dataChiTiet.ThoiHanXuLy,
        "FileDinhKem": $scope.fileNameType.join("/"),
        "TinhTrangID": $scope.dataChiTiet.TinhTrangID,
        "DonViID": 1,
        "CreatedDate": "",
        "CreatedByID": $rootScope.UserID,
        "ModifiedDate": "",
        "ModifiedByID": $rootScope.UserID
      }
      GiaoViecFtr.chiTietSaveGiaoViec($scope.fomrSaveChiTiet).then(function (dataComplete) {
        console.log(dataComplete);
        Popup.t("Lưu thành công");
      }, function (error) {
        console.log(error);
        Popup.e("Lỗi kết nối lưu giao việc");
      });

    }
    $scope.reject = function () {
      var _msg_err = '';
      if (typeof $scope.formNhacnho.noidungnhacnho == 'undefined' || $scope.formNhacnho.noidungnhacnho.length <= 0)
        _msg_err += 'Chưa nhập nội dung nhắc nhở</br>';
      if (_msg_err !== '') {
        Popup.e(_msg_err);
        return false;
      }
      $scope.fomrHoanThanh =
        {
          "ChiTietGiaoViecID": 0,
          "GiaoViecID": $scope.form.giaoViecID,
          "NguoiNhanID": $rootScope.UserID,
          "NguoiNhan": $scope.dataChiTiet.NguoiDuocGiao,
          "NoiDungXuLy": $scope.formNhacnho.noidungnhacnho,
          "NgayXuLy": $scope.dataChiTiet.ThoiHanXuLy,
          "FileDinhKem": $scope.fileNameType.join("/"),
          "TinhTrangID": 1,
          "DonViID": 1,
          "CreatedDate": "",
          "CreatedByID": $rootScope.UserID,
          "ModifiedDate": "",
          "ModifiedByID": $rootScope.UserID
        }
      GiaoViecFtr.chiTietHoanThanhGiaoViec($scope.fomrHoanThanh).then(function (data) {
        console.log(data);
        Popup.t("Giao việc thành công");
        $state.go("app.ds-giaoviec");
      }, function (error) {
        console.log(error);
        Popup.e("Lỗi kết nối giao việc");
      })
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
    $scope.openFile = function (file) {
      var fileType = file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length);
      $scope.paramsFile = {
        "FileID": file.id,
        "Type": fileType,
        "Base64": ""
      }
      GiaoViecFtr.download($scope.paramsFile).then(function (data) {
        var rest = file.name.substring(0, file.name.lastIndexOf(".") + 1);
        var nameFile = rest.split('.')[0];
        var base = File.base64toBlob(data, '.' + fileType.toLowerCase());
        $scope.localDownloadPath = cordova.file.externalDataDirectory;
        if (ionic.Platform.isIOS()) {
          $scope.localDownloadPath = cordova.file.documentsDirectory;
        } else if (ionic.Platform.isAndroid()) {
          if (cordova.file.externalDataDirectory == null) {
            $scope.localDownloadPath = cordova.file.dataDirectory;
          }
        }
        $cordovaFile.writeFile($scope.localDownloadPath, nameFile + '.' + fileType.toLowerCase(), base, true)
          .then(function (success) {
            // success
            cordova.plugins.fileOpener2.open(
              $scope.localDownloadPath + '/' + nameFile + '.' + fileType.toLowerCase(),
              File.getFileMIMEType(file.name),
              {
                error: function () { Popup.e("Không thể mở file hoặc thiết bị chưa cài ứng dụng đọc dạng file này") },
                success: function () { }
              }
            );
          }, function (error) {
            // error
            Popup.e("Không thể ghi file, kiểm tra bộ nhớ thiết bị!");
          });
      }, function (error) {
        console.log(error);
        Popup.e("File không tồn tại");
      });
      // $scope.localDownloadPath = cordova.file.externalDataDirectory;
      // if (ionic.Platform.isIOS()) {
      //   $scope.localDownloadPath = cordova.file.documentsDirectory;
      // } else if (ionic.Platform.isAndroid()) {
      //   if (cordova.file.externalDataDirectory == null) {
      //     $scope.localDownloadPath = cordova.file.dataDirectory;
      //   }
      // }
      console.log($scope.paramsFile);

    }

    var xulyFile = function (data) {
      if (data != null && data != "") {
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
              File.getFileMIMEType(data.filename), {
                error: function () {
                  Popup.e("Không thể mở file hoặc thiết bị chưa cài ứng dụng đọc dạng file này")
                },
                success: function () { }
              }
            );
          }, function (error) {
            // error
            Popup.e("Lỗi kết nối server");
          });
      } else
        Popup.t("Tải file không thành công");
    }

    $scope.collape = function (event) {
      var element = event.srcElement ? event.srcElement : event.target;
    };

    $scope.luuNhacnho = function (item) {
      var tiendo = 0;
      if (item.tiendo != "") {
        tiendo = parseInt(item.tiendo);
      }
      $scope.formNhacnho = {
        "username": $rootScope.UserName,
        "congviecid": congviecid,
        "resourcepk": item.resourcepk,
        "resourcecode": item.resourcecode,
        "phantram": tiendo,
        "noidungnhacnho": item.noidungnhacnho
      }
      var _msg_err = '';
      if (typeof $scope.formNhacnho.noidungnhacnho == 'undefined' || $scope.formNhacnho.noidungnhacnho.length <= 0)
        _msg_err += 'Chưa nhập nội dung nhắc nhở</br>';
      if (_msg_err !== '') {
        Popup.e(_msg_err);
        return false;
      }
      GiaoViecFtr.luunhacnhochidaogiaoviec($scope.formNhacnho).then(function (rep) {
        Popup.t("Gửi nhắc nhở thành công");
      }, function (err) {
        Popup.t("Lỗi gửi nhắc nhở");
      });
    }

    $scope.$on('$ionicView.loaded', function () { });

    $scope.$on('$ionicView.enter', function () {
      $scope.loadPage();
    });

    $scope.$on('$ionicView.leave', function () { });
  }

})();
