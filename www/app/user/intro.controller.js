/**
 * intro controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.user')
        .controller('IntroCtrl', introCtrl);

    introCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$ionicHistory', '$ionicModal',
        'CONST', 'LSFtr', 'API', 'API_CONST',
        'UserFtr'
    ];

    function introCtrl(
        $scope, $rootScope, $state, $ionicHistory, $ionicModal,
        CONST, LSFtr, API, API_CONST,
        UserFtr
    ) {
        console.log('IntroCtrl called');

        $scope.CONST = CONST;

        $scope.iNumber = Math.floor(Math.random() * 10000);
        $scope.isShow = false;

        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };


        $scope.user_form = {
            'username': '',
            'password': ''
        };


        $scope.gotoRegister = function() {
            $state.go('app.user-register', {})
        };



        $scope.gotoSignin = function() {
            if (!$scope.signinModal) {
                $ionicModal.fromTemplateUrl('app/user/sign-in.modal.html', {
                    scope: $scope
                }).then(function(modal) {
                    $scope.signinModal = modal;
                    $scope.signinModal.show();
                });
            } else $scope.signinModal.show();
        };

        $scope.signin = function() {
            $ionicHistory.clearCache();
            UserFtr.signin($scope.user_form).then(function(rep) {
                if (rep) {
                    $ionicHistory.nextViewOptions({
                        historyRoot: true,
                        disableBack: true
                    });
                    // $state.go('app.document-list', { location: 'replace' });
                    $state.go('app.home', {
                        location: 'replace'
                    });
                }
            }, function(err) {
                Popup.e(err);
            });
        };

        $scope.onMenuItemTapped = function(name) {
            if (!$rootScope.user) {
                $state.go('app.sign-in', {});
                return;
            }

            $ionicHistory.nextViewOptions({
                historyRoot: true
            });

            switch (name) {
                case 'document-list':
                    $state.go('app.document-list', {
                        location: 'replace'
                    });
                    break;
                case 'procedure-list':
                    $state.go('app.procedure-list', {
                        location: 'replace'
                    });
                    break;
            }
        };

        $scope.demo = function() {
            CONST.MODE = 'demo';
            LSFtr.clear();
            $rootScope.user = CONST.USER_DEMO;
            // UserFtr.signInAndSaveUserToLocalStorage($rootScope.user);
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

        $scope.$on('$ionicView.loaded', function() {
            $scope.workPlace = LSFtr.get(CONST.WORK_PLACE_TAG)

            if (!$scope.workPlace) {
                // } else API.setBase('http://118.69.175.111:8280');
            } else {
                API.setBase($scope.workPlace.MobileServerURL);
                API_CONST.user.getToken.base = $scope.workPlace.AuthenURL;
            }
        });

        $scope.$on('$ionicView.enter', function() {});

        $scope.$on('$ionicView.leave', function() {
            if ($scope.signinModal) $scope.signinModal.remove();
            if ($scope.forgetPassModal) $scope.forgetPassModal.remove();
        });

    }


})();
