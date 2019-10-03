/**
 * document list controller
 * @2017
 **/



(function () {
  'use strict';


  angular
    .module('FTravel.phananhkiennghi')
    .controller('PhanAnhKienNghiListCtrl', phanAnhKienNghiListCtrl);

  phanAnhKienNghiListCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'XuLyCongViec', '$ionicHistory', 'PhanAnhKienNghi'
  ];

  function phanAnhKienNghiListCtrl(
    $scope, $rootScope, $state, $filter,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, XuLyCongViec, $ionicHistory, PhanAnhKienNghi
  ) {
    $scope.title = "Danh sách phản ánh kiến nghị";

    var isLoading = false;
    $scope.danhsachPAKN = [];
    $rootScope.flagPA = false;
    $scope.onTabChange = function (tabIndex) {
      $scope.tabIndex = tabIndex;
      $scope.searchForm.keyword = "";
      isLoading = false;
      switch (tabIndex) {
        case 0: // Chưa nộp
          $rootScope.flagPA == false
          $scope.doRefresh();
          break;
        case 1: // Chờ giải quyết
          $rootScope.flagPA == false
          $scope.doRefresh();
          break;
        default:
          break;
      }
    };

    $scope.thongtinvanban = {
      "nguoiky": '',
      "mavanban": '',
      "noiphathanh": '',
      "trichyeu": '',
      "vanbanid": '',
      "congviecid": '',
      "nguoixulyid": '',
      "sovanban": '',
      "loaivanban": '',
      "hanxuly": '',
      "ngaynhan": ''
    };

    $scope.searchForm = {
      "tuKhoa": "",
      "tinhTrang": "",
      "pageIndex": 1,
      "pageSize": 5
    };

    $scope.onSearch = function () {
      isLoading = false;
      $scope.danhsachPAKN = [];
      $scope.doRefresh();
    }

    $scope.doRefresh = function () {
      $scope.searchForm.pageIndex = 1;
      $scope.searchForm.pageSize = 5;
      $scope.countDSPAKN = 0;
      $scope.countDSChuaXuLy = 0;
      $scope.noMoreItemsAvailable = false;
      $scope.danhsachPAKN = [];
      $scope.loadPage();
    };

    $scope.loadPage = function () {
      if (!isLoading && !$scope.noMoreItemsAvailable) {
        isLoading = true;
        if ($scope.tabIndex == 0) {
          $scope.searchForm.tinhTrang = 1;
          PhanAnhKienNghi.getDanhSachPAKN($scope.searchForm).then(function (rep) {
            if (rep != null) {
              console.log(rep);
              if (rep.length < $scope.searchForm.pageSize || rep.length <= 0)
                $scope.noMoreItemsAvailable = true
              else {
                $scope.searchForm.pageIndex = $scope.searchForm.pageIndex + 1;
              }
              // $scope.danhsachPAKN = $scope.danhsachPAKN.concat(rep.data);
              for (var i = 0; i < rep.length; i++) {
                $scope.danhsachPAKN.push(rep[i]);
              }
              $scope.countDSPAKN =  "(" + rep[0].TotalCount + ")";
              $scope.countDSChuaXuLy = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              // $scope.danhsachPAKN = [];
              // $scope.countDSPAKN = 0;
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              Popup.t("Không có dữ liệu");
            }
          }, function (err) {
            $scope.noMoreItemsAvailable = true;
            $scope.countDSPAKN = 0;
            Popup.e("Lỗi kết nối tìm kiếm phản ánh kiến nghị");
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        } else if ($scope.tabIndex == 1) {
          $scope.searchForm.tinhTrang = 2;
          PhanAnhKienNghi.getDanhSachPAKN($scope.searchForm).then(function (rep) {
            if (rep != null) {
              console.log(rep);
              if (rep.length < $scope.searchForm.pageSize || rep.length <= 0)
                $scope.noMoreItemsAvailable = true
              else {
                $scope.searchForm.pageIndex = $scope.searchForm.pageIndex + 1;
              }
              // $scope.danhsachPAKN = $scope.danhsachPAKN.concat(rep.data);
              for (var i = 0; i < rep.length; i++) {
                $scope.danhsachPAKN.push(rep[i]);
              }
              $scope.countDSChuaXuLy =  "(" + rep[0].TotalCount + ")";
              $scope.countDSPAKN = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              // $scope.danhsachPAKN = [];
              // $scope.countDSChuaXuLy = 0;
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              Popup.t("Không có dữ liệu");
            }
          }, function (err) {
            $scope.noMoreItemsAvailable = true;
            $scope.countDSChuaXuLy = 0;
            Popup.e("Lỗi kết nối tìm kiếm phản ánh kiến nghị");
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        }
      }
    }

    $scope.phananhchitiet = function (item) {
      $rootScope.idIndexPA = $scope.tabIndex;
      $rootScope.flagPA = true;
      $state.go('app.chitiet-phananhkiennghi', {
        id: item.HoiDapID,
        tinhtrang: $scope.searchForm.tinhTrang
        // loaivanban: item.loaivanban
      });
    };

    // $scope.hosoChitiet = function (item) {
    //   $rootScope.idIndexPA = $scope.tabIndex;
    //   $state.go('app.chitiethoso', {
    //     id: item.congviecid,
    //     loaivanban: item.loaivanban
    //   });
    // };

    $scope.$on('$ionicView.loaded', function () {
      if ($rootScope.idIndexPA == 0 || $rootScope.idIndexPA == undefined) {
        $scope.tabIndex = 0;
      } else if ($rootScope.idIndexPA == 1) {
        $scope.tabIndex = 1;
      }
    });

    $scope.$on('$ionicView.enter', function () {
      if ($rootScope.flagPA == false) {
        if ($rootScope.idIndexPA == 0 || $rootScope.idIndexPA == undefined) {
          $scope.tabIndex = 0;
        } else if ($rootScope.idIndexPA == 1) {
          $scope.tabIndex = 1;
        }
        $scope.doRefresh();
      } else {

      }

    });

    $scope.$on('$ionicView.leave', function () { });

  }


})();
