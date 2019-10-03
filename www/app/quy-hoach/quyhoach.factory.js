/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.quyhoach')
    .factory('QuyHoachFtr', quyHoachFtr);

  quyHoachFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function quyHoachFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {
    var self = this;
    return self;

  }


})();