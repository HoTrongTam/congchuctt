/**
 * document list controller
 * @2017
 **/



(function () {
  'use strict';


  angular
    .module('FTravel.xulycongviec')
    .controller('XuLyCongViecListCtrl', xuLyCongViecListCtrl);

  xuLyCongViecListCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'XuLyCongViec', '$ionicHistory'
  ];

  function xuLyCongViecListCtrl(
    $scope, $rootScope, $state, $filter,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, XuLyCongViec, $ionicHistory
  ) {
    $scope.title = "Danh sách xử lý công việc";

    var isLoading = false;
    $scope.danhsachVanBan = [];
    $rootScope.flag = false;
    $scope.onTabChange = function (tabIndex) {
      $scope.tabIndex = tabIndex;
      $scope.searchForm.keyword = "";
      isLoading = false;
      switch (tabIndex) {
        case 0: // Chưa nộp
          $rootScope.flag == false
          $scope.doRefresh();
          break;
        case 1: // Chờ giải quyết
          $rootScope.flag == false
          $scope.doRefresh();
          break;
        case 2: // Đã có kết quả
          $rootScope.flag == false
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
      "username": $rootScope.UserName,
      "keyword": "",
      "start": 0,
      "end": 20
    };

    $scope.onSearch = function () {
      isLoading = false;
      $scope.danhsachVanBan = [];
      $scope.doRefresh();
    }

    $scope.doRefresh = function () {
      $scope.searchForm.start = 0;
      $scope.searchForm.end = 20;
      $scope.countTKCD = 0;
      $scope.countDSVB = 0;
      $scope.countHS = 0;
      $scope.noMoreItemsAvailable = false;
      $scope.danhsachVanBan = [];
      $scope.loadPage();
    };

    $scope.loadPage = function () {
      if (!isLoading && !$scope.noMoreItemsAvailable) {
        isLoading = true;
        if ($scope.tabIndex == 0) {
          XuLyCongViec.timkiemvanban($scope.searchForm).then(function (rep) {
            if (rep.data != null) {
              if (rep.data.length < CONST.PAGE_SIGN || rep.data.length <= 0)
                $scope.noMoreItemsAvailable = true
              else {
                $scope.searchForm.start = $scope.searchForm.start + CONST.PAGE_SIGN;
                $scope.searchForm.end = $scope.searchForm.end + CONST.PAGE_SIGN;
              }
              // $scope.danhsachVanBan = $scope.danhsachVanBan.concat(rep.data);
              for (var i = 0; i < rep.data.length; i++) {
                $scope.danhsachVanBan.push(rep.data[i]);
              }
              $scope.countDSVB =  "(" + rep.count + ")";
              $scope.countTKCD = 0;
              $scope.countHS = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              // $scope.danhsachVanBan = [];
              // $scope.countDSVB = 0;
              Popup.t("Không có dữ liệu");
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
            }
          }, function (err) {
            $scope.noMoreItemsAvailable = true;
            $scope.countDSVB = 0;
            Popup.e("Lỗi kết nối tìm kiếm văn bản");
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        } else if ($scope.tabIndex == 1) {
          XuLyCongViec.timkiemhoso($scope.searchForm).then(function (rep) {
            if (rep.data != null) {
              if (rep.data.length < CONST.PAGE_SIGN || rep.data.length <= 0)
                $scope.noMoreItemsAvailable = true
              else {
                $scope.searchForm.start = $scope.searchForm.start + CONST.PAGE_SIGN;
                $scope.searchForm.end = $scope.searchForm.end + CONST.PAGE_SIGN;
              }
              // $scope.danhsachVanBan = $scope.danhsachVanBan.concat(rep.data);
              for (var i = 0; i < rep.data.length; i++) {
                $scope.danhsachVanBan.push(rep.data[i]);
              }
              $scope.countHS =  "(" + rep.count + ")";
              $scope.countDSVB = 0;
              $scope.countTKCD = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              Popup.t("Không có dữ liệu");
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
            }

          }, function (err) {
            $scope.noMoreItemsAvailable = true;
            $scope.countHS = 0;
            Popup.e(err);
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        } else if ($scope.tabIndex == 2) {
          XuLyCongViec.timkiemchidao($scope.searchForm).then(function (rep) {
            if (rep.data != null) {
              if (rep.data.length < CONST.PAGE_SIGN || rep.data.length <= 0)
                $scope.noMoreItemsAvailable = true
              else {
                $scope.searchForm.start = $scope.searchForm.start + CONST.PAGE_SIGN;
                $scope.searchForm.end = $scope.searchForm.end + CONST.PAGE_SIGN;
              }
              // $scope.danhsachVanBan = $scope.danhsachVanBan.concat(rep.data);
              for (var i = 0; i < rep.data.length; i++) {
                $scope.danhsachVanBan.push(rep.data[i]);
              }
              $scope.countTKCD = "(" + rep.count + ")";   
              $scope.countDSVB = 0;
              $scope.countHS = 0;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
              isLoading = false;
            } else {
              Popup.t("Không có dữ liệu");
              isLoading = false;
              $scope.noMoreItemsAvailable = true;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              $scope.$broadcast('scroll.refreshComplete');
            }
          }, function (err) {
            $scope.noMoreItemsAvailable = true;
            $scope.countTKCD = 0;
            Popup.e("Lỗi kết nối tìm kiếm chỉ đạo");
            isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
          });
        }
      }
    }

    $scope.vanbanChitiet = function (item) {
      $rootScope.idIndexXLVC = $scope.tabIndex;
      $rootScope.flag = true;
      $state.go('app.chitietvbxuly', {
        id: item.congviecid,
        loaivanban: item.loaivanban
      });
    };

    $scope.hosoChitiet = function (item) {
      $rootScope.idIndexXLVC = $scope.tabIndex;
      $state.go('app.chitiethoso', {
        id: item.congviecid,
        loaivanban: item.loaivanban
      });
    };

    $scope.chidaoChitiet = function (item) {
      $rootScope.idIndexXLVC = $scope.tabIndex;
      $state.go('app.chitietvbchidao', {
        congviecid: item.congviecid,
        chidaoid: item.chidaoid,
        loaivanban: item.loaivanban,
        vanbanid: item.vanbanid
      });
    };
    $scope.$on('$ionicView.loaded', function () {
      if ($rootScope.idIndexXLVC == 0 || $rootScope.idIndexXLVC == undefined) {
        $scope.tabIndex = 0;
      } else if ($rootScope.idIndexXLVC == 1) {
        $scope.tabIndex = 1;
      } else if ($rootScope.idIndexXLVC == 2) {
        $scope.tabIndex = 2;
      }
    });

    $scope.$on('$ionicView.enter', function () {
      if ($rootScope.flag == false) {
        if ($rootScope.idIndexXLVC == 0 || $rootScope.idIndexXLVC == undefined) {
          $scope.tabIndex = 0;
        } else if ($rootScope.idIndexXLVC == 1) {
          $scope.tabIndex = 1;
        } else if ($rootScope.idIndexXLVC == 2) {
          $scope.tabIndex = 2;
        }
        $scope.doRefresh();
      } else {

      }

    });

    $scope.$on('$ionicView.leave', function () { });

  }


})();
