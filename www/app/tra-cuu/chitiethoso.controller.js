/**
 * document list controller
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.tracuu')
        .controller('CTHoSoCtrl', ctHoSoCtrl);

        ctHoSoCtrl.$inject = [
        '$scope', '$rootScope', '$state', '$filter',
        'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
        'MasterFtr', 'UtilsFtr', 'TraCuuFtr'
    ];

    function ctHoSoCtrl(
        $scope, $rootScope, $state, $filter,
        CONST, LSFtr, Loader, Datetime, Popup,
        MasterFtr, UtilsFtr, TraCuuFtr
    ) {
        $scope.title = "Chi tiết hồ sơ";
        $scope.tabIndex=0;
        $scope.cthosoID = {
            chitiethosoID : $state.params.HosoID
        };

        // Chuyen doi 3 tab
        $scope.onTabChange = function(tabID){
            $scope.tabIndex= tabID;
            if ($scope.tabIndex==1){
                $scope.loadQTXLhoso($scope.cthosoID);
            }
            else if ($scope.tabIndex==2){
                $scope.loadHosokemtheo($scope.cthosoID);
            }
        }
      
        //START Ham loadchitiethoso
        $scope.loadChitiethoso = function (hsID){
            TraCuuFtr.chitiettracuuhs(hsID).then(function(obj){
                $scope.DataCTHS = JSON.parse(obj);
                if($scope.DataCTHS.gioitinh == 2){
                    $scope.gioitinhn = "Nữ";
                }else if($scope.DataCTHS.gioitinh == 1){
                    $scope.gioitinhn = "Nam";
                }else{
                    $scope.gioitinhn = "Không xác định";
                }
            },function(err){
                Popup.e("Lỗi kết nối tới máy chủ");
			})
        };
        //END Ham loadchitiethoso
        //START Qua trinh xu ly ho so tra cuu
        $scope.loadQTXLhoso = function(hsID){
            TraCuuFtr.quatrinhxulyhs(hsID).then(function(obj){
                $scope.DataQTXL = JSON.parse(obj);
            },function(err){
				Popup.e("Lỗi kết nối tới máy chủ");
			})
        };
        //END Qua trinh xu ly ho so tra cuu
        //START Ho so kem theo ho so tra cuu
        $scope.loadHosokemtheo = function(hsID){
            TraCuuFtr.hskemtheo(hsID).then(function(obj){
                $scope.DataHSKT = JSON.parse(obj);
            },function(err){
				Popup.e("Lỗi kết nối tới máy chủ");
			})
        };
        //END Ho so kem theo ho so tra cuu
        $scope.$on('$ionicView.loaded', function() {
            $scope.loadChitiethoso($scope.cthosoID);
            $scope.loadQTXLhoso($scope.cthosoID);
        
        });
        $scope.$on('$ionicView.enter', function() {});
        $scope.$on('$ionicView.leave', function() {});

    }


})();
