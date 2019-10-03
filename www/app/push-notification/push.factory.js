
/*
* PushNotification factory
* Auth: ThanhTN
*/

(function() {
'use strict';


angular
	.module('FTravel.push')
	.factory('PushFtr', pushFactory)
;

pushFactory.$inject = [
	'$rootScope',
	'Popup', 'API', 'CONST', 'API_CONST', 'LSFtr'
];

function pushFactory (
	$rootScope,
	Popup, API, CONST, API_CONST, LSFtr
) {
	var self = this;

	self.getTotalNumber = function(params, callback){
		API.call(API_CONST.getTotalNumber, params, callback);
	},

	self.getList = function(params, callback){
		API.call(API_CONST.getPush, params, callback);
	};

	self.getDetail = function(itemId, callback) {
		var token = 'pushnotification';
		var obj = {
			name: API_CONST.getDetailPush.name  + itemId,
			method: API_CONST.getDetailPush.method
		};
		API.call(obj, {/*id: itemId*/}, callback);
	};

	self.setViewed = function(itemId,callback) {
		var obj = {
			name: API_CONST.updatePush.name + itemId,
			method: API_CONST.updatePush.method
		};
		API.call(obj, {viewed: 1}, callback);
	};

	self.markDelete = function(itemId, callback) {
		var obj = {
			name: API_CONST.updatePush.name + itemId,
			method: API_CONST.updatePush.method
		};
		API.call(obj, {isdeleted: 1}, callback);
	};

	// Push notification service
	self.register = function(callback) {
		// var platform = navigator.platform.toLowerCase();
		var platform = device.platform.toLowerCase();
		if(platform && platform !== 'ios' && platform !== 'android') {
			 return;
		}

		var push = PushNotification.init({
		    android: {
		        senderID: CONST.senderID
		    },
		    ios: {
		        alert: "true",
		        badge: "true",
		        sound: "true"
		    },
		    windows: {}
		});

		push.on('registration', function(data) {
		    // data.registrationId
			$rootScope.$emit('PushCtrl.onReceivedToken',{ token: data.registrationId });

			LSFtr.set(CONST.pushTokenTag, {
				token_key: data.registrationId,
				device: device.platform,
				daterequest: +moment()
			});

			callback('success', '', data.registrationId);
		});

		push.on('notification', function(data) {
			if(data.additionalData.foreground) {
				if(!CONST.pnSilence) Popup.alert('PUSH NOTIFICATON', data.message);
			} else {
				if(!CONST.pnSilence) Popup.alert('PUSH NOTIFICATON', data.message);
			}

			$rootScope.$emit('PushCtrl.onReceived',{
				message         : data.message,
				// badageNumber    : data.badge,
				// soundName       : 'default'
			});
		});

		push.on('error', function(e) {
		    // e.message
			// Popup.alert('Error', e.message);
		});
	};

	return self;
}


})();
