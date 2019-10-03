/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.xulycongviec')
        .controller('ChiTietHoSoCtrl', chiTietHoSoCtrl);

    chiTietHoSoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr','XuLyCongViec'
    ];

    function chiTietHoSoCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, XuLyCongViec
    ) {
        $scope.title = "Chi tiết hồ sơ";
        var id = $state.params.id;
        var loaivanban = $state.params.loaivanban;

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

        $scope.loadPage = function() {
          if ($scope.tabIndex == 0) {
              XuLyCongViec.chitiethosochuaxuly(id).then(function(rep) {
                $scope.detail = JSON.parse(rep);
              }, function(err) {
                Popup.e(err);
              });
          } else if ($scope.tabIndex == 1) {
              XuLyCongViec.quatrinhxulyhosochuaxuly(id).then(function(rep) {
                $scope.tasks = JSON.parse(rep);
              }, function(err) {
                Popup.e(err);
              });
          } else if ($scope.tabIndex == 2) {
              XuLyCongViec.hosokemtheohosochuaxuly(id).then(function(rep) {
                $scope.hosos = JSON.parse(rep);
              }, function(err) {
                Popup.e(err);
              });
          }
        }

        $scope.collape = function(event) {
          var element = event.srcElement ? event.srcElement : event.target;
        };

        $scope.tranfer = function() {
          $state.go('app.chuyenhoso', {
            congviecid: id,
            sobiennhan: $scope.detail.sobiennhan,
            loaihoso:$scope.detail.loaihoso,
            nguoidaidien:$scope.detail.nguoidaidien
          });
        }

        $scope.reject = function() {
          $state.go('app.trahs', {
            congviecid: id,
            sobiennhan: $scope.detail.sobiennhan,
            loaihoso:$scope.detail.loaihoso,
            nguoidaidien:$scope.detail.nguoidaidien
          });
        }

        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
          $scope.loadPage();
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
