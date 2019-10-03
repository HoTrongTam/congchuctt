/**
 * const module
 * @2017
 **/



(function() {
    'use strict';


    angular
        .module('FTravel.factory')
        .constant('API_CONST', {

            'user': {
                'getHDSD': {
                    functionUrl: 'getLinkHDSD',
                    service: '/master/',
                    method: 'GET'
                        // params
                        // - strAppCode
                },

                'getToken': {
                    functionUrl: 'getTokenDVC',
                    service: '/DVC/',
                    method: 'GET'
                        // params
                        // - strUserName
                },

                'logIn': {
                    functionUrl: 'LoginUserPortal.rest',
                    service: '/',
                    method: 'POST'
                    // params
                    // 	string screenname
                    // 	string password

                },
                'dangNhap': {
                    functionUrl: 'LoginUserPortal.rest',
                    service: '/',
                    method: 'GET',
                    json: 'res/json/DVC/user.json',
                    objLocalStorageName: 'lstUserLocal',
                    // params
                    // 	string username
                    // 	string password

                },

                'active': {
                    functionUrl: 'ActiveUserPortal.rest',
                    service: '/',
                    method: 'POST'
                    // params
					// "UserName": "string"
					// "MaXacThuc": "string"
                },

                'register': {
                    functionUrl: 'CreateUserPortal.rest',
                    service: '/',
                    method: 'POST'
                    // params
					// "UserName": "string",
					// "Password": "string",
					// "HoTen": "string",
					// "ChungMinhNhanDan": "string",
					// "MaSoThue": "string",
					// "TenDonVi": "string",
					// "LoaiTaiKhoan": true,
					// "SoDienThoai": "string",
					// "Email": "string",
					// "IsSendEmail": true
                },

				'getInfo': {
                    functionUrl: 'getThongTinKhachHang',
                    service: '/DVC/',
                    method: 'GET'
                        // params
                        // - userName
                },

                'doiMatKhau': {
                    functionUrl: 'ChangePassword',
                    service: '/DVC/',
                    method: 'GET'
                    // params
                    // encryptedText
                },

                'resetPassword': {
                    functionUrl: 'resetPasswordCongDan',
                    service: '/DVC/',
                    method: 'GET'
                    // params
                    // userName
                    // soDienThoai
                    // email
                }
            },


            'document': {
                'getDanhSach': {
                    functionUrl: 'getDanhSachHoSo',
                    service: '/DVC/',
                    method: 'POST'
                        // params
                        // "KhachHangID": 0,
                        // "SoBienNhan": "string",
                        // "MaTinhTrang": [],
                        // "MaTraCuu": "string",
                        // "NgayDangKyFrom": "2017-12-15T02:51:27.747Z",
                        // "NgayDangKyTo": "2017-12-15T02:51:27.747Z",
                        // "ThuTucID": 0,
                        // "ThuTucHanhChinhID": 0,
                        // "TenThuTucHanhChinh": "string",
                        // "DonViID": 0,
                        // "MaDonVi": "string",
                        // "TenDonVi": "string",
                        // "LinhVucID": 0,
                        // "MaLinhVuc": "string",
                        // "TenLinhVuc": "string",
                        // "StringTimKiem": '',
                        // "PageNum": 0,
                        // "PageSize": 0
                },

                'getChiTiet': {
                    functionUrl: 'getChiTietHoSo',
                    service: '/DVC/',
                    method: 'GET'
                        // params
                        // hoSoID:integer
                        // soBienNhan:string
                        // maTraCuu:string
                },

                'update': {
                    functionUrl: 'postLuuHoSo',
                    service: '/DVC/',
                    method: 'POST'
                        // params
                        // "Action"
                        // "HoSoID": 0,
                        // "ThuTucID": 0,
                        // "LinhVucID": 0,
                        // "DonViID": 0,
                        // "TinhTrang": "string",
                        // "NoiDung": "string",
                        // "TaiKhoanKhachHangID": 0,
                        // "DiaChiDangKy": "string",
                        // "SoNhaDangKy": "string",
                        // "DuongIDDangKy": 0,
                        // "PhuongIDDangKy": 0,
                        // "QuanIDDangKy": 0,
                        // "DungTenHoVaTen": "string",
                        // "DungTenGioiTinh": 0,
                        // "DungTenQuocTichID": 0,
                        // "DungTenNgaySinh": "string",
                        // "DungTenThangSinh": "string",
                        // "DungTenNamSinh": "string",
                        // "DungTenLoaiGiayToID": 0,
                        // "DungTenSoGiayToTuyThan": "string",
                        // "DungTenNgayCap": "2017-12-24T04:31:11.634Z",
                        // "DungTenNoiCap": "string",
                        // "DungTenHoKhauThuongTru": "string",
                        // "DungTenDienThoai": "string",
                        // "DungTenEmail": "string",
                        // "DNMaSoThue": "string",
                        // "DNTenKinhDoanh": "string",
                        // "DNTenVietTat": "string",
                        // "DNTenNuocNgoai": "string",
                        // "DNSoDKKD": "string",
                        // "DNNgayCapDKKD": "2017-12-24T04:31:11.634Z",
                        // "DNThongTinLienHe": "string",
                        // "DsHoSoKemTheo": [
                        // {
                        // "HoSoKemTheoID": 0,
                        // "TenHoSoKemTheo": "string",
                        // "UploadName": "string",
                        // "OriginalName": "string",
                        // "FileSize": 0,
                        // "GhiChu": "string",
                        // "Action": "string"
                        // }
                        // ]
                        // }
                },

                'getDSFilePhaiNop': {
                    functionUrl: 'getDanhSachChiTietHoSoPhaiNop',
                    service: '/DVC/',
                    method: 'GET'
                        // params
                        // hoSoID:integer
                },

                'getDSFileKQ': {
                    functionUrl: 'getChiTietHoSoDSFileKQXuLy',
                    service: '/1c/hoso/',
                    method: 'GET'
                        // params
                        // hoSoID:integer
                },

                'taoHoSo': {
                    functionUrl: 'TaoHoSo',
                    service: 'DVC/DVCService.svc/',
                    method: 'POST'
                        // params
                        // 	HoSo hoso
                },

                'capNhatHoSo': {
                    functionUrl: 'CapNhatHoSo',
                    service: 'DVC/DVCService.svc/',
                    method: 'POST'
                        // params
                        // 	HoSo hoso
                },

                'getList': {
                    functionUrl: 'DanhSachHoSo',
                    service: 'DVC/HoSoService.svc/',
                    method: 'GET',
                    params: {},
                    json: 'res/json/DVC/Danh sach ho so.json',
                    objLocalStorageName: 'ListDocuments',
                    // params
                },
                'getListDetail': {
                    functionUrl: '',
                    method: 'GET',
                    params: {},
                    json: 'res/json/DVC/Chitiethoso.json',
                    objLocalStorageName: 'ListDetailDocuments',
                },
                'getDetail': {
                    functionUrl: 'report/getType',
                    method: 'GET',
                    params: {}
                },
                'getSenderInfoWithDocumentId': {
                    functionUrl: 'report/getType',
                    method: 'GET',
                    params: {},
                    json: 'res/json/DVC/Chitiethoso_Thongtinnguoigui.json',
                    objLocalStorageName: 'ListSenderInfo',
                },
                'getRegiserAddressWithDocumentId': {
                    functionUrl: 'report/getType',
                    method: 'GET',
                    params: {},
                    json: 'res/json/DVC/Chitiethoso_Diachidangky.json',
                    objLocalStorageName: 'ListRegiserAddress'
                },
                'getFilesAttachWithDocumentId': {
                    functionUrl: 'report/getType',
                    method: 'GET',
                    params: {},
                    json: 'res/json/DVC/Chitiethoso_Filedangky.json',
                    objLocalStorageName: 'ListFilesAttach'
                },
                'getAllDistrict': {
                    functionUrl: '',
                    method: 'GET',
                    params: {},
                    json: 'res/json/DVC/DanhMuc/DMQuanHuyen.json',
                    objLocalStorageName: 'ListDistrict'
                },
                'getAllWard': {
                    functionUrl: '',
                    method: 'GET',
                    params: {},
                    json: 'res/json/DVC/DanhMuc/DMPhuongXa.json',
                    objLocalStorageName: 'ListWard'
                },
                'getAllStreet': {
                    functionUrl: '',
                    method: 'GET',
                    params: {},
                    json: 'res/json/DVC/DanhMuc/DMDuong.json',
                    objLocalStorageName: 'ListStreet'
                }
            },


            'procedure': {
                'getSLThuTuc': {
                    functionUrl: 'getSoLuongThuTucTheoDonVi',
                    service: '/DVC/',
                    method: 'POST'
                        // params
                        // "DonViID": 0,
                        // "MaDonVi": "string",
                        // "DonViCapChaID": 0,
                        // "PageNum": 0,
                        // "PageSize": 0
                },

                'getDanhSach': {
                    functionUrl: 'getDanhSachThuTuc',
                    service: '/DVC/',
                    method: 'POST'
                        // params
                        // "ThuTucID": 0,
                        // "DonViID": 0,
                        // "MaDonVi": "string",
                        // "TenDonVi": "string",
                        // "ThuTucHanhChinhID": 0,
                        // "TenThuTuc": "string",
                        // "LinhVucID": 0,
                        // "MaLinhVuc": "string",
                        // "TenLinhVuc": "string",
                        // "MucDo": [],
                        // "TimKiemKhongDau": "string",
                        // "PageNum": 0,
                        // "PageSize": 0
                },

                'getChiTiet': {
                    functionUrl: 'getChiTietThuTucTheoDonVi',
                    service: '/DVC/',
                    method: 'GET'
                        // params
                        // thuTucID:integer
                        // thuTucHanhChinhID:integer
                        // donViID:integer
                }
            },


            'master': {
                'uploadFile': {
                    functionUrl: 'UploadFilesDVC',
                    service: '/common/',
                    method: 'POST'
                        // params
                        // 	- appCode
                },

                'deleteFile': {
                    functionUrl: 'deleteFileDVC',
                    service: '/common/',
                    method: 'GET'
                        // params
                        // 	- filename
                },

                'getDSServer': {
                    functionUrl: 'getDSServerByApp',
                    service: '/common/',
                    method: 'GET',
                    base: 'http://118.69.175.111'
                        // params
                        // 	- appCode
                        // 	- customerCode
                        // 	- customerSiteCode
                        // 	- environmentCode
                },

                'getDSTinTuc': {
                    functionUrl: 'getDanhSachTinTuc',
                    service: '/DVC/',
                    method: 'POST'
                        // params
                        // "CreatedDateFrom": "2017-12-21T08:42:33.047Z",
                        // "CreatedDateTo": "2017-12-21T08:42:33.047Z",
                        // "PageNum": 0,
                        // "PageSize": 0
                },

                'getCTTinTuc': {
                    functionUrl: 'getChiTietTinTuc',
                    service: '/DVC/',
                    method: 'GET',
                    cache: true
                        // params
                        // "intTinTucID": "2017-12-21T08:42:33.047Z",
                },

                'getDSDonVi': {
                    functionUrl: 'getDonVi',
                    service: '/master/',
                    method: 'GET',
                    cache: true
                        // params
                        // intDonViID:integer
                        // intNhomDonViID:integer
                        // intDonViCapChaID:integer
                        // isPhongBan:integer
                },

                'getDSPhuongXa': {
                    functionUrl: 'getDSPhuongXaByHuyen',
                    service: '/master/',
                    method: 'GET',
                    cache: true
                        // params
                        // 	- quanHuyenID
                },

                'getDSQuanHuyen': {
                    functionUrl: 'getDSHuyenThiTPByTinh',
                    service: '/master/',
                    method: 'GET',
                    cache: true
                        // params
                        // - tinhThanhID
                },

                'getLoaiGiayTo': {
                    functionUrl: 'getLoaiGiayTo',
                    service: '/master/',
                    method: 'GET',
                    cache: false
                },

                'getLichCongTac': {
                    functionUrl: 'getLichCongTac',
                    service: '/DVC/',
                    method: 'GET',
                    cache: true
                },

                'getDanhSachTinhThanh': {
                    functionUrl: 'DanhSachThanhThanh',
                    service: 'DM/DMService.svc/',
                    method: 'GET',
                    json: 'res/json/DVC/DanhMuc/DMTinhThanh.json',
                    objLocalStorageName: 'ListProvince'
                        // params
                },

                /*
                	Danh sach Quoc Gia
                */
                'getDanhSachQuocGia': {
                    functionUrl: 'DanhSachQuocGia',
                    service: 'DM/DMService.svc/',
                    method: 'GET'
                        // params
                },

                /*
                	danh sach duong
                */
                'getDanhSachDuong': {
                    functionUrl: 'DanhSachDuong',
                    service: 'DM/DMService.svc/',
                    method: 'GET',
                    json: 'res/json/DVC/DanhMuc/DMDuong.json',
                    objLocalStorageName: 'ListStreet'
                        // params
                        // 	- phuongXaID
                },

                'getDSLinhVuc': {
                    functionUrl: 'getDSLinhVuc',
                    service: '/master/',
                    method: 'GET',
                    cache: true
                        // params
                        // "PageNum": 0,
                        // "PageSize": 0
                },

                'getGiaytotuythan': {
                    functionUrl: 'DMGiaytotuythan',
                    service: 'DM/DMService.svc/',
                    method: 'GET',
                    cache: true
                },

                'getQuocGia': {
                    functionUrl: 'getQuocGia',
                    service: 'DM/DMService.svc/',
                    method: 'GET',
                    json: 'res/json/DVC/DanhMuc/DMQuocGia.json',
                    objLocalStorageName: 'ListQuocGia'

                }
            },


            'report': {
                'addReport': {
                    name: 'addReport',
                    functionUrl: 'report/addReport',
                    method: 'POST',
                    params: {}
                },
                'getAllReport': {
                    name: 'getAllReport',
                    functionUrl: 'report/getreport',
                    method: 'GET',
                    params: {}
                }
            },


            'comment': {
                'addComment': {
                    name: 'addComment',
                    functionUrl: 'report/comment/add',
                    method: 'POST',
                    params: {
                        // username: Tên đăng nhập
                        // password: Mật khẩu
                    }
                },

                'getComment': {
                    name: 'getComment',
                    functionUrl: 'report/comment/get',
                    method: 'GET',
                    params: {
                        // username: Tên đăng nhập
                        // password: Mật khẩu
                    }
                }
            },

            'question': {
                'getDanhSachCauHoi': {
                    functionUrl: 'getDanhSachCauHoi',
                    service: '/DVC/',
                    method: 'POST'
                },
                'getChiTietCauHoi': {
                    functionUrl: 'getChiTietCauHoi',
                    service: '/DVC/',
                    method: 'GET'
                },
                'postLuuCauHoi': {
                    functionUrl: 'postLuuCauHoi',
                    service: '/DVC/',
                    method: 'POST'
                }
            }
        });



})();
