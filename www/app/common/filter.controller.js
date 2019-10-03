
/**
 * filter controller
 * ThanhTN
 * @2017
 **/



(function() {
'use strict';


angular
	.module('FTravel.factory')
	.controller('FilterCtrl', filterCtrl)
;

filterCtrl.$inject = [
	'$scope', '$rootScope', '$state', '$ionicSideMenuDelegate',
	'CONST', 'MasterFtr', 'LSFtr'
];

function filterCtrl (
	$scope, $rootScope, $state, $ionicSideMenuDelegate,
	CONST, MasterFtr, LSFtr
) {
	console.log('FilterCtrl called');

	// $scope.title = "";
	$scope.show_StatusFilter = true;

	$scope.filters = {
		// MaTraCuu: '',
		// TrangThaiHoSo: '',
		// MucDo: [true,true,true,true],
		// NgayNhan_tu: '',
		// NgayNhan_den: '',
		// TenThuTuc: '',
		// tenDonViCungCap: '',
		// tenLinhVuc: ''
	};

	$scope.filterDVCC = {
		TenDonVi: ''
	};
	$scope.filterByDVCC = function(item) {
		return item.TenDonVi.removeUnicode().match( $scope.filterDVCC.TenDonVi );
	};
	// $scope.DSDonViCungCap = [
	// 	{ id: 1, name: 'Sở Nội vụ' },
	// 	{ id: 2, name: 'Sở Tài nguyên và môi trường' },
	// 	{ id: 3, name: 'Sở Khoa học và công nghệ' },
	// 	{ id: 4, name: 'Sở Ngoại vụ' },
	// 	{ id: 5, name: 'Công an tỉnh' }
	// ];

	$scope.filterLV = {
		TenLinhVuc: ''
	};
	$scope.filterByLV = function(item) {
		return item.TenLinhVuc.removeUnicode().match( $scope.filterLV.TenLinhVuc );
	};
	$scope.DSDonViCungCap = [];
	MasterFtr.getDanhSachDonVi().then(function(rep) {
		$scope.DSDonViCungCap = rep;
	}, function(err){alert(err);});

	$scope.DSLinhVuc = [];
	MasterFtr.getDanhSachLinhVuc().then(function(rep) {
		$scope.DSLinhVuc = rep;
	}, function(err){alert(err);});

	$scope.close = function() {
		$ionicSideMenuDelegate.toggleRight();
	};

	$scope.keyPressedFilter = function(keyEvent, formModel) {
		//debugger;
		if (keyEvent.keyCode == 13) {
			$scope.submit();

		}
	};

	$scope.submit = function() {
		$ionicSideMenuDelegate.toggleRight();

		$scope.filters.TenLinhVuc = $scope.linhVucSelected;
		$scope.filters.TenDonViCungCap = $scope.donViSelected;
		$scope.filters.TenThuTuc = $scope.filters.TenThuTuc.removeUnicode();

		$rootScope.$emit('FilterCtrl.submit', { filters: $scope.filters });
	};
	$scope.resetFilter = function() {
		$ionicSideMenuDelegate.toggleRight();
		$scope.linhVucSelected = {TenLinhVuc:''};
		$scope.donViSelected = {MaDonVi:''};
		$rootScope.$emit('FilterCtrl.resetDefaultFilter');
	};

	$scope.linhVucSelected = {TenLinhVuc:''};
	$scope.donViSelected = {MaDonVi:''};
	$scope.onItemSelected = function(name, item) {
		switch (name) {
			case 'linh-vuc':
				$scope.linhVucSelected = item || { TenLinhVuc: 'Tất cả' };
				// $scope.filters.TenLinhVuc = $scope.linhVucSelected;
				break;
			case 'don-vi':
				$scope.donViSelected = item || { TenDonVi: 'Tất cả' };
				$scope.linhVucSelected = {TenLinhVuc:''};
				// $scope.filters.TenDonViCungCap = $scope.donViSelected;
				break;
		}
	};

	$scope.onTrangThaiHoSoTapped = function(item) {
		//$scope.filters.TrangThaiHoSo[idx] = !$scope.filters.TrangThaiHoSo[idx];
		//[];
		for (var i = 0; i < $scope.filters.TrangThaiHoSo.length; i++) {
			if($scope.filters.TrangThaiHoSo[i].id==item.id){
				$scope.filters.TrangThaiHoSo[i].choose= !$scope.filters.TrangThaiHoSo[i].choose;
			}
		}
	};

	$scope.onMucDoSelected = function(idx) {
		$scope.filters.MucDo[idx].choose = !$scope.filters.MucDo[idx].choose;
	};

	$rootScope.$on('FilterCtrl.reset', function(name, data) {
		$scope.filters = {};
		$scope.show_StatusFilter = false;

		if(CONST.STATE === 'app.document-list') {
			$scope.show_StatusFilter = true;
			$scope.filters = LSFtr.get(CONST.FILTER_DOCUMENT_TAG);
			$scope.filters.ngayNhan_tu=new Date($scope.filters.ngayNhan_tu);
	    $scope.filters.ngayNhan_den=new Date($scope.filters.ngayNhan_den);
			// $scope.filters = data.filters;
		} else if(CONST.STATE === 'app.procedure-list') {
			$scope.filters = LSFtr.get(CONST.FILTER_PROCEDURES_TAG);
		}

		$scope.linhVucSelected = $scope.filters.TenLinhVuc;

		$scope.donViSelected = $scope.filters.TenDonViCungCap;
	});

	$scope.$on('$ionicView.loaded', function() {});

	$scope.$on('$ionicView.enter', function() {
	});

	$scope.$on('$ionicView.leave', function() {});

}


})();
