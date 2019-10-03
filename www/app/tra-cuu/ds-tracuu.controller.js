/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.tracuu')
        .controller('TraCuuListCtrl', traCuuListCtrl);

    traCuuListCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'TraCuuFtr'
    ];

    function traCuuListCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, TraCuuFtr
    ) {
        $scope.title = "TRA CỨU";
        $scope.tabIndex = 0;
        $scope.chiltabIndex = 0;
        var isLoading = false;
        var pageSize = 10;
        $rootScope.flagTraCuu = false;
        $scope.searchForm = {
            'keyword': '',
            'start': 0,
            'end': 10
        };
        $scope.mytracuuhoso = [];
        $scope.mytracuuchidao = [];
        $scope.mytracuuvanbanden = [];
        $scope.mytracuuvanbandi = [];
        $scope.onTabChange = function (tabnumber) {
            $scope.tabIndex = tabnumber;
            $scope.searchForm.keyword = '';
            isLoading = false;
            $scope.doRefresh();
        }
        $scope.onChilTabChange = function (chiltabnumber) {
            $scope.chiltabIndex = chiltabnumber;
            $scope.searchForm.keyword = '';
            isLoading = false;
            $scope.doRefresh();
        }
        $scope.onSearch = function () {
            isLoading = false;
            $scope.doRefresh();
        }
        $scope.doRefresh = function () {
            $scope.searchForm.start = 0;
            $scope.searchForm.end = 20;
            $scope.noMoreItemsAvailable = false;
            $scope.mytracuuhoso = [];
            $scope.mytracuuchidao = [];
            $scope.mytracuuvanbandi = [];
            $scope.mytracuuvanbanden = [];
            $scope.loaddulieuvanban();
        };

        $scope.loaddulieuvanban = function () {

            if (!isLoading && !$scope.noMoreItemsAvailable) {
                isLoading = true;

                if ($scope.tabIndex == 1) {

                    TraCuuFtr.tracuuhoso($scope.searchForm).then(function (data) {
                        if (data.data != null) {
                            if (data.data.length < pageSize|| data.data.length <= 0)
                                $scope.noMoreItemsAvailable = true
                            else {
                                $scope.searchForm.start = $scope.searchForm.start + pageSize;
                                $scope.searchForm.end = $scope.searchForm.end + pageSize;
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                $scope.mytracuuhoso.push(data.data[i]);
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.$broadcast('scroll.refreshComplete');
                            isLoading = false;
                        } else {
                            $scope.mytracuuhoso = [];
                            Popup.t("Không có dữ liệu");
                        }

                    }, function (err) {
                        $scope.noMoreItemsAvailable = true;
                        Popup.e("Lỗi kết nối tìm kiếm");
                        isLoading = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                }
                else if ($scope.tabIndex == 2) {
                    TraCuuFtr.tracuuchidao($scope.searchForm).then(function (data) {
                        if (data.data != null) {
                            if (data.data.length < pageSize || data.data.length <= 0)
                                $scope.noMoreItemsAvailable = true
                            else {
                                $scope.searchForm.start = $scope.searchForm.start + pageSize;
                                $scope.searchForm.end = $scope.searchForm.end + pageSize;
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                $scope.mytracuuchidao.push(data.data[i]);
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.$broadcast('scroll.refreshComplete');
                            isLoading = false;
                        } else {
                            $scope.mytracuuchidao = [];
                            Popup.t("Không có dữ liệu");
                        }

                    }, function (err) {
                        $scope.noMoreItemsAvailable = true;
                        Popup.e("Lỗi kết nối tìm kiếm");
                        isLoading = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                }
                else if ($scope.tabIndex == 0 && $scope.chiltabIndex == 1) {
                    TraCuuFtr.tracuuvanbandi($scope.searchForm).then(function (data) {
                        if (data.data != null) {
                            if (data.data.length < pageSize || data.data.length <= 0)
                                $scope.noMoreItemsAvailable = true
                            else {
                                $scope.searchForm.start = $scope.searchForm.start + pageSize;
                                $scope.searchForm.end = $scope.searchForm.end + pageSize;
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                $scope.mytracuuvanbandi.push(data.data[i]);
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.$broadcast('scroll.refreshComplete');
                            isLoading = false;
                        } else {
                            $scope.mytracuuvanbandi = [];
                            Popup.t("Không có dữ liệu");
                        }


                    }, function (err) {
                        $scope.noMoreItemsAvailable = true;
                        Popup.e("Lỗi kết nối tìm kiếm");
                        isLoading = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                }
                else if ($scope.tabIndex == 0 && $scope.chiltabIndex == 0) {
                    TraCuuFtr.tracuuvanbanden($scope.searchForm).then(function (data) {

                        if (data.data != null) {
                            if (data.data.length < pageSize || data.data.length <= 0)
                                $scope.noMoreItemsAvailable = true
                            else {
                                $scope.searchForm.start = $scope.searchForm.start + pageSize;
                                $scope.searchForm.end = $scope.searchForm.end + pageSize;
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                $scope.mytracuuvanbanden.push(data.data[i]);
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.$broadcast('scroll.refreshComplete');
                            isLoading = false;
                        } else {
                            $scope.mytracuuvanbanden = [];
                            Popup.t("Không có dữ liệu");
                        }
                    }, function (err) {
                        $scope.noMoreItemsAvailable = true;
                        Popup.e("Lỗi kết nối tìm kiếm");
                        isLoading = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                }
            }


        }
        // truyền hồ sơ ID tới tracuuchitiethoso
        $scope.detailtracuuhoso = function (chitiethosoid) {
            $rootScope.flagTraCuu = true;
            $rootScope.indexTraCuu = $scope.tabIndex;
            $rootScope.indexTimKiem = $scope.searchForm.keyword;
            $state.go('app.tracuuchitiethoso', {
                HosoID: chitiethosoid
            });
        }
        // Truyen param van ban den ID toi tracuuchitietvbxuly
        $scope.detailtracuuvanbanden = function (ctvbdenid) {
            $rootScope.flagTraCuu = true;
            $rootScope.indexTraCuu = $scope.tabIndex;
            $rootScope.chilindexTraCuu = $scope.chiltabIndex;
            $rootScope.indexTimKiem = $scope.searchForm.keyword;
            $state.go('app.tracuuchitietvbxuly', {

                VanbandenID: ctvbdenid.vanbandenid
            });
        }
        // truyen param van ban di Id toi tracuuchitietvbxuly
        $scope.detailtracuuvanbandi = function (ctvbdiid) {
            $rootScope.flagTraCuu = true;
            $rootScope.indexTraCuu = $scope.tabIndex;
            $rootScope.chilindexTraCuu = $scope.chiltabIndex;
            $rootScope.indexTimKiem = $scope.searchForm.keyword;
            $state.go('app.tracuuchitietvbxuly', {
                VanbandiID: ctvbdiid.vanbandiid
            });
        }
        // truyen param van ban chi dao ID toi tracuuchitietvbchidao
        $scope.detailtracuuchidao = function (chitietchidaoid) {
            $rootScope.flagTraCuu = true;
            $rootScope.indexTraCuu = $scope.tabIndex;
            $rootScope.indexTimKiem = $scope.searchForm.keyword;
            $state.go('app.tracuuchitietvbchidao', {
                ChidaoID: chitietchidaoid.chidaoid,
                Loaivb: chitietchidaoid.loaivanban,
                Congviecid: chitietchidaoid.congviecid
            });
        }

        $scope.$on('$ionicView.loaded', function () {
            if ($rootScope.indexTraCuu == undefined) {
                $rootScope.indexTraCuu = $scope.tabIndex;
                $rootScope.chilindexTraCuu = $scope.chiltabIndex;
                $rootScope.indexTimKiem = "";
            }
            $scope.searchForm.keyword = $rootScope.indexTimKiem;
            $scope.chiltabIndex = $rootScope.chilindexTraCuu;
            $scope.tabIndex = $rootScope.indexTraCuu;
        });

        $scope.$on('$ionicView.enter', function () {
            if($rootScope.flagTraCuu == false){
                $scope.doRefresh();
            }
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
