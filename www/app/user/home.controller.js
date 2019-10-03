/**
 * home controller
 * @2017
 **/



(function () {
	'use strict';


	angular
		.module('FTravel.user')
		.controller('HomeCtrl', homeCtrl);

	homeCtrl.$inject = [
		'$scope', '$rootScope', '$state', '$ionicHistory', '$ionicPlatform', '$ionicPopup',
		'CONST', 'Datetime', 'Popup', '$q', 'DB', 'DB_CONFIG',
		'MasterFtr', 'UserFtr', 'API', 'API_CONST'
	];

	function homeCtrl(
		$scope, $rootScope, $state, $ionicHistory, $ionicPlatform, $ionicPopup,
		CONST, Datetime, Popup, $q, DB, DB_CONFIG,
		MasterFtr, UserFtr, API, API_CONST
	) {
		$scope.title = "Công chức";
		$scope.dt = Datetime;
		$scope.dsTinTuc = [];
		$scope.documents = [];
		$scope.procedures = [];

		$scope.dsDonVi = [];
		$scope.noMoreItemsAvailable = false;
		$scope.pageNo = 1;

		$rootScope.optionUser = false;
		$scope.hinhnen = false;
		//Biến toàn cục hiển thị hình nền
		$rootScope.chonHinhnen = false;
		$scope.idhinhnen = 1;
		//Biến toàn cục hiển thị hình nền
		$scope.OSKey = $rootScope.OsKey;
		$scope.TypeDevice = null;
		if (ionic.Platform.isIOS()) {
			$scope.TypeDevice = 2;
		} else if (ionic.Platform.isAndroid()) {
			$scope.TypeDevice = 1;
		}
		DB.select(DB_CONFIG.user_table).then(function (res) {
			if (res !== null) {
				$rootScope.UserName = res.name;
				$rootScope.UserID = res.userID;
				UserFtr.getInfos($rootScope.UserID).then(function (data) {
					$rootScope.userinfo = data;
				}, function (err) { });
				// Kiểm tra quyền hiển thị tra cứu quy hoạch
				var paramsFireBase = {
					UserID: $rootScope.UserID,
					UserName: $rootScope.UserName,
					OSKey: $scope.OSKey,
					TypeDevice: $scope.TypeDevice
				}
				UserFtr.setInfoFireBase(paramsFireBase).then(function (dataFireBase) {
					console.log("OSKey homne --- " + $scope.OSKey);
				}, function (err) {
					console.log(err);
				});
				$scope.permission_form = {
					'userID': $rootScope.UserID,
				};
				UserFtr.CheckPermissions($scope.permission_form).then(function (rep) {
					$rootScope.permission = rep;
				}, function (err) { });

			}
		});
		$scope.sorter = [
			'-NgayDangKy'
		];
		var isLoading = false;

		$scope.doRefresh = function () {
			$scope.pageNo = 1;
			$scope.noMoreItemsAvailable = false;
			$scope.dsTinTuc = [];

			// $scope.loadMore();
		};

		$scope.form = {
			sreach: ''
		};
		//Cap nhật ảnh dại diện
		// var files = [];
		$scope.addfile = function (file) {
			$scope.avatarname = file[0].name;
			$scope.avatartype = file[0].type;
			debugger;
			var deferred = $q.defer();
			var fr = new FileReader();
			fr.onload = function (e) {
				deferred.resolve(e.target.result);
				$scope.avatarbase64 = e.target.result.substring(e.target.result.indexOf(",") + 1, e.target.result.length);
				// console.log($scope.avatarbase64);
				$scope.paramsavatar = {
					AnhDaiDienURL: $scope.avatarbase64,
					strbase: $scope.avatarname,
					TenFileGoc: $scope.avatartype,
					CanBoID: $rootScope.userinfo.CanBoID

				}
				UserFtr.thaydoiavatar($scope.paramsavatar).then(function (data) {
					// console.log(data);
					if (data == "True") {
						$rootScope.optionUser = false;
						Popup.t("Thay đổi ảnh đại diện thành công !");
					} else {
						$rootScope.optionUser = false;
						Popup.t("Thay đổi ảnh đại diện thất bại !");
					}
				}, function (err) {
					$rootScope.optionUser = false;
					Popup.e("Lỗi server không xác định");
					console.log(err);
				});
				console.log(e.target.result);
			};
			fr.readAsDataURL(file[0]);
			return deferred.promise;
		}

		//Đăng xuất
		$scope.logout = function () {
			$rootScope.optionUser = false;
			var p = $ionicPopup.confirm({
				title: '<strong>Đăng xuất</strong>',
				template: 'Bạn có muốn đăng xuất?',
				cancelText: 'Thoát',
				okText: 'Đồng ý'
			});

			p.then(function (ok) {
				if (ok) {
					DB.deleteData(DB_CONFIG.user_table);
					$state.go("app.login");
					$rootScope.UserID = undefined;
					$rootScope.UserName = undefined;
				}
			});
		}
		//
		/////////////////////////////
		////////////////////////////


		$scope.onTraCuuHoSoSubmit = function (sreach) {
			$state.go('app.document-detail', {
				soBienNhan: $scope.form.sreach,
				maTraCuu: $scope.form.sreach
			})
		};

		$scope.onTinTucTapped = function (item) {
			$state.go('app.tin-tuc-detail', {
				item: item
			});
		};
		$scope.onLichCongTac = function () {
			$rootScope.tab = 0;
			$state.go('app.lichcongtaccanhan');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}
		$scope.gotoUserInfo = function () {

			if (!$rootScope.UserID && !$rootScope.UserName) {
				Popup.c('Vui lòng đăng nhập để sử dụng!', function (ok) {
					if (ok) $state.go('app.login');
					$rootScope.optionUser = false;;
				});
				$rootScope.optionUser = false;
				$state.go('app.home');
			} else {
				$rootScope.optionUser = false;
				$state.go('app.user-profile');
				$ionicHistory.nextViewOptions({
					historyRoot: true
				});
			}
		}
		// Di chuyển tới màn hình Tra Cứu
		$scope.onTraCuu = function () {
			$rootScope.flagTraCuu == false;
			$state.go('app.ds-tracuu');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}
		// Di chuyển tới màn hình Tra Cứu
		// Di chuyển tới màn hình Danh Bạ
		$scope.onDanhBa = function () {
			$state.go('app.ds-danhba');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}
		// Di chuyển tới màn hình Danh Bạ

		// Bật lên ứng dụng mail
		$scope.onPhanAnhKienNghi = function () {
			$rootScope.idIndexPA = undefined;
			$rootScope.flagPA = false
			$state.go('app.ds-phananh-kiennghi');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});

		}
		// Bật lên ứng dụng mail

		// Di chuyển tới màn hình thống kê

		$scope.onThongKe = function () {
			$state.go('app.ds-thongke');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}
		//

		// Di chuyển tới màn hình Thông Báo
		$scope.onThongBao = function () {
			$state.go('app.ds-thongbao');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}
		// Di chuyển tới màn hình Thông Báo

		// Di chuyển tới màn hình Tra Cứu Quy Hoạch
		$scope.onQuyHoach = function () {
			$state.go('app.ds-quyhoach');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}
		$scope.onQuyHoachCongDan = function () {
			$state.go('app.ds-quyhoachcongdan');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}
		// Di chuyển tới màn hình Tra Cứu Quy Hoạch

		// Chọn hình nền
		$scope.changeHinhnen = function () {
			$rootScope.optionUser = false;
			$rootScope.chonHinhnen = true;
			$rootScope.cancelhinhnen = $rootScope.idindexhinhnen;
		}
		$scope.cancelChonhinhnen = function () {
			$rootScope.chonHinhnen = false;
			$rootScope.idindexhinhnen = $rootScope.cancelhinhnen;
		}
		$scope.chonhinhnen = function (params) {

			if (params == 1) {
				$scope.sohinhnen = 1;
				$rootScope.idindexhinhnen = $scope.sohinhnen;
			} else if (params == 2) {
				$scope.sohinhnen = 2;
				$rootScope.idindexhinhnen = $scope.sohinhnen;
			} else {
				$scope.sohinhnen = 3;
				$rootScope.idindexhinhnen = $scope.sohinhnen;
			}


		}
		$scope.DongyChonhinhnen = function () {
			$rootScope.idhinhnen = $rootScope.sohinhnen;
			$scope.form_hinhdaidien = {
				'idx': $rootScope.idindexhinhnen
			}
			DB.insert(DB_CONFIG.img_daidien, $scope.form_hinhdaidien);
			$rootScope.chonHinhnen = false;
		}
		// Chọn hình nền

		$scope.onXulyCongViec = function () {
			$rootScope.idIndexXLVC = undefined;
			$rootScope.flag = false
			$state.go('app.ds-xulycongviec');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}

		$scope.onGiaoViec = function () {
			$rootScope.idIndexGV = undefined;
			$rootScope.flagGV = false
			$state.go('app.ds-giaoviec');
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}

		$scope.onHDSD = function () {
			$scope.showAlert();
		}

		$scope.onDocumentItemTapped = function (item) {
			$state.go('app.document-detail', {
				"DocumentId": item.DocumentId,
				"MaTinhTrang": item.MaTinhTrang
			});
		};

		$scope.onThuTucList = function (item) {
			$state.go('app.procedure-list', {});
		}

		$scope.onBuildRegisterTapped = function (item) {
			$state.go('app.build-register', {});
		}

		$scope.onDonViTapped = function (item) {
			// $ionicHistory.nextViewOptions({ historyRoot: true });
			// $state.go('app.customer-contract', {location: 'replace'});
			// $rootScope.$emit('FilterCtrl.reset', {});
			$state.go('app.procedure-list', {
				item: item,
				id: item.MaDonVi
			});
		};

		$scope.getCodeName = function (item) {
			if (!item.MaTraCuu || item.MaTraCuu === '')
				return 'Chưa cấp số BN';

			return item.MaTraCuu + " | " + item.SoBienNhan;
		};

		$scope.$on('$ionicView.loaded', function () {

			DB.select(DB_CONFIG.img_daidien).then(function (res) {
				if (res !== null) {
					$rootScope.idindexhinhnen = res.idx;
				}
			});
			if ($rootScope.idindexhinhnen == undefined) {
				$rootScope.idindexhinhnen = 1;
			}
			//console.log($rootScope.user);
		});

		$scope.$on('$ionicView.enter', function () {
			FCMPlugin.onNotification(function (data) {
				if (data.wasTapped) {
					if (data.notify_type == 1) {
						$state.go("app.ds-thongbao");
					} else if (data.notify_type == 2) {
						$state.go("app.ds-giaoviec");
					}
					//Notification was received on device tray and tapped by the user.
					//alert( JSON.stringify(data) );
					//   var sound = ionic.Platform.isAndroid() ? 'file://sound.mp3' : 'file://beep.caf';
					// $ionicPopup.show({
					// 	title: JSON.stringify(data.title),
					// 	template: JSON.stringify(data.body),
					// 	buttons: [
					// 		{
					// 			text: "Đồng ý",
					// 		}]
					// });
				} else {
					cordova.plugins.notification.local.schedule({
						title: data.title,
						text: data.body,
						id: data.notify_type,
						foreground: true,
						slient: false
					});
					cordova.plugins.notification.local.on("click", function (notification) {
						if (notification.id == 1) {
							$state.go("app.ds-thongbao");
						} else if (notification.id == 2) {
							$state.go("app.ds-giaoviec");
						}
					});
				}
			});
			// if($rootScope.user)
			//     DocumentFtr.getDanhSach().then(function(data) {
			// 		$scope.documents = data
			// 	}, function(err) {
			//         Popup.e(err);
			//     });
			// MasterFtr.getDSTinTuc().then(function(data) {
			// 	$scope.dsTinTuc = data
			// }, function(err) {
			//     Popup.e(err);
			// });
			$ionicPlatform.ready(function () {
				$scope.doRefresh();
			});
		});

		$scope.$on('$ionicView.leave', function () {

		});

		$scope.showAlert = function () {

			var alertPopup = $ionicPopup.alert({
				title: 'Thông Báo',
				template: 'Tính năng này đang được phát triển'
			});

			alertPopup.then(function (res) {
				// Custom functionality....
			});
		};

	}


})();