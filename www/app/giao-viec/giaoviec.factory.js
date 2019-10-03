/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.giaoviec')
    .factory('GiaoViecFtr', giaoViecFtr);

  giaoViecFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function giaoViecFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {

    var self = this;

    self.dsViecDuocGiao = function(params) {
      var _param = {
        nguoiNhanID: params.nguoiNhanID,
        tinhTrang: params.tinhTrang,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        KeyWord: params.KeyWord
      };
      return API.call(API_CONST.giaoviec.getDSGiaoViecDuocGiao, _param);
    }
    self.chiTietDuocGiao = function(params){
      var _param = {
        giaoViecID: params.giaoViecID
      }
      return API.call(API_CONST.giaoviec.getChiTietDuocGiao, _param);
    }
    self.chiTietDaGiao = function(params){
      var _param = {
        giaoViecID: params.giaoViecID,
        nguoiNhanID: params.nguoiNhanID
      }
      return API.call(API_CONST.giaoviec.getChiTietDaGiao, _param);
    }
    self.chiTietSaveGiaoViec = function(params){
      return API.call(API_CONST.giaoviec.saveChiTietGiaoViec, params);
    }
    self.chiTietHoanThanhGiaoViec = function(params){
      return API.call(API_CONST.giaoviec.completeChiTietGiaoViec, params);
    }
    self.upload = function(params){
      return API.call(API_CONST.giaoviec.uploadFile, params);
    }
    self.download = function(params){
      return API.call(API_CONST.giaoviec.downloadFile, params);
    }
    self.themMoiGiaoViec = function(params){
      return API.call(API_CONST.giaoviec.createSaveGiaoViec, params); 
    }
    self.dsViecDaGiao = function(params){
      var _param = {
        nguoiGiaoID: params.nguoiGiaoID,
        tinhTrang: params.tinhTrang,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        KeyWord: params.KeyWord
      };
      return API.call(API_CONST.giaoviec.getDSGiaoViecDaGiao, _param);
    }
    self.sendInfoFireBase = function(params){
      return API.call(API_CONST.user.sendFireBaseXLCV, params);
    }
    
    self.timkiemchidaogiaoviec = function(params) {
      return API.callcc(API_CONST.giaoviec.timkiemchidaogiaoviec, params);
    }

    self.taifilevanbanchidao = function(params) {
      return API.callcc(API_CONST.giaoviec.taifilevanbanchidao, params);
    }

    self.chitietchidaogiaoviec = function(chidaoid, loaivanban) {
      var _param = {
        object : {
          "chidaoid":chidaoid,
          "loaivanban":loaivanban
        }
      };
      return API.callcc(API_CONST.giaoviec.chitietchidaogiaoviec, _param);
    }

    self.tiendoxulychidaogiaoviec = function(congviecid) {
      var _param = {
        object : congviecid
      };
      return API.callcc(API_CONST.giaoviec.tiendoxulychidaogiaoviec, _param);
    }

    self.loadnguoinhannhacnhochidaogiaoviec = function(vanbanid, loaivanban) {
      var _param = {
        object : {
          "vanbanid":vanbanid,
          "loaivanban":loaivanban
        }
      };
      return API.callcc(API_CONST.giaoviec.loadnguoinhannhacnhochidaogiaoviec, _param);
    }

    self.luunhacnhochidaogiaoviec = function(params) {
      return API.callcc(API_CONST.giaoviec.luunhacnhochidaogiaoviec, params);
    }

    return self;

  }


})();
