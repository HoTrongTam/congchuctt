/*
* Native function factory
* @2017
*/


angular
	.module('FTravel.factory')
	.factory('Native', nativeFtr)
;

nativeFtr.$inject = [
	'$q', '$cordovaCamera', '$cordovaGeolocation','$cordovaImagePicker',
	'File', 'Popup'
];

function nativeFtr(
	$q, $cordovaCamera, $cordovaGeolocation,$cordovaImagePicker,
	File, Popup
) {
	var self = this;

	self.getPicture = function (fileUrl, quality) {
		var _W, _H;

		if(quality) {
			_W = (320*quality > 700) ? 700 : 320*quality;
			_H = (480*quality > 1020) ? 1020 : 480*quality;
		} else {
			_W = 1000;
			_H = 1000;
		}

		var options = {
			quality: 100,
			destinationType: (fileUrl) ? Camera.DestinationType.FILE_URI : Camera.DestinationType.DATA_URL,
			//sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: _W,
			targetHeight: _H,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};
		return $cordovaCamera.getPicture(options);
	};

	/*
	*	fileType: file url or base64
	*	quality: float number
	*	isCache: store file to document, file will not delete when close app (dev must del manual)
	*	edit: true / false
	*/
	self.takePicture = function(opt, callback) {
		var diagnostic = cordova.plugins.diagnostic;

		diagnostic.getCameraAuthorizationStatus(function(cameraMode){
			if(
				cameraMode === diagnostic.permissionStatus.GRANTED ||
				cameraMode === diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
			) {
				var _W, _H;
				// var opt = {
				// 	fileType: file,
				// 	quality: quality,
				// 	isCache: true
				// };
				if(opt.quality) {
					_W = (320*opt.quality > 1280) ? 1280 : 320*opt.quality;
					_H = (480*opt.quality > 1920) ? 1920 : 480*opt.quality;
				} else {
					_W = 600;
					_H = 600;
				}

				var options = {
					quality: (opt.compress) ? opt.compress : 80,
					destinationType: (opt.fileType === 'file') ? Camera.DestinationType.FILE_URI : Camera.DestinationType.DATA_URL,
					//sourceType: Camera.PictureSourceType.CAMERA,
					allowEdit: (opt.edit) ? true : false,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: _W,
					targetHeight: _H,
					saveToPhotoAlbum: false,
					correctOrientation: false
				};

				$cordovaCamera.getPicture(options).then(function(imgData) {
					if (callback && typeof(callback) === 'function') {
						if(opt.fileType && opt.isCache)
							File.copy(imgData, true, callback);
						else
							callback(1, '', imgData);
					} else _log.info('unknow callback');
				}, function(err) {
					if (callback && typeof(callback) === 'function') {
						callback(-1, 'Chụp hình có lỗi', null);
					} else _log.info('unknow callback');
				});
			} else if( cameraMode === diagnostic.permissionStatus.NOT_REQUESTED) {
				diagnostic.requestCameraAuthorization(function(stt){}, function(err){});
			} else if( cameraMode === diagnostic.permissionStatus.DENIED ){
				Popup.c('Bấm xác nhận để cấp quyền sử dụng camera', function(ok) {
					if(ok) diagnostic.switchToSettings(function(stt){}, function(err){});
				});
			}
		}, function(err) {});
	};

	self.getImgageFromGalary = function(options) {
		var deferred = $q.defer();
		if(options==undefined){
			options = {
				quality: 100,
				maximumImagesCount:1,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 100,
				targetHeight: 100,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};
		}

		$cordovaImagePicker.getPictures(options)
			.then(function(results) {
				if(results.length>0){
					deferred.resolve(results);
				}
			}, function(error) {});
		return deferred.promise;
	}

	self.scanBarcode = function(options) {
		var deferred = $q.defer();
		var opts = {
			preferFrontCamera : true, // iOS and Android
			showFlipCameraButton : true, // iOS and Android
			showTorchButton : true, // iOS and Android
			torchOn: true, // Android, launch with the torch switched on (if available)
			prompt : "", // Android
			resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
			orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
			disableAnimations : true, // iOS
			disableSuccessBeep: false // iOS
		};
		var diagnostic = cordova.plugins.diagnostic;

		// check camera permission
		diagnostic.getCameraAuthorizationStatus(function(cameraMode){
			if(
				cameraMode === diagnostic.permissionStatus.GRANTED ||
				cameraMode === diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
			) {

				cordova.plugins.barcodeScanner.scan(
			      function (re) {
					  deferred.resolve(re.text);
			        //   alert("We got a barcode\n" +
			        //         "Result: " + result.text + "\n" +
			        //         "Format: " + result.format + "\n" +
			        //         "Cancelled: " + result.cancelled);
			      }, function (err) {
					  deferred.reject(err);
			        //   alert("Scanning failed: " + error);
			      }, opts
			   );

			} else if( cameraMode === diagnostic.permissionStatus.NOT_REQUESTED ){
				diagnostic.requestCameraAuthorization(function(stt){}, function(err){});
			} else if( cameraMode === diagnostic.permissionStatus.DENIED ) {
				Popup.c('Bấm xác nhận để cấp quyền sử dụng camera', function(ok) {
					if(ok) diagnostic.switchToSettings(function(stt){}, function(err){});
				});
			}
		}, function(err) {});

		return deferred.promise;
	};

	self.geolocation = function(callback) {
		var self = this;
		var geoOptions = {timeout: 10000, enableHighAccuracy: false};
		var info = {};
		var diagnostic = cordova.plugins.diagnostic;

		diagnostic.getLocationAuthorizationStatus(function(locationMode) {
			// {NOT_REQUESTED: "not_determined", DENIED: "denied", RESTRICTED: "restricted", GRANTED: "authorized", GRANTED_WHEN_IN_USE: "authorized_when_in_use"}
	        if(
				locationMode === diagnostic.permissionStatus.GRANTED ||
				locationMode === diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
			) {
				$cordovaGeolocation.getCurrentPosition(geoOptions).then(function(position) {
					info.lat = position.coords.latitude;
					info.long = position.coords.longitude;
					// CONFIG.location_curr.long = position.coords.longitude;
					// CONFIG.location_curr.lat = position.coords.latitude;
					if (callback && typeof(callback) === 'function')
						callback(1, info);
				}, function() {
					callback(0, {});
				});
			} else if( locationMode === diagnostic.permissionStatus.NOT_REQUESTED ) {
				diagnostic.requestLocationAuthorization(function(status) {
				}, function(err){}, diagnostic.permissionStatus.GRANTED_WHEN_IN_USE);
			} else callback(0, {});
		},function(err) {
		    callback(0, {});
		});
	};
	self.chooseFile = function(fileExt) {

		var deferred = $q.defer();

		if (ionic.Platform.isIOS()) {

			FilePicker.pickFile(
				function(uri) {
					deferred.resolve(uri);
				},
				function(error) {
					deferred.resolve(false);
				}
			);
		} else {
			fileChooser.open(
				function(uri) {
					//deferred.resolve(uri);
					window.FilePath.resolveNativePath(uri, function(localFileUri) {
									 if(localFileUri!= 'undefined' && localFileUri!="" )
									 {
											 deferred.resolve(localFileUri);
									 }else{
											 deferred.reject('URI NOT Resulted to any File in system');
									 }
							 });

				},
				function(error) {
					deferred.resolve(false);
				}
			);
		}
		return deferred.promise;
	}

	return self;
}
