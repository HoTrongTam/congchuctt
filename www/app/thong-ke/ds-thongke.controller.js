/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.thongke')
        .controller('ThongKeListCtrl', thongKeListCtrl);

    thongKeListCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function thongKeListCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "DANH SÁCH THỐNG KÊ";
        $scope.onXuLyVanBan = function(){
            $state.go('app.thongke-xulyvanban');
        }
        $scope.onXyLyHoSo = function(){
            $state.go('app.thongke-xulyhoso');
        }
        $scope.onXuLyPhanAnh = function(){
            $state.go('app.thongke-xulyphananh');
        }
        $scope.onXuPhatHanhChinh = function(){
            $state.go('app.thongke-xuphathanhchinh');
        }
        $scope.onGiaoViec = function(){
            $state.go('app.thongke-congviecdagiao');
        }
        $scope.onDanhGiaHaiLong = function(){
            $state.go('app.thongke-danhgiahailong');
        }
        $scope.onGiaiQuyetDonThu = function(){
            $state.go('app.thongke-giaiquyetdonthu');
        }
        $scope.onChuyenNganh = function(){
            $state.go('app.thongke-chuyennganh');
        }
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
