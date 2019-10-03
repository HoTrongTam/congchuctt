/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.quyhoach')
        .controller('QuyHoachListCtrl', quyHoachListCtrl);

    quyHoachListCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'QuyHoachFtr'
    ];

    function quyHoachListCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, QuyHoachFtr
    ) {
        $scope.title = "QUY HOẠCH";
        var network = navigator.onLine;
        $scope.$on('$ionicView.loaded', function () {
            var onSuccess = "";
		
			// onError Callback receives a PositionError object
			//
			var  onError = "";
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
			if (window.cordova) {
				File.getFilePath();
			}
        });

        $scope.$on('$ionicView.enter', function () {
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
