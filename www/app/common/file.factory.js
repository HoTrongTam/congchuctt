angular
  .module('FTravel.factory')
  .factory('File', fileFtr);

fileFtr.$inject = [
  '$cordovaFile', '$q', '$sce', '$http',
  'CONST', 'Loader', 'API', 'API_CONST'
];

function fileFtr(
  $cordovaFile, $q, $sce, $http,
  CONST, Loader, API, API_CONST
) {
  var self = this;
  self.directoryPath = '';
  self.PATH = '';
  self.fileSystem = null;
  self.cdr = null;
  /*
   * Get file path on device
   */
  self.base64toBlob = function (base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);


      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {
      type: contentType
    });
  }

  self.getFileMIMEType = function (filename) {
    // var extension = (filename.split('.')[1]);
    var extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
    var mimeType = '';
    switch (extension) {
      case 'ecma':
        {
          mimeType = 'application/ecmascript';
          break;
        }
      case 'emma':
        {
          mimeType = 'application/emma+xml';
          break;
        }
      case 'epub':
        {
          mimeType = 'application/epub+zip';
          break;
        }
      case 'woff':
        {
          mimeType = 'application/font-woff';
          break;
        }
      case 'jar':
        {
          mimeType = 'application/java-archive';
          break;
        }
      case 'js':
        {
          mimeType = 'application/javascript';
          break;
        }
      case 'json':
        {
          mimeType = 'application/json';
          break;
        }
      case 'jsonml':
        {
          mimeType = 'application/jsonml+json';
          break;
        }
      case 'mp4s':
        {
          mimeType = 'application/mp4';
          break;
        }
      case 'dot':
      case 'doc':
        {
          mimeType = 'application/msword';
          break;
        }
      case 'ogx':
        {
          mimeType = 'application/ogg';
          break;
        }
      case 'onetoc':
      case 'onetoc2':
      case 'onetmp':
      case 'onepkg':
        {
          mimeType = 'application/onenote';
          break;
        }
      case 'pdf':
        {
          mimeType = 'application/pdf';
          break;
        }
      case 'rss':
        {
          mimeType = 'application/rss+xml';
          break;
        }
      case 'rtf':
        {
          mimeType = 'application/rtf';
          break;
        }
      case 'apk':
        {
          mimeType = 'application/vnd.android.package-archive';
          break;
        }
      case 'm3u8':
        {
          mimeType = 'application/vnd.apple.mpegurl';
          break;
        }
      case 'xls':
      case 'xlm':
      case 'xla':
      case 'xlc':
      case 'xlt':
      case 'xlw':
        {
          mimeType = 'application/vnd.ms-excel';
          break;
        }
      case 'xlsx':
        {
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        }
      case 'xltx':
        {
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.template';
          break;
        }
      case 'eot':
        {
          mimeType = 'application/vnd.ms-fontobject';
          break;
        }
      case 'chm':
        {
          mimeType = 'application/vnd.ms-htmlhelp';
          break;
        }
      case 'ppt':
      case 'pps':
      case 'pot':
        {
          mimeType = 'application/vnd.ms-powerpoint';
          break;
        }
      case 'mpp':
      case 'mpt':
        {
          mimeType = 'application/vnd.ms-project';
          break;
        }
      case 'wps':
      case 'wks':
      case 'wcm':
      case 'wdb':
        {
          mimeType = 'application/vnd.ms-works';
          break;
        }
      case 'docx':
        {
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        }
      case 'dotx':
        {
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.template';
          break;
        }
      case 'm4a':
      case 'mp4a':
        {
          mimeType = 'audio/mp4';
          break;
        }
      case 'mpga':
      case 'mp2':
      case 'mp2a':
      case 'mp3':
      case 'm2a':
      case 'm3a':
        {
          mimeType = 'audio/mpeg';
          break;
        }
      case 'oga':
      case 'ogg':
      case 'spx':
        {
          mimeType = 'audio/ogg';
          break;
        }
      case 'wav':
        {
          mimeType = 'audio/x-wav';
          break;
        }
      case 'gif':
        {
          mimeType = 'image/gif';
          break;
        }
      case 'jpeg':
      case 'jpg':
      case 'jpe':
        {
          mimeType = 'image/jpeg';
          break;
        }
      case 'png':
        {
          mimeType = 'image/png';
          break;
        }
      case 'svg':
      case 'svgz':
        {
          mimeType = 'image/svg+xml';
          break;
        }
      case 'ico':
        {
          mimeType = 'image/x-icon';
          break;
        }
      case 'css':
        {
          mimeType = 'text/css';
          break;
        }
      case 'csv':
        {
          mimeType = 'text/csv';
          break;
        }
      case 'html':
      case 'htm':
        {
          mimeType = 'text/html';
          break;
        }
      case 'txt':
      case 'text':
      case 'conf':
      case 'def':
      case 'list':
      case 'log':
      case 'in':
        {
          mimeType = 'text/plain';
          break;
        }
      case 'rtx':
        {
          mimeType = 'text/richtext';
          break;
        }
    }
    return mimeType;
  }
  self.getFilePath = function () {
    function errorHandle(err) {
      console.log(JSON.stringify(err));
    };

    function successHandle(fileSystem) {
      self.fileSystem = fileSystem;
      if (ionic.Platform.isAndroid()) {
        self.PATH = fileSystem;
      } else self.PATH = fileSystem.root;
      self.PATH.getDirectory(CONST.ANDROID_PACKAGE_NAME, {
        create: true,
        exclusive: false
      }, onGetDirectorySuccess, onGetDirectoryFail);
    }

    function onGetDirectorySuccess(dir) {
      // dir.getDirectory("Sample_App", {create: true, exclusive: false}, onGetDirectorySuccess1, onGetDirectoryFail);
      // self.PATH = dir;
      self.cdr = dir;
      self.directoryPath = self.cdr.nativeURL;
    };

    function onGetDirectoryFail(err) {
      console.log(JSON.stringify(err));
      alert("onGetDirectoryFail");
    };

    if (ionic.Platform.isAndroid()) {
      window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, successHandle, errorHandle);
    } else {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, successHandle, errorHandle);
    }

    return;

    requestFileSystem(
      LocalFileSystem.PERSISTENT,
      7 * 1024 * 1024,
      function (fs) {
        self.fileSystem = fs;
        if (ionic.Platform.isIOS()) {
          self.directoryPath = 'cdvfile://localhost/persistent/';
          self.PATH = fs.root;
          console.log('----- directoryPath: ');
          console.log(self.directoryPath);

          // success();
          return;
        }
        self.fileSystem.root.getDirectory(
          CONST.ANDROID_PACKAGE_NAME, {
            create: true
          },
          function (path) {
            self.directoryPath = path.nativeURL;
            self.PATH = path;
            console.log('----- directoryPath: ');
            console.log(self.directoryPath);
          },
          function (err) {
            console.log("----- ERROR getDirectory");
          }
        );
      },
      function (e) { }
    );
  },

    self.delete = function (url, callback) {
      var file_name = url.split('/').pop() || '';

      if (file_name !== '') {
        if (ionic.Platform.isIOS())
          $cordovaFile.removeFile(cordova.file.documentsDirectory, file_name)
            .then(function (re) {
              if (re.success) callback(true, 'remove file: ' + file_name + ' SUCCESSFULL', null);
              else callback(false, 'remove file: ' + file_name + ' FAIL', null);
            }, function (err) {
              callback(false, 'remove file: ' + file_name + ' FAIL', null);
            });
        if (ionic.Platform.isAndroid())
          $cordovaFile.removeFile(cordova.file.applicationStorageDirectory, file_name)
            .then(function (re) {
              if (re.success) callback(true, 'remove file: ' + file_name + ' SUCCESSFULL', null);
              else callback(false, 'remove file: ' + file_name + ' FAIL', null);
            }, function (err) {
              callback(false, 'remove file: ' + file_name + ' FAIL', null);
            });
      }
      // else _log.info('[FileUtils] unknow url: ' + url);
    };

  self.del = function (directory, file_name, callback) {
    if (file_name !== '') {
      $cordovaFile.removeFile(directory, file_name)
        .then(function (re) {
          if (re.success) callback(1, 'remove file: ' + file_name + ' SUCCESSFULL', null);
          else callback(0, 'remove file: ' + file_name + ' FAIL', null);
        }, function (err) {
          callback(0, 'remove file: ' + file_name + ' FAIL', null);
        });
    }
  };

  self.copy = function (url, isMove, callback) {
    var file_name = url.split('/').pop() || '';
    var file_name_cache = +moment() + file_name;

    if (file_name !== '') {
      if (ionic.Platform.isIOS()) {
        $cordovaFile.moveFile(cordova.file.tempDirectory, file_name, cordova.file.documentsDirectory, file_name_cache)
          .then(function (re) {
            callback(true, 'move file SUCCESSFULL', re.nativeURL);
          }, function (error) {
            callback(false, 'move file FAIL', null);
          });
      }

      if (ionic.Platform.isAndroid())
        $cordovaFile.moveFile(cordova.file.externalCacheDirectory, file_name, cordova.file.applicationStorageDirectory, file_name_cache)
          .then(function (re) {
            callback(true, 'move file success', re.nativeURL);
          }, function (error) {
            callback(false, 'move file fail', null);
          });
    }
    // else _log.info('[FileUtils] unknow url: ' + url);
  };

  self.listOfFolder = function (directory, callback) {
    function listDir(path) {
      window.resolveLocalFileSystemURL(path,
        function (fileSystem) {
          var reader = fileSystem.createReader();
          reader.readEntries(
            function (entries) {
              // console.log(entries);
              callback(entries);
            },
            function (err) {
              callback(err);
            }
          );
        },
        function (err) {
          callback(err);
        }
      );
    }
    listDir(directory);
  };
  self.getFileObj = function (url, callback) {
    var getFileBlob = function (url, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.addEventListener('load', function () {
        cb(xhr.response);
      });
      xhr.send();
    };
    getFileBlob(url, callback);
  };
  self.getFileType = function (fileName) {
    var fileType = fileName.substr(fileName.lastIndexOf('.'), fileName.length);
    var fileData = null;

    if ((fileType == ".doc") || (fileType == ".docx")) {
      fileData = "application/msword";
    } else if ((fileType == ".pdf")) {
      fileData = "application/pdf";
    } else if ((fileType == ".ppt") || (fileType == ".pptx")) {
      fileData = "application/vnd.ms-powerpoint";
    } else if ((fileType == ".xls") || (fileType == ".xlsx")) {
      fileData = "application/vnd.ms-excel";
    } else if ((fileType == ".rtf")) {
      fileData = "application/rtf";
    } else if ((fileType == ".wav")) {
      fileData = "audio/x-wav";
    } else if ((fileType == ".gif")) {
      fileData = "image/gif";
    } else if ((fileType == ".jpg") || (fileType == ".jpeg") || (fileType == ".png")) {
      fileData = "image/jpeg";
    } else if ((fileType == ".txt")) {
      fileData = "text/plain";
    } else if ((fileType == ".mpg") || (fileType == ".mpeg") || (fileType == ".mpe") || (fileType == ".mp4") || (fileType == ".avi") || (fileType == ".m4v")) {
      fileData = "video/*";
    } else {
      fileData = "*/*";
    }
    return fileData;
  };
  self.checkExist = function (fileName) {
    var deferred = $q.defer();

    var _opt = {
      create: false,
      exclusive: false
    };
    // var _android_path = 'Android/data/' + CONST.ANDROID_PACKAGE_NAME + '/';

    self.cdr.getFile(fileName, _opt, successHandle, errorHandle);

    // if (ionic.Platform.isIOS()) {
    //     self.fileSystem.root.getFile(fileName, _opt, successHandle, errorHandle);
    // } else if (ionic.Platform.isAndroid()) {
    //     self.fileSystem.root.getFile(_android_path + fileName, _opt, successHandle, errorHandle);
    // }

    function successHandle(entry) {
      deferred.resolve(entry);
    }

    function errorHandle(err) {
      deferred.reject(err);
    }

    return deferred.promise;
  };

  self.open2 = function (url, fileName) {
    Loader.show();

    self.checkExist(fileName).then(function (entry) {
      self._open(entry.nativeURL, fileName);
      Loader.hide();
    }, function (err) {
      self.download(url, fileName).then(function (rep) {
        self._open(rep.nativeURL, fileName);
        Loader.hide();
      }, function (err) {
        alert('Không thể tải được file ' + fileName);
        Loader.hide();
      },
        false, {
          headers: {
            'Authorization': API.getToken()
          }
        });
    });
  };

  self._open = function (filePath, fileName) {
    var fileType = self.getFileType(fileName);

    var tempFilePath = decodeURI(filePath);

    console.log(tempFilePath);

    cordova.plugins.fileOpener2.open(
      tempFilePath,
      // 'cdvfile://localhost/persistent/'+fileName,
      // 'cdvfile://localhost/persistent/Download/' + fileName,
      fileType, {
        error: function (errorObj) {
          console.log('Error status: ' + errorObj.status + ' - Error message: ' + errorObj.message);
        },
        success: function () {
          console.log('file opened successfully');
        }
      }
    );
  };

  self.removeDirectory = function () {
    // function clearDirectory() {
    if (ionic.Platform.isAndroid()) {
      window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, onFileSystemDirSuccess, fail);
    } else {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemDirSuccess, fail);
    }

    function onFileSystemDirSuccess(fileSystem) {
      var entry = "";
      if (ionic.Platform.isAndroid()) {
        entry = fileSystem;
      } else {
        entry = fileSystem.root;
      }
      entry.getDirectory(CONST.ANDROID_PACKAGE_NAME, {
        create: true,
        exclusive: false
      },
        function (entry) {
          entry.removeRecursively(function () {
            console.log("Remove Recursively Succeeded");
          }, fail);
        }, getDirFail);
    }

    function getDirFail(error) {
      navigator.notification.alert("Error");
    };

    function fail(error) {
      navigator.notification.alert("Error");
    };

  };

  self.download2 = function (params) {
    API.call(API_CONST.master.downFile, params);
  };
  /*
   * Download file form url string and save to local device
   */
  self.download = function (url, fileName) {
    var deferred = $q.defer();

    // var fileName = url.substr(url.lastIndexOf('/') + 1);
    // var deviceType = this.getDeviceType();
    var localPath = self.directoryPath + fileName;

    var ft = new FileTransfer();
    ft.download(url, localPath,
      function (entry) {
        deferred.resolve(entry);
      },
      function (err) {
        deferred.reject(err);
      },
      false, {
        headers: {
          "Authorization": API.getToken()
        }
      }
    );

    return deferred.promise;
  };

  self.upload = function (url, directory, callback) {
    var file_name = url.split('/').pop() || '';

    this.getFileObj(url, function (blob) {
      var metadata = {
        'contentType': "text/plain"
      };
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef.child(directory + file_name).put(blob, metadata);

      uploadTask.on('state_changed', null, function (error) {
        console.error('Upload failed:', error);
        callback(0, error);
      }, function () {
        callback(1, 'Uploaded: ' + uploadTask.snapshot.totalBytes, 'bytes.');
        console.log('Uploaded', uploadTask.snapshot.totalBytes, 'bytes.');
      });
    });
  };

  self.image2base64 = function (url, outputFormat, callback, useCanvas) {
    console.log(url);

    if (useCanvas !== undefined && useCanvas) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = function () {
        var canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d');
        var dataURL;
        // 	callback($base64.encode(url));
        window.resolveLocalFileSystemURL(url,
          // success callback; generates the FileEntry object needed to convert to Base64 string
          function (fileEntry) {
            // convert to Base64 string
            function win(file) {
              var reader = new FileReader();
              reader.onload = function (evt) {
                // var obj = evt.target.result; // this is your Base64 string
                callback(evt.target.result);
              };
              reader.readAsDataURL(file);
            }
            var fail = function (evt) {
              callback('');
            };
            fileEntry.file(win, fail);
          },
          // error callback
          function () {
            callback('');
          }
        );
      }
    };
  }
  self.readFile = function (url) {
    //self.ReadFilePdf=function(){
    var deferred = $q.defer();
    var parts = url.split('.');
    if (parts.length == 0) {
      deferred.reject('File khong dung dinh dang')
    }
    var part = parts[parts.length - 1];
    switch (part.toLowerCase()) {
      case 'png':
        deferred.resolve({
          contentUrl: url,
          fileType: part.toLowerCase()
        });
        break
      case 'pdf':
        $http.get(url, {
          responseType: 'arraybuffer'
        })
          .success(function (data) {
            var file = new Blob([data], {
              type: 'application/pdf'
            });
            var fileURL = URL.createObjectURL(file);
            deferred.resolve({
              contentUrl: $sce.trustAsResourceUrl(fileURL),
              fileType: part.toLowerCase()
            });
          });
        break;
      case 'doc':
        $http.get(url, {
          responseType: 'arraybuffer'
        })
          .success(function (data) {
            var file = new Blob([data], {
              type: 'application/msword'
            });
            var fileURL = URL.createObjectURL(file);
            deferred.resolve({
              contentUrl: $sce.trustAsResourceUrl(fileURL),
              fileType: part.toLowerCase()
            });
          });
        break;
      case 'docx':
        $http.get(url, {
          responseType: 'arraybuffer'
        })
          .success(function (data) {
            var file = new Blob([data], {
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });
            var fileURL = URL.createObjectURL(file);
            deferred.resolve({
              contentUrl: $sce.trustAsResourceUrl(fileURL),
              fileType: part.toLowerCase()
            });
          });
        break;
      default:
        deferred.reject('File khong dung dinh dang');
        return deferred.promise;
    }
  };
  return self;
}
