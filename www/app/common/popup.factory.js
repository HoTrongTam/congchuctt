/*
* Popup factory
* @2017
*/


angular
	.module('FTravel.factory')
	.factory('Popup' , popupFtr)
;

popupFtr.$inject = [
	'$ionicPopup', '$rootScope', '$ionicModal', 'IonicClosePopupService', 'ionicToast'
];

function popupFtr(
	$ionicPopup, $rootScope, $ionicModal, IonicClosePopupService, ionicToast
) {
	var self = this;

	self.t = function(msg) {
		ionicToast.show(msg, 'bottom', false, 1500);
	};

	self.a = function(msg) {
		var myPopup = $ionicPopup.alert({
			template: '<div class="item item-clear item-icon-left item-text-wrap"><i class="icon ion-android-done positive"></i><p>' + msg + '</p></div>',
			cssClass: 'popup-nohead',
			buttons: [{
				text: 'Xác nhận',
				type: 'button-positive'
			}]
		});
	};

	self.e = function(msg, callback) {
		var myPopup = $ionicPopup.alert({
			template: '<div class="item item-clear item-icon-left item-text-wrap"><i class="icon ion-close-circled assertive"></i><p>' + msg + '</p></div>',
			cssClass: 'popup-nohead',
			buttons: [{
				text: 'Xác nhận',
				type: 'button-positive'
			}]
		});
		myPopup.then(function (res) {
			if (callback && typeof(callback) === 'function')
				callback(res);
		});
	};

	self.s = function(msg, callback) {
		var myPopup = $ionicPopup.alert({
			template: '<div class="item item-clear item-icon-left item-text-wrap"><i class="icon ion-android-warning balanced"></i><p>' + msg + '</p></div>',
			cssClass: 'popup-nohead',
			buttons: [{
				text: 'Xác nhận',
				type: 'button-positive',
				onTap: function (e) { return true; }
			}]
		});
		myPopup.then(function (res) {
			if (callback && typeof(callback) === 'function')
				callback(res);
		});
	};

	self.w = function(msg, callback) {
		
		var myPopup = $ionicPopup.alert({
			template: '<div class="item item-clear item-icon-left item-text-wrap"><i class="icon ion-android-warning energized"></i><p>' + msg + '</p></div>',
			cssClass: 'popup-nohead',
			buttons: [{
				text: 'Đóng',
				type: 'button-positive'
			}]
		});
		myPopup.then(function (res) {
			if (callback && typeof(callback) === 'function')
				callback(false);
				
		});
	};
	self.c = function(msg, callback) {
		var myPopup = $ionicPopup.confirm({
			template: '<div class="item item-clear item-icon-left item-text-wrap"><i class="icon ion-android-warning energized"></i><p>' + msg + '</p></div>',
			cssClass: 'popup-nohead',
			buttons: [{
				text: 'Huỷ',
				type: 'button-default',
				onTap: function (e) { return false; }
			}, {
				text: 'Xác nhận',
				type: 'button-positive',
				onTap: function (e) { return true; }
			}]
		});
		myPopup.then(function (res) {
			if (callback && typeof(callback) === 'function')
				callback(res);
		});
	};

	self.showContent = function(sco, title, content, isHtml) {
		sco.p_title = title;
		sco.p_content = content;
		sco.p_isHtml = isHtml;

		$ionicModal.fromTemplateUrl('app/common/html-content.modal.html',{
			scope: sco,
			animation:'slide-in-up',
			// controller:'HtmlContentCtrl'
		}).then(function(modal) {
			sco.modal = modal;
			sco.modal.show();
		});

		sco.p_close = function() {
			sco.modal.hide();
		};
	};

	return self;
}
