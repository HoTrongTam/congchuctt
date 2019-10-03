/**
 * Main controller
 * @2017
 **/

(function() {
    'use strict';


    angular
        .module('FTravel.controllers', [])
        .controller('MainCtrl', mainCtrl);

    mainCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', '$ionicSideMenuDelegate',
        'Popup', 'CONST', 'UserFtr', 'MainFtr', '$ionicPopup'
    ];

    function mainCtrl(
        $scope, $rootScope, $state, $ionicHistory, $timeout, $ionicSideMenuDelegate,
        Popup, CONST, UserFtr, MainFtr, $ionicPopup
    ) {
        CONST.isTablet = MainFtr.isTablet();

        $scope.menu = [];
        $rootScope.user = null;
        $rootScope.notificationNo = 10;
        $rootScope.showBtnBarRight = true;
        $scope.createDocumentOntap = function() {
            $scope.$broadcast('createDocumentOntap');
        };

        $scope.doSignout = function() {
            UserFtr.dangXuat().then(function(rep) {
				Popup.t('Đăng xuất thành công');
            }, function(err) {Popup.e(err);});
        };

        $scope.gotoPushView = function() {
            $state.go('app.push', {});
        };

        $scope.gotoProfile = function() {};

        $scope.onUserDetailTap = function() {
            if ($rootScope.user) $state.go('app.user-profile', {});
            else Popup.t('Bạn chưa đăng nhập');
        };

        $scope.gotoSignin = function() {
            UserFtr.openSignin($scope);
        };
		$rootScope.$on('UserCtrl.openActiveUser', function(name, data) {
            UserFtr.openActiveUser($scope);
		});

        $scope.openSearch = function() {
            $state.go('app.search', {});
        };
        $scope.gotoNotification = function() {
            $rootScope.notifyMessageCount = 0;
            $state.go('app.thong-bao', {});
        };
        $scope.openHome = function() {
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            $state.go('app.home', {
                location: 'replace'
            });
        };

        $scope.onItemTapped = function(item) {
            // if(item.id !== $scope.prev_menu_item.id) {
            CONST.STATE = item.route;

            if (item.id === 6) {
                $scope.doSignout();
            } else if (item.id === 7) {
                Popup.c('Bạn có muốn thoát ứng dụng?', function(ok) {
                    if (ok) ionic.Platform.exitApp();
                });
                // var p = $ionicPopup.confirm({
                //     title: '<strong>Thoát ứng dụng</strong>',
                //     template: 'Bạn có muốn thoát ứng dụng?'
                // });
                // p.then(function(ok) {
                //   if (ok) ionic.Platform.exitApp();
                // });
            } else if (item.id === 1) {
                if (!$rootScope.user) {
                    Popup.c('Vui lòng đăng nhập để sử dụng!', function(ok) {
                        if (ok) UserFtr.openSignin($scope);
                    });
                } else {
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    $state.go(item.route, {}, {
                        location: 'replace'
                    });
                }
            } else {
                $scope.prev_menu_item ? $scope.prev_menu_item.selected = false : '';
                $scope.prev_menu_item = item;
                item.selected = true;
                if (item.id !== 5) {
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                }
                $state.go(item.route, {}, {
                    location: 'replace'
                });
            }
            // }

            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.openFilter = function() {
            $rootScope.$emit('FILTER.OPEN', {});
        };

        // $rootScope.$on('AppCtrl.setMenu', function(name, data) {
        //     $scope.menu = data.menu;
        // });

        $scope.drap_menu_enable = false;
        $scope.show_filter = false;
        $scope.show_NopHoSobtn = false;
        $scope.show_SigninBtn = true;
        $scope.show_SreachBtn = false;
        $scope.show_StatusFilter = true;
        $scope.showSaveHoSoBtn = false;
        $scope.sendDocumentOntap = function() {
            $scope.$broadcast('sendDocumentOntap');
        };
        $scope.changeStatusDocumentOntap = function() {
            $scope.$broadcast('changeStatusDocumentOntap');
        };
        $scope.$on('showHideSaveDocumentBtn', function(e, MaTinhTrang) {
            $scope.show_homeBtn = false;
            if (MaTinhTrang == 1 || MaTinhTrang == 4) {
                $scope.showSaveHoSoBtn = true;
            } else {
                $scope.showSaveHoSoBtn = false;
            }
        });

        $scope.show_homeBtn = false;
        $rootScope.$on("$stateChangeStart", function(ev, to, toParams, from, fromParams) {
            // $scope.hideMainHeader(false);
            // on / off menu drap
            // if (to.name === 'app.procedure-detail' ||
            //     to.name === 'app.document-detail'
            // ) {
            //     $scope.drap_menu_enable = false;
            // } else $scope.drap_menu_enable = true;
            CONST.STATE = to.name;

            $timeout(function() {
                // on / off filter menu

                if (to.name === 'app.procedure-list' || to.name === 'app.document-list') {
                    $scope.show_filter = true;
                } else $scope.show_filter = false;

                // on / off nop ho so button
                if (to.name === 'app.procedure-detail') {
                    $scope.show_NopHoSobtn = true;
                } else $scope.show_NopHoSobtn = false;

                // on / off sreach button
                if (to.name === 'app.home') {
                    $scope.show_SreachBtn = true;
                } else $scope.show_SreachBtn = false;

                // on / off SigninBtn button
                if (to.name === 'app.intro') {
                    $scope.show_SigninBtn = true;
                } else $scope.show_SigninBtn = false;

                // on / off show_homeBtn button
                // hien thi trong view Danh sách hồ sơ| Danh sách thủ tục
                if (to.name === 'app.procedure-list' || to.name === 'app.document-list') {
                    $scope.show_homeBtn = true;
                } else $scope.show_homeBtn = false;
            }, 0);
        });

        $scope.$on('$ionicView.loaded', function() {
            // if($state.current.name==='app.document-list' || $state.current.name==='app.procedure-list') {
            //   $scope.show_filter = true;
            // }else{
            //   $scope.show_filter =false;
            // }
            if (!$rootScope.user) {
                $scope.showSaveHoSoBtn = false;
                MainFtr.getMenu().then(function(menu) {
                    $scope.menu = menu;
                    $scope.prev_menu_item = $scope.menu[0];
                    $scope.prev_menu_item.selected = true;
                    // hide thoat ung dung in ios platform
                    if (ionic.Platform.isIOS()) {
                        var idx = $scope.menu.indexOfPropertyValue("id", 7);
                        if (idx !== -1) {
                            $scope.menu[idx].active = 0;
                        }
                    }
                });
            }
        });

        $scope.$on('$ionicView.enter', function() {});

        $scope.$on('$ionicView.leave', function() {});


    }
})();
