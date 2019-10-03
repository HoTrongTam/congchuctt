/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.thongke')
    .factory('ThongKeFtr', thongKeFtr);

  thongKeFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function thongKeFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {
    var self = this;

    self.getTKVBDen = function (params) {
      var _params = {
        phongBanID: params.phongBanID,
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.getThongKeVanBanDen, _params);
    }
    self.getTKVBDi = function (params) {
      var _params = {
        phongBanID: params.phongBanID,
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.getThongKeVanBanDi, _params);
    }
    self.getTKXLHoSo = function (params) {
      var _params = {
        linhVucID: params.linhVucID,
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.getThongKeXuLyHoSo, _params);
    }
    self.getTKXLHoSoChiTietLinhVuc = function(params){
      var _params = {
        linhVucID: params.linhVucID,
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.getThongKeXuLyHoSoChiTietLinhVuc, _params);
    }
    self.getTKPAKienNghi = function (params) {
      var _params = {
        phongBanID: params.phongBanID,
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.getThongKePhanAnhKienNghi, _params);
    }
    self.getTKXPHanhChinh = function (params) {
      var _params = {
        linhVucID: params.linhVucID,
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.getThongKeXuPhatHanhChinh, _params);
    }
    self.getTKCVDaGiao = function(params){
      var _params = {
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.getThongKeCongViecDaGiao, _params);
    }
    self.getTKCVDaGiaoNew = function(params){
      var _params = {
        nguoiGiaoID: params.nguoiGiaoID,
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.thongkeViecDaGiao, _params);
    }
    self.getTKCVDaNhan = function(params){
      var _params = {
        nguoiNhanID: params.nguoiNhanID,
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.thongkeViecDaNhan, _params);
    }
    self.getTKDGHaiLong = function(params){
      return API.callDGHL(API_CONST.thongke.getThongKeDanhGiaHaiLong, params);
    }
    self.getTKGQDonThu = function(params){
      var _params = {
        nam: params.nam,
        thang: params.thang
      }
      return API.call(API_CONST.thongke.getThongKeGiaiQuyetDonThu, _params);
    }


    //////// Thong ke chuyen nganh //////////////

    // Thong ke tinh hinh cap phep
    self.layTinhhinhcapphep = function(params){
      var _params = {
        nam:params.nam,
        thang:params.thang
      }
      return API.call(API_CONST.thongke.getThongKeTinhHinhCapPhepKinhTe, _params);
    }
    // Thong ke dia ban kinh te
    self.layDiabankinhte = function(params){
      // var _params = {
      //   phuongID:params.phuongID,
      //   nam:params.nam,
      //   thang:params.thang
      // }
      return API.call(API_CONST.thongke.getThongKeDiaBanKinhTe, params);
    }
    // Thong ke nganh nghe kinh te
    self.laynganhnghekinhte = function(params){
      return API.call(API_CONST.thongke.getThongKeNganhNgeKinhTe, params);
    }
    // Thong ke tinh hinh cap phep xay dung
    self.laytinhhinhcapphepxaydung = function(params){
      var _params = {
        nam:params.nam,
        thang:params.thang
      }
      return API.call(API_CONST.thongke.getThongKeCapPhepXayDung, _params);
    }
    // Thong ke dien tich xay dung
    self.laydientichxaydung = function(params){
      var _params = {
        nam:"",
        thang:""
      }
      return API.call(API_CONST.thongke.getThongKeDienTichXayDung, _params);
    }
    //////// Thong ke chuyen nganh //////////////
    return self;
  }


})();