/**
 * Main controller
 * @2017
 **/

(function () {
    'use strict';


    angular
        .module('FTravel.controllers', [])
        .controller('MainCtrl', mainCtrl);

    mainCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', '$ionicSideMenuDelegate',
        'Popup', 'CONST', 'UserFtr', 'MainFtr', '$ionicPopup', '$ionicPopover', 'DB_CONFIG', 'DB'
    ];

    function mainCtrl(
        $scope, $rootScope, $state, $ionicHistory, $timeout, $ionicSideMenuDelegate,
        Popup, CONST, UserFtr, MainFtr, $ionicPopup, $ionicPopover, DB_CONFIG, DB
    ) {
        CONST.isTablet = MainFtr.isTablet();
        $scope.gotoLCTCaNhan = function () {
            if (!$rootScope.userinfo) {
                Popup.c('Vui lòng đăng nhập để sử dụng!', function (ok) {
                    if (ok) $state.go('app.login');;
                });
                $scope.closePopover();
                $state.go('app.home');
            } else {
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.lichcongtaccanhan', {});
                $scope.closePopover();
            }

        };
        $scope.gotoLCTUyBan = function () {
            $state.go('app.lichcongtac', {});
            $scope.closePopover();
        }
        var template = '<ion-popover-view class="popup-mini2-1">' + '<ion-header-bar>' +
            '<h1 class = "title">Chọn loại lịch</h1>' +
            '</ion-header-bar>' +
            '<ion-content>' +
            '<div class = "list list-inset">' +
            '<div class = "item" ng-click="gotoLCTCaNhan();">Lịch công tác cá nhân</div>' +
            '<div class = "item" ng-click="gotoLCTUyBan();">Lịch công tác ủy ban</div>' +
            '</div>' +
            '</ion-content>' +
            '</ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });
        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        $rootScope.user = null;
        $rootScope.notificationNo = 10;
        $rootScope.showBtnBarRight = true;
        $scope.createDocumentOntap = function () {
            $scope.$broadcast('createDocumentOntap');
        };

        $scope.doSignout = function () {
            // UserFtr.dangXuat().then(function (rep) {
            Popup.t('Đăng xuất thành công');
            //}, function (err) { Popup.e(err); });
        };

        $scope.gotoPushView = function () {
            $state.go('app.push', {});
        };

        $scope.gotoProfile = function () { };

        $scope.onUserDetailTap = function () {
            // if ($rootScope.user) $state.go('app.user-profile', {});
            // else Popup.t('Bạn chưa đăng nhập');
        };

        $scope.gotoSignin = function () {
            //UserFtr.openSignin($scope);
            $rootScope.optionUser = true;
        };
        $scope.offgotoSignin = function () {
            $rootScope.optionUser = false;
        }
        $rootScope.$on('UserCtrl.openActiveUser', function (name, data) {
            UserFtr.openActiveUser($scope);
        });

        $scope.openSearch = function () {
            $state.go('app.search', {});
        };
        $scope.gotoNotification = function () {
            $rootScope.notifyMessageCount = 0;
            $state.go('app.thong-bao', {});
        };
        $scope.openHome = function () {
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            $state.go('app.home', {
                location: 'replace'
            });
        };

        $scope.onItemTapped = function (item) {
            // if(item.id !== $scope.prev_menu_item.id) {
            CONST.STATE = item.route;

            if (item.id === 13) {
                //$scope.doSignout();
                //$scope.gotoSignin();
                try {
                    var Link = "mailto:?subject=";
                    window.open(Link, "_system", "location=no");
                } catch (err) {
                    Popup.e("Không tồn tại ứng dụng mail trên thiết bị");
                }
            } else if (item.id === 4) {
                var p = $ionicPopup.confirm({
                    title: '<strong>Đăng xuất</strong>',
                    template: 'Bạn có muốn đăng xuất?',
                    cancelText: 'Thoát',
                    okText: 'Đồng ý'
                });

                p.then(function (ok) {
                    if (ok) {
                        $rootScope.UserID = undefined;
                        $rootScope.UserName = undefined;
                        DB.deleteData(DB_CONFIG.user_table); $state.go("app.login");
                    }
                });
                // var p = $ionicPopup.confirm({
                //     title: '<strong>Thoát ứng dụng</strong>',
                //     template: 'Bạn có muốn thoát ứng dụng?'
                // });
                // p.then(function(ok) {
                //   if (ok) ionic.Platform.exitApp();
                // });
            } else if (item.id === 5) {
                if (!$rootScope.UserID && !$rootScope.UserName) {
                    Popup.c('Vui lòng đăng nhập để sử dụng!', function (ok) {
                        if (ok) $state.go('app.login');;
                    });
                    $state.go('app.home');
                } else {
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    $state.go(item.route, {}, {
                        location: 'replace'
                    });
                }
            }else if (item.id === 15) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Thông Báo',
                    template: 'Tính năng này đang được phát triển'
                });

                alertPopup.then(function (res) {
                    // Custom functionality....
                });
            } else if (item.id === 11) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Thông Báo',
                    template: 'Tính năng này đang được phát triển'
                });

                alertPopup.then(function (res) {
                    // Custom functionality....
                });
            } else if (item.id === 6) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Thông Báo',
                    template: 'Tính năng này đang được phát triển'
                });

                alertPopup.then(function (res) {
                    // Custom functionality....
                });
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

        $scope.openFilter = function () {
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
        $scope.sendDocumentOntap = function () {
            $scope.$broadcast('sendDocumentOntap');
        };
        $scope.changeStatusDocumentOntap = function () {
            $scope.$broadcast('changeStatusDocumentOntap');
        };
        $scope.$on('showHideSaveDocumentBtn', function (e, MaTinhTrang) {
            $scope.show_homeBtn = false;
            if (MaTinhTrang == 1 || MaTinhTrang == 4) {
                $scope.showSaveHoSoBtn = true;
            } else {
                $scope.showSaveHoSoBtn = false;
            }
        });

        $scope.show_homeBtn = false;
        $rootScope.$on("$stateChangeStart", function (ev, to, toParams, from, fromParams) {
            // $scope.hideMainHeader(false);
            // on / off menu drap
            // if (to.name === 'app.procedure-detail' ||
            //     to.name === 'app.document-detail'
            // ) {
            //     $scope.drap_menu_enable = false;
            // } else $scope.drap_menu_enable = true;
            CONST.STATE = to.name;

            $timeout(function () {
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
                //Hiển thị trong trang lịch công tác
                if (to.name == 'app.lichcongtac' || to.name == 'app.lichcongtaccanhan') {
                    $scope.show_filter2 = true;
                } else $scope.show_filter2 = false;
                if(to.name == 'app.chitietlichcongtac'){
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                }
            }, 0);
        });

        $scope.$on('$ionicView.loaded', function () {
            // if($state.current.name==='app.document-list' || $state.current.name==='app.procedure-list') {
            //   $scope.show_filter = true;
            // }else{
            //   $scope.show_filter =false;
            // }
            if (!$rootScope.UserName) {
                $scope.showSaveHoSoBtn = false;
                MainFtr.getMenu().then(function (menu) {
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

        $scope.$on('$ionicView.enter', function () { });

        $scope.$on('$ionicView.leave', function () { });


    }
})();
