/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.phananhkiennghi')
    .factory('PhanAnhKienNghi', phanAnhKienNghiFtr);

  phanAnhKienNghiFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function phanAnhKienNghiFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {
    var self = this;
    self.getDanhSachPAKN = function (params) {
      var _params = {
        tuKhoa: params.tuKhoa,
        tinhTrang: params.tinhTrang,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize
      }
      return API.call(API_CONST.pakiennghi.getdanhsachpa, _params);
    }
    self.getHoiDapPAKN = function (params) {
      var _params = {
        hoiDapID: params.hoiDapID
      }
      return API.call(API_CONST.pakiennghi.gethoidappa, _params);
    }
    return self;
  }
})();
