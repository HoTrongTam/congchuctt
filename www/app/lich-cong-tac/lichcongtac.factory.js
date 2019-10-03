/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.lichcongtac')
    .factory('LichCongTac', lichCongTacFtr);

  lichCongTacFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function lichCongTacFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {
    var self = this;

    self.findLichUyBan = function (params) {
      return API.callcc(API_CONST.lichcongtac.postLichCongTacUyBan, params);
    }
    self.findLichCaNhan = function (params){
      return API.callcc(API_CONST.lichcongtac.postLichCongTacCaNhan, params);
    }
    self.getCTLichUyBan = function(params){
      var _param ={
        object: params
      }
      return API.callcc(API_CONST.lichcongtac.getLichCongTacUyBan, _param);
    }
    self.getCTLichCaNhan = function(params){
      var _param ={
        object: params
      }
      return API.callcc(API_CONST.lichcongtac.getLichCongTacCaNhan, _param);
    }
    self.getFileLCT = function(params){
   
      return API.callcc(API_CONST.lichcongtac.postFileChiTietLich, params);
    }
    return self;
  }


})();