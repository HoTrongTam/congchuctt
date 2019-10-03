/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.giaoviec')
        .controller('NhapGiaoViecCtrl', nhapGiaoViecCtrl);

    nhapGiaoViecCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr'
    ];

    function nhapGiaoViecCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr
    ) {
        $scope.title = "Nhập giao việc";
        $scope.tabIndex = 0;
        $scope.onTabChange = function (tabIndex) {
            $scope.tabIndex = tabIndex;
            switch (tabIndex) {
                case 0: // Chưa nộp
                    break;
                case 1: // Chờ giải quyết
                    break;
                case 2: // Đã có kết quả
                    break;
                default:
                    break;
            }
        };
        $scope.onDocumentItemTapped = function(item) {
            $state.go('app.document-detail', {
                // id: item.HoSoID,
                // hoSo: item
            });
        };
        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

    }


})();
