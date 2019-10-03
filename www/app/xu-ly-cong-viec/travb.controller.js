/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.xulycongviec')
        .controller('TraVBCtrl', traVBCtrl);

    traVBCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter', '$ionicHistory',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr','XuLyCongViec'
    ];

    function traVBCtrl(
        $scope, $rootScope, $state, $filter, $ionicHistory,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, XuLyCongViec
    ) {
        $scope.title = "Trả lại văn bản";
        var congviecid = $state.params.congviecid;
        var loaivanban = $state.params.loaivanban;
        $scope.noidung = $state.params.noidung;
        $scope.kyhieu = $state.params.sovb;
        var VAN_BAN_DI = 1;
        var VAN_BAN_DEN  = 2;


        var loadPage = function(){
          if(loaivanban == VAN_BAN_DI) {
            XuLyCongViec.loadnguoinhantralaivanbandi(congviecid).then(function(rep){
              $scope.nguoitralai = JSON.parse(rep);
            }, function(err){
              Popup.e("Lỗi load người nhận trả lại " + err);
            });
          } else {
            XuLyCongViec.loadnguoinhantralaivanbanden(congviecid).then(function(rep){
              $scope.nguoitralai = JSON.parse(rep);
            }, function(err){
              Popup.e("Lỗi load người nhận trả lại " + err);
            });
          }
        }

        $scope.rejectform = {
          "username":$rootScope.UserName,
          "congviecid":congviecid,
          "noidungxuly":"",
          "sms":false,
          "email":false
        }

        $scope.reject = function(){
          // var _msg_err = '';
          // if ($scope.rejectform.noidungxuly.length <= 0) _msg_err += 'Chưa nhập nội dung xử lý</br>';
          // if ($scope.rejectform.sms == false && $scope.rejectform.email == false)
          //     _msg_err += 'Chưa chọn phương thức thông báo';
          // if (_msg_err !== '') {
          //   Popup.e(_msg_err);
          //   return false;
          // }
          if(loaivanban == VAN_BAN_DI) {
            XuLyCongViec.tralaivanbandi($scope.rejectform).then(function(rep){
              Popup.t("Trả lại thành công")
              $state.go('app.ds-xulycongviec');
              $ionicHistory.nextViewOptions({
                  historyRoot: true
              });
            }, function(err){
              Popup.e("Lỗi trả lại văn bản" + err);
            });
          } else {
            XuLyCongViec.tralaivanbanden($scope.rejectform).then(function(rep){
              Popup.t("Trả lại thành công");
              $state.go('app.ds-xulycongviec');
              $ionicHistory.nextViewOptions({
                  historyRoot: true
              });
            }, function(err){
              Popup.e("Lỗi trả lại văn bản" + err);
            });
          }
        }

        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
          loadPage();
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
