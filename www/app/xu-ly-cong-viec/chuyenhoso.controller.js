/**
 * document list controller
 * @2017
 **/



(function() {
  'use strict';


  angular
    .module('FTravel.xulycongviec')
    .controller('ChuyenHSCtrl', chuyenHSCtrl);

  chuyenHSCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter', '$ionicHistory',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'XuLyCongViec'
  ];

  function chuyenHSCtrl(
    $scope, $rootScope, $state, $filter, $ionicHistory,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, XuLyCongViec
  ) {
    $scope.title = "Chuyển xử lý hồ sơ";
    var congviecid = $state.params.congviecid;
    $scope.sobiennhan = $state.params.sobiennhan;
    $scope.loaihoho = $state.params.loaihoso;
    $scope.nguoidaidien = $state.params.nguoidaidien;

    $scope.dsCaNhan = [];

    $scope.formmodal = {
      "congviecid": congviecid,
      "nguoinhanid": '',
      "noidungxuly": '',
      "sendsms": false,
      "sendemail": false
    };

    $scope.dsCN = {
      theme: 'material',
      display: 'center',
      data: $scope.dsCaNhan,
      filter: true,
      placeholder: 'Nhấn để chọn người nhận',
      cssClass: 'mobiscroll1-21',
      multiline: 2,
      filterEmptyText: "Không tìm thấy.",
      filterPlaceholderText: 'Tìm kiếm',
      setText: "ĐẶT",
      cancelText: 'HỦY'
    };

    $scope.loadCaNhan = function() {
      XuLyCongViec.loadnguoinhanchuyenxulyhoso(congviecid).then(function(rep) {
        var data = JSON.parse(rep) || [];
        for (var i = 0; i < data.length; i++) {
          var item = {
            "value": data[i].nguoinhanid,
            "text": data[i].hoten
          }
          $scope.dsCaNhan.push(item);
        }
      }, function(err) {
        Popup.e("Lỗi kết nối lấy người nhận chuyển xử lý hồ sơ");
      });
    }

    $scope.submit = function() {
      var _msg_err = '';
      if($scope.formmodal.noidungxuly.length <= 0) _msg_err += 'Chưa nhập nội dung </br>';
      // if($scope.formmodal.sendsms == false && $scope.formmodal.sendemail == false) _msg_err += 'Chưa chọn thông báo </br>';
      if($scope.formmodal.nguoinhanid.length == 0) _msg_err += 'Chưa chọn người nhận </br>';
      if (_msg_err !== '') {
        Popup.e(_msg_err);
        return false;
      }
      XuLyCongViec.chuyenxulyhoso($scope.formmodal).then(function(rep) {
        Popup.t("Chuyển hồ sơ thành công");
        $state.go('app.ds-xulycongviec');
        $ionicHistory.nextViewOptions({
            historyRoot: true
        });
      }, function(err) {
        Popup.e("Chuyển hồ sơ không thành công " + err);
      });
    }

    $scope.$on('$ionicView.loaded', function() {});

    $scope.$on('$ionicView.enter', function() {
      $scope.loadCaNhan();
    });

    $scope.$on('$ionicView.leave', function() {});

  }


})();
