/*
 * procedure controller
 * @2017
 */

(function() {
    'use strict';


    angular
        .module('FTravel.hoidap')
        .factory('HoiDapFtr', hoiDapFtr);

    hoiDapFtr.$inject = [
        '$http', '$q',
        'API', 'CONST', 'API_CONST', 'LSFtr'
    ];

    function hoiDapFtr(
        $http, $q,
        API, CONST, API_CONST, LSFtr
    ) {
        var self = this;

        self.getDanhSachCauHoi = function(params) {
            return API.call(API_CONST.question.getDanhSachCauHoi, params);
        };

        self.getChiTietCauHoi = function(intCauHoiID) {
        	var params = {
        		'intCauHoiID': intCauHoiID 
        	}
            return API.call(API_CONST.question.getChiTietCauHoi, params);
        };
        self.postLuuCauHoi = function(params) {
            return API.call(API_CONST.question.postLuuCauHoi,params);
        }

        return self;
    }


})();