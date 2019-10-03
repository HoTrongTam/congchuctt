/**
 * document list controller
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.lichcongtac')
        .controller('LichCongTacListCtrl', lichCongTacListCtrl);

    lichCongTacListCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter','$ionicHistory',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'LichCongTac'
    ];

    function lichCongTacListCtrl(
        $scope, $rootScope, $state, $filter,$ionicHistory,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, LichCongTac
    ) {
        $scope.title = "LỊCH ỦY BAN";
        $scope.tabIndex = 0;
        var date = new Date();
        $scope.current = date.getFullYear();
        $scope.daycurrent = date.getDate();
        $scope.monthcurrent = date.getMonth();
        $scope.daylet = "";
        //
        $rootScope.show_filter2 = true;
        $scope.formdate = { date: $scope.daycurrent, month: $scope.monthcurrent + 1, year: $scope.current }
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
                $scope.getLCTYBDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.startOfWek = '';
                $scope.endOfWek = '';
                if ($scope.startOfWek == '' || $scope.endOfWek == '') {
                    $scope.myDataTuan = "";
                } else {
                    $scope.getLCTYBWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                }
            } else if ($scope.tabIndex == 2) {
                $scope.getLCTYBMonth($scope.formdate.month, $scope.formdate.year);
            }
        }
        $scope.countSelectedDays = $scope.dayArray[$scope.daycurrent - 1];
        $scope.onChangeDays = function (id) {
            $scope.formdate.date = id;
            if ($scope.tabIndex == 0) {
                $scope.getLCTYBDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.getLCTYBWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
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
                $scope.getLCTYBDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
            } else if ($scope.tabIndex == 1) {
                $scope.startOfWek = '';
                $scope.endOfWek = '';
                if ($scope.startOfWek == '' || $scope.endOfWek == '') {
                    $scope.myDataTuan = "";
                } else {
                    $scope.getLCTYBWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                }

            } else if ($scope.tabIndex == 2) {
                $scope.getLCTYBMonth($scope.formdate.month, $scope.formdate.year);
            }
        }
        
        var weekIdx = function(week){
            if($scope.week != null) {
                angular.forEach($scope.week,function(item, index){
                    if(week == item) {
                        $rootScope.indexWeek = index;
                    }
                });
            } else 
                 $rootScope.indexWeek = null;
        }

        $scope.onChangeWeek = function (id) {
            weekIdx(id);
            $scope.startOfWek = id[0];
            $scope.endOfWek = id[1];
            $rootScope.startPublic = $scope.startOfWek;
            $rootScope.endPublic = $scope.endOfWek;
            if ($scope.tabIndex == 1) {
                $scope.getLCTYBWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
            }
        }
        //Function LICH CONG TAC FACTORY
        $scope.keyword = {};

        $scope.onTabChange = function (tabIndex) {
            $scope.tabIndex = tabIndex;
            switch (tabIndex) {
                case 0: // Lịch ngày ủy ban
                    $scope.daycurrent = date.getDate();
                    $scope.monthcurrent = date.getMonth();
                    $scope.current = date.getFullYear();
                    $scope.formdate.date = $scope.daycurrent;
                    $scope.formdate.month = $scope.monthcurrent + 1
                    $scope.formdate.year = $scope.current;
                    $scope.countSelectedDays = $scope.dayArray[$scope.formdate.date -1];
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month -1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.getLCTYBDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
                    $scope.show = function () {
                        $scope.getLCTYBDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
                    }
                    break;
                case 1: // Lịch tuần ủy ban
                    $rootScope.indexWeek = null;
                    $scope.week = [];
                    $scope.monthcurrent = date.getMonth();
                    $scope.current = date.getFullYear();
                    $scope.formdate.month = $scope.monthcurrent + 1
                    $scope.formdate.year = $scope.current;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month -1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.week = $scope.weeks($scope.formdate.year + "/" + $scope.formdate.month + "/01");
                    // $scope.countSelectedWeek = $scope.week[$rootScope.indexWeek];
                    var dayweek = function(daycurrent) {
                        if ($scope.week != null) {
                            angular.forEach($scope.week, function (item, index) {
                                if (daycurrent >= item[0] && daycurrent <= item[1]) {
                                    $rootScope.indexWeek = index;
                                    $scope.startOfWek = item[0];
                                    $scope.endOfWek = item[1];
                                }
                            });
                        }
                    }
                    $scope.myDataTuan = "";
                    if($rootScope.indexWeek == null | $rootScope.indexWeek == undefined){
                        dayweek($scope.daycurrent);
                        $scope.countSelectedWeek = $scope.week[$rootScope.indexWeek];
                        $scope.getLCTYBWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                    }
                    // $scope.myDataTuan = "";
                    $scope.show = function () {
                        if($scope.startOfWek == undefined || $scope.startOfWek == '' &&  $scope.endOfWek == undefined || $scope.endOfWek == ''){
                            Popup.t("Vui lòng chọn tuần");
                        }else{
                            $scope.getLCTYBWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                        }
                        
                    }
                    break;
                case 2: // Tìm theo tháng
                    $scope.monthcurrent = date.getMonth();
                    $scope.current = date.getFullYear();
                    $scope.formdate.month = $scope.monthcurrent + 1
                    $scope.formdate.year = $scope.current;
                    //Load lần đầu
                    if ($scope.formdate.month == 2) {
                        $scope.dayendofmonth = 28;
                    } else if ($scope.formdate.month == 1 || $scope.formdate.month == 3 || $scope.formdate.month == 5 || $scope.formdate.month == 7 || $scope.formdate.month == 8 || $scope.formdate.month == 10 || $scope.formdate.month == 12) {
                        $scope.dayendofmonth = 31;
                    } else {
                        $scope.dayendofmonth = 30;
                    }
                    $scope.getLCTYBMonth($scope.formdate.month, $scope.formdate.year);
                    //
                    $scope.show = function () {
                        if ($scope.formdate.month == 2) {
                            $scope.dayendofmonth = 28;
                        } else if ($scope.formdate.month == 1 || $scope.formdate.month == 3 || $scope.formdate.month == 5 || $scope.formdate.month == 7 || $scope.formdate.month == 8 || $scope.formdate.month == 10 || $scope.formdate.month == 12) {
                            $scope.dayendofmonth = 31;
                        } else {
                            $scope.dayendofmonth = 30;
                        }
                        $scope.getLCTYBMonth($scope.formdate.month, $scope.formdate.year);
                    }
                    break;
                default:
                    break;
            }
        };
        if ($scope.tabIndex == 0) {
            if($rootScope.ngayLichNgay == undefined || $rootScope.thangLichNgay == undefined || $rootScope.namLichNgay == undefined){
                $scope.show = function () {
                    $scope.getLCTYBDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
                }
            }else{
                $scope.countSelectedDays = $scope.dayArray[$rootScope.ngayLichNgay -1];
                $scope.countSelectedMonths = $scope.monthArray[$rootScope.thangLichNgay -1];
                $scope.countSelectedYears = $rootScope.namLichNgay;
                $scope.form = {
                    "tungay": $rootScope.ngayLichNgay + "/" + $rootScope.thangLichNgay + "/" + $rootScope.namLichNgay,
                    "denngay": $rootScope.ngayLichNgay + "/" + $rootScope.thangLichNgay + "/" + $rootScope.namLichNgay,
                    "keyword": $scope.keyword.inputFind || "",
                    "start": -1,
                    "end": -1
                }
                LichCongTac.findLichUyBan($scope.form).then(function (data) {
                    if (data.count === 0 || data.data == []) {
                        $scope.message = "Không có dữ liệu để hiển thị";
                        $scope.myData = "";
                    } else {
                        $scope.myData = data;
                    }
                }, function (err) {
                    Popup.e("Lỗi kết nối lấy lịch công tác ủy ban");
                });
            }
            $scope.show = function () {
                $scope.getLCTYBDay($scope.formdate.date, $scope.formdate.month, $scope.formdate.year);
            }
        }
        //Load khi chage
        $scope.getLCTYBDay = function (day, month, year) {
            $scope.form = {
                "tungay": day + "/" + month + "/" + year,
                "denngay": day + "/" + month + "/" + year,
                "keyword": $scope.keyword.inputFind || "",
                "start": -1,
                "end": -1
            }
            LichCongTac.findLichUyBan($scope.form).then(function (data) {
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
                Popup.e("Lỗi kết nối server");
            });
        }
        $scope.getLCTYBWeek = function (startday, endday, month, year) {
            $scope.formTuan = {
                "tungay": startday + "/" + month + "/" + year,
                "denngay": endday + "/" + month + "/" + year,
                "keyword": $scope.keyword.inputFind || "",
                "start": -1,
                "end": -1
            }
            LichCongTac.findLichUyBan($scope.formTuan).then(function (data) {
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
                Popup.e("Lỗi kết nối lấy lịch công tác ủy ban");
            });
        }
        $scope.getLCTYBMonth = function (month, year) {
            if (month == 2) {
                $scope.dayendofmonth = 28;
            } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                $scope.dayendofmonth = 31;
            } else {
                $scope.dayendofmonth = 30;
            }
            $scope.formThang = {
                "tungay": "01/" + month + "/" + year,
                "denngay": $scope.dayendofmonth + "/" + month + "/" + year,
                "keyword": $scope.keyword.inputFind || "",
                "start": -1,
                "end": -1
            }
            LichCongTac.findLichUyBan($scope.formThang).then(function (data) {
                if (data.count === 0 || data.data == []) {
                    Popup.t('Không có dữ liệu để hiển thị');
                    $scope.message = ""
                    $scope.myDataThang = "";
                } else {
                    $scope.myDataThang = data;
                    $scope.message = "";
                }
            }, function (err) {
                Popup.e("Lỗi kết nối lấy lịch công tác ủy ban");
            });
        }
        $scope.getChiTietLCTYB = function (idlichcongtac) {
            $rootScope.namLichThang = undefined;
            $rootScope.thangLichThang = undefined;
            $rootScope.namLichNgay = undefined;
            $rootScope.ngayLichNgay = undefined;
            $rootScope.thangLichNgay = undefined;
            $rootScope.thangLichTuan = undefined;
            $rootScope.namLichTuan = undefined;
            $rootScope.startPublic =  undefined;
            $rootScope.endPublic = undefined;
            if($scope.tabIndex == 0){
                if($rootScope.ngayLichNgay == undefined || $rootScope.thangLichNgay == undefined || $rootScope.namLichNgay == undefined){
                    $rootScope.namLichNgay = $scope.formdate.year;
                    $rootScope.ngayLichNgay = $scope.formdate.date;
                    $rootScope.thangLichNgay = $scope.formdate.month;
                }
                // $rootScope.thangLichThang
            }else if($scope.tabIndex == 2){
                if($rootScope.thangLichThang == undefined || $rootScope.namLichThang == undefined){
                    $rootScope.namLichThang = $scope.formdate.year;
                    $rootScope.thangLichThang = $scope.formdate.month;
                }
            }else if($scope.tabIndex == 1){
                if($rootScope.thangLichTuan == undefined || $rootScope.namLichTuan == undefined){
                    $rootScope.thangLichTuan = $scope.formdate.month;
                    $rootScope.namLichTuan = $scope.formdate.year;
                    $rootScope.startPublic =  $scope.startOfWek;
                    $rootScope.endPublic = $scope.endOfWek;
                }
            }
            $rootScope.tab = $scope.tabIndex;
            $state.go('app.chitietlichcongtac', {
                lichcongtacid: idlichcongtac,
                lichcongtaccnid: null
            });

        }
        $scope.$on('$ionicView.loaded', function () {
           
           
        });

        $scope.$on('$ionicView.enter', function () {
            if($rootScope.tab == undefined){
                $scope.tabIndex =0;
                if($rootScope.ngayLichNgay == undefined || $rootScope.thangLichNgay == undefined || $rootScope.namLichNgay == undefined){
                    $scope.form = {
                        "tungay": $scope.formdate.date + "/" + $scope.formdate.month + "/" + $scope.formdate.year,
                        "denngay": $scope.formdate.date + "/" + $scope.formdate.month + "/" + $scope.formdate.year,
                        "keyword": $scope.keyword.inputFind || "",
                        "start": -1,
                        "end": -1
                    }
                    LichCongTac.findLichUyBan($scope.form).then(function (data) {
                        if (data.count === 0 || data.data == []) {
                            $scope.message = "Không có dữ liệu để hiển thị";
                            $scope.myData = "";
                        } else {
                            $scope.myData = data;
                        }
                    }, function (err) {
                        Popup.e("Lỗi kết nối lấy lịch công tác ủy ban");
                    });
                }else{
                    $scope.countSelectedDays = $scope.dayArray[$rootScope.ngayLichNgay -1];
                    $scope.countSelectedMonths = $scope.monthArray[$rootScope.thangLichNgay -1];
                    $scope.countSelectedYears = $rootScope.namLichNgay;
                    $scope.form = {
                        "tungay": $rootScope.ngayLichNgay + "/" + $rootScope.thangLichNgay + "/" + $rootScope.namLichNgay,
                        "denngay": $rootScope.ngayLichNgay + "/" + $rootScope.thangLichNgay + "/" + $rootScope.namLichNgay,
                        "keyword": $scope.keyword.inputFind || "",
                        "start": -1,
                        "end": -1
                    }
                    LichCongTac.findLichUyBan($scope.form).then(function (data) {
                        if (data.count === 0 || data.data == []) {
                            $scope.message = "Không có dữ liệu để hiển thị";
                            $scope.myData = "";
                        } else {
                            $scope.myData = data;
                        }
                    }, function (err) {
                        Popup.e("Lỗi kết nối lấy lịch công tác ủy ban");
                    });
                }
             
                
            }else if($rootScope.tab == 1){
                $scope.tabIndex =1;
                if($rootScope.indexWeek !== null || $rootScope.indexWeek !== undefined){
                    $scope.formdate.month = $rootScope.thangLichTuan;
                    $scope.formdate.year = $rootScope.namLichTuan;
                    $scope.startOfWek = $rootScope.startPublic;
                    $scope.endOfWek = $rootScope.endPublic;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month];
                    $scope.countSelectedYears = $scope.formdate.year;
                    $scope.week = $scope.weeks($scope.formdate.year + "/" + $scope.formdate.month + "/01");
                    $scope.countSelectedWeek = $scope.week[$rootScope.indexWeek];
                    $scope.getLCTYBWeek($scope.startOfWek, $scope.endOfWek, $scope.formdate.month, $scope.formdate.year);
                }
               
            }else if($rootScope.tab == 2){
                $scope.tabIndex =2;
                //Load lần đầu
                if($rootScope.namLichThang == undefined || $rootScope.thangLichThang == undefined){
                    $scope.monthcurrent = date.getMonth();
                    $scope.current = date.getFullYear();
                    $scope.formdate.month = $scope.monthcurrent + 1
                    $scope.formdate.year = $scope.current;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month -1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    if ($scope.formdate.month == 2) {
                        $scope.dayendofmonth = 28;
                    } else if ($scope.formdate.month == 1 || $scope.formdate.month == 3 || $scope.formdate.month == 5 || $scope.formdate.month == 7 || $scope.formdate.month == 8 || $scope.formdate.month == 10 || $scope.formdate.month == 12) {
                        $scope.dayendofmonth = 31;
                    } else {
                        $scope.dayendofmonth = 30;
                    }
                    $scope.getLCTYBMonth($scope.formdate.month, $scope.formdate.year);
                    //
                    $scope.show = function () {
                        if ($scope.formdate.month == 2) {
                            $scope.dayendofmonth = 28;
                        } else if ($scope.formdate.month == 1 || $scope.formdate.month == 3 || $scope.formdate.month == 5 || $scope.formdate.month == 7 || $scope.formdate.month == 8 || $scope.formdate.month == 10 || $scope.formdate.month == 12) {
                            $scope.dayendofmonth = 31;
                        } else {
                            $scope.dayendofmonth = 30;
                        }
                        $scope.getLCTYBMonth($scope.formdate.month, $scope.formdate.year);
                    }
                }else{
                    $scope.formdate.year = $rootScope.namLichThang;
                    $scope.formdate.month = $rootScope.thangLichThang;
                    $scope.countSelectedMonths = $scope.monthArray[$scope.formdate.month -1];
                    $scope.countSelectedYears = $scope.formdate.year;
                    if ($scope.formdate.month == 2) {
                        $scope.dayendofmonth = 28;
                    } else if ($scope.formdate.month == 1 || $scope.formdate.month == 3 || $scope.formdate.month == 5 || $scope.formdate.month == 7 || $scope.formdate.month == 8 || $scope.formdate.month == 10 || $scope.formdate.month == 12) {
                        $scope.dayendofmonth = 31;
                    } else {
                        $scope.dayendofmonth = 30;
                    }
                    $scope.getLCTYBMonth($scope.formdate.month, $scope.formdate.year);
                    //
                    $scope.show = function () {
                        if ($scope.formdate.month == 2) {
                            $scope.dayendofmonth = 28;
                        } else if ($scope.formdate.month == 1 || $scope.formdate.month == 3 || $scope.formdate.month == 5 || $scope.formdate.month == 7 || $scope.formdate.month == 8 || $scope.formdate.month == 10 || $scope.formdate.month == 12) {
                            $scope.dayendofmonth = 31;
                        } else {
                            $scope.dayendofmonth = 30;
                        }
                        $scope.getLCTYBMonth($scope.formdate.month, $scope.formdate.year);
                    }
                }
                
            }else if($rootScope.tab == 0){
                $scope.tabIndex =0;
                if($rootScope.ngayLichNgay == undefined || $rootScope.thangLichNgay == undefined || $rootScope.namLichNgay == undefined){
                    $scope.form = {
                        "tungay": $scope.formdate.date + "/" + $scope.formdate.month + "/" + $scope.formdate.year,
                        "denngay": $scope.formdate.date + "/" + $scope.formdate.month + "/" + $scope.formdate.year,
                        "keyword": $scope.keyword.inputFind || "",
                        "start": -1,
                        "end": -1
                    }
                    LichCongTac.findLichUyBan($scope.form).then(function (data) {
                        if (data.count === 0 || data.data == []) {
                            $scope.message = "Không có dữ liệu để hiển thị";
                            $scope.myData = "";
                        } else {
                            $scope.myData = data;
                        }
                    }, function (err) {
                        Popup.e("Lỗi kết nối lấy lịch công tác ủy ban");
                    });
                }else{
                   
                }
            }
        });

        $scope.$on('$ionicView.leave', function () { });

    }


})();
