/**
 * User controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.user')
        .controller('LoginCtrl', loginCtrl);

    loginCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$ionicHistory', '$ionicPopup',
        'CONST', 'LSFtr', 'Popup',
        'UserFtr', 'MainFtr'
    ];

    function loginCtrl(
        $scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        CONST, LSFtr, Popup,
        UserFtr, MainFtr
    ) {
        debugger;
        $scope.title = 'Đăng nhập';

        $scope.user_form = {
            'username': '',
            'password': ''
        };

        $scope.demo = function() {
            CONST.MODE = 'demo';
            LSFtr.clear();
            $rootScope.user = CONST.USER_DEMO;
            UserFtr.signInAndSaveUserToLocalStorage($rootScope.user);
            // UserFtr.dangNhap($scope.user_form).then(function(rep) {
            //     $rootScope.user = rep[0];
            //     UserFtr.signInAndSaveUserToLocalStorage({});
            // }, function(err){alert(err);});

            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            $state.go('app.home', {
                location: 'replace'
            });
        };

        // if (CONST.MODE == 'demo') {
        //   UserFtr.signInAndSaveUserToLocalStorage({});
        //
        //   $state.go('app.home', {});
        //   $ionicHistory.clearCache();
        //   $ionicHistory.clearHistory();
        //   $ionicHistory.nextViewOptions({
        //     disableBack: true
        //   });
        // }

        $scope.signin = function() {
            $ionicHistory.clearCache();
            //$ionicHistory.clearHistory();

            UserFtr.signin($scope.user_form).then(function(data) {
                if (data.data.error_code == 0) {
                    $rootScope.user = data.data.data;
                    // {
                    // sessionKey: data.data.data.sessionKey,
                    // accountType: data.data.data.accountType,
                    // username: $scope.user.username
                    // };
                    UserFtr.saveUserLoginInfor($rootScope.user);

                    MainFtr.getMenu($rootScope.user).then(function(menu) {
                        $rootScope.$emit('AppCtrl.setMenu', {
                            menu: menu
                        });
                        // $rootScope.menu = menu;
                        // if (!$scope.$$phase) {
                        //     $scope.$apply();
                        //   }
                    });

                    $state.go('app.dashboard', {});
                } else Popup.e(data.data.error_message);
            });


        };

        $scope.clearText = function(type) {
            switch (type) {
                case 'email':
                    $scope.user.email = '';
                    break;
            }
        };

        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {});

        $scope.$on('$ionicView.leave', function() {});

    }


})();