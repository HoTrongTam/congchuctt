/**
 * home controller
 * @2017
 **/



(function() {
'use strict';


angular
    .module('FTravel.user')
    .controller('NewsDetailCtrl', newsDetailCtrl)
;

newsDetailCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$ionicHistory',
    'CONST', 'Datetime', 'Popup',
    'MasterFtr'
];

function newsDetailCtrl(
    $scope, $rootScope, $state, $ionicHistory,
    CONST, Datetime, Popup,
    MasterFtr
) {
    $scope.title = "";

    $scope.dt = Datetime;

    $scope.detail = {};
    $scope.item = $state.params.item;

    $scope.dsTinTuc = [];

var htmlUnescape = function(str){
    return str
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

	$scope.getDetail = function() {
		MasterFtr.getCTTinTuc($scope.item.TinTucID).then(function(rep) {
            $scope.detail = rep;
            $scope.detail.NoiDung=htmlUnescape($scope.detail.NoiDung);
		}, function(err){
			Popup.e(err);
		});
	};

    $scope.onTinTucTapped = function(item) {
		// $state.go('app.tin-tuc-detail', {item:item});
        $state.go($state.current, {item:item}, {reload: true});
        // $state.reload();
	};

	$scope.doRefresh = function() {
        $scope.detail = {};

		$scope.getDetail();
	};

    $scope.$on('$ionicView.loaded', function() {
	});

    $scope.$on('$ionicView.enter', function() {
        $scope.doRefresh();
        MasterFtr.getDSTinTuc(Math.round((Math.random())%2) + 1).then(function(rep) {
            for (var i = 0; i < rep.length; i++) {
                if(Math.round((Math.random())%2)) {
                    $scope.dsTinTuc.push(rep[i]);
                    if($scope.dsTinTuc.length >=4) break;
                }
            }
        }, function(err) {
            Popup.e(err);
        });
    });

    $scope.$on('$ionicView.leave', function() {
	});

}


})();
