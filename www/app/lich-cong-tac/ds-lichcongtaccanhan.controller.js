/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.lichcongtac')
        .controller('LichCongTacCaNhanListCtrl', lichCongTacCaNhanListCtrl);

    lichCongTacCaNhanListCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'LichCongTac'
    ];

    function lichCongTacCaNhanListCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, LichCongTac
    ) {
        $scope.title = "LỊCH CÁ NHÂN";
        $scope.tabIndex = 0;
        var date = new Date();
        $scope.current = date.getFullYear();
        $scope.daycurrent = date.getDate();
        $scope.monthcurrent = date.getMonth();
        $scope.daylet = "";
        //
        $rootScope.show_filter2 = true;
        $scope.formdate = {
            date: $scope.daycurrent,
            month: $scope.monthcurrent + 1,
            year: $scope.current
        }
        var start = $scope.current - 4;
        var end = $scope.current;
        $scope.yearArray = [];
        $scope.dayArray = [];
        $scope.monthArray = [];
        $scope.weekArray = [];
        for (var i = start; i <= end; i++) {
            $scope.yearArray.push(i);
        }
        if ($scope.monthcurrent == 2) {
            $scope.daylet = 28;
        } else if ($scope.monthcurrent == 4 || $scope.monthcurrent == 6 || $scope.monthcurrent == 9 || $scope.monthcurrent == 11) {
            $scope.daylet = 30;
        } else {
            $scope.daylet = 31;
        }
        for (var i = 1; i <= $scope.daylet; i++) {
            $scope.dayArray.push(i);
        }
        for (var i = 1; i <= 12; i++) {
            $scope.monthArray.push(i);
        }
        $scope.weeks = function (month) {
            month = moment(month, 'YYYY-MM-DD');

            var first = month.day() == 0 ? 6 : month.day() - 1;
            var day = 7 - first;

            var last = month.daysInMonth();
            var count = (last - day) / 7;
            $scope.weekArray = [];
            $scope.weekArray.push([1, day]);
            for (var i = 0; i < count; i++) {
                $scope.weekArray.push([(day + 1), (Math.min(day += 7, last))]);
            }
            return $scope.weekArray;
        }
        $scope.week = $scope.weeks($scope.formdate.year + "/" + $scope.monthcurrent + "/01");
        $scope.countSelectedYears = $scope.current;
        $scope.onChangeYears = function (id) {
            $scope.formdate.year = id;
            $scope.week = $scope.weeks($scope.formdate.year + "/" + $scope.formdate.month + "/01");
            if ($scope.tabIndex == 0) {
                $scope.getLCTCNDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.startOfWek = '';
                $scope.endOfWek = '';
                if ($scope.startOfWek == '' || $scope.endOfWek == '') {
                    $scope.myDataTuan = "";
                } else {
                    $scope.getLCTCNWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                }
            }
        }
        $scope.countSelectedDays = $scope.dayArray[$scope.daycurrent - 1];
        $scope.onChangeDays = function (id) {
            $scope.formdate.date = id;
            if ($scope.tabIndex == 0) {
                $scope.getLCTCNDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
            }
        }
        $scope.countSelectedMonths = $scope.monthArray[$scope.monthcurrent];
        $scope.onChangeMonths = function (id) {
            $scope.formdate.month = id;
            $scope.week = $scope.weeks($scope.formdate.year + "/" + $scope.formdate.month + "/01");
            if ($scope.formdate.month == 2) {
                $scope.daylet = 28;
            } else if ($scope.formdate.month == 4 || $scope.formdate.month == 6 || $scope.formdate.month == 9 || $scope.formdate.month == 11) {
                $scope.daylet = 30;
            } else if ($scope.formdate.month == 1 || $scope.formdate.month == 3 || $scope.formdate.month == 5 || $scope.formdate.month == 7 || $scope.formdate.month == 8 || $scope.formdate.month == 10 || $scope.formdate.month == 12) {
                $scope.daylet = 31;
            }
            $scope.dayArray = [];
            for (var i = 1; i <= $scope.daylet; i++) {
                $scope.dayArray.push(i);
            }
            if ($scope.tabIndex == 0) {
                $scope.getLCTCNDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.startOfWek = '';
                $scope.endOfWek = '';
                if ($scope.startOfWek == '' || $scope.endOfWek == '') {
                    $scope.myDataTuan = "";
                } else {
                    $scope.getLCTCNWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                }
            }
        }
        var weekIdx = function (week) {
            if ($scope.week != null) {
                angular.forEach($scope.week, function (item, index) {
                    if (week == item) {
                        $rootScope.indexWeekcn = index;
                    }
                });
            } else
                $rootScope.indexWeekcn = null;
        }
        $scope.onChangeWeek = function (id) {
            weekIdx(id);
            $scope.startOfWek = id[0];
            $scope.endOfWek = id[1];
            $rootScope.startPubliccn = $scope.startOfWek;
            $rootScope.endPubliccn = $scope.endOfWek;
            if ($scope.tabIndex == 1) {
                $scope.getLCTCNWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
            }
        }


        //Function LICH CONG TAC FACTORY
        $scope.keyword = {};
        $scope.onTabChange = function (tabIndex) {
            $scope.tabIndex = tabIndex;
            switch (tabIndex) {
                case 0: // Lịch ngày cá nhân
                    $rootScope.cnThangOfLichNgay = undefined;
                    $rootScope.cnNamOfLichNgay = undefined;
                    $rootScope.cnNgayOfLichNgay = undefined;
                    $scope.current = date.getFullYear();
                    $scope.daycurrent = date.getDate();
                    $scope.monthcurrent = date.getMonth();
                    $scope.formdate.date = $scope.daycurrent;
                    $scope.formdate.month = $scope.monthcurrent + 1
                    $scope.formdate.year = $scope.current;
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                    $scope.countSelectedDays = $scope.dayArray[$scope.formdate.date - 1];
                    $scope.getLCTCNDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
                    $scope.showcn = function () {
                        $scope.getLCTCNDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
                    }
                    break;
                case 1: // Lịch tuần cá nhân
                    $rootScope.indexWeekcn = null;
                    $scope.week = [];
                    $scope.monthcurrent = date.getMonth();
                    $scope.current = date.getFullYear();
                    $scope.formdate.month = $scope.monthcurrent + 1
                    $scope.formdate.year = $scope.current;
                    $scope.week = $scope.weeks($scope.formdate.year + "/" + $scope.formdate.month + "/01");
                    var dayweek = function(daycurrent) {
                        if ($scope.week != null) {
                            angular.forEach($scope.week, function (item, index) {
                                if (daycurrent >= item[0] && daycurrent <= item[1]) {
                                    $rootScope.indexWeekcn = index;
                                    $scope.startOfWek = item[0];
                                    $scope.endOfWek = item[1];
                                }
                            });
                        }
                    }
                    $scope.myDataTuan = "";
                    if($rootScope.indexWeekcn == null | $rootScope.indexWeekcn == undefined){
                        dayweek($scope.daycurrent);
                        $scope.countSelectedWeek = $scope.week[$rootScope.indexWeekcn];
                        $scope.getLCTYBWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                    }
                    $scope.showcn = function () {
                        if ($scope.startOfWek == undefined || $scope.startOfWek == '' && $scope.endOfWek == undefined || $scope.endOfWek == '') {
                            Popup.t("Vui lòng chọn tuần");
                        } else {
                            $scope.getLCTCNWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                        }

                    }
                    break;
                default:
                    break;
            }
        };
        if ($scope.tabIndex == 0) {
            $scope.showcn = function () {
                $scope.getLCTCNDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
            }
        }
        $scope.getLCTCNDay = function (day, month, year) {
            $scope.form = {
                "username": $rootScope.userinfo.TaiKhoan,
                "tungay": day + "/" + month + "/" + year,
                "denngay": day + "/" + month + "/" + year,
                "keyword": $scope.keyword.inputFind || "",
                "start": -1,
                "end": -1
            }
            LichCongTac.findLichCaNhan($scope.form).then(function (data) {
                if (data.count === 0 || data.data == []) {
                    //  Popup.a("Không có dữ liệu");
                    Popup.t('Không có dữ liệu để hiển thị');
                    $scope.myData = "";
                    $scope.message = "";
                } else {
                    $scope.myData = data;
                    $scope.message = "";
                }
            }, function (err) {
                Popup.e("Lỗi kết nối lấy lịch công tác cá nhân");
            });
        }
        $scope.getLCTCNWeek = function (startday, endday, month, year) {
            $scope.formTuan = {
                "username": $rootScope.userinfo.TaiKhoan,
                "tungay": startday + "/" + month + "/" + year,
                "denngay": endday + "/" + month + "/" + year,
                "keyword": $scope.keyword.inputFind || "",
                "start": -1,
                "end": -1
            }
            LichCongTac.findLichCaNhan($scope.formTuan).then(function (data) {
                if (data.count === 0 || data.data == []) {
                    //  Popup.a("Không có dữ liệu");
                    Popup.t('Không có dữ liệu để hiển thị');
                    $scope.myDataTuan = "";
                    $scope.message = "";
                } else {
                    var ngay = [];
                    var dulieu = [];
                    for (var i = 0; i < data.data.length; i++) {
                        for (var j = 0; j <= ngay.length; j++) {
                            if (data.data[i].ngayhop !== ngay[j]) {
                                if (j == ngay.length) {
                                    ngay.push(data.data[i].ngayhop);
                                    dulieu.push(data.data[i]);
                                    break;
                                }
                            }
                            else {
                                data.data[i].ngayhop = "";
                                dulieu.push(data.data[i]);
                                break;
                            }
                            // continue; 
                        }
                    }
                    $scope.myDataTuan = data;
                    $scope.message = "";
                }
            }, function (err) {
                Popup.e("Lỗi kết nối lấy lịch công tác cá nhân");
            });
        }
        $scope.getLCTCN = function (idlichcanhan) {
            $rootScope.tab = $scope.tabIndex;
            $rootScope.cnThangOfLichNgay = undefined;
            $rootScope.cnNamOfLichNgay = undefined;
            $rootScope.cnNgayOfLichNgay = undefined;
            $rootScope.cnThangOfLichTuan = undefined;
            $rootScope.cnNamOfLichTuan = undefined;
            if ($scope.tabIndex == 0) {
                $rootScope.cnThangOfLichNgay = $scope.formdate.month;
                $rootScope.cnNamOfLichNgay = $scope.formdate.year;
                $rootScope.cnNgayOfLichNgay = $scope.formdate.date;
            } else if ($scope.tabIndex == 1) {
                $rootScope.cnThangOfLichTuan = $scope.formdate.month;
                $rootScope.cnNamOfLichTuan = $scope.formdate.year;
            }
            $state.go('app.chitietlichcongtac', {
                lichcongtacid: null,
                lichcongtaccnid: idlichcanhan
            })
        }
        $scope.$on('$ionicView.loaded', function () {
          

        });

        $scope.$on('$ionicView.enter', function () {
            if ($rootScope.tab == undefined || $rootScope.tab == 0) {
                $scope.tabIndex = 0;
                if ($rootScope.cnThangOfLichNgay == undefined || $rootScope.cnNamOfLichNgay == undefined || $rootScope.cnNgayOfLichNgay == undefined) {
                    $scope.form = {
                        "username": $rootScope.userinfo.TaiKhoan,
                        "tungay": $scope.formdate.date + "/" + $scope.formdate.month + "/" + $scope.formdate.year,
                        "denngay": $scope.formdate.date + "/" + $scope.formdate.month + "/" + $scope.formdate.year,
                        "keyword": $scope.keyword.inputFind || "",
                        "start": -1,
                        "end": -1
                    }
                    LichCongTac.findLichCaNhan($scope.form).then(function (data) {
                        if (data.count === 0 || data.data == []) {
                            //  Popup.a("Không có dữ liệu");
                            $scope.message = "Không có dữ liệu để hiển thị";
                            $scope.myData = "";
                        } else {
                            $scope.myData = data;
                        }
                    }, function (err) {
                        Popup.e("Lỗi kết nối lấy lịch công tác cá nhân");
                    });
                } else {
                    $scope.formdate.month = $rootScope.cnThangOfLichNgay;
                    $scope.formdate.year = $rootScope.cnNamOfLichNgay;
                    $scope.formdate.date = $rootScope.cnNgayOfLichNgay;
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                    $scope.countSelectedDays = $scope.dayArray[$scope.formdate.date - 1];
                    $scope.form = {
                        "username": $rootScope.userinfo.TaiKhoan,
                        "tungay": $scope.formdate.date + "/" + $scope.formdate.month + "/" + $scope.formdate.year,
                        "denngay": $scope.formdate.date + "/" + $scope.formdate.month + "/" + $scope.formdate.year,
                        "keyword": $scope.keyword.inputFind || "",
                        "start": -1,
                        "end": -1
                    }
                    LichCongTac.findLichCaNhan($scope.form).then(function (data) {
                        if (data.count === 0 || data.data == []) {
                            //  Popup.a("Không có dữ liệu");
                            $scope.message = "Không có dữ liệu để hiển thị";
                            $scope.myData = "";
                        } else {
                            $scope.myData = data;
                        }
                    }, function (err) {
                        Popup.e("Lỗi kết nối lấy lịch công tác cá nhân");
                    });
                }

            } else if ($rootScope.tab == 1) {
                $scope.tabIndex = 1;
                if ($rootScope.indexWeekcn !== null || $rootScope.indexWeekcn !== undefined) {
                    $scope.formdate.month = $rootScope.cnThangOfLichTuan;
                    $scope.formdate.year = $rootScope.cnNamOfLichTuan;
                    $scope.startOfWek = $rootScope.startPubliccn;
                    $scope.endOfWek = $rootScope.endPubliccn;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month - 1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    // $scope.week = $scope.weeks($scope.formdate.year + "/" + $scope.formdate.month + "/01");
                    $scope.countSelectedWeek = $scope.week[$rootScope.indexWeekcn];
                    $scope.getLCTCNWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                }

            }
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
