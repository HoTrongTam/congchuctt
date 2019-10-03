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

  }


})();