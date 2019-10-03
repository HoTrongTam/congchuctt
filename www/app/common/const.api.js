/**
 * const module
 * @2017
 **/



(function () {
    'use strict';


    angular
        .module('FTravel.factory')
        .constant('API_CONST', {

            'user': {
                'logIn': {
                    functionUrl: 'Login',
                    service: '/DesktopModules/MobileServiceDnn/API/ServiceMobile/',
                    method: 'POST'
                    // params
                    // 	string screenname
                    // 	string password

                },

                'active': {
                    functionUrl: 'ActiveUserPortal.rest',
                    service: '/post/',
                    method: 'POST'
                    // params
                    // "UserName": "string"
                    // "MaXacThuc": "string"
                },

                'register': {
                    functionUrl: 'CreateUserPortal.rest',
                    service: '/post/',
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
                    functionUrl: 'userID=',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/Mobile_CANBO_GetById?',
                    method: 'GET'
                    // params
                    // - userName
                },
                'getPermissions': {
                    functionUrl: 'CheckPermissions',
                    service: '/DesktopModules/MobileServiceDnn/API/ServiceMobile/',
                    method: 'POST'

                },
                'layDanhbacc': {
                    functionUrl: 'hoTen=',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/Mobile_DanhBa_GetPaged?',
                    method: 'GET'
                    //   params
                    // - userName

                },
                'chitietDanhba': {
                    functionUrl: 'UserID=',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/Mobile_DanhBa_GetById?',
                    method: 'GET'
                    //   params
                    // - userName

                },

                'updateInfo': {
                    functionUrl: 'UpdateUserPortal.rest',
                    service: '/post/',
                    method: 'POST'
                    // userid: 69996,
                    // fullname: 'Nguyễn Thành Quang',
                    // mobile: '0905164410',
                    // email: 'hanvu.aob12@gmail.com',
                    // sex: 1,							// 1 = Nam, 2 = Nữ
                    // birthday: '28/07/2017',
                    // othernumber: 'Chứng minh nhân dân',
                    // identity: '168331377',
                    // iddateofissue: '28/07/2017',
                    // idplaceofissuse: 'CA TP Hồ Chí Minh'
                },

                'doiMatKhau': {
                    functionUrl: 'ChangePassword',
                    service: '/DesktopModules/MobileServiceDnn/API/ServiceMobile/',
                    method: 'POST'
                    // screenname
                    // password
                },

                'resetPassword': {
                    functionUrl: 'ForgotPasswordUserPortal.rest',
                    service: '/post/',
                    method: 'POST'
                    // type
                    //screenname
                },

                'updateForgetPassword': {
                    functionUrl: 'SetNewPasswordUserPortal.rest',
                    service: '/post/',
                    method: 'POST'
                    // tempcode
                    // password
                },
                //save anh dai dien
                'saveavatar': {
                    functionUrl: 'Mobile_saveFileImage',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                },
                //fire base xử lý công việc
                'registerFireBaseXLCV': {
                    functionUrl: 'Mobile_UpdateInfoFireBase',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                },
                'sendFireBaseXLCV': {
                    functionUrl: 'Mobile_SendInfoFireBase_ByUserID',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                }
            },

            'xulyvanban': {
                'timkiemvanban': {
                    functionUrl: 'timkiemvanban.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'timkiemhoso': {
                    functionUrl: 'timkiemhosochuaxuly.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'timkiemchidao': {
                    functionUrl: 'timkiemchidao.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'chitietvanban': {
                    functionUrl: 'chitietvanbanden.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'quatrinhxulyvanbanden': {
                    functionUrl: 'quatrinhxulyvanbanden.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'quatrinhxulyvanbandi': {
                    functionUrl: 'quatrinhxulyvanbandi.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'tiendovanbanden': {
                    functionUrl: 'tiendovanbanden.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'tiendovanbandi': {
                    functionUrl: 'tiendovanbandi.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'luutiendovanbanden': {
                    functionUrl: 'luutiendovanbanden.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'luutiendovanbandi': {
                    functionUrl: 'luutiendovanbandi.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'chuyenxulyvanbanden': {
                    functionUrl: 'chuyenxulyvanbanden.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'timkiemnguoinhanxulyvanbanden': {
                    functionUrl: 'timkiemnguoinhanxulyvanbanden.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'timkiemphongbannhanxulyvanbanden': {
                    functionUrl: 'timkiemphongbannhanxulyvanbanden.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'loadnguoinhantralaivanbanden': {
                    functionUrl: 'loadnguoinhantralaivanbanden.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'tralaivanbanden': {
                    functionUrl: 'tralaivanbanden.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'chitietvanbandi': {
                    functionUrl: 'chitietvanbandi.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'taifilevanbandi': {
                    functionUrl: 'taifilevanbandi.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'taifilevanbanden': {
                    functionUrl: 'taifilevanbanden.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'loadnguoinhanxulyvanbandi': {
                    functionUrl: 'loadnguoinhanxulyvanbandi.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'chuyenxulyvanbandi': {
                    functionUrl: 'chuyenxulyvanbandi.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'loadnguoinhantralaivanbandi': {
                    functionUrl: 'loadnguoinhantralaivanbandi.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'tralaivanbandi': {
                    functionUrl: 'tralaivanbandi.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'loadnguoinhanxulyvanbandi': {
                    functionUrl: 'loadnguoinhanxulyvanbandi.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'chitiethosochuaxuly': {
                    functionUrl: 'chitiethosochuaxuly.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'quatrinhxulyhosochuaxuly': {
                    functionUrl: 'quatrinhxulyhosochuaxuly.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'hosokemtheohosochuaxuly': {
                    functionUrl: 'hosokemtheohosochuaxuly.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'loadnguoinhanchuyenxulyhoso': {
                    functionUrl: 'loadnguoinhanchuyenxulyhoso.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'chuyenxulyhoso': {
                    functionUrl: 'chuyenxulyhoso.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'loadnguoinhantralaihoso': {
                    functionUrl: 'loadnguoinhantralaihoso.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'tralaihoso': {
                    functionUrl: 'tralaihoso.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'chitietchidao': {
                    functionUrl: 'chitietchidao.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'taifilevanbanchidao': {
                    functionUrl: 'taifilevanbanchidao.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'tiendoxulychidao': {
                    functionUrl: 'tiendoxulychidao.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'nguoinhannhacnho': {
                    functionUrl: 'nguoinhannhacnho.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'luunhacnhochidao': {
                    functionUrl: 'luunhacnhochidao.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
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
            'lichcongtac':
            {
                'postLichCongTacUyBan': {
                    functionUrl: 'timkiemlichuyban.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST',
                    cache: true
                },
                'postFileChiTietLich': {
                    functionUrl: 'taifilelichcongtac.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST',
                    cache: true
                },
                'getLichCongTacUyBan': {
                    functionUrl: 'chitietlichuyban.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET',
                    cache: false
                },
                'postLichCongTacCaNhan': {
                    functionUrl: 'timkiemlichcanhan.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST',
                    cache: true
                },
                'getLichCongTacCaNhan': {
                    functionUrl: 'chitietlichcanhan.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET',
                    cache: true
                }
            },
            'pakiennghi': {
                'getdanhsachpa': {
                    functionUrl: 'Mobile_TK_PHANANHKIENNGHI_GetDanhSachPhanAnh_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'gethoidappa': {
                    functionUrl: 'Mobile_TK_PHANANHKIENNGHI_GetByHoiDapID',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                }
            },
            'thongke':
            {
                'getThongKeVanBanDen': {
                    functionUrl: 'Mobile_TKVBDEN_PHONG_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'getThongKeXuLyHoSo': {
                    functionUrl: 'Mobile_TK_HOSO_LINHVUC_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'getThongKeXuLyHoSoChiTietLinhVuc': {
                    functionUrl: 'Mobile_TK_HOSO_CHITIETLINHVUC_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'getThongKeVanBanDi': {
                    functionUrl: 'Mobile_TKVBDI_PHONG_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'getThongKeVanBanDi': {
                    functionUrl: 'Mobile_TKVBDI_PHONG_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'getThongKePhanAnhKienNghi': {
                    functionUrl: 'Mobile_TK_PHANANHKIENNGHI_PHONG_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'getThongKeXuPhatHanhChinh': {
                    functionUrl: 'Mobile_TK_XPHC_LINHVUC_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'getThongKeCongViecDaGiao': {
                    functionUrl: 'Mobile_TK_CongViecDaGiao_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'getThongKeDanhGiaHaiLong': {
                    functionUrl: 'ThongKeDonVi_HaiLong_TheoTieuChi6',
                    service: '/api/stp/',
                    method: 'POST'
                },
                'getThongKeGiaiQuyetDonThu': {
                    functionUrl: 'Mobile_TK_GiaiQuyetDonThu_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },

                //// Thống kê chuyên ngành
                // Thống kê tinh hinh cap phep kinh te
                'getThongKeTinhHinhCapPhepKinhTe': {
                    functionUrl: 'Mobile_TKCN_KinhTeCapPhep_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                // Thống kê địa bàn kinh tế
                'getThongKeDiaBanKinhTe': {
                    functionUrl: 'Mobile_TKCN_KinhTeDiaBan_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                //Thong ke nganh nghe kinh te
                'getThongKeNganhNgeKinhTe': {
                    functionUrl: 'Mobile_TKCN_KinhTeNganhNghe_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                //Thong ke tinh hinh cap phep xay dung
                'getThongKeCapPhepXayDung': {
                    functionUrl: 'Mobile_TKCN_XayDungCapPhep_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },

                //Thong ke dien tich xay dung
                'getThongKeDienTichXayDung': {
                    functionUrl: 'Mobile_TKCN_XayDungDienTich_ListBasic',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: true
                },
                'thongkeViecDaNhan':{
                    functionUrl: 'Mobile_HanhChinh_GiaoViec_ThongKe_DaNhanByNguoiNhanID',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: false
                },
                'thongkeViecDaGiao':{
                    functionUrl: 'Mobile_HanhChinh_GiaoViec_ThongKe_DaGiaoByNguoiGiaoID',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET',
                    cache: false
                }

            },
            'tracuu':
            {
                /////////////////// Tra cứu
                // Tra cuu ho so
                'tktracuuhoso': {
                    functionUrl: 'tracuuhoso.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                    //   params
                    // - userName

                },
                // Chi tiet tra cuu ho so
                'cttracuuhoso': {
                    functionUrl: 'chitiethosotracuu.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // xu ly tra cuu ho so
                'xltracuuhoso': {
                    functionUrl: 'quatrinhxulyhosotracuu.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // ho so kem theo tra cuu ho so
                'hskttracuuhoso': {
                    functionUrl: 'hosokemtheohosotracuu.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // tra cuu van ban den
                'tktracuuvanbanden': {
                    functionUrl: 'tracuuvanbanden.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                    //   params
                    // - userName

                },
                // chi tiet tra cuu van ban den
                'cttracuuvanbanden': {
                    functionUrl: 'chitietvanbandentracuu.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // xu ly tra cuu van ban den
                'xltracuuvanbanden': {
                    functionUrl: 'quatrinhxulyvanbandentracuu.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // tai file tra cuu van ban den
                'filetracuuvanbanden': {
                    functionUrl: 'taifilevanbanden.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                    //   params
                    // - userName

                },
                // tra cuu van ban di
                'tktracuuvanbandi': {
                    functionUrl: 'tracuuvanbandi.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                    //   params
                    // - userName

                },
                // chi tiet tra cuu van ban di
                'cttracuuvanbandi': {
                    functionUrl: 'chitietvanbanditracuu.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // xu ly tra cuu van ban di
                'xltracuuvanbandi': {
                    functionUrl: 'quatrinhxulyvanbanditracuu.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // file tra cuu van ban di
                'filetracuuvanbandi': {
                    functionUrl: 'taifilevanbandi.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                    //   params
                    // - userName

                },
                // tra cuu chi dao
                'tktracuuchidao': {
                    functionUrl: 'tracuuchidao.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                    //   params
                    // - userName

                },
                // chi tiet van ban tra cuu chi dao
                'cttracuuchidao': {
                    functionUrl: 'chitietvanbantracuuchidao.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // xu ly tra cuu van ban chi dao
                'xltracuuchidao': {
                    functionUrl: 'tiendoxulytracuuchidao.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                    //   params
                    // - userName

                },
                // file van ban tra cuu chi dao
                'filetracuuchidao': {
                    functionUrl: 'taifilevanbanchidao.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                    //   params
                    // - userName
                }
            },

            'thongbao':
            {
                'dsthongbao': {
                    functionUrl: 'Mobile_THONGBAONOIBO_GetPaged',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET'

                },

                //////
                'ctthongbao': {
                    functionUrl: 'Mobile_THONGBAONOIBO_GetById',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET'

                },
                // lay file thong bao dinh kem
                'layfiledinhkem': {
                    functionUrl: 'Mobile_getFileImageDownLoad',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET'
                    //   params
                    // - userName

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
            'giaoviec': {
                'timkiemchidaogiaoviec': {
                    functionUrl: 'timkiemchidaogiaoviec.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'chitietchidaogiaoviec': {
                    functionUrl: 'chitietchidaogiaoviec.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'taifilevanbanchidao': {
                    functionUrl: 'taifilevanbanchidao.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'tiendoxulychidaogiaoviec': {
                    functionUrl: 'tiendoxulychidaogiaoviec.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'loadnguoinhannhacnhochidaogiaoviec': {
                    functionUrl: 'loadnguoinhannhacnhochidaogiaoviec.rest',
                    service: '/mobilecc-service/rest/action/get/',
                    method: 'GET'
                },
                'luunhacnhochidaogiaoviec': {
                    functionUrl: 'luunhacnhochidaogiaoviec.rest',
                    service: '/mobilecc-service/rest/action/post/',
                    method: 'POST'
                },
                'getDSGiaoViecDuocGiao': {
                    functionUrl: 'Mobile_HanhChinh_DuocGiaoViec_GetByNguoiNhanID',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET'
                },
                'getChiTietDuocGiao':{
                    functionUrl: 'Mobile_HanhChinh_GiaoViec_GetByGiaoViecID',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET'
                },
                'getDSGiaoViecDaGiao': {
                    functionUrl: 'Mobile_HanhChinh_GiaoViec_GetByNguoiGiaoID',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET'
                },
                'getChiTietDaGiao':{
                    functionUrl: 'Mobile_HanhChinh_GiaoViec_GetChiTietByGiaoViecID',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'GET'
                },
                'saveChiTietGiaoViec':{
                    functionUrl: 'Mobile_HanhChinh_GiaoViec_ChiTiet_Update',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                },
                'completeChiTietGiaoViec':{
                    functionUrl: 'Mobile_HanhChinh_GiaoViec_ChiTietHoanThanh_Update',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                },
                'uploadFile':{
                    functionUrl: 'Mobile_UpLoadGiaoViec',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                },
                'downloadFile':{
                    functionUrl: 'Mobile_DownLoadGiaoViec',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                },
                'createSaveGiaoViec':{
                    functionUrl: 'Mobile_HanhChinh_GiaoViec_Insert',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                },
                'createGiaoViec':{
                    functionUrl: 'HanhChinh_GiaoViec_Update',
                    service: '/Services-Mobile/HanhChinhService.svc/HC/',
                    method: 'POST'
                }
            }
        });



})();
