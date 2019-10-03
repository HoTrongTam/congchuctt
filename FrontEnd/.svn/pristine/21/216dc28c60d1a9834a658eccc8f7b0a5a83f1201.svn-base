(function() {
'use strict';


    angular
        .module('FTravel.user')
        .controller('UserProfileCtrl', userProfileCtrl);

    userProfileCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$ionicHistory', '$ionicPopup',
        'CONST', 'LSFtr', 'Popup'
    ];

    function userProfileCtrl(
        $scope, $rootScope, $state, $ionicHistory, $ionicPopup,
        CONST, LSFtr, Popup
    ) {
        $scope.title = 'Xem thông tin người dùng';

		$scope.mode = 'read';

		$scope.form = {
			// "KhachHangID": $rootScope.user.KhachHangID,
	        // "UserName": "ThanhTN16",
	        "HoTen": $rootScope.user.HoTen,
	        "GioiTinhID": $rootScope.user.GioiTinhID,
	        "NgaySinh": $rootScope.user.NgaySinh,
	        "ThangSinh": $rootScope.user.ThangSinh,
	        "NamSinh": $rootScope.user.NamSinh,
			"birthday" : new Date($rootScope.user.NamSinh+'-'+$rootScope.user.ThangSinh+'-'+$rootScope.user.NgaySinh),
	        "CMND": $rootScope.user.CMND,
	        "NgayCap": new Date($rootScope.user.NgayCap),
	        "NoiCap": $rootScope.user.NoiCap,
	        "DienThoai": $rootScope.user.DienThoai,
	        "Email": $rootScope.user.Email,
	        "ChoOHienTai": $rootScope.user.ChoOHienTai,
	        "TenDoanhNghiep": $rootScope.user.TenDoanhNghiep,
	        "SoDKKD": $rootScope.user.SoDKKD,
	        "EmailDN": $rootScope.user.EmailDN,
	        "DienThoaiDN": $rootScope.user.DienThoaiDN,
	        "LoaiDangKy": $rootScope.user.LoaiDangKy
		};

	    $scope.onEditTapped = function() {
	        $scope.mode = 'edit';
	    };

		$scope.onSexTapped = function(id) {
			$scope.form.GioiTinhID = id;
		};

	    $scope.goBack = function(){
	        $ionicHistory.goBack();
	    };

	    $scope.submit = function() {
	        // validation

			Popup.s('Đã lưu thành cồng', function(ok){
				$ionicHistory.goBack();
			});
			return;

	        var t = moment($scope.form.birthday);
	        $scope.form.NgaySinh = t.format('DD');
	        $scope.form.ThangSinh = t.format('MM');
	        $scope.form.NamSinh = t.format('YYYY');

	        UserFtr.updateInfo($scope.form).then(function(rep) {
	            console.log(JSON.stringify(rep));
	            $scope.mode = 'read';
	            UserFtr.getInfo({
	    			strUserName: $scope.form.UserName
	    		});
	        }, function(err){Popup.e(err)});
	    };

        $scope.opentab = function(name,tabActive) {
          $scope.tabActive=tabActive;
        }

    }


})();
