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
    

  }


})();