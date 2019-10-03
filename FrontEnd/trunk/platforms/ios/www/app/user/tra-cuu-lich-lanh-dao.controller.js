/**
 * home controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.user')
        .controller('LichLanhDaoCtrl', lichLanhDaoCtrl);

    lichLanhDaoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$ionicHistory', '$timeout',
        'CONST', 'Datetime', 'Popup',
        'MasterFtr'
    ];

    function lichLanhDaoCtrl(
        $scope, $rootScope, $state, $ionicHistory, $timeout,
        CONST, Datetime, Popup,
        MasterFtr
    ) {
        $scope.title = "";

        $scope.dt = Datetime;
        $scope.temp = 26;
        $scope.fake = {
            mydate1: new Date()
        };
        $scope.lichcongtac = [];
        $scope.dsSo = [];
        $scope.getMaster = function() {
            var _params = {
                intDonViID: '',
                intNhomDonViID: '',
                intDonViCapChaID: '',
                isPhongBan: ''
            };
            MasterFtr.getDSDonVi(_params).then(function(rep) {
                var data = rep || [];
                for (var i = 0; i < data.length; i++) {
                    var so = {
                        "text": data[i].TenDonVi,
                        "value": data[i].DonViID
                    }
                    if (so.text)
                        $scope.dsSo.push(so);
                }
            }, function(err) {
                Popup.e(err);
            });
        };
        $scope.doRefresh = function() {
            $scope.detail = {};
            $scope.getDetail();
        };

        $scope.getDetail = function() {
            if ($scope.soSelected.value) {
                var params = {
                    "donViID": $scope.soSelected.value,
                    "dateFind": $scope.fake.mydate1
                }
                MasterFtr.getLichCongTac(params).then(function(rep) {
                    console.log(rep);
                    if (rep) {
                        $scope.lichcongtac = [];
                        $scope.lichcongtac = rep;
                    }
                    if($scope.lichcongtac.length==0)
                    	Popup.a("Không có dữ liệu");
                }, function(err) {
                    // body...
                })
            }
        };

        var now = new Date();
        $scope.setDatetime = {
            theme: 'mobiscroll',
            display: CONST.isTablet ? 'bubble' : 'center',
            lang: 'vi',
            headerText: 'Chọn ngày tháng',
            // timeWheels: 'HHii',
            // min: minDate,
            // max: maxDate,
            onSet: function(event, inst) {

            }
        };
        $scope.soSet_inst = null;
        $scope.soSelected = {};
        $scope.soSet = {
            lang: 'vi',
            theme: 'mobiscroll',
            filter: true,
            filterPlaceholderText: 'Tìm kiếm ...',
            // display: CONST.isTablet ? 'bubble' : 'center',
            display: CONST.isTablet ? 'bubble' : 'center',
            headerText: 'Chọn sở',
            placeholder:'Chọn sở',
            // buttons: [],
            // dataText: 'OriginalName',
            // dataValue: 'UploadName',
            onInit: function(event, inst) {
                $scope.soSet_inst = inst;
            },
            onSet: function(event, inst) {
                $scope.soSelected = {
                    'text': event.valueText,
                    'value': inst.getVal()
                };
            }
        };

        $scope.$on('$ionicView.loaded', function() {
            $scope.getMaster();
            $scope.doRefresh();
        });

        $scope.$on('$ionicView.enter', function() {});

        $scope.$on('$ionicView.leave', function() {});

    }


})();