
(function() {
'use strict';


angular
    .module('FTravel.user')
    .controller('ChangeUserProfileCrl', changeUserProfileCrl);

changeUserProfileCrl.$inject = [
    '$scope', '$rootScope', '$state', '$ionicHistory',
    'CONST', 'LSFtr', 'Popup', 'UserFtr'
];

function changeUserProfileCrl(
    $scope, $rootScope, $state, $ionicHistory,
    CONST, LSFtr, Popup, UserFtr
) {
    $scope.title='Đổi thông tin người dùng';

	$scope.form = {
		UserName : $rootScope.user.UserName,
		OldPass : '',
		NewPass : ''
	};

	$scope.check = {
		NewPassMatch : ''
	};

	$scope.submit = function() {
		// validation
		var _msg_err = '';
		if($scope.form.OldPass.length <= 0) _msg_err += 'Chưa nhập mật khẩu củ</br>';
		if($scope.form.NewPass.length <= 0) _msg_err += 'Chưa nhập mật khẩu mới</br>';
		if($scope.form.NewPass != $scope.check.NewPassMatch) _msg_err += 'Mật khẩu không giống';
		if(_msg_err !== '') {
			Popup.e(_msg_err);
			return;
		}

		UserFtr.doiMatKhau($scope.form).then(function(rep){
			// console.log(JSON.stringify(rep));
			Popup.a('Đổi mật khẩu thành công');
			$ionicHistory.goBack();
		}, function(err){
			Popup.e(err);
		});
	};

	$scope.passMatch = true;
	$scope.checkPassword = function() {
		$scope.passMatch = ($scope.form.NewPass === $scope.check.NewPassMatch);
	};

	$scope.back = function() {
		$ionicHistory.goBack();
	};
}


})();
