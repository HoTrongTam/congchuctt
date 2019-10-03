/*
 * RestAPI controller
 * @2017
 */

(function () {
  'use strict';


  angular
    .module('FTravel.api', [])
    .factory('API', rectAPI);

  rectAPI.$inject = [
    '$q', '$rootScope', '$http', '$timeout', '$ionicHistory',
    'CONST', 'envService', '$state', 'Loader'
  ];

  function rectAPI(
    $q, $rootScope, $http, $timeout, $ionicHistory,
    CONST, envService, $state, Loader
  ) {
    var self = this;
    self.base = CONST.BASE_DEV;
    self.baseDGHL = CONST.BASE_DGHL;
    self.token = '';
    self.baselogin = CONST.BASE_LOGIN;
    self.basecc = CONST.BASE_MOBILECC;

    self.getToken = function (url) {
      return self.token;
    };

    self.setBase = function (url) {
      self.base = url;
    };

    self.setHeader = function (key, token) {
      if (CONST.IS_DEVICE && ionic.Platform.isIOS())
        CordovaHttpPlugin.setHeader(key, token);

      $http.defaults.headers.common[key] = token;

      // (CONST.IS_DEVICE && ionic.Platform.isIOS()) ? CordovaHttpPlugin.setHeader(key, token)
      // : $http.defaults.headers.common[key] = token;
      self.token = token;
    };

    self.call = function (apiObj, params, skipLoader) {
      if (CONST.MODE === 'demo') {
        var deferred = $q.defer();
        $http.get(apiObj.json).success(function (data) {
          deferred.resolve(data.data);
        }, function (err) {
          deferred.reject(apiObj.json + ' not found!');
        });
        return deferred.promise;
      }
      // END DEMO MODE

      var _url = (apiObj.base || self.base) + apiObj.service + apiObj.functionUrl;

      if (CONST.IS_DEVICE && ionic.Platform.isIOS() && (apiObj.functionUrl.indexOf('UploadFiles') === -1)) {
        // if (CONST.IS_DEVICE && ionic.Platform.isIOS()) {
        if (apiObj.method === 'GET') return this.cget(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') return this.cpost(_url, params, skipLoader);
      } else {
        if (apiObj.method === 'GET') return this.get(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') {
          var a = this.post(_url, params);
          return a;
        }
      }
    };
    //function chạy document service word
    self.callcc = function (apiObj, params, skipLoader) {

      if (CONST.MODE === 'demo') {
        var deferred = $q.defer();
        $http.get(apiObj.json).success(function (data) {
          deferred.resolve(data.data);
        }, function (err) {
          deferred.reject(apiObj.json + ' not found!');
        });
        return deferred.promise;
      }
      // END DEMO MODE

      var _url = (apiObj.basecc || self.basecc) + apiObj.service + apiObj.functionUrl;

      if (CONST.IS_DEVICE && ionic.Platform.isIOS() && (apiObj.functionUrl.indexOf('UploadFiles') === -1)) {
        // if (CONST.IS_DEVICE && ionic.Platform.isIOS()) {
        if (apiObj.method === 'GET') return this.cget(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') return this.cpost(_url, params, skipLoader);
      } else {
        if (apiObj.method === 'GET') return this.get(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') {
          var a = this.mcpost(_url, params);
          return a;
        }
      }
    };
    self.dget = function(url, params, cache, skipLoader) {
      ionic.Platform.ready(function(){
        var deferred = $q.defer();

        var targetPath = cordova.file.externalDataDirectory;
        if(ionic.Platform.isIOS()){
            targetPath = cordova.file.documentsDirectory;
        }else if(ionic.Platform.isAndroid()){
            if(cordova.file.externalDataDirectory == null){
              targetPath = cordova.file.dataDirectory;
            }
        }
        // var targetPath = cordova.file.externalApplicationStorageDirectory;
        var trustHosts = true;
        var options = {};
        url = url + "?object=" + params.object;
        var DBuri = encodeURI(url);

        $cordovaFileTransfer.download(DBuri, targetPath, options, trustHosts).then(
          function(fileEntry) {
            var jsFileObject;
            fileEntry.file(function (file){
               jsFileObject = file
            });
            deferred.resolve(jsFileObject);
            Popup.t("Tải về thành công");
          }, function(error) {
            deferred.reject(error);
            Popup.t("Tải xuống thất bại");
          }, function (progress) {
            //$timeout(function () {
            //  $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            //})
          });

        return deferred.promise;
      });
    };
    self.callDGHL = function (apiObj, params, skipLoader) {

      var _url = (apiObj.baseDGHL || self.baseDGHL) + apiObj.service + apiObj.functionUrl;

      if (CONST.IS_DEVICE && ionic.Platform.isIOS() && (apiObj.functionUrl.indexOf('UploadFiles') === -1)) {
        // if (CONST.IS_DEVICE && ionic.Platform.isIOS()) {
        if (apiObj.method === 'GET') return this.cget(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') return this.postDGHL(_url, params, skipLoader);
      } else {
        if (apiObj.method === 'GET') return this.get(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') {
          var a = this.postDGHL(_url, params, skipLoader);
          return a;
        }
      }
    };
    self.loginn = function (apiObj, params, skipLoader) {
      // DEMO MODE
      if (CONST.MODE === 'demo') {
        var deferred = $q.defer();
        $http.get(apiObj.json).success(function (data) {
          deferred.resolve(data.data);
        }, function (err) {
          deferred.reject(apiObj.json + ' not found!');
        });
        return deferred.promise;
      }
      // END DEMO MODE
      var _url = (apiObj.baselogin || self.baselogin) + apiObj.service + apiObj.functionUrl;

      if (CONST.IS_DEVICE && ionic.Platform.isIOS() && (apiObj.functionUrl.indexOf('UploadFiles') === -1)) {
        // if (CONST.IS_DEVICE && ionic.Platform.isIOS()) {
        if (apiObj.method === 'GET') return this.cget(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') return this.cpost(_url, params, skipLoader);
      } else {
        if (apiObj.method === 'GET') return this.get(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') {
          var a = this.post(_url, params);
          return a;
        }
      }
    };
    self.getInfo = function (apiObj, params) {
      var _url = (apiObj.base || self.base) + apiObj.service + apiObj.functionUrl + params;
      if (CONST.IS_DEVICE && ionic.Platform.isIOS() && (apiObj.functionUrl.indexOf('UploadFiles') === -1)) {
        // if (CONST.IS_DEVICE && ionic.Platform.isIOS()) {
        if (apiObj.method === 'GET') return this.cget(_url, params, apiObj.cache, skipLoader);
        else if (apiObj.method === 'POST') return this.cpost(_url, params, skipLoader);
      } else {
        if (apiObj.method === 'GET') return this.get(_url);
        else if (apiObj.method === 'POST') {
          var a = this.post(_url, params);
          return a;
        }
      }

    }
    self.layDanhbaa = function (apiObj, params) {
      var _url = (self.base) + apiObj.service + apiObj.functionUrl + params;
      return this.get(_url);


    }

    self.get = function (url, params, cache, skipLoader) {
      var deferred = $q.defer();

      (!skipLoader) && Loader.show();

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
      $http(req).then(function (rep) {
        (!skipLoader) && Loader.hide();
        deferred.resolve(rep.data.resultObject);
      }, function (err) {
        (!skipLoader) && Loader.hide();
        if (err.data != null) {
          if (err.data.StatusCode === -29) {
            deferred.resolve(rep.data);
          } else if (err.data.StatusCode === 401) {
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

    self.cget = function (url, params, cache, skipLoader) {
      (!skipLoader) && Loader.show();
      var deferred = $q.defer();
      //cai api do cho nao
      CordovaHttpPlugin.get(url, params, {}, function (rep) {
        (!skipLoader) && Loader.hide();
        // check is auth api
        rep.data = JSON.parse(rep.data);
        if (rep.data.StatusCode === 0) {
          if (url.indexOf('getTokenDVC') !== -1)
            deferred.resolve(rep.data);
          else deferred.resolve(rep.data.Data);
        } else if (rep.data.StatusCode === -29) {
          deferred.resolve(rep.data);
        } else if (rep.data.StatusCode === 401) {
          self.endSession();
          if (url.indexOf('getTokenDVC') !== -1)
            deferred.reject(rep.data.Content);
          else
            deferred.reject(rep.data.description);
        } else deferred.reject(rep.data.description);
      }, function (err) {
        (!skipLoader) && Loader.hide();
        rep.data = JSON.parse(err.error);
        deferred.reject(err.error.Message);
      });

      return deferred.promise;
    };

    self.post = function (url, params, skipLoader) {
      var deferred = $q.defer();
      (!skipLoader) && Loader.show();

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

      if (
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

      $http(req).then(function (rep) {
        // console.log(data.data);
        console.log(rep);
        (!skipLoader) && Loader.hide();
        if (rep.data.StatusCode === 0 || rep.data.StatusCode === 200)
          deferred.resolve(rep.data.resultObject);
        else
          deferred.reject(rep.data.description);
      }, function (err) {
        (!skipLoader) && Loader.hide();
        // Popup.e(_msg_err + 'Lỗi kết nối');
        if (err.data != null) {
          deferred.reject(err.data.description);
        } else
          deferred.reject(err);
      });

      return deferred.promise;
    };
    //Custom post bên 1 cửa
    self.mcpost = function (url, params, skipLoader) {
      var deferred = $q.defer();
      //debugger;
      (!skipLoader) && Loader.show();

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

      if (
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

      $http(req).then(function (rep) {
        // console.log(data.data);
        //debugger;
        (!skipLoader) && Loader.hide();
        if (rep.data.statusCode === 0 || rep.data.statusCode === 200) {
          if (rep.data.resultObject == "SUCCESS" || rep.data.resultObject == "")
            deferred.resolve(rep.data.resultObject);
          else
            deferred.resolve(JSON.parse(rep.data.resultObject));
        } else
          deferred.reject(rep.data.description);
      }, function (err) {
        (!skipLoader) && Loader.hide();
        // Popup.e(_msg_err + 'Lỗi kết nối');
        if (err.data != null) {
          deferred.reject(err.data.description);
        } else
          deferred.reject(err);
      });

      return deferred.promise;
    };
    self.cpost = function (url, params, skipLoader) {
      var deferred = $q.defer();
      (!skipLoader) && Loader.show();

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
      CordovaHttpPlugin.post(url, params, {}, function (rep) {
        (!skipLoader) && Loader.hide();
        rep.data = JSON.parse(rep.data);
        if (rep.data.StatusCode === 0 || rep.data.StatusCode === 200)
          deferred.resolve(rep.data.resultObject);
        else if (rep.data.StatusCode === 401) {
          self.endSession();
          deferred.reject(rep.data.description);
        } else deferred.reject(rep.data.description);
      }, function (err) {
        (!skipLoader) && Loader.hide();
        // Popup.e(_msg_err + 'Lỗi kết nối');
        rep.data = JSON.parse(err.error);
        deferred.reject(err.error.Message);
      });

      return deferred.promise;
    };
    self.postDGHL = function (url, params, skipLoader) {
      var deferred = $q.defer();
      (!skipLoader) && Loader.show();
      console.log('url', url)
      CordovaHttpPlugin.setHeader('HeaderToken', 'qEteAnqs7gdrKpQbdwzAJJSw97254wdfdlf');
      
      CordovaHttpPlugin.post(url, params, {}, function (rep) {
        (!skipLoader) && Loader.hide();
        rep.data = JSON.parse(rep.data);
        if(rep.status == 200 || rep.status == 0){
          deferred.resolve(rep.data);
        }else if(rep.status == 401){
          self.endSession();
          deferred.reject(rep.data.description);
        }else deferred.reject(rep.data.description);
      }, function (err) {
        (!skipLoader) && Loader.hide();
        // Popup.e(_msg_err + 'Lỗi kết nối');
        // rep.data = JSON.parse(err);
        // console.log(err);
        deferred.reject(err);
      });

      return deferred.promise;
    };

    self.endSession = function () {
      $rootScope.user = null;

      self.setHeader('Authorization', undefined);

      $timeout(function () {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        // $rootScope.isShowFAB = false;
      }, 1000);

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('app.home', {
        location: 'replace'
      });
    };


    return self;
  }


})();
