/**
 * User controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.user')
        .controller('LoginCtrl', loginCtrl);

    loginCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$ionicHistory', '$ionicPopup',
        'CONST', 'LSFtr', 'Popup', "DB", "DB_CONFIG",
        'UserFtr', 'MainFtr', 'API_CONST'
    ];

    function loginCtrl(
        $scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        CONST, LSFtr, Popup, DB, DB_CONFIG,
        UserFtr, MainFtr, API_CONST
    ) {
        $scope.title = 'Đăng nhập';

        $scope.user_form = {
            'username': '',
            'password': ''
        };
        $scope.OSKey = $rootScope.OsKey;
        $scope.TypeDevice = null;
        if (ionic.Platform.isIOS()) {
            $scope.TypeDevice = 2;
        } else if (ionic.Platform.isAndroid()) {
            $scope.TypeDevice = 1;
        }
        $scope.signin = function () {
            if ($scope.user_form.username == "") {
                // Popup.close();
                Popup.w("Không được để trống tên đăng nhập");
            } else if ($scope.user_form.password == "") {
                Popup.w("Không được để trống mật khẩu");
            }
             else if ($scope.user_form.password.indexOf(' ') >= 0) {
                Popup.w("Mật khẩu không có khoảng trống");
            } 
            else {
                $ionicHistory.clearCache();
                let rep = '1672-vthien.q7';
                UserFtr.logIn($scope.user_form).then(function (rep) {
                    if (rep != "") {
                         Popup.t("Đăng nhập thành công");
                        $rootScope.password = $scope.user_form.password;
                        $rootScope.password = $scope.user_form.password;
                        $rootScope.users = rep;
                        $state.go('app.home');
                        $rootScope.UserID = rep.substring(0, rep.indexOf("-"));
                        $rootScope.UserName = rep.substring(rep.indexOf("-") + 1, rep.length);
                        $scope.user_form_const = {
                            'userID': $rootScope.UserID,
                            'name': $rootScope.UserName,
                            'password': $scope.user_form.password
                        }
                        DB.insert(DB_CONFIG.user_table, $scope.user_form_const);
                        var paramsFireBase = {
                            UserID: $rootScope.UserID,
                            UserName: $rootScope.UserName,
                            OSKey: $scope.OSKey,
                            TypeDevice: $scope.TypeDevice
                        }
                        UserFtr.setInfoFireBase(paramsFireBase).then(function(dataFireBase){
                            console.log("OS Key ---"+$scope.OsKey);
                        },function(err){
                            console.log(err);
                        });
                        UserFtr.getInfos($rootScope.UserID).then(function (data) {
                            $rootScope.userinfo = data;
                        }, function (err) {
                            console.log();
                        });

                        // Kiểm tra quyền hiển thị tra cứu quy hoạch
                        $scope.permission_form = {
                            'userID': $rootScope.UserID,
                        };
                        UserFtr.CheckPermissions($scope.permission_form).then(function (rep) {
                            $rootScope.permission = rep;
                        }, function (err) {
                        });

                    }
                    else Popup.e("Sai tên đăng nhập hoặc mật khẩu !");
                }, function (err) {
                    console.log(err);
                    Popup.e("Lỗi kết nối server");
                });


            }

        }
        // $scope.getkeys = function (event) {
        //     if (event.keyCode == 32) {
        //         event.preventDefault();
        //     }
        // }


        $scope.clearText = function (type) {
            switch (type) {
                case 'email':
                    $scope.user.email = '';
                    break;
            }
        };
        $scope.$on('$ionicView.loaded', function () { });

        $scope.$on('$ionicView.enter', function () { });

        $scope.$on('$ionicView.leave', function () { });

    }


})();