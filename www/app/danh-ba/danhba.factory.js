/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.danhba')
    .factory('DanhBaFtr', danhBaFtr);

  danhBaFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function danhBaFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {
    var self = this;
    self.getDanhba = function (params) {
      return API.layDanhbaa(API_CONST.user.layDanhbacc,params);
    }
    self.getCTDanhBa = function(params){
      return API.layDanhbaa(API_CONST.user.chitietDanhba, params);
    }
    return self;
  }
  


})();