/**
 * intro controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.user')
        .controller('ThongBaoCrl', thongBaoCrl);

    thongBaoCrl.$inject = [
        '$scope', '$rootScope', '$ionicPopup', '$state', '$ionicHistory', '$ionicListDelegate',
        'CONST', 'LSFtr', 'Popup', 'Datetime'
    ];

    function thongBaoCrl(
        $scope, $rootScope, $ionicPopup, $state, $ionicHistory, $ionicListDelegate,
        CONST, LSFtr, Popup, Datetime
    ) {
        //$rootScope.showBtnBarRight = false;
        $scope.Datetime = Datetime;
        $scope.listActionCode = [{
            ActionCode: "HETHONG",
            Name: "Thông báo hệ thống"
        }, {
            ActionCode: "HSCV",
            Name: "Hồ sơ công việc"
        }, {
            ActionCode: "PHIEUTRINH",
            Name: "Phiếu trình"
        }, {
            ActionCode: "VBDEN",
            Name: "Văn bản đến"
        }, {
            ActionCode: "VBDI",
            Name: "Văn bản đi"
        }, {
            ActionCode: "VBNOIBO",
            Name: "Văn bản nội bộ"
        }, {
            ActionCode: "DVC_HS",
            Name: "Hồ sơ"
        }];
        $scope.filter = {
            UserID: $rootScope.user.KhachHangID.toString(),
            AppCode: CONST.APP_CODE,
            AppDevice: 'mobile',
            PageNum: 1,
            PageSize: CONST.PAGE_SIGN
        };
        // fpt_notification.sendGetListItem($scope.filter.UserName, $scope.filter.AppCode,
        //             $scope.filter.AppDevice, $scope.filter.PageNum, $scope.filter.PageSize);
        socket.on("list_item", function(rep) {
            // for (var i = 0; i < rep.length; i++) {
            //     var item = rep[i];
            //     item.ObjJson = JSON.parse(rep[i].JsonObj);
            //     $scope.list.push(item);
            // }
            // console.log($scope.list);
            //$scope.list = $scope.list.concat(rep);
            if (rep.length < CONST.PAGE_SIGN || rep.length === 0)
                $scope.isLoadMore = false;
            else
                ++$scope.filter.PageNum;
            $scope.list = $scope.list.concat(rep);

        });
        $scope.delItemThongBao = function(idx) {
            $scope.list.splice(idx, 1);
            $ionicListDelegate.closeOptionButtons();
        };
        $scope.goDetail = function(item) {
            switch (item.ActionCode) {
                case "DVC_HS":
                    var ojb = JSON.parse(item.JsonObj);
                    $state.go('app.document-detail', {hoSo: ojb});
                    break;
                default:
                    break;
            }
        };
        $scope.getNameHeaderItem = function(actionCode) {
            var idx = $scope.listActionCode.indexOfPropertyValue("ActionCode", actionCode);
            if (idx > -1) {
                return $scope.listActionCode[idx].Name;
            } else {
                return "";
            }

        };
        $scope.getClassIconAction = function(actionCode) {
            switch (actionCode) {
                case "HETHONG":
                    return "cl-sys";
                    break;
                case "HSCV":
                    return "cl-hscv";
                    break;
                case "PHIEUTRINH":
                    return "cl-ptr";
                    break;
                case "VBDEN":
                    return "cl-vbd";
                    break;
                case "VBDI":
                    return "cl-vbdi";
                    break;
                case "VBNOIBO":
                    return "cl-vbnb";
                    break;
                case "DVC_HS":
                    return "cl-hscv";
                    break;
                default:
                    return "";
                    break;
            }
        };
        $scope.getmore = function() {
            if ($scope.isLoadMore) {
                fpt_notification.sendGetListItem($scope.filter.UserID, $scope.filter.AppCode,
                    $scope.filter.AppDevice, $scope.filter.PageNum, $scope.filter.PageSize);
            }
            fpt_notification.archive($scope.filter.UserID, CONST.APP_CODE, "mobile");
            console.log($scope.list);
        };
        $scope.doRefresh = function() {
            $scope.filter.PageNum = 1;
            $scope.isLoadMore = true;
            $scope.list = [];
            $scope.getmore();
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.loadMore = function() {
            if ($scope.isLoadMore) {
                $scope.getmore();
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        $scope.$on('$ionicView.loaded', function() {
            $scope.doRefresh();
        });

        $scope.$on('$ionicView.enter', function() {});

        $scope.$on('$ionicView.leave', function() {
            $scope.$destroy();
        });

        $scope.showAlert = function(item) {
            Popup.anoti('Tính Năng Mới', 'Cập Nhật', 'Hệ thống đã cập nhật tính năng xem thông báo <br/> - Có thể xem được thông báo các loại văn bản được chuyển tới.<br/>- Xem thông báo từ hệ thống về tình trạng bảo trì.<br/>- Nhận thông tin các cập nhật mới');
            // var alertPopup = $ionicPopup.alert({
            //     title: 'Tính Năng Mới',
            //     subTitle: 'Cập Nhật', // ở đây sẽ có 2 loại : Cập Nhật , Bảo Trì 
            //     cssClass: 'popup-noti',
            //     template: '<p></p><p>Hệ thống đã cập nhật tính năng xem thông báo</p>',
            //     okText: 'Đóng'
            // });

            // alertPopup.then(function(res) {
            //     console.log('Thank you for not eating my delicious ice cream cone');
            // });
        };
    }
})();