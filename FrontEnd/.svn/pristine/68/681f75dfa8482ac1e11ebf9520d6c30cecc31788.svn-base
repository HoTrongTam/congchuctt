/*
 * RestAPI controller
 * @2017
 */

(function() {
'use strict';


angular
    .module('FTravel.api', [])
    .factory('API', rectAPI)
;

rectAPI.$inject = [
    '$q', '$rootScope', '$http', '$timeout', '$ionicHistory',
    'CONST', 'envService','$state', 'Loader'
];

function rectAPI(
    $q, $rootScope, $http, $timeout, $ionicHistory,
    CONST, envService, $state, Loader
) {
    var self = this;
	self.base = CONST.BASE_DEV;
	self.token = '';

	self.getToken = function(url) {
        return self.token;
    };

    self.setBase = function(url) {
        self.base = url;
    };

	self.setHeader = function(key, token) {
		if (CONST.IS_DEVICE && ionic.Platform.isIOS())
        	CordovaHttpPlugin.setHeader(key, token);

        $http.defaults.headers.common[key] = token;

        // (CONST.IS_DEVICE && ionic.Platform.isIOS()) ? CordovaHttpPlugin.setHeader(key, token)
        // : $http.defaults.headers.common[key] = token;
        self.token = token;
    };

    self.call = function(apiObj, params, skipLoader) {
        // DEMO MODE
        if (CONST.MODE === 'demo') {
            var deferred = $q.defer();
            $http.get(apiObj.json).success(function (data) {
                deferred.resolve(data.data);
            }, function(err){deferred.reject(apiObj.json + ' not found!');});
            return deferred.promise;
        }
        // END DEMO MODE

		var _url = (apiObj.base || self.base) + apiObj.service + apiObj.functionUrl;
		if (CONST.IS_DEVICE && ionic.Platform.isIOS() && (apiObj.functionUrl.indexOf('UploadFiles') === -1)) {
		// if (CONST.IS_DEVICE && ionic.Platform.isIOS()) {
			if( apiObj.method === 'GET') return this.cget(_url, params, apiObj.cache, skipLoader);
			else if(apiObj.method === 'POST') return this.cpost(_url, params, skipLoader);
		} else {
		    if( apiObj.method === 'GET') return this.get(_url, params, apiObj.cache, skipLoader);
		    else if(apiObj.method === 'POST') return this.post(_url, params, skipLoader);
		}
    };

    self.get = function(url, params, cache, skipLoader) {
        var deferred = $q.defer();

		(!skipLoader)&&Loader.show();

        var req = {
            method: 'GET',
            url: url,
            cache: cache,
            timeout: CONST.TIMEOUT,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            params: params
        };

        var _msg_err = (CONST.APP_MODE === 'development') ? url : '';
        $http(req).then(function(rep) {
            (!skipLoader)&&Loader.hide();
	        deferred.resolve(rep.data.resultObject);
        }, function(err) {
            (!skipLoader)&&Loader.hide();
            if(err.data != null){
                if(err.data.StatusCode === -29) {
				deferred.resolve(rep.data);
                } else if(err.data.StatusCode === 401) {
                    self.endSession();
                    deferred.reject(err.data.description);
                } else 
                    deferred.reject(err.data.description);
            // Popup.e(_msg_err + 'Lỗi kết nối');
            } else 
                deferred.reject(err);
        });

        return deferred.promise;
    };

	self.cget = function(url, params, cache, skipLoader) {
        (!skipLoader)&&Loader.show();
        var deferred = $q.defer();

        CordovaHttpPlugin.get(url, params, {}, function(rep) {
            (!skipLoader)&&Loader.hide();
            // check is auth api
            rep.data = JSON.parse(rep.data);
            if(rep.data.StatusCode === 0) {
	            if( url.indexOf('getTokenDVC') !== -1 )
	                deferred.resolve(rep.data);
	            else deferred.resolve(rep.data.Data);
            } else if(rep.data.StatusCode === -29) {
				deferred.resolve(rep.data);
			} else if(rep.data.StatusCode === 401) {
                self.endSession();
                if( url.indexOf('getTokenDVC') !== -1 )
                    deferred.reject(rep.data.Content);
                else
                    deferred.reject(rep.data.description);
            } else deferred.reject(rep.data.description);
        }, function(err) {
            (!skipLoader)&&Loader.hide();
            rep.data = JSON.parse(err.error);
			deferred.reject(err.error.Message);
        });

        return deferred.promise;
    };

    self.post = function(url, params, skipLoader) {
        var deferred = $q.defer();
        (!skipLoader)&&Loader.show();

        // DEMO MODE
        if (CONST.MODE === 'demo') {
            deferred.resolve('successfull demo');
            return deferred.promise;
        }
        // END DEMO MODE

        var req = {
            method: 'POST',
            url: url,
            timeout: CONST.TIMEOUT,
            cache: false,
            // dataType: 'json',
            // processData: false, // Don't process the files
            // contentType: "application/json", // Set content type to false as jQuery
            // headers: {
            //     'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            // },
            data: params
        };

		if(
			// url.indexOf('postNoiDungXuLy') !== -1 ||
            url.indexOf('UploadFiles') !== -1
            // url.indexOf('postKhongPheDuyet') !== -1
        ) {
			req.headers = {
                // 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                // 'Content-type': 'application/json; charset=utf-8'
                // 'Content-type': 'multipart/form-data'
                'Content-Type': undefined
            }
        } else req.headers = {}

        $http(req).then(function(rep) {
            // console.log(data.data);
			(!skipLoader)&&Loader.hide();
            if(rep.data.StatusCode === 0 || rep.data.StatusCode === 200)
                deferred.resolve(rep.data.resultObject);
             else 
                deferred.reject(rep.data.description);
        }, function(err) {
			(!skipLoader)&&Loader.hide();
            // Popup.e(_msg_err + 'Lỗi kết nối');
            if(err.data != null) {
                deferred.reject(err.data.description);
            } else
                deferred.reject(err);
        });

        return deferred.promise;
    };

	self.cpost = function(url, params, skipLoader) {
        var deferred = $q.defer();
        (!skipLoader)&&Loader.show();

        // DEMO MODE
        if (CONST.MODE === 'demo') {
            deferred.resolve('successfull demo');
            return deferred.promise;
        }
        // END DEMO MODE

		// if(url.indexOf('UploadFiles') !== -1) {
		// 	CordovaHttpPlugin.setHeader('Content-Type', 'multipart/form-data');
        // }
         // else CordovaHttpPlugin.setHeader('Content-Type', 'application/json; charset=utf-8');

        // var _msg_err = (CONST.APP_MODE === 'development') ? url : '';
        CordovaHttpPlugin.post(url, params, {}, function(rep) {
			(!skipLoader)&&Loader.hide();
            rep.data = JSON.parse(rep.data);
            if(rep.data.StatusCode === 0 || rep.data.StatusCode === 200)
                deferred.resolve(rep.data.resultObject);
            else if(rep.data.StatusCode === 401) {
                self.endSession();
                deferred.reject(rep.data.description);
            } else deferred.reject(rep.data.description);
        }, function(err) {
			(!skipLoader)&&Loader.hide();
            // Popup.e(_msg_err + 'Lỗi kết nối');
            rep.data = JSON.parse(err.error);
			deferred.reject(err.error.Message);
		});

        return deferred.promise;
    };

    self.endSession = function() {
        $rootScope.user = null;

		self.setHeader('Authorization', undefined);

		$timeout(function () {
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			// $rootScope.isShowFAB = false;
		}, 1000);

		$ionicHistory.nextViewOptions({ historyRoot: true});
		$state.go('app.home', {location: 'replace'});
    };


    return self;
}


})();
