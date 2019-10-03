/**
 * document list controller
 * @2017
 **/



(function() {
  'use strict';


  angular
    .module('FTravel.xulycongviec')
    .controller('ChiTietVBXuLyCtrl', chiTietVBXuLyCtrl);

  chiTietVBXuLyCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter', 'API',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'XuLyCongViec', 'File', '$cordovaFile'
  ];

  function chiTietVBXuLyCtrl(
    $scope, $rootScope, $state, $filter, API,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, XuLyCongViec, File, $cordovaFile
  ) {
    var id = $state.params.id;
    var loaivanban = $state.params.loaivanban;
    var VAN_BAN_DI = 1;
    var VAN_BAN_DEN = 2;
    if (loaivanban == VAN_BAN_DI) {
      $scope.title = "Chi tiết văn bản đi";
      $scope.vanbandi = true;
    } else {
      $scope.title = "Chi tiết văn bản đến";
      $scope.vanbanden = true;
    }

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

    var items = [{
        value: 0,
        text: '0%'
      },
      {
        value: 10,
        text: '10%'
      },
      {
        value: 20,
        text: '20%'
      },
      {
        value: 30,
        text: '30%'
      },
      {
        value: 40,
        text: '40%'
      },
      {
        value: 50,
        text: '50%'
      },
      {
        value: 60,
        text: '60%'
      },
      {
        value: 70,
        text: '70%'
      },
      {
        value: 80,
        text: '80%'
      },
      {
        value: 90,
        text: '90%'
      },
      {
        value: 100,
        text: '100%'
      }
    ];

    $scope.dsPhantram = {
      theme: 'material',
      display: 'center',
      data: items,
      placeholder: 'Nhấn để tìm kiếm',
      cssClass: 'mobiscroll1-21 lbl-percent',
      multiline: 1,
      setText: "ĐẶT",
      cancelText: 'HỦY'
    };

    $scope.tiendocuoi = {
      "congviecid": id,
      "phantram": '',
      "noidungtiendo": ''
    }

    $scope.loadPage = function() {
      if ($scope.tabIndex == 0) {
        if (loaivanban == VAN_BAN_DEN) {
          XuLyCongViec.chitietbanban(id).then(function(data) {
            $scope.detail = JSON.parse(data);
          }, function(err) {
            Popup.e(err);
          });
        } else {
          XuLyCongViec.chitietvanbandi(id).then(function(data) {
            $scope.detail = JSON.parse(data);
          }, function(err) {
            Popup.e(err);
          });
        }
      } else if ($scope.tabIndex == 1) {
        if (loaivanban == VAN_BAN_DI) {
          ///
          XuLyCongViec.quatrinhxulyvanbandi(id).then(function(data) {
            $scope.tasks = JSON.parse(data);
          }, function(err) {
            Popup.e(err);
          });
        } else if (loaivanban == VAN_BAN_DEN) {
          XuLyCongViec.quatrinhxulyvanbanden(id).then(function(data) {
            $scope.tasks = JSON.parse(data);
          }, function(err) {
            Popup.e(err);
          });
        }
      } else if ($scope.tabIndex == 2) {
        if (loaivanban == VAN_BAN_DI) {
          XuLyCongViec.tiendovanbandi(id).then(function(rep) {
            var tiendo = JSON.parse(rep);
            if (tiendo != null && tiendo != '') {
              $scope.tiendocuoi.phantram = tiendo[0].tiendo;
              $scope.tiendocuoi.noidungtiendo = tiendo[0].noidungtiendo;
            }
          }, function(err) {
            Popup.e(err);
          });
        } else if (loaivanban == VAN_BAN_DEN) {
          XuLyCongViec.tiendovanbanden(id).then(function(rep) {
            var tiendo = JSON.parse(rep);
            if (tiendo != null && tiendo != '') {
              $scope.tiendocuoi.phantram = tiendo[0].tiendo;
              $scope.tiendocuoi.noidungtiendo = tiendo[0].noidungtiendo;
            }
          }, function(err) {
            Popup.e(err);
          });
        }
      }
    }

    $scope.openFile = function(resource, primkey, fileid) {
      $scope.paramsFile = {
        "resourcecode": parseInt(resource),
        "primkey": parseInt(primkey),
        "fileid": parseInt(fileid)
      }
      var data = [];
      if (loaivanban == VAN_BAN_DI) {
        XuLyCongViec.taifilevanbandi($scope.paramsFile).then(function(data) {
          data = data;
          xulyFile(data);
        }, function(err) {
          Popup.t("Lỗi tải file văn bản đi");
        });
      } else {
        XuLyCongViec.taifilevanbanden($scope.paramsFile).then(function(data) {
          data = data;
          xulyFile(data);
        }, function(err) {
          Popup.t("Lỗi tải file văn bản đến");
        });
      }
    }

    var xulyFile = function(data) {
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

    $scope.collape = function(event) {
      var element = event.srcElement ? event.srcElement : event.target;
    };

    $scope.luuTiendo = function() {
      var _msg_err = '';
      if ($scope.tiendocuoi.noidungtiendo.length <= 0) _msg_err += 'Chưa nhập nội dung </br>';
      if($scope.tiendocuoi.phantram == '' || $scope.tiendocuoi.phantram == null)  _msg_err += 'Vui lòng chọn tiến độ xử lý </br>';
      if (_msg_err !== '') {
        Popup.e(_msg_err);
        return false;
      }
      if (loaivanban == VAN_BAN_DI) {
        XuLyCongViec.luutiendovanbandi($scope.tiendocuoi).then(function(rep) {
          Popup.t("Lưu thành công");
        }, function(err) {
          Popup.t("Lỗi lưu tiến độ");
        });
      } else if (loaivanban == VAN_BAN_DEN) {
        XuLyCongViec.luutiendovanbanden($scope.tiendocuoi).then(function(rep) {
          Popup.t("Lưu thành công");
        }, function(err) {
          Popup.t("Lỗi lưu tiến độ");
        });
      }
    }

    $scope.tranfer = function() {
      $state.go('app.chuyenxuly', {
        congviecid: id,
        loaivanban: loaivanban,
        congviecchaid: $scope.detail.congviecchaid,
        xulychinh: $scope.detail.xulychinh
      });
    }

    $scope.reject = function() {
      $state.go('app.travb', {
        congviecid: id,
        loaivanban: loaivanban,
        sovb: $scope.detail.sokyhieu,
        noidung: $scope.detail.trichyeu

      });
    }

    $scope.$on('$ionicView.loaded', function() {});

    $scope.$on('$ionicView.enter', function() {
      $scope.loadPage();
    });

    $scope.$on('$ionicView.leave', function() {});

  }


})();
