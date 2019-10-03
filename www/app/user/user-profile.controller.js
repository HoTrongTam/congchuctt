(function () {
	'use strict';


	angular
		.module('FTravel.user')
		.controller('UserProfileCtrl', userProfileCtrl);

	userProfileCtrl.$inject = [
		'$scope', '$rootScope', '$state', '$ionicHistory', '$ionicPopup',
		'CONST', 'LSFtr', 'Popup', 'UserFtr', "API", 'DanhBaFtr'
	];

	function userProfileCtrl(
		$scope, $rootScope, $state, $ionicHistory, $ionicPopup,
		CONST, LSFtr, Popup, UserFtr, API, DanhBaFtr
	) {
		$scope.hasImg = false;
		$scope.tabActive = 1;
		$scope.opentab = function (tabActive) {
			$scope.tabActive = tabActive;
		};
		var user = $rootScope.UserName;
		var userInfo = $rootScope.userinfo;
		//
		//var tendangnhap = user.split("-")[1];

		if (userInfo !== null || userInfo !== undefined) {
			DanhBaFtr.getCTDanhBa(userInfo.UserID).then(function (data) {
				console.log(data);
				$scope.anhDaiDien = data.URL;
				$scope.hasImg = true;
			}, function (err) {
				console.log(err);
			});
			$scope.form = {
				"ten": userInfo.HoTen,
				"gioitinh": userInfo.GioiTinhID,
				"tendangnhap": user,
				"sdt": userInfo.SoDienThoai,
				"email": userInfo.Email,
				"tenphongban": userInfo.TenPhongBan,
				"idphongban": userInfo.PhongBanID,
				"idchucvu": userInfo.ChucVuID,
				"tenchucvu": userInfo.TenChucVu,
				"anhdaidien": userInfo.AnhDaiDienURL
			}
			$scope.formChangePass = {
				"username": $rootScope.UserName,
				"passwordold": "",
				"password": "",
				"userID": $rootScope.UserID
			}
			$scope.check = {
				NewPassMatch: ''
			};
			// $scope.gender = {
			// 	"gioitinh": ""
			// };
			$scope.xacDinhGioiTinh = function (idGioiTinh) {
				if (idGioiTinh == 1) {
					$scope.gender = {
						"gioitinh": "Nam"
					};
				} else if (idGioiTinh == 0) {
					$scope.gender = {
						"gioitinh": "Nữ"
					};
				} else {
					$scope.gender = {
						"gioitinh": "Không xác định"
					};
				}
			}
			$scope.xacDinhGioiTinh($scope.form.gioitinh);
		} else {
			Popup.e("Vui lòng đăng nhập");
		}
		// $scope.getkeys = function (event) {
		// 	console.log(event.keyCode);
		// 	if (event.keyCode == 32) {
		// 		event.preventDefault();
		// 	}
		// }
		//Đổi mật khẩu
		$scope.submit = function () {
			// validation
			if ($scope.formChangePass.passwordold.length <= 0) {
				Popup.w('Chưa nhập mật khẩu cũ');
			}
			else if($scope.formChangePass.passwordold.indexOf(' ') >= 0 || $scope.formChangePass.password.indexOf(' ') >= 0 || $scope.check.NewPassMatch.indexOf(' ') >= 0){
				Popup.w('Không được nhập khoảng trắng');
			}
			else if ($scope.formChangePass.password.length <= 0) {
				Popup.w('Chưa nhập mật khẩu mới');
			} else if ($scope.check.NewPassMatch.length <= 0) {
				Popup.w('Chưa nhập xác nhận mật khẩu');
			} else if ($scope.formChangePass.password != $scope.check.NewPassMatch) {
				Popup.w('Xác nhận mật khẩu không đúng');
			} else if ($rootScope.password !== $scope.formChangePass.passwordold) {
				Popup.w('Mật khẩu cũ không đúng');
			} else {
				UserFtr.doiMatKhau($scope.formChangePass).then(function (rep) {
					// console.log(JSON.stringify(rep));
					Popup.a('Đổi mật khẩu thành công');
					$rootScope.password = $scope.formChangePass.password;
				}, function (err) {
					Popup.e(err);
				});
			}

		};
		$scope.passMatch = true;
		$scope.checkPassword = function () {
			$scope.passMatch = ($scope.formChangePass.password === $scope.check.NewPassMatch);
		};
		$scope.$on('$ionicView.loaded', function () {

		});

	}



})();