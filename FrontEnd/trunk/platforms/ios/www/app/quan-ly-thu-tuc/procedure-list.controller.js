/**
 * procedure list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.procedure')
        .controller('ProcedureListCtrl', procedureListCtrl);

    procedureListCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$timeout', '$filter',
        'CONST', 'LSFtr', 'Popup',
        'ProcedureFtr', 'MasterFtr'
    ];

    function procedureListCtrl(
        $scope, $rootScope, $state, $timeout, $filter,
        CONST, LSFtr, Popup,
        ProcedureFtr, MasterFtr
    ) {
        $scope.title = 'Danh sách thủ tục';
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

        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
        });

        $scope.$on('$ionicView.leave', function() {});

        $scope.onDocumentItemTapped = function(item) {
            $state.go('app.procedure-detail', {
            //   "DocumentId": item.DocumentId,
            //   "MaTinhTrang":item.MaTinhTrang
            });
      };

    }


})();