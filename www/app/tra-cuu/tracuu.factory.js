/*
 * document controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.tracuu')
    .factory('TraCuuFtr', traCuuFtr);

  traCuuFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
  ];

  function traCuuFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
  ) {
    var self = this;

    // Ham tra cuu va tim kiem van ban den
    self.tracuuvanbanden = function(params) {
      return API.callcc(API_CONST.tracuu.tktracuuvanbanden, params);
    }

    // Ham tra cuu va tim kiem van ban di
    self.tracuuvanbandi = function(params) {
      return API.callcc(API_CONST.tracuu.tktracuuvanbandi, params);
    }

    // Ham tra cuu va tim kiem ho so
    self.tracuuhoso = function(params) {
      return API.callcc(API_CONST.tracuu.tktracuuhoso, params);
    }

    // Ham tra cuu va tim kiem chi dao
    self.tracuuchidao = function(params) {
      return API.callcc(API_CONST.tracuu.tktracuuchidao, params);
    }

    //Ham chi tiet tra cuu ho so
    self.chitiettracuuhs = function(params){
      var _params = {
        object: params.chitiethosoID
      };
      return API.callcc(API_CONST.tracuu.cttracuuhoso, _params);
    }


    //Ham Qua trinh xu ly ho so tra cuu
    self.quatrinhxulyhs = function(params){
      var _params = {
        object: params.chitiethosoID
      };
      return API.callcc(API_CONST.tracuu.xltracuuhoso, _params);
    }

    // Ham lay ho so kem theo ho so tra cuu

    self.hskemtheo = function(params){
      var _params = {
        object: params.chitiethosoID
      };
      return API.callcc(API_CONST.tracuu.hskttracuuhoso, _params);
    }


    // Ham lay chi tiet van ban chi dao

    self.ctchidaotracuu = function(params){
 
      var _params = {
        object: params
      };
      return API.callcc(API_CONST.tracuu.cttracuuchidao, _params);
    }
    //////////////////////////////////
    // Ham lay chi tiet van ban den

    self.laychitietvbden = function(params){
 
      var _params = {
        object: params
      };
      return API.callcc(API_CONST.tracuu.cttracuuvanbanden, _params);
    }

    // Ham lay chi tiet van ban di

    self.laychitietvbdi = function(params){
 
      var _params = {
        object: params
      };
      return API.callcc(API_CONST.tracuu.cttracuuvanbandi, _params);
    }

    // Ham lay qua trinh xu ly van ban chi dao
    self.layxulyvbchidao = function(params){
 
      var _params = {
        object: params
      };
      return API.callcc(API_CONST.tracuu.xltracuuchidao, _params);
    }

    // Ham tai file chi dao
    self.layfilechidao = function(params){
   
      return API.callcc(API_CONST.tracuu.filetracuuchidao,params);
    }

    // Ham lay file van ban den 
    self.layfilevbden = function(params){
   
      return API.callcc(API_CONST.tracuu.filetracuuvanbanden,params);
    }
    // Ham lay file van ban di
    self.layfilevbdi = function(params){
   
      return API.callcc(API_CONST.tracuu.filetracuuvanbandi,params);
    }
    
    // qua trinh xu ly van ban den
    self.layxulyvbden = function(params){
      var _params = {
        object: params
      };
      return API.callcc(API_CONST.tracuu.xltracuuvanbanden,_params);
    }
    // qua trinh xu ly van ban di
    self.layxulyvbdi = function(params){
      var _params = {
        object: params
      };
      return API.callcc(API_CONST.tracuu.xltracuuvanbandi,_params);
    }
    //////////////////////////////////
    return self;

  }


})();