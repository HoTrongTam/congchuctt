/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.thongbao')
    .factory('ThongBaoFtr', thongBaoFtr);

  thongBaoFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function thongBaoFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {
    var self = this;
    self.getThongbao = function (params) {
      var _params = {
        tieuDe: params.tieuDe,
        pageSize: params.pageSize,
        pageIndex: params.pageIndex
      }
      return API.call(API_CONST.thongbao.dsthongbao, _params);
    }
    self.getCTThongBao = function (params) {
      var _params = {
        thongBaoNoiBoID: params.thongBaoNoiBoID
      }
      return API.call(API_CONST.thongbao.ctthongbao, _params);
    }
    self.getfiledinhkem = function (params) {
      var _params = {
        FileID : params.fileID
      }
      return API.call(API_CONST.thongbao.layfiledinhkem, _params)
    }

    return self;

  }


})();