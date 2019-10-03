
(function() {
'use strict';


angular
    .module('FTravel.user')
    .controller('AboutCtrl', aboutCtrl);

aboutCtrl.$inject = [
    '$scope', '$rootScope', '$ionicModal',
    'CONST', 'API', 'API_CONST', 'MasterFtr', 'LSFtr'
];

function aboutCtrl(
    $scope, $rootScope, $ionicModal,
    CONST, API, API_CONST, MasterFtr, LSFtr
) {
    $scope.title = 'Thông tin ứng dụng';

    $scope.CONST = CONST;

	$scope.workPlace = null;
    $scope.workPlaces = [];
    $scope.workPlaceModal = null;
    $scope.workPlaceTapped = function() {
        MasterFtr.getDSServer().then(function(rep) {
            $scope.workPlaces = rep;
        }, function(err) {});

        if (!$scope.workPlaceModal) {
            $ionicModal.fromTemplateUrl('app/user/work-place-choose.modal.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.workPlaceModal = modal;
                $scope.workPlaceModal.show();
            });
        } else $scope.workPlaceModal.show();
    };

    $scope.onServerSelected = function(item) {
        LSFtr.set(CONST.WORK_PLACE_TAG, item);

        // $scope.workPlace = item;
        $rootScope.workPlace = item;

        API.setBase(item.MobileServerURL);
        API_CONST.user.getToken.base = item.AuthenURL;

        $scope.workPlaceModal.hide();
    };


}


})();
