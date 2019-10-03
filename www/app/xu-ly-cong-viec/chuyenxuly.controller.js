/**
 * document list controller
 * @2017
 **/



(function () {
  'use strict';


  angular
    .module('FTravel.xulycongviec')
    .controller('ChuyenXuLyCtrl', chuyenXuLyCtrl);

  chuyenXuLyCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter', '$ionicHistory',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'XuLyCongViec'
  ];

  function chuyenXuLyCtrl(
    $scope, $rootScope, $state, $filter, $ionicHistory,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, XuLyCongViec
  ) {
    var congviecid = $state.params.congviecid;
    var loaivanban = $state.params.loaivanban;
    var congviecchaid = $state.params.congviecchaid;
    var xulychinh = $state.params.xulychinh;

    var VAN_BAN_DI = 1;
    var VAN_BAN_DEN = 2;

    if (loaivanban == VAN_BAN_DI) {
      $scope.title = "Chuyển xử lý văn bản đi";
      $scope.vanbandi = true;
    } else {
      $scope.title = "Chuyển xử lý văn bản đến";
      $scope.vanbandi = false;
    }

    $scope.tabIndex = 0;
    $scope.dsCaNhan = [];
    $scope.dsPhongBan = [];

    $scope.onTabChange = function (tabIndex) {
      $scope.tabIndex = tabIndex;
      $scope.tempNguoixulys = [];
      $scope.tempNguoixulychinhs = [];
      switch (tabIndex) {
        case 0:
        $scope.dsCaNhan = [];
          $scope.loadCaNhan();
          break;
        case 1:
        $scope.dsPhongBan = [];
          $scope.loadPhongBan();
          
    $scope.dsPB = {
      theme: 'material',
      display: 'center',
      data: $scope.dsPhongBan,
      select: 'multiple',
      filter: true,
      placeholder: 'Nhấn để tìm kiếm',
      cssClass: 'mobiscroll1-21',
      multiline: 2,
      filterEmptyText: "Không tìm thấy.",
      filterPlaceholderText: 'Tìm kiếm',
      setText: "ĐẶT",
      cancelText: 'HỦY',
      onSet: function (valueText, inst) {
        selectedText(valueText, inst);
      },
    };
          break;
        default:
          break;
      }
    };

    var donvi = true;
    $scope.onTabVanthu = function (tabIndex) {
      $scope.tabIndex = tabIndex;
      $scope.tempNguoixulys = [];
      $scope.tempNguoixulychinhs = [];
      switch (tabIndex) {
        case 0:
          donvi = true;
          $scope.dsCaNhan = [];
          $scope.loadCaNhan();
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
            onShow: function (event, inst) {
              beforeSelect(event, inst);
            }
          };
          break;
        case 1:
          donvi = false;
          $scope.dsCaNhan = [];
          $scope.loadCaNhan();
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
            onShow: function (event, inst) {
              beforeSelect(event, inst);
            }
          };
          break;
        default:
          break;
      }
    };

    $scope.formVanbanden = {
      "username": $rootScope.UserName,
      "congviecid": congviecid,
      "congviecchaid": congviecchaid,
      "xulychinh": xulychinh,
      "thoihanxuly": null,
      "songayxuly": '',
      "noidungxuly": '',
      "sms": false,
      "email": false,
      "nguoinhanxulys": [],
      "nguoixulychinhs": []
    }
    $scope.canhanphongban = {
      "keyword": "",
      "congviecid": congviecid,
      "congviecchaid": congviecchaid,
      "xulychinh": xulychinh
    };

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

    $scope.dsPB = {
      theme: 'material',
      display: 'center',
      data: $scope.dsPhongBan,
      select: 'multiple',
      filter: true,
      placeholder: 'Nhấn để tìm kiếm',
      cssClass: 'mobiscroll1-21',
      multiline: 2,
      filterEmptyText: "Không tìm thấy.",
      filterPlaceholderText: 'Tìm kiếm',
      setText: "ĐẶT",
      cancelText: 'HỦY',
      onSet: function (valueText, inst) {
        selectedText(valueText, inst);
      },
    };

    var beforeSelect = function (event, inst) {
      if ($scope.vanbandi) {
        // $scope.dsCN.select = 'single'
      }
      if($scope.tempNguoixulys == undefined){
        inst.clear();
      }

    }
    var selectedText = function (data, inst) {
      $scope.tempNguoixulys = [];
      $scope.tempNguoixulychinhs = [];
      var lstNguoinhan = inst.getVal(true);
      if (lstNguoinhan.length > 0) {
        var lstTennguoinhan = data.valueText.split(',');
        for (var i = 0; i < lstNguoinhan.length; i++) {
          var nguoinhanxuly = {
            "nguoinhanid": lstNguoinhan[i],
            "tennguoinhan": lstTennguoinhan[i],
            "noidungchidao": '',
            "xulytungay": null,
            "xulydengay": null,
            "isCheck": false
          }
          $scope.tempNguoixulys.push(nguoinhanxuly);
        }
        $timeout(function() {
          $scope.tempNguoixulys;
      }, 300);
      }
    }

    $scope.loadCaNhan = function () {
      if (loaivanban == VAN_BAN_DI) {
        XuLyCongViec.loadnguoinhanxulyvanbandi($rootScope.UserName, congviecid).then(function (rep) {
          var data = [];
          if (donvi) {
            data = JSON.parse(rep).LANH_DAO_PHONG;
          } else
            data = JSON.parse(rep).VAN_THU_PHONG;
          for (var i = 0; i < data.length; i++) {
            var item = {
              "value": data[i].nguoinhanid,
              "text": data[i].tennguoinhan
            }
            $scope.dsCaNhan.push(item);
          }
        }, function (err) {
          Popup.e("Lỗi kết nối lấy người nhận xử lý văn bản đi");
        });
      } else {
        XuLyCongViec.timkiemnguoinhanxulyvanbanden($scope.canhanphongban).then(function (rep) {
          var data = rep || [];
          for (var i = 0; i < data.length; i++) {
            var item = {
              "value": data[i].nguoinhanid,
              "text": data[i].tennguoinhan
            }
            $scope.dsCaNhan.push(item);
          }
        }, function (err) {
          Popup.e("Lỗi kết nối tìm kiếm người nhận xử lý văn bản đến");
        });
      }
    }

    $scope.loadPhongBan = function () {
      XuLyCongViec.timkiemphongbannhanxulyvanbanden($scope.canhanphongban).then(function (rep) {
        var data = rep || [];
        for (var i = 0; i < data.length; i++) {
          var item = {
            "value": data[i].nguoinhanid,
            "text": data[i].phongban
          }
          $scope.dsPhongBan.push(item);
        }
      }, function (err) {
        Popup.e("Lỗi kết nối tìm kiếm phòng ban nhận xử lý văn bản đến");
      });
    }

    $scope.setNguoixulychinh = function (idx) {
      if ($scope.tempNguoixulys[idx].isCheck) {
        var nguoixulychinh = {
          nguoinhanid: $scope.tempNguoixulys[idx].nguoinhanid
        }
        $scope.tempNguoixulychinhs.push(nguoixulychinh);
      } else {
        if ($scope.tempNguoixulychinhs.length > 0) {
          for (var i = 0; i < $scope.tempNguoixulychinhs.length; i++) {
            if ($scope.tempNguoixulys[idx].nguoinhanid == $scope.tempNguoixulychinhs[i].nguoinhanid)
              $scope.tempNguoixulychinhs.splice(i, 1);
          }
        }
      }
    }

    $scope.submit = function () {
      var _msg_err = '';
      var date = new Date();
      // if ($scope.formVanbanden.noidungxuly.length <= 0) _msg_err += 'Chưa nhập nội dung </br>';
      // if ($scope.formVanbanden.thoihanxuly == null || $scope.formVanbanden.thoihanxuly.length <= 0) _msg_err += 'Chưa nhập thời hạn xử lý</br>';
      // if ($scope.formVanbanden.sms == false && $scope.formVanbanden.email == false)
      //     _msg_err += 'Chưa chọn phương thức thông báo </br>';
      if ($scope.formVanbanden.songayxuly <= 0) _msg_err += 'Vui lòng nhập số dương </br>';
      if (moment($scope.formVanbanden.thoihanxuly).format('DD/MM/YYYY') < moment(date).format('DD/MM/YYYY')) _msg_err += 'Hạn xử lý phải lớn hơn ngày hiện tại </br>';
      if (typeof $scope.tempNguoixulys == 'undefined' || $scope.tempNguoixulys.length <= 0) _msg_err += 'Vui lòng chọn người xử lý';
      if (_msg_err !== '') {
        Popup.e(_msg_err);
        return false;
      }
      if (loaivanban == VAN_BAN_DI) {
        $scope.formVanbandi = {
          "username": $rootScope.UserName,
          "congviecid": congviecid,
          "nguoinhanid": $scope.tempNguoixulys[0].nguoinhanid,
          "phongbanid": '',
          "noidungxuly": $scope.formVanbanden.noidungxuly,
          "sms": $scope.formVanbanden.sms,
          "email": $scope.formVanbanden.email
        }
        XuLyCongViec.chuyenxulyvanbandi($scope.formVanbandi).then(function (rep) {
          Popup.t("Chuyển văn bản thành công");
          $state.go('app.ds-xulycongviec');
          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
        }, function (err) {
          Popup.e("Chuyển văn bản thất bại " + err);
        });
      } else {
        $scope.formVanbanden.nguoinhanxulys = $scope.tempNguoixulys;
        $scope.formVanbanden.nguoixulychinhs = $scope.tempNguoixulychinhs;
        XuLyCongViec.chuyenxulyvanbanden($scope.formVanbanden).then(function (rep) {
          Popup.t("Chuyển văn bản thành công");
          $state.go('app.ds-xulycongviec');
          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
        }, function (err) {
          Popup.e("Chuyển văn bản thất bại " + err);
        });
      }
    }
    $scope.$on('$ionicView.loaded', function () { });

    $scope.$on('$ionicView.enter', function () {
      $scope.loadCaNhan();
    });

    $scope.$on('$ionicView.leave', function () { });

  }


})();
