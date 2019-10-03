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
    

  }


})();