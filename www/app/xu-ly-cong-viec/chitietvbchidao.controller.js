/**
 * document list controller
 * @2017
 **/



(function() {
  'use strict';


  angular
    .module('FTravel.xulycongviec')
    .controller('ChiTietVBChiDaoCtrl', chiTietVBChiDaoCtrl);

  chiTietVBChiDaoCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter', '$cordovaFile',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'XuLyCongViec','File'
  ];

  function chiTietVBChiDaoCtrl(
    $scope, $rootScope, $state, $filter, $cordovaFile,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, XuLyCongViec, File
  ) {
    $scope.title = "Chi tiết văn bản chỉ đạo";
    var congviecid = $state.params.congviecid;
    var chidaoid = $state.params.chidaoid;
    var loaivanban = parseInt($state.params.loaivanban);
    var vanbanid = $state.params.vanbanid;
    $scope.tabIndex = 0;
    $scope.onTabChange = function(tabIndex) {
      $scope.tabIndex = tabIndex;
      switch (tabIndex) {
        case 0: // chi tiet
          $scope.loadPage();
          break;
        case 1: // qua trinh xu ly
          $scope.loadPage();
          break;
        case 2: // tien do
          $scope.loadPage();
          break;
        default:
          break;
      }
    };

    $scope.nhacnhochung = {
      "noidungnhacnho": ''
    }

    $scope.nhacnhorieng = {
      "noidungnhacnho": ''
    }

    $scope.loadPage = function() {
      if ($scope.tabIndex == 0) {
        XuLyCongViec.chitietchidao(chidaoid, loaivanban).then(function(data) {
          $scope.detail = JSON.parse(data);
        }, function(err) {
          Popup.e("Lỗi kết nối lấy chi tiết vb chỉ đạo");
        });
      } else if ($scope.tabIndex == 1) {
        XuLyCongViec.tiendoxulychidao(congviecid).then(function(data) {
          $scope.tasks = JSON.parse(data);
          htmlBind = $sce.trustAsHtml
        }, function(err) {
          Popup.e("Lỗi kết nối lấy tiến độ xử lý");
        });
      } else if ($scope.tabIndex == 2) {
        XuLyCongViec.nguoinhannhacnho(vanbanid, loaivanban).then(function(rep) {
          $scope.nhacnho = JSON.parse(rep);
          if ($scope.nhacnho.length > 0) {
            angular.forEach($scope.nhacnho, function(item) {
              if (item.tiendo == null || item.tiendo == "") {
                item.tiendo = "0";
              }
            });
          }
        }, function(err) {
          Popup.e("Lỗi kết nối lấy người nhận nhắc nhở");
        });
      }
    }

    $scope.openFile = function(resource, primkey, fileid) {
      $scope.paramsFile = {
        "resourcecode": parseInt(resource),
        "primkey": parseInt(primkey),
        "fileid": parseInt(fileid)
      }
      var data = [];
      XuLyCongViec.taifilevanbandi($scope.paramsFile).then(function(data) {
        data = data;
        xulyFile(data);
      }, function(err) {
        Popup.e("Lỗi kết nối tải file văn bản");
      });
    }

    var xulyFile = function(data) {
      if (data != null && data != "") {
        var rest = data.filename.substring(0, data.filename.lastIndexOf(".") + 1);
        var typeFile = data.filename.substring(data.filename.lastIndexOf(".") + 1, data.filename.length);
        var nameFile = rest.split('.')[0];
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
          .then(function(success) {
            // success
            cordova.plugins.fileOpener2.open(
              $scope.localDownloadPath + '/' + nameFile + '.' + typeFile.toLowerCase(),
              File.getFileMIMEType(data.filename), {
                error: function() {
                  Popup.e("Không thể mở file hoặc thiết bị chưa cài ứng dụng đọc dạng file này")
                },
                success: function() {}
              }
            );
          }, function(error) {
            // error
            Popup.e("Lỗi kết nối tải file");

          });
      } else
        Popup.t("Tải file không thành công");
    }

    $scope.collapsed = false;
    $scope.collape = function(event) {
      var element = event.srcElement ? event.srcElement : event.target;
      $scope.collapsed = !$scope.collapsed;
    };

    $scope.luuNhacnho = function(item) {
      var tiendo = 0;
      if(item.tiendo !="") {
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
      XuLyCongViec.luunhacnhochidao($scope.formNhacnho).then(function(rep) {
        Popup.t("Gửi nhắc nhở thành công");
      }, function(err) {
        Popup.t("Lỗi gửi nhắc nhở");
      });
    }

    $scope.$on('$ionicView.loaded', function() {});

    $scope.$on('$ionicView.enter', function() {
      $scope.loadPage();
    });

    $scope.$on('$ionicView.leave', function() {});

  }


})();
