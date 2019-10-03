/**
 * document list controller
 * @2017
 **/



(function () {
  'use strict';


  angular
    .module('FTravel.giaoviec')
    .controller('GiaoViecListCtrl', giaoViecListCtrl);

  giaoViecListCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter', '$ionicModal',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'GiaoViecFtr'
  ];

  function giaoViecListCtrl(
    $scope, $rootScope, $state, $filter, $ionicModal,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, GiaoViecFtr
  ) {
    $scope.title = "DANH SÁCH GIAO VIỆC";
    var isLoading = false;
    $scope.danhsachgiaoviec = [];
    $rootScope.flagGV = false;
    $scope.tabIndex = 0;
    $scope.chiltabIndex = 0;
    $scope.onTabChange = function (tabIndex) {
      $scope.tabIndex = tabIndex;
      // $scope.searchForm.keyword = "";
      isLoading = false;
      switch (tabIndex) {
        case 0: // Chưa nộp
          $scope.chiltabIndex = 0;
          $rootScope.flagGV == false
          $scope.doRefresh();
          break;
        case 1: // Chờ giải quyết
          $scope.chiltabIndex = 0;
          $rootScope.flagGV == false
          $scope.doRefresh();
          break;
        default:
          break;
      }
    };
    $scope.onChilTabChange = function (chiltabnumber) {
      $scope.chiltabIndex = chiltabnumber;
      isLoading = false;
      $scope.doRefresh();
    }
    $scope.searchForm = {
      "nguoiNhanID": $rootScope.UserID,
      "tinhTrang": "",
      "KeyWord": "",
      "pageIndex": 1,
      "pageSize": 5,
    };
    $scope.searchFormDG = {
      "nguoiGiaoID": $rootScope.UserID,
      "tinhTrang": "",
      "KeyWord":"",
      "pageIndex": 1,
      "pageSize": 5,
    };

    $scope.onSearch = function () {
      isLoading = false;
      $scope.danhsachgiaoviec = [];
      $scope.doRefresh();
      // $scope.loadPage();
    };

    $scope.doRefresh = function () {
      $scope.searchForm.pageIndex = 1;
      $scope.searchForm.pageSize = 5;
      // $scope.searchForm.KeyWord = "";
      // $scope.searchFormDG.KeyWord = "";
      $scope.searchFormDG.pageIndex = 1;
      $scope.searchFormDG.pageSize = 5;
      $scope.countGVDuocGiao = 0;
      $scope.countGVDaGiao = 0;
      $scope.noMoreItemsAvailable = false;
      $scope.danhsachgiaoviec = [];
      $scope.loadPage();
    };

    $scope.loadPage = function () {
      if (!isLoading && !$scope.noMoreItemsAvailable) {
        isLoading = true;
        if ($scope.tabIndex == 0 && $scope.chiltabIndex == 0) {
          $scope.searchForm.tinhTrang = 0;
          GiaoViecFtr.dsViecDuocGiao($scope.searchForm).then(function (rep) {
            console.log(rep);
            if (rep != null) {
              if (rep.length < $scope.searchForm.pageSize || rep.length <= 0)
                $scope.noMoreItemsAvailable = true;
              else {
                $scope.searchForm.pageIndex = $scope.searchForm.pageIndex + 1;
              }
              for (var i = 0; i < rep.length; i++) {
                $scope.danhsachgiaoviec.push(rep[i]);
              }
              $scope.countGVDuocGiao = "(" + rep[0].TotalCount + ")";
              // $scope.countDSChuaXuLy = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              Popup.t("Không có dữ liệu");
            }

          }, function (err) {
            $scope.danhsachgiaoviec = [];
            $scope.noMoreItemsAvailable = true;
            Popup.e("Lỗi kết nối tìm kiếm chỉ đạo giao việc");
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        } else if ($scope.tabIndex == 0 && $scope.chiltabIndex == 1) {
          $scope.searchForm.tinhTrang = 1;
          GiaoViecFtr.dsViecDuocGiao($scope.searchForm).then(function (rep) {
            if (rep != null) {
              if (rep.length < $scope.searchForm.pageSize || rep.length <= 0)
                $scope.noMoreItemsAvailable = true;
              else {
                $scope.searchForm.pageIndex = $scope.searchForm.pageIndex + 1;
              }
              for (var i = 0; i < rep.length; i++) {
                $scope.danhsachgiaoviec.push(rep[i]);
              }
              $scope.countGVDaGiao = "(" + rep[0].TotalCount + ")";
              // $scope.countDSChuaXuLy = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              // $scope.danhsachgiaoviec = [];
              // $scope.countGVDuocGiao = 0;
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              Popup.t("Không có dữ liệu");
            }

          }, function (err) {
            $scope.danhsachgiaoviec = [];
            $scope.noMoreItemsAvailable = true;
            Popup.e("Lỗi kết nối tìm kiếm chỉ đạo giao việc");
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        } else if ($scope.tabIndex == 1 && $scope.chiltabIndex == 0) {
          $scope.searchFormDG.tinhTrang = 0;
          GiaoViecFtr.dsViecDaGiao($scope.searchFormDG).then(function (rep) {
            console.log(rep);
            if (rep != null) {
              if (rep.length < $scope.searchFormDG.pageSize || rep.length <= 0)
                $scope.noMoreItemsAvailable = true;
              else {
                $scope.searchFormDG.pageIndex = $scope.searchFormDG.pageIndex + 1;
              }
              for (var i = 0; i < rep.length; i++) {
                $scope.danhsachgiaoviec.push(rep[i]);
              }
              $scope.countGVDuocGiao = "(" + rep[0].TotalCount + ")";
              // $scope.countDSChuaXuLy = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              // $scope.danhsachgiaoviec = [];
              // $scope.countGVDuocGiao = 0;
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              Popup.t("Không có dữ liệu");
            }
          }, function (error) {
            console.log(error);
            $scope.danhsachgiaoviec = [];
            $scope.noMoreItemsAvailable = true;
            Popup.e("Lỗi kết nối tìm kiếm giao việc");
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        } else if ($scope.tabIndex == 1 && $scope.chiltabIndex == 1) {
          $scope.searchFormDG.tinhTrang = 1;
          GiaoViecFtr.dsViecDaGiao($scope.searchFormDG).then(function (rep) {
            console.log(rep);
            if (rep != null) {
              if (rep.length < $scope.searchFormDG.pageSize || rep.length <= 0)
                $scope.noMoreItemsAvailable = true;
              else {
                $scope.searchFormDG.pageIndex = $scope.searchFormDG.pageIndex + 1;
              }
              for (var i = 0; i < rep.length; i++) {
                $scope.danhsachgiaoviec.push(rep[i]);
              }
              $scope.countGVDaGiao = "(" + rep[0].TotalCount + ")";
              // $scope.countDSChuaXuLy = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              Popup.t("Không có dữ liệu");
            }
          }, function (error) {
            console.log(error);
            $scope.danhsachgiaoviec = [];
            $scope.noMoreItemsAvailable = true;
            Popup.e("Lỗi kết nối tìm kiếm giao việc");
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        }
      }
    };

    $scope.chidaoChitiet = function (item) {
      $rootScope.idIndexGV = $scope.tabIndex;
      $rootScope.tabChil = $scope.chiltabIndex;
      var tinhtrang = '';
      if ($scope.chiltabIndex == 0) {
        tinhtrang = 0;
      } else if ($scope.chiltabIndex == 1) {
        tinhtrang = 1;
      }
      $state.go('app.chitietgiaoviec', {
        giaoViecID: item.GiaoViecID,
        tinhtrang: tinhtrang,
        index: $scope.tabIndex
        // isDaGiao: item.loaivanban
      });
    };
    $scope.openModal = function () {
      $state.go('app.nhapgiaoviec');
    }
    $scope.$on('$ionicView.loaded', function () {
      if ($rootScope.idIndexGV == 0 || $rootScope.idIndexGV == undefined) {
        $scope.tabIndex = 0;
      } else if ($rootScope.idIndexGV == 1) {
        $scope.tabIndex = 1;
      }
    });

    $scope.$on('$ionicView.enter', function () {
      if ($rootScope.flagGV == false) {
        if ($rootScope.idIndexGV == 0 || $rootScope.idIndexGV == undefined) {
          $scope.tabIndex = 0;
        } else if ($rootScope.idIndexGV == 1) {
          $scope.tabIndex = 1;
        }
        if ($rootScope.tabChil == 0 || $rootScope.tabChil == undefined) {
          $scope.chiltabIndex = 0;
        } else if ($rootScope.tabChil == 1) {
          $scope.chiltabIndex = 1;
        }
        $scope.doRefresh();
      } else {

      }
    });

    $scope.$on('$ionicView.leave', function () { });

  }


})();
