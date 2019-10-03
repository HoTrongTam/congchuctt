/*
 * document controller
 * @2017
 */

(function() {
'use strict';


angular
    .module('FTravel.document')
    .factory('DocumentFtr', documentFtr)
;

documentFtr.$inject = [
    '$rootScope', '$http', '$q', '$window',
    'API', 'CONST', 'API_CONST', 'LSFtr'
];

function documentFtr(
    $rootScope, $http, $q, $window,
    API, CONST, API_CONST, LSFtr
) {
    var self = this;

	self.filters_def = {
        "KhachHangID" : null,
        "SoBienNhan": null,
        "MaTinhTrang" :[],
        "MaTraCuu" :null,
        "NgayDangKyFrom" : null,
        "NgayDangKyTo" : null,
        "ThuTucID" :null,
        "ThuTucHanhChinhID": null,
        "TenThuTucHanhChinh" : null,
        "DonViID" : null,//776,
        "MaDonVi" : null,
        "TenDonVi" :null,
        "LinhVucID" :null,
        "MaLinhVuc":null,
        "TenLinhVuc":null,
        "StringTimKiem": '',
        "PageNum": 1,
        "PageSize": CONST.PAGE_SIGN
    };

	self.genHSCanNop = function(arrHoSoThuTuc) {
		var arr = [];
		angular.forEach(arrHoSoThuTuc, function(ele) {
			arr.push({
				Action: 'NO',
				FileSize: 0,
				GhiChu: '',
				HoSoKemTheoID: ele.HoSoKemTheoID,
				OriginalName: '',
				TenHoSoKemTheo: ele.MoTaFile,
				UploadName: '',
			});
		});
        return arr;
	};

    self.initHoSo = function(thuTuc) {
        return {
            "HoSoID": null,
            "SoBienNhan": null,
            "MaTraCuu": null,
            "ThuTucID": thuTuc.ThuTucChiTiet.ThuTucHanhChinhID,
            "ThuTucHanhChinhID": thuTuc.ThuTucChiTiet.ThuTucHanhChinhID,
            "TenThuTuc": thuTuc.ThuTucChiTiet.TenThuTuc,
            "LinhVucID": thuTuc.ThuTucChiTiet.LinhVucID,
            "MaLinhVuc": thuTuc.ThuTucChiTiet.MaLinhVuc,
            "TenLinhVuc": thuTuc.ThuTucChiTiet.TenLinhVuc,
            "DonViID": thuTuc.ThuTucChiTiet.DonViCungCapID,
            "MaDonVi": thuTuc.ThuTucChiTiet.MaDonViCungCap,
            "TenDonVi": thuTuc.ThuTucChiTiet.TenDonViCungCap,
            "TinhTrang": 'VTN',
            "TenTinhTrang": 'Hồ sơ chưa gửi',
            "NgayDangKy": new Date(),
            "NgayGoi": null,
            "NgayTiepNhan": null,
            "NgayHopLe": null,
            "NgayHenTra": null,
            "NgayThucDia": null,
            "NgayHoanThanh": null,
            "NoiDung": '',
            "MucThuLePhi": 0,
            "LePhi": 0,
            "Phi": 0,
            "MieuTaLePhi": null,
            "DiaChiDangky": $rootScope.user.ChoOHienTai,
            "SoNhaDangKy": '',
            "DuongIDDangKy": null,
            "TenDuongDangKy": '',
            "PhuongIDDangKy": null,
            "MaPhuongXaDangKy": '',
            "TenPhuongXaDangKy": '',
            "QuanIDDangKy": null,
            "MaQuanHuyenDangKy": '',
            "TenQuanHuyenDangKy": '',
            "TaiKhoanKhachHangID": $rootScope.user.KhachHangID,
            "DungTenHoVaTen": $rootScope.user.HoTen,
            "DungTenGioiTinh": $rootScope.user.GioiTinhID,
            "DungTenNgaySinh": $rootScope.user.NgaySinh,
            "DungTenThangSinh": $rootScope.user.ThangSinh,
            "DungTenNamSinh": $rootScope.user.NamSinh,
            "DungTenQuocGiaID": null,
            "DungTenTenQuocGia": '',
            "DungTenLoaiGiayToID": null,
            "DungTenSoGiayToTuyThan": $rootScope.user.CMND,
            "DungTenNgayCap": $rootScope.user.NgayCap,
            "DungTenNoiCap": $rootScope.user.NoiCap,
            "DungTenDienThoai": $rootScope.user.DienThoai,
            "DungTenEmail": $rootScope.user.Email,
            "DungTenHoKhauThuongTru": $rootScope.user.ChoOHienTai,
            "DNMaSoThue": $rootScope.user.SoDKKD,
            "DNTenKinhDoanh": $rootScope.user.TenDoanhNghiep,
            "DNTenVietTat": '',
            "DNTenNuocNgoai": '',
            "DNSoDKKD": $rootScope.user.SoDKKD,
            "DNNgayCapDKKD": null,
            "DNThongTinLienHe": $rootScope.user.HoTen,
            "LhHoTen": $rootScope.user.HoTen,
            "LhGiayUyQuyen": '',
            "LhThongTinLienLac": $rootScope.user.ChoOHienTai,
            "LhTbEmail": $rootScope.user.EmailDN,
            "LhTbDienThoai": $rootScope.user.DienThoaiDN,
            "LhKqNhanBuuDien": '',
			"DsHoSoKemTheo": self.genHSCanNop(thuTuc.ListHoSoChiTiet)
        }
    };

    self.getFilterDef = function() {
		return Object.assign({}, self.filters_def);
	};

    self.timKiem = function(params) {
        // params.StringTimKiem = ;
        // return API.call(API_CONST.document.getDanhSach, params || self.filters_def);
    };

    self.getDanhSach = function(params) {
        // params.KhachHangID = $rootScope.user.KhachHangID;
        return API.call(API_CONST.document.getDanhSach, params || self.filters_def);
    };

	self.update = function(params) {
        // params.KhachHangID = $rootScope.user.KhachHangID;
        return API.call(API_CONST.document.update, params);
    };

    self.getChiTiet = function(params) {
        // var _params = {
        //     hoSoId: '',
        //     soBienNhan: params.soBienNhan,
        //     maTraCuu: params.maTraCuu
        // };
        return API.call(API_CONST.document.getChiTiet, params);
    };

	self.getDSFilePhaiNop = function(hoSoID) {
        var _params = {
            hoSoID: hoSoID
        };
        return API.call(API_CONST.document.getDSFilePhaiNop, _params);
    };

    self.getDSFileKQ = function(hoSoID) {
        var _params = {
            hoSoID: hoSoID
        };
        return API.call(API_CONST.document.getDSFileKQ, _params);
    };

    self.taoHoSo = function(params) {
      return API.call(API_CONST.document.taoHoSo, params);
    };

    self.capNhatHoSo = function(params) {
      return API.call(API_CONST.document.capNhatHoSo, params);
    };

    self.changeStatus=function(document,statusId){
      var deferred = $q.defer();
      if(CONST.MODE === 'demo'){
        if(statusId==2){
          document.MaTinhTrang=statusId;
          document.NgayGui=(new Date).getTime();
          document.NgayDangKy=(new Date).getTime();
          document.TenTinhTrang="ĐÃ GỬI";
        }


        return self.saveDocument(document,false);
      }
      else{

      }
      return deferred.promise;

    }

    self.createGuid = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };

    self.saveDocument = function(document, isAddNew) {
      document.NgayDangKy=(new Date).getTime();
      var deferred = $q.defer();
      if (CONST.MODE === 'demo') {
        if (true) {
          if (!isAddNew) {

            var listDetailDocument = JSON.parse($window.localStorage[API_CONST.document.getListDetail.objLocalStorageName]);
            //listDocument.forEach(function(ele){
            for (var i = 0; i < listDetailDocument.length; i++) {
              if (listDetailDocument[i].DocumentId == document.DocumentId) {
                listDetailDocument[i] = document;
              }
            }
            $window.localStorage[API_CONST.document.getListDetail.objLocalStorageName] = JSON.stringify(listDetailDocument);

            var listDocument=JSON.parse($window.localStorage[API_CONST.document.getList.objLocalStorageName]);
            for (var i = 0; i < listDocument.length; i++) {
              if (listDocument[i].DocumentId == document.DocumentId) {
                listDocument[i] = document;
              }
            }
            $window.localStorage[API_CONST.document.getList.objLocalStorageName] = JSON.stringify(listDocument);


            var listSenderInfo = JSON.parse($window.localStorage[API_CONST.document.getSenderInfoWithDocumentId.objLocalStorageName]);
            //listDocument.forEach(function(ele){
            for (var i = 0; i < listSenderInfo.length; i++) {
              if (listSenderInfo[i].DocumentId == document.DocumentId) {
                listSenderInfo[i] = document.ThongTinNguoiGui;
              }
            }
            $window.localStorage[API_CONST.document.getSenderInfoWithDocumentId.objLocalStorageName] = JSON.stringify(listSenderInfo);


            var listFilesAttach = JSON.parse($window.localStorage[API_CONST.document.getFilesAttachWithDocumentId.objLocalStorageName]);
            //listDocument.forEach(function(ele){
            for (var i = 0; i < listFilesAttach.length; i++) {
              if (listFilesAttach[i].DocumentId == document.DocumentId) {
                listFilesAttach[i].DanhSachFile = document.DanhSachFile;
              }
            }
            $window.localStorage[API_CONST.document.getFilesAttachWithDocumentId.objLocalStorageName] = JSON.stringify(listFilesAttach);

            deferred.resolve(true);
          } else {
						var listDocumentDetail = JSON.parse($window.localStorage[API_CONST.document.getListDetail.objLocalStorageName]);
						listDocumentDetail.push(document);
						$window.localStorage[API_CONST.document.getListDetail.objLocalStorageName] = JSON.stringify(listDocumentDetail);
						var listDocument = JSON.parse($window.localStorage[API_CONST.document.getList.objLocalStorageName]);
						document.TaiKhoanNguoiGui=document.ThongTinNguoiGui.TenDangNhap;
						document.TenNguoiGui=document.ThongTinNguoiGui.TenHienThi;
						listDocument.push(document);
						//$window.localStorage[API_CONST.document.getList.objLocalStorageName] = JSON.stringify(listDocumentDetail);

						$window.localStorage[API_CONST.document.getList.objLocalStorageName]= JSON.stringify(listDocument);

						var listSenderInfo = JSON.parse($window.localStorage[API_CONST.document.getSenderInfoWithDocumentId.objLocalStorageName]);
						listSenderInfo.push(document.ThongTinNguoiGui);
						$window.localStorage[API_CONST.document.getSenderInfoWithDocumentId.objLocalStorageName] = JSON.stringify(listSenderInfo);

						var FileAttach={
					    "DocumentId":document.DocumentId,
							"SoBienNhan": "",
							"MaTraCuu": "",
							"DanhSachFile":document.DanhSachFile
						};
						var listFilesAttach = JSON.parse($window.localStorage[API_CONST.document.getFilesAttachWithDocumentId.objLocalStorageName]);
						listFilesAttach.push(FileAttach);
						$window.localStorage[API_CONST.document.getFilesAttachWithDocumentId.objLocalStorageName] = JSON.stringify(listFilesAttach);
						deferred.resolve(true);
          }

        }
      }
      return deferred.promise;
    };
    self.getSenderInfoWithDocumentId = function(documentId) {
      var deferred = $q.defer();
      API.call(API_CONST.document.getSenderInfoWithDocumentId, {}).then(function(data) {
        data.forEach(function(ele) {
          if (ele.DocumentId == documentId) {
            deferred.resolve(ele);
          }
        });
      });
      return deferred.promise;
    }

    self.getRegiserAddressWithDocumentId = function(documentId) {
      var deferred = $q.defer();
      API.call(API_CONST.document.getRegiserAddressWithDocumentId, {}).then(function(data) {
        data.forEach(function(ele) {
          if (ele.DocumentId == documentId) {
            deferred.resolve(ele);
          }
        });
      });
      return deferred.promise;
    }
    self.getFilesAttachWithDocumentId = function(documentId) {
      var deferred = $q.defer();
      API.call(API_CONST.document.getFilesAttachWithDocumentId, {}).then(function(data) {
        data.forEach(function(ele) {
          if (ele.DocumentId == documentId) {
            deferred.resolve(ele);
          }
        });
      });
      return deferred.promise;
    }
    self.createObjDocument = function(ThuTuc) {
      if(CONST.MODE === 'demo'){
        if($window.localStorage[API_CONST.document.getListDetail.objLocalStorageName]==undefined){
          self.getDetail(0);
          self.getSenderInfoWithDocumentId(0);
          self.getRegiserAddressWithDocumentId(0);
  self.getFilesAttachWithDocumentId(0);
        }
      }

      var newDocument = {
        "DocumentId": self.createGuid(),
        "SoBienNhan": '',
        "MaTraCuu": '',
        "MaThuTuc": ThuTuc.MaThuTuc,
        "TenThuTuc": ThuTuc.TenThuTuc,
        "MaLinhVuc": ThuTuc.MaLinhVuc,
        "TenLinhVuc": ThuTuc.TenLinhVuc,
        "LePhi":ThuTuc.LePhi,
        "MieuTaLePhi":ThuTuc.MieuTaLePhi,
        "MaTinhTrang": 1,
        "TenTinhTrang": "CHƯA GỬI",
        "NgayDangKy": (new Date).getTime(),
        "NgayGui": null,
        "NgayTiepNhan": null,
        "NgayHenTra": null,
        "NoiDung": "",
        "KetQuaXuLy": "",
        "NguoiXuLy": "",
        "MaQuanHuyen": null,
        "MaPhuongXa": null,
        "MaDuong": null,
        "SoNha": null,
        "DiaChiDangKy": "Quận 1 - Hồ Chí Minh"
      };
      return newDocument
    }

    return self;
  }


})();
