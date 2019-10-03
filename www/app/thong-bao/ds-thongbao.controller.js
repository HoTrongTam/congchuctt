/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.xulycongviec')
        .controller('ThongBaoListCtrl', thongBaoListCtrl);

    thongBaoListCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'ThongBaoFtr'
    ];

    function thongBaoListCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, ThongBaoFtr
    ) {
        $scope.title = "THÔNG BÁO";
        var numberSize = 20;
        var numberIndex = 1;
        var indexHienthi = 0;
        var isLoading = false;
        $scope.mythongbao = [];
        var date = new Date();
        $scope.current = date.getFullYear();
        $scope.daycurrent = date.getDate();
        $scope.monthcurrent = date.getMonth() + 1;
        $scope.doRefresh = function () {
            numberSize = 20;
            numberIndex = 1;
            $scope.noMoreItemsAvailable = false;
            $scope.mythongbao = [];
            $scope.loadThongBao();
        };
        $scope.loadThongBao = function () {
            if (!isLoading && !$scope.noMoreItemsAvailable) {
                isLoading = true;
            }
            $scope.formthongbao = {
                "tieuDe": "",
                "pageSize": numberSize,
                "pageIndex": numberIndex

            }
            ThongBaoFtr.getThongbao($scope.formthongbao).then(function (data) {
                if (data.length > 0 && data !== "") {
                    if (data.length > numberSize || data.length == 0) {
                        $scope.noMoreItemsAvailable = true
                    } else {
                        ++numberIndex;
                        // $scope.searchForm.end = $scope.searchForm.end + CONST.PAGE_SIGN;
                    }
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].NgayKetThuc != "") {
                            var day = parseInt(data[i].NgayKetThuc.substring(0, 2));
                            var month = parseInt(data[i].NgayKetThuc.substring(3, 5));
                            var year = parseInt(data[i].NgayKetThuc.substring(6, 10));
                            if ((year == $scope.current && month == $scope.monthcurrent && day >= $scope.daycurrent) || (year == $scope.current && month > $scope.monthcurrent) || (year > $scope.current)) {
                                $scope.mythongbao.push(data[i]);
                                $scope.mythongbao[indexHienthi].hienthi = true;
                                indexHienthi++;
                            }
                            else {
                                $scope.mythongbao.push(data[i]);
                                $scope.mythongbao[indexHienthi].hienthi = false;
                                indexHienthi++;
                            }
                        }
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    console.log("không còn dữ liệu");
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.noMoreItemsAvailable = true
                }
            }, function (err) {
                Popup.e("Lỗi kết nối lấy danh sách thông báo");
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.gotoChitietthongbao = function (thongbaoid) {
            $state.go('app.chitietthongbao', {
                ThongbaoID: thongbaoid
            });
        }
        $scope.$on('$ionicView.loaded', function () {
            $scope.loadThongBao();
        });

        $scope.$on('$ionicView.enter', function () {
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
