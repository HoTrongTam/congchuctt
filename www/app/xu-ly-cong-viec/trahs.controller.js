/**
 * document list controller
 * @2017
 **/



(function() {
  'use strict';


  angular
    .module('FTravel.xulycongviec')
    .controller('TraHSCtrl', traHSCtrl);

  traHSCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter', '$ionicHistory',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'XuLyCongViec'
  ];

  function traHSCtrl(
    $scope, $rootScope, $state, $filter, $ionicHistory,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, XuLyCongViec
  ) {
    $scope.title = "Trả lại hồ sơ";
    var congviecid = $state.params.congviecid;
    $scope.sobiennhan = $state.params.sobiennhan;
    $scope.loaihoho = $state.params.loaihoso;
    $scope.nguoidaidien = $state.params.nguoidaidien;

    $scope.rejectform = {
      "nguoinhanid": -1,
      "congviecid": congviecid,
      "noidungxuly": "",
      "sendsms": false,
      "sendemail": false
    }

    $scope.nguoitralai =[];
    var loadPage = function() {
      XuLyCongViec.loadnguoinhantralaihoso(congviecid).then(function(rep) {
        $scope.nguoitralai = JSON.parse(rep);
      }, function(err) {
        Popup.e("Lỗi load người nhận trả lại " + err);
      });
    }

    $scope.reject = function() {
      var nguoinhanid = $scope.nguoitralai.nguoinhanid || -1;
      $scope.rejectform.nguoinhanid = nguoinhanid;

      var _msg_err = '';
      if ($scope.rejectform.nguoinhanid.length <= 0) _msg_err += 'Không tìm thấy người nhận hồ sơ</br>';
      // if ($scope.rejectform.noidungxuly.length <= 0) _msg_err += 'Chưa nhập nội dung xử lý</br>';
      // if ($scope.rejectform.sendsms == false && $scope.rejectform.sendemail == false)
      //   _msg_err += 'Chưa chọn phương thức thông báo';
      if (_msg_err !== '') {
        Popup.e(_msg_err);
        return false;
      }
      XuLyCongViec.tralaihoso($scope.rejectform).then(function(rep) {
        Popup.t("Trả lại thành công")
        $state.go('app.ds-xulycongviec');
        $ionicHistory.nextViewOptions({
            historyRoot: true
        });
      }, function(err) {
        Popup.e("Lỗi trả lại hồ sơ" + err);
      });
    }

    $scope.$on('$ionicView.loaded', function() {});

    $scope.$on('$ionicView.enter', function() {
      loadPage();
    });

    $scope.$on('$ionicView.leave', function() {});

  }


})();
