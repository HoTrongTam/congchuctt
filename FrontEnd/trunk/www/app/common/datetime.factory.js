/*
* Datetime factory
* @2017
*/


angular
	.module('FTravel.factory')
	.factory('Datetime' , datetimeFtr)
;

datetimeFtr.$inject = [
	'$filter',
	'API_CONST', 'CONST'
];

function datetimeFtr(
	$filter,
	API_CONST, CONST
) {
	var self = this;

	self.date2str = function (datetime, formatStr) {
		var format = {
			M: datetime.getMonth() + 1,
			d: datetime.getDate(),
			h: datetime.getHours(),
			m: datetime.getMinutes(),
			s: datetime.getSeconds()
		};
		formatStr = formatStr.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
			return ((v.length > 1 ? "0" : "") + format[v.slice(-1)]).slice(-2);
		});
		return formatStr.replace(/(y+)/g, function (v) {
			return datetime.getFullYear().toString().slice(-v.length);
		});
	};

	self.str2Date = function (datetimeStr) {
		var dateStr = datetimeStr || '';
		var arr = dateStr.split(/[- :]/);
		return new Date(arr[0], arr[1] - 1, arr[2], arr[3] || 0, arr[4] || 0, arr[5] || 0);
	};

	self.current2Str = function (formatStr) {
		return $filter('date')(new Date(), formatStr);
	};

	self.getTime = function(date, format, subday) {
		var _format = CONST.DATETIME_FORMAT;
		switch (format) {
			case 'dateime':
				_format = CONST.IS_24H ? CONST.DATE_FORMAT + ' HH:mm' : CONST.DATE_FORMAT + ' hh:mm a';
				break;
			case 'date':
				_format = CONST.DATE_FORMAT
				break;
			case 'time':
			case 'hour':
				_format = CONST.IS_24H ? 'HH:mm' : 'hh:mm a';
				break;
		}
		return date ? moment(date).subtract(subday || 0, 'days').format(_format) : '';
	};

	self.toWorkingDay = function(min) {
		return (min / 60 / CONST.WORKING_HOUR);
	};

	return self;


}
