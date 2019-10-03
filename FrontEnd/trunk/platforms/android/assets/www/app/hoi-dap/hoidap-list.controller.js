/**
 * procedure list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.hoidap')
        .controller('HoiDapListCtrl', hoiDapListCtrl);

    hoiDapListCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$timeout', '$filter', '$ionicModal',
        'CONST', 'LSFtr', 'Popup', 'MasterFtr', 'HoiDapFtr', 'Datetime', 'UserFtr'
    ];

    function hoiDapListCtrl(
        $scope, $rootScope, $state, $timeout, $filter, $ionicModal,
        CONST, LSFtr, Popup, MasterFtr, HoiDapFtr, Datetime, UserFtr
    ) {
        $scope.title = 'Danh sách câu hỏi';

        $scope.dt = Datetime;

        $scope.filter = {
            "TimKiemNhanh": "",
            "PageNum": 1,
            "PageSize": CONST.PAGE_SIGN
        }
        $scope.list = [];
        $scope.formmodal = {
            "DonViID": 0,
            "LinhVucID": 0,
            "HoTen": "",
            "CMND": "",
            "SoDienThoai": "",
            "DiaChi": "",
            "Email": "",
            "TieuDe": "",
            "NoiDungCauHoi": "",
            "UserID": 0
        };
        $ionicModal.fromTemplateUrl('app/hoi-dap/hoidap-taomoi.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            if (!$rootScope.user) {
                Popup.c('Vui lòng đăng nhập để sử dụng!', function(ok) {
                    if (ok) {
                        UserFtr.openSignin($scope);
                        //$scope.modal.show();
                    } else {
                        $scope.closeModal();
                    }
                });
            } else {
                $scope.modal.show();
            }
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.saveNew = function() {
            $scope.formmodal.DonViID = 0;
            $scope.formmodal.UserID = $rootScope.user.KhachHangID;
            $scope.formmodal.HoTen = $rootScope.user.HoTen || "";
            $scope.formmodal.Email = $rootScope.user.Email || "";
            $scope.formmodal.CMND = $rootScope.user.CMND || "";
            $scope.formmodal.DiaChi = $rootScope.DiaChi || "";
            $scope.formmodal.SoDienThoai = $rootScope.DienThoai || "";
            HoiDapFtr.postLuuCauHoi($scope.formmodal).then(function(rep) {
                Popup.s('Tạo câu hỏi thành công', function(ok) {
                    $scope.closeModal();
                    $scope.doRefresh();
                });
            }, function(err) {
                // body...
                Popup.e(err);
            });
        };
        $scope.checkCaptcha = function(straaa) {
            console.log('acbc');
            if (straaa == $scope.iNumber)
                $scope.isShow = true;
            else
                $scope.isShow = false;
        };
        $scope.dsLinhVuc = [];
        $scope.dsLV = {
            theme: 'material',
            display: 'center',
            data: $scope.dsLinhVuc,
            // dataValue: 'LinhVucID',
            // dataText: 'TenLinhVuc',
            filter: true,
            placeholder: 'Lĩnh vực',
            cssClass: 'mobiscroll1-21',
            multiline: 2,
            filterEmptyText: "Không tìm thấy.",
            filterPlaceholderText: 'Tìm kiếm',
            setText: "ĐẶT",
            cancelText: 'HỦY'
        };
        $scope.viewDetail = function(id) {
            if (id) {
                $state.go('app.hoidap-detail', {
                    'id': id
                });
            }

        };
        $scope.getMaster = function() {
            MasterFtr.getDSLinhVuc({}, 1).then(function(rep) {
                //$scope.dsLinhVuc = rep || [];
                var data = rep || [];
                for (var i = 0; i < data.length; i++) {
                    var item = {
                        "value": data[i].LinhVucID,
                        "text": data[i].TenLinhVuc
                    }
                    $scope.dsLinhVuc.push(item);
                }
            }, function(err) {
                Popup.e(err);
            });
        }
        $scope.loadMore = function() {
            HoiDapFtr.getDanhSachCauHoi($scope.filter).then(function(rep) {
                (rep.length < CONST.PAGE_SIGN || rep.length <= 0) ? $scope.noMoreItemsAvailable = false: ++$scope.pageNo;

                $scope.list = $scope.list.concat(rep);
                //console.log($scope.list);
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            }, function(err) {
                $scope.noMoreItemsAvailable = false;
                Popup.e(err);
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.doRefresh = function() {
            $scope.pageNo = 1;
            $scope.noMoreItemsAvailable = true;
            $scope.list = [];

            $scope.loadMore();
        };

        $scope.$on('$ionicView.loaded', function() {
            $scope.getMaster();
            $scope.doRefresh();
        });

        $scope.$on('$ionicView.enter', function() {});

        $scope.$on('$ionicView.leave', function() {});

    }


})();