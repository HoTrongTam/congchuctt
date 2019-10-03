/**
 * document list controller
 * @2017
 **/



(function () {
  'use strict';


  angular
    .module('FTravel.phananhkiennghi')
    .controller('ChiTietPhanAnhKienNghiCtrl', chiTietPhanAnhKienNghiCtrl);

  chiTietPhanAnhKienNghiCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$filter', 'API','$sce',
    'CONST', 'LSFtr', 'Loader', 'Datetime', 'Popup',
    'MasterFtr', 'UtilsFtr', 'XuLyCongViec', 'File', '$cordovaFile',"PhanAnhKienNghi"
  ];

  function chiTietPhanAnhKienNghiCtrl(
    $scope, $rootScope, $state, $filter, API,$sce,
    CONST, LSFtr, Loader, Datetime, Popup,
    MasterFtr, UtilsFtr, XuLyCongViec, File, $cordovaFile,PhanAnhKienNghi
  ) {

    $scope.title = "Chi tiết phản ánh kiến nghị";
    var idHoiDap = $state.params.id;
    var tinhTrang = $state.params.tinhtrang;
    $scope.dataChiTietPAKN = "";
    console.log(idHoiDap,tinhTrang);
    if(tinhTrang == 1){
      $scope.ftinhTrang = false;
    }else{
      $scope.ftinhTrang = true;
    }
    $scope.loadPage = function(){
      $scope.formChiTiet = {
        "hoiDapID": idHoiDap
      }
      PhanAnhKienNghi.getHoiDapPAKN($scope.formChiTiet).then(function(data){
        console.log(data);
        $scope.dataChiTietPAKN = data;
        $scope.htmlBind = $sce.trustAsHtml($scope.dataChiTietPAKN.ThongTinPAKN.NoiDungTraLoiHtml);
        if($scope.dataChiTietPAKN.ThongTinPAKN.TinhTrang == 1){
          $scope.flagTinhTrangXL = true;
        }else{
          $scope.flagTinhTrangXL = false;
        }
      }, function(error){
        Popup.e("Lỗi lấy chi tiết phản ánh kiến nghị");
        console.log(error);
      });
    }
    $scope.openFile = function(fileName, fileID) {
			var _url = encodeURI('https://mobile-quan7.tphcm.gov.vn/portal-service/rest/portal/action/download/DownloadFile.rest?object=' + fileID);
			File.open2(_url, fileName);
		};
    $scope.$on('$ionicView.loaded', function () {});

    $scope.$on('$ionicView.enter', function () {
      $scope.loadPage();
    });

    $scope.$on('$ionicView.leave', function () {});

  }


})();