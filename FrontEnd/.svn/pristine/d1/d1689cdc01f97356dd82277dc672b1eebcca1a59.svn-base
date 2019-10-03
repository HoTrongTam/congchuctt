/*
 * Common factory
 * @2017
 */


(function() {
'use strict';


angular
    .module('FTravel.factory')
    .service('IonicClosePopupService', ionicClosePopupService)
    .service('MainFtr', mainFtr)
    .service('LSFtr', lsFtr)
    .service('UtilsFtr', utilsFtr)
;

/*********************************
	ionicClosePopupService
*/
ionicClosePopupService.$inject = [];

function ionicClosePopupService() {
    var currentPopup;
    var htmlEl = angular.element(document.querySelector('html'));
    htmlEl.on('click', function(event) {
        if (event.target.nodeName === 'HTML') {
            if (currentPopup) {
                currentPopup.close();
            }
        }
    });

    this.register = function(popup) {
        currentPopup = popup;
    };
};

/*********************************
	mainFtr
*/
mainFtr.$inject = [
    '$q', '$rootScope', '$ionicPopup', '$http', '$state',
    'CONST', 'API_CONST', 'API'
];

function mainFtr(
    $q, $rootScope, $ionicPopup, $http, $state,
    CONST, API_CONST, API
) {
    var self = this;

	self.isTablet = function() {
		if(window.orientation % 180 === 0 || ionic.Platform.isIOS()) {
			return screen.width >= 534;
		} else return screen.width >= 1024;
	};

    self.getMenu = function(user) {
        var menus = [];

        menus = [
			{ id: 0, active: 1, icon: 'iconsprite2-trangchu', name: 'Trang chủ', selected: false, route: 'app.home', cssStyle:'item' },
      { id: 2, active: 1, icon: 'iconsprite2-xulycongviec', name: 'Xử lý công việc', selected: false, route: 'app.procedure-list', cssStyle:'item' },
      { id: 8, active: 1, icon: 'iconsprite2-lichcongtac', name: 'Lịch công tác', selected: false, route: '', cssStyle:'item' },
			{ id: 1, active: 1, icon: 'iconsprite2-thongke', name: 'Thống kê', selected: false, route: 'app.document-list', cssStyle:'item' },
      { id: 10, active: 1, icon: 'iconsprite2-giaoviec', name: 'Giao việc', selected: false, route: '', cssStyle:'item' },
      { id: 12, active: 1, icon: 'iconsprite2-danhba', name: 'Danh bạ', selected: false, route: '', cssStyle:'item' },
      { id: 13, active: 1, icon: 'iconsprite2-email', name: 'Email', selected: false, route: '', cssStyle:'item' },
      { id: 14, active: 1, icon: 'iconsprite2-tracuu', name: 'Tra cứu', selected: false, route: '', cssStyle:'item' },
      { id: 15, active: 1, icon: 'iconsprite2-traodoi', name: 'Trao đổi', selected: false, route: '', cssStyle:'item' },
        	{ id: 3, active: 1, icon: 'icon-null', name: 'Hệ thống', selected: false, route: '', cssStyle:'item style-2'},
			{ id: 5, active: 1, icon: 'iconsprite2-thongtintaikhoan', name: 'Thông tin tài khoản', selected: false, route: 'app.change-user-profile', cssStyle:'item style-1' },
			{ id: 11, active: 1, icon: 'iconsprite2-thongtinungdung', name: 'Thông tin ứng dụng', selected: false, route: 'app.huong-dan-su-dung', cssStyle:'item style-1' },
      { id: 6, active: 1, icon: 'iconsprite2-caidat', name: 'Cài đặt', selected: false, route: null, cssStyle:'item style-1' },
			{ id: 4, active: 1, icon: 'iconsprite2-dangxuat', name: 'Đăng xuất', selected: false, route: null, cssStyle:'item style-1' }
		];

      	var deferred = $q.defer();
      	deferred.resolve(menus);

      	return deferred.promise;
    };

    self.openSearch = function(sco) {
        sco.sceach_type = 1;
        var tpl_down =
        '<div>' +
        '<div class="row">' +
        '<span style="padding-right:25px;" ng-click="p_onSreachTypeTapped(\'customer\');">' +
        '<i ng-class="{\'ion-ios-circle-filled positive\':sceach_type===1,\'ion-ios-circle-outline\':sceach_type!==1}"></i> Khách hàng' +
        '</span>' +
        '<span style="padding-right:25px;" ng-click="p_onSreachTypeTapped(\'order\');">' +
        '<i class="" ng-class="{\'ion-ios-circle-filled positive\':sceach_type===2,\'ion-ios-circle-outline\':sceach_type!==2}"></i> Đơn hàng' +
        '</span>' +
        '</div>' +
        '<input type="text" placeholder="nhập số đt, sô CMND, mã đơn hàng để tìm kiếm" ng-model="p_sreach_txt" ng-change="onSearchChange(p_sreach_txt);">' +
        '</div>';

      var p = $ionicPopup.confirm({
        template: tpl_down,
        scope: sco,
        cssClass: 'popup-sreach',
        buttons: [{
          text: 'HUỶ BỎ',
          onTap: function(e) {
            return false;
          }
        }, {
          text: 'TÌM KIẾM',
          type: 'button-positive',
          onTap: function(e) {
            return true;
          }
        }]
      });
      sco.onSearchChange = function(value) {
        sco.p_sreach_txt = value;
      };
      sco.p_onSreachTypeTapped = function(type) {
        if (type === 'customer') {
          sco.sceach_type = 1;
        } else if (type === 'order') {
          sco.sceach_type = 2;
        }
      };

      return p;
    };

    self.updateLocation = function(params, callback) {
      API.call(API_CONST.updateLocation, params, callback);
    };

    self.updateDeviceInfo = function(callback) {
      var platform = device.platform.toLowerCase();
      if (platform && platform !== 'ios' && platform !== 'android') {
        _log.info('[] updatePersionalize don\'t support desktop');
        return;
      }

      var params = {
        'uuid': device.uuid,
        'app_version': CONST.VERSION,
        'os': device.platform.toLowerCase(),
        'os_version': device.version,
        'model': device.model,
        'ram': '',
        'app': '',
        'cpu': '',
        'manufacturer': device.manufacturer,
      };

      var regex = /update\/.*/g;
      var obj = {
        name: API_CONST.addDevice.name.replace(regex, 'update/' + device.uuid),
        method: API_CONST.addDevice.method,
        type: API_CONST.addDevice.type
      };

      API.call(obj, params, callback);
    };

    return self;
  };

  /*********************************
  	lsFtr
  */
  lsFtr.$inject = [
    '$log'
  ];

  function lsFtr(
    $log
  ) {
    var self = this;
    self.clear = function() {
      return localStorage.clear();
    };
    self.get = function(key) {
      return JSON.parse(localStorage.getItem(key));
    };
    self.set = function(key, data) {
      return localStorage.setItem(key, JSON.stringify(data));
    };
    self.delete = function(key) {
      return localStorage.removeItem(key);
    };
    self.getAll = function() {
      var all = [];
      var items = Object.keys(localStorage);

      for (var i = 0; i < items.length; i++) {
        if (items[i] !== 'user' || items[i] != 'token') {
          all.push(JSON.parse(localStorage[items[i]]));
        }
      }
      return all;
    };
    return self;
  };


  utilsFtr.$inject = [
    '$log', '$ionicPopup', 'CONST', '$filter',
    //'ionicDatePicker', 'ionicTimePicker',
    '$http', '$q', '$sce'
  ];

  function utilsFtr(
    $log, $ionicPopup, CONST, $filter,
    //ionicDatePicker, ionicTimePicker,
    $http, $q, $sce
  ) {
    var self = this;
    self.locdau = function(str) {
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      //str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
      str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
      str = str.replace(/^\-+|\-+$/g, ""); //cắt bỏ ký tự - ở đầu và cuối chuỗi
      return str;
    };
    self.getDateString = function(datetime, format) {
      var _format = format || CONST.dateformat;
      return moment(datetime).format(_format);
    };

    self.now = function() {
      return moment().toDate();
    };
    self.currentDate = function() {
      return moment().toDate().setHours(0, 0, 0);
    };
    self.epochTime = function(datetime, type) {
      datetime = datetime || moment().toDate();
      type = type || 's';
      if (type === 's')
        return datetime.getHours() * 60 * 60 + datetime.getMinutes() * 60;
      return (datetime.getHours() * 60 * 60 + datetime.getMinutes() * 60) * 1000;
    };
    self.date2str = function(datetime, format) {
      return $filter('date')(datetime, format);
    };

    self.str2date = function(str, format) {
      return moment(str, format || CONST.server_dateformat);
    };

    self.datediff = function(datetime, value, type) {
      return moment(datetime.toISOString()).subtract(value, type)._d;
    };

    self.dateValid = function(strDate, format) {
      return moment(strDate, format).isValid();
    };

    self.msgParse = function(msg) {
      // msg = "module:app.order,msg:Test pushnotification,sender:Thanh,reciver:shipper";
      return msg.split(/,/);
    };

    self.openTimePicker = function(opt, callback) {
      opt.step = opt.step || 15;
      opt.inputTime = opt.inputTime || UTILS.now().getHours() * 60 * 60 + Math.ceil(UTILS.now().getMinutes() / 15) * 15 * 60;
      opt.format = CONST.is24Hour ? 24 : 12;
      opt.callback = function(time) {
        if (time) {
          var selectedTime = moment(time * 1000).toDate();
          opt.inputTime = selectedTime.getUTCHours() * 60 * 60 + selectedTime.getUTCMinutes() * 60;
          callback(opt.inputTime);
        }

      };
      ionicTimePicker.openTimePicker(opt);
    };

    self.openDatePicker = function(opt, callback) {
      opt.inputDate = opt.inputDate || moment().toDate();
      opt.inputDate.setHours(0, 0, 0);
      opt.callback = function(date) {
        if (date) {
          opt.inputDate = moment(date).toDate();
          callback(opt.inputDate);
        }

      };
      ionicDatePicker.openDatePicker(opt);
    };


    return self;
  };


})();
