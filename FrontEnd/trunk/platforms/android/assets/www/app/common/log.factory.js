/*
* Log factory
* @2017
*/

angular
	.module('FTravel.factory')
	.factory('_log' , logFtr);

	logFtr.$inject = [
		'CONFIG', 'File',
		'$log', '$timeout', '$cordovaFile', '$rootScope'
	];

	function logFtr(
		CONFIG, File,
		$log, $timeout, $cordovaFile, $rootScope
	) {
		var logFtr = {
			start: function(tag) {
				// log service config
				var defaultSettings = {
					logSize: 25600, // Size of files, in bytes
					// logSize: 1600, // Size of files, in bytes
					eventBuffer: 25, // Number of events before write
					debug: (CONFIG.APP_MODE === 'development') ? true : false, // Write debug messages
					console: (CONFIG.APP_MODE === 'development') ? true : false, // Write to JS console with $log
					writeOnPause: false,
					prefix: tag,
					directory: 'dataDirectory',
				};
				// $roll.setConfig(defaultSettings);
				// $roll.start().then(function (success) {
				// 		// It worked and we are started
				// 		$roll.info(success);
				// 		return;
				// 	}, function (error) {
				// 		// Something went wrong... no file saving!
				// 		// But the console should still work.
				// 		$roll.info(error);
				// 		return;
				// 	})
				// 	.finally(function () {
				// 		// No matter if we only have the console or
				// 		// the file system, too, we're going to print
				// 		// some info.
				// 		$roll.info('Device info: ' +
				// 		JSON.stringify(ionic.Platform.device()));
				// 	}
				// );

				var is_uploading = false,
					log_files = [],
					file_entry = '',
					// rgxp = new RegExp($rootScope.user.UserGroupID + '.1_' + '([0-9]*)' + '.txt', "gi")
					rgxp = new RegExp($rootScope.user.UserGroupID + '.1_' + '(.*)' + '.txt', "gi"),
					folder_name = 'logs/' + $rootScope.user.PostOfficeID + '/' + moment().format('YYYY-MM-DD') + '/' +  $rootScope.user.UserGroupID + '/'
				;

				// upload log file to firebase storage, auto check after 10s
				(function loop (i) {
					$timeout(function () {
						if(CONFIG.ONLINE && !is_uploading && log_files.length > 0 ) { // not syncing
							// upload file and remove after uploaded.
							file_entry = log_files.pop();
							if( file_entry.name.match(rgxp) ) {
								is_uploading = true;

								File.upload(file_entry.nativeURL, folder_name, function(ok, msg) {
									is_uploading = false;
									console.info('upload file: ' + msg);
									if(ok) {
										File.del(cordova.file.dataDirectory, file_entry.name, function(ok, msg) {
											if(ok) console.log('remove file success: ' + file_entry.name);
										});
									}
								});
							}
						} else {
							console.info('[_log] is_uploading... / no log file');
							if(log_files.length <= 0)
								File.listOfFolder(cordova.file.dataDirectory, function(files){
									log_files = files || [];
									console.log( JSON.stringify(log_files)+' '+log_files.length+'(file)' );
								});
						}

						loop(i);
					}, 30000);
				})(9999);
			},

			info: function (title, data) {
				// var ts = (new Date()).getTime();
				// var _tag = CONFIG.tag + '(' + CONFIG.VERSION + ')';

				// $roll.log(CONFIG.tag + ': ' + title);
				// if (data)
				// $roll.log(data);
			},
			i: function (msg) {
				// $roll.info(msg);
				console.log(CONFIG.tag + ': ' + msg);
			},
			e: function (msg) {
				// $roll.error(msg);
			},
			d: function(msg){
				// $roll.debug(msg);
			}
		};

		return logFtr;
	}
