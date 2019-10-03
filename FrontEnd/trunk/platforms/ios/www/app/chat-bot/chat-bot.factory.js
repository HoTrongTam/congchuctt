/*
 * @2017
 */


(function() {
'use strict';


angular
    .module('FTravel.ChatBot')
    .factory('ChatBotFtr', chatBotFtr)
;

chatBotFtr.$inject = [
    '$http', '$q',
    'API', 'CONST', 'API_CONST', 'LSFtr'
];

function chatBotFtr(
    $http, $q,
    API, CONST, API_CONST, LSFtr
) {
    var self = this;

    self.get = function(params) {
        var _params = {
        };

        return API.call(API_CONST.master.getDSServer, _params);
    };

    return self;
}


})();
