
/**
 * User controller
 * @2017
 **/



(function () {
	'use strict';


	angular
		.module('FTravel.user')
		.controller('UserRegisterCtrl', userRegisterCtrl)
		;

	userRegisterCtrl.$inject = [
		'$scope', '$rootScope', '$state', '$ionicHistory', '$timeout',
		'CONST', 'LSFtr', 'Popup',
		'UserFtr'
	];

	function userRegisterCtrl(
		$scope, $rootScope, $state, $ionicHistory, $timeout,
		CONST, LSFtr, Popup,
		UserFtr
	) {
		$scope.title = 'ĐĂNG KÝ TÀI KHOẢN';

		$scope.sexuals = [
			{ name: 'Nam', value: 0 },
			{ name: 'Nữ', value: 1 }
		];
		// $scope.months = [
		// 	{ name: '1', value: 1 }, { name: '2', value: 2 }, { name: '3', value: 3 }, { name: '4', value: 4 },
		// 	{ name: '5', value: 5 }, { name: '6', value: 6 }, { name: '7', value: 7 }, { name: '8', value: 8 },
		// 	{ name: '9', value: 9 }, { name: '10', value: 10 }, { name: '11', value: 11 }, { name: '12', value: 12 }
		// ];

		$scope.form_register = {
			screenname: '',
			password: '',
			type: 0
			
		};
		// $scope.ph_username = ( $scope.form_register.acc_type === 1 ) ? 'Nhập họ và tên' : 'Nhập tên đơn vị';

		$scope.clearText = function (type) {
			switch (type) {
				case 'email':
					$scope.user.email = '';
					break;
				default:
			}
		};

		$scope.sexualSelected = {};
		$scope.monthSelectedSelected = {};
		$scope.onSelectItemChanged = function (name, item_selected) {
			switch (name) {
				case 'sexual':
					$scope.sexualSelected = item_selected;
					break;
				case 'month':
					$scope.monthSelected = item_selected;
					break;
			}
		};

		var EMAIL_REGEX = /\S+@\S+\.\S+/;
		$scope.err_email = true;
		$scope.emailCheck = function (email) {
			// var re = /\S+@\S+\.\S+/;
			var re = EMAIL_REGEX.test(email);
			$scope.err_email = re;
			return re;

			// var i = document.createElement('input');
			// var i2 = document.createElement('input');
			// i.type = 'email';
			// i.value = i2.value = value;
			// i.multiple = !!multiple;
			// var mismatch = i.validity.typeMismatch;
			// var mismatchPass = mismatch == expectedMismatch;
			// var sanitizePass = i.value == expectedValue;
			// var mismatchResult = '"' + value + '" is a ' + (mismatch ? 'invalid' : 'valid') + ' email address' + (multiple ? ' list. ' : '. ');
			// var sanitizeResult = 'It was sanitized to "' + i.value + '"' + (sanitizePass ? '.' : ', but should be sanitized to "' + expectedValue + '"');
			// var result = mismatchResult
			// if (value != expectedValue || !sanitizePass)
			//     result += sanitizeResult
			//
			// i2.className = EMAIL_REGEX.test(expectedValue) !== expectedMismatch ? 'valid' : 'invalid'
			//
			// if (mismatchPass){
			//     i.className = 'valid'
			// } else {
			// 	    i.className = 'invalid'
			// }
			// // browser.appendChild(i)
			// regex.appendChild(i2)
		};

		$scope.validation = function (name) {
			switch (name) {
				case 'email':
					var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (!re.test(userEmailAddressFromInput)) {
						// Invalid Email
					}
					break;
				default:

			}
		};

		$scope.onSelectType = function (type) {
			$scope.form_register.LoaiTaiKhoan = type;
		};

		$scope.password_match = true;
		$scope.checkPassword = function () {
			$scope.password_match = ($scope.form_register.password=== $scope.form_register.password_match);
		};

		$scope.checkEmail = function () {
			$scope.emailCheck($scope.form_register.Email);
		};

		$scope.changeSendType = function (type) {
			$scope.form_register.type = type;
		};

		$scope.goNext = function () {
			var _msg_err = '';
				console.log(UserFtr);
				if ($scope.form_register.screenname.length <= 0) _msg_err += 'Chưa nhập tên tài khoản</br>';
				if ($scope.form_register.password.length <= 0) _msg_err += 'Chưa nhập mật khẩu</br>';
				if ($scope.form_register.password_match <= 0) _msg_err += 'Chưa xác nhận mật khẩu</br>';
				if (_msg_err !== '') {
					Popup.e(_msg_err);
					return;
				}
				UserFtr.register($scope.form_register).then(function (rep) {
					Popup.s('Đã tạo tài khoản thành công, vui lòng kích hoạt để bắt đầu sử dụng', function (ok) {
						if (ok) {
							$ionicHistory.goBack();
							$timeout(function () {
								$rootScope.$emit('UserCtrl.openActiveUser', {});
							}, 500);
						}
					});
				}
				, function (err) { 
					Popup.e(err) 
				});
		};

		$scope.onStepSelected = function (step) {
			$scope.step = step;
		};

		// $scope.showBtnBarRight_old = $rootScope.showBtnBarRight;
		$scope.$on('$ionicView.loaded', function () {
			// $rootScope.showBtnBarRight = false;
		});

		$scope.$on('$ionicView.enter', function () {
		});

		$scope.$on('$ionicView.leave', function () {
			// $rootScope.showBtnBarRight = $scope.showBtnBarRight_old;
		});
	}


})();
