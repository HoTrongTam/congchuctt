/*
 * master data factory
 * @2017
 */


(function() {
    'use strict';


    angular
        .module('FTravel.master')
        .factory('MasterFtr', masterFtr);

    masterFtr.$inject = [
        '$http', '$q',
        'API', 'CONST', 'API_CONST', 'LSFtr'
    ];

    function masterFtr(
        $http, $q,
        API, CONST, API_CONST, LSFtr
    ) {
        var self = this;

        self.getDSServer = function(params) {
            var _params = {
                appCode: 'DVC',
                customerCode: '',
                customerSiteCode: '',
                environmentCode: ''
            };

            return API.call(API_CONST.master.getDSServer, _params);
        };

        self.getDSTinTuc = function(page) {
            var _params = {
                PageNum: page,
                PageSize: CONST.PAGE_SIGN
            };

            return API.call(API_CONST.master.getDSTinTuc, _params, _params.PageNum > 1);
        };

        self.getCTTinTuc = function(tinTucID) {
            var _params = {
                intTinTucID: tinTucID
            }

            return API.call(API_CONST.master.getCTTinTuc, _params);
        };

        self.getDSDonVi = function(params, page) {
            var _params = {
                PageNum: page,
                PageSize: CONST.PAGE_SIGN
            };

            return API.call(API_CONST.master.getDSDonVi, _params, _params.PageNum > 1);
        };

        self.getDSPhuongXa = function(quanHuyenID) {
            var _params = {
                quanHuyenID: quanHuyenID || ''
            };
            return API.call(API_CONST.master.getDSPhuongXa, _params);
        };

        self.getDSQuanHuyen = function(tinhThanhID) {
            var _params = {
                // tinhThanhID : tinhThanhID || $rootScope.user.UserTinhThanhID || ''
                tinhThanhID: 14
            };
            return API.call(API_CONST.master.getDSQuanHuyen, _params);
        };

        self.getLoaiGiayTo = function() {
            return API.call(API_CONST.master.getLoaiGiayTo, {});
        };

        self.uploadFile = function(files) {
            return API.call(API_CONST.master.uploadFile, files);
        };

        self.deleteFile = function(fileName) {
            var _params = {
                fileName: fileName
            };

            return API.call(API_CONST.master.deleteFile, _params);
        };




        self.getDanhSachTinhThanh = function() {
            var deferred = $q.defer();
            var _params = {};
            if (CONST.MODE != 'demo') {
                API.call(API_CONST.masterData.getDanhSachTinhThanh, _params).then(function(data) {
                    deferred.resolve(data);
                });
            } else {

                API.call(API_CONST.masterData.getDanhSachTinhThanh, {}).then(function(data) {
                    deferred.resolve(data);

                });
            }
            return deferred.promise;
        };

        // Danh sach Quoc Gia
        self.getDanhSachQuocGia = function() {
            var _params = {};
            return API.call(API_CONST.masterData.getDanhSachQuocGia, _params);
        };

        self.getDanhSachLoaiGiayTo = function() {
            return API.call(API_CONST.masterData.getGiaytotuythan, {});
        };
        self.getDanhSachQuocGia = function() {
            return API.call(API_CONST.masterData.getQuocGia, {});
        };

        // danh sach duong
        self.getDanhSachDuong = function(quanHuyenID, phuongXaID) {
            var deferred = $q.defer();
            var _params = {
                phuongXaID: phuongXaID
            };
            if (CONST.MODE != 'demo') {
                API.call(API_CONST.masterData.getDanhSachDuong, _params).then(function(data) {
                    deferred.resolve(data);
                });
            } else {
                API.call(API_CONST.masterData.getDanhSachDuong, {}).then(function(data) {
                    if (phuongXaID == 0 || phuongXaID == undefined) {
                        deferred.resolve(data);
                    } else {
                        var temp = [];
                        data.forEach(function(ele) {
                            if (ele.PhuongXaID == phuongXaID && ele.QuanHuyenID == quanHuyenID) {
                                temp.push(ele);
                            }
                            deferred.resolve(temp);
                        });
                    }

                });
            }
            return deferred.promise;
        };

        self.getDSLinhVuc = function(params, page) {
            var _params = {
                "PageNum": page,
                "PageSize": 1000
            }

            return API.call(API_CONST.master.getDSLinhVuc, _params);
        };
        self.getDSLinhVucByDonViID = function(params) {
            return API.call(API_CONST.master.getDSLinhVuc, params);
        };
        self.getLichCongTac = function(params) {
            var _params = {
                "donViID": params.donViID,
                "dateFind": params.dateFind
            }
            return API.call(API_CONST.master.getLichCongTac, _params);
        };
        return self;
    }


})();