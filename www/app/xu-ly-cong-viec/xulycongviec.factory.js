/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.xulycongviec')
    .factory('XuLyCongViec', xuLyCongViecFtr);

  xuLyCongViecFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function xuLyCongViecFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {
    var self = this;

    self.timkiemvanban = function(params) {
      return API.callcc(API_CONST.xulyvanban.timkiemvanban, params);
    }

    self.timkiemhoso = function(params) {
      return API.callcc(API_CONST.xulyvanban.timkiemhoso, params);
    }

    self.timkiemchidao = function(params) {
      return API.callcc(API_CONST.xulyvanban.timkiemchidao, params);
    }

    self.chitietbanban = function(congviecid) {
      var _param = {
        object : congviecid
      };
      return API.callcc(API_CONST.xulyvanban.chitietvanban, _param);
    }

    self.quatrinhxulyvanbanden = function(congviecid) {
      var _param = {
        object : congviecid
      };
      return API.callcc(API_CONST.xulyvanban.quatrinhxulyvanbanden, _param);
    }

    self.quatrinhxulyvanbandi = function(congviecid) {
      var _param = {
        object : congviecid
      };
      return API.callcc(API_CONST.xulyvanban.quatrinhxulyvanbandi, _param);
    }

    self.tiendovanbanden = function(congviecid) {
      var _param = {
        object : congviecid
      };
      return API.callcc(API_CONST.xulyvanban.tiendovanbanden, _param);
    }

    self.tiendovanbandi = function(congviecid) {
      var _param = {
        object : congviecid
      };
      return API.callcc(API_CONST.xulyvanban.tiendovanbandi, _param);
    }

    self.luutiendovanbanden = function(params) {
      return API.callcc(API_CONST.xulyvanban.luutiendovanbanden, params);
    }

    self.luutiendovanbandi = function(params) {
      return API.callcc(API_CONST.xulyvanban.luutiendovanbandi, params);
    }

    self.timkiemphongbannhanxulyvanbanden = function(params) {
      return API.callcc(API_CONST.xulyvanban.timkiemphongbannhanxulyvanbanden, params);
    }

    self.timkiemnguoinhanxulyvanbanden = function(params) {
      return API.callcc(API_CONST.xulyvanban.timkiemnguoinhanxulyvanbanden, params);
    }

    self.chuyenxulyvanbanden = function(params) {
      return API.callcc(API_CONST.xulyvanban.chuyenxulyvanbanden, params);
    }

    self.loadnguoinhantralaivanbanden = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.loadnguoinhantralaivanbanden, _param);
    }

    self.tralaivanbanden = function(params) {
      return API.callcc(API_CONST.xulyvanban.tralaivanbanden, params);
    }

    self.chitietvanbandi = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.chitietvanbandi, _param);
    }

    self.taifilevanbanden = function(params) {
      return API.callcc(API_CONST.xulyvanban.taifilevanbanden, params);
    }

    self.taifilevanbandi = function(params) {
      return API.callcc(API_CONST.xulyvanban.taifilevanbandi, params);
    }

    self.loadnguoinhanxulyvanbandi = function(username, congviecid) {
      var _param ={
        object: {
          "username":$rootScope.UserName,
          "congviecid":congviecid
        }
      }
      return API.callcc(API_CONST.xulyvanban.loadnguoinhanxulyvanbandi, _param);
    }

    self.chuyenxulyvanbandi = function(params) {
      return API.callcc(API_CONST.xulyvanban.chuyenxulyvanbandi, params);
    }

    self.loadnguoinhantralaivanbandi = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.loadnguoinhantralaivanbandi, _param);
    }

    self.tralaivanbandi = function(params) {
      return API.callcc(API_CONST.xulyvanban.tralaivanbandi, params);
    }

    self.chitiethosochuaxuly = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.chitiethosochuaxuly, _param);
    }

    self.quatrinhxulyhosochuaxuly = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.quatrinhxulyhosochuaxuly, _param);
    }

    self.hosokemtheohosochuaxuly = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.hosokemtheohosochuaxuly, _param);
    }

    self.loadnguoinhanchuyenxulyhoso = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.loadnguoinhanchuyenxulyhoso, _param);
    }

    self.chuyenxulyhoso = function(params) {
      return API.callcc(API_CONST.xulyvanban.chuyenxulyhoso, params);
    }

    self.loadnguoinhantralaihoso = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.loadnguoinhantralaihoso, _param);
    }

    self.tralaihoso = function(params) {
      return API.callcc(API_CONST.xulyvanban.tralaihoso, params);
    }

    self.chitietchidao = function(chidaoid, loaivanban) {
      var _params ={
        object : {
          "chidaoid":chidaoid,
          "loaivanban":loaivanban
        }
      }
      return API.callcc(API_CONST.xulyvanban.chitietchidao, _params);
    }

    self.tiendoxulychidao = function(congviecid) {
      var _param ={
        object: congviecid
      }
      return API.callcc(API_CONST.xulyvanban.tiendoxulychidao, _param);
    }

    self.taifilevanbanchidao = function(params) {
      return API.callcc(API_CONST.xulyvanban.taifilevanbanchidao, params);
    }

    self.nguoinhannhacnho = function(vanbanid,loaivanban) {
      var _params ={
        object : {
          "vanbanid":vanbanid,
          "loaivanban":loaivanban
        }
      }
      return API.callcc(API_CONST.xulyvanban.nguoinhannhacnho, _params);
    }

    self.luunhacnhochidao = function(params) {
      return API.callcc(API_CONST.xulyvanban.luunhacnhochidao, params);
    }

    return self;
  }
})();
