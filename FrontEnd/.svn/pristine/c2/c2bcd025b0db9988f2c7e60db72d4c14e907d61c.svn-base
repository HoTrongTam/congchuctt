/**
 * document detail controller
 * @2017
 **/

(function() {
    'use strict';


    angular
        .module('FTravel.document')
        .controller('DocumentDetailCtrl', documentDetailCtrl);

    documentDetailCtrl.$inject = [
        '$scope', '$state', 'File', '$ionicModal',
        'CONST', 'DocumentFtr', 'MasterFtr', 'API',
        'ProcedureFtr', 'UserFtr', '$q', 'Native', 'Popup', 'Datetime'
    ];

    function documentDetailCtrl(
        $scope, $state, File, $ionicModal,
        CONST, DocumentFtr, MasterFtr, API,
        ProcedureFtr, UserFtr, $q, Native, Popup, Datetime
    ) {
        $scope.title = 'Chi tiết hồ sơ';

        $scope.dt = Datetime;
        $scope.strDiaChiDangKy = "";

        $scope.hoSoID = $state.params.id;
        // $scope.hoSo = $state.params.hoSo;
        $scope.hoSoID = $state.params.id;
        $scope.soBienNhan = $state.params.soBienNhan;
        $scope.maTraCuu = $state.params.maTraCuu;
        $scope.thuTuc = $state.params.thuTuc;
        $scope.mode = $state.params.mode;

        // $scope.detail = {};
        $scope.form = {};
        $scope.DsHoSoKemTheo = [];
        $scope.filesKetQua = [];
        $scope.dsLoaiGiayTo = [];

        $scope.phuongXaSet_inst = null;
        $scope.dsPhuongXa = [];
        $scope.phuongXaSelected = {
            'TenPhuongXa': '',
            'PhuongXaID': null
        };

        $scope.quanHuyenSet_inst = null;
        $scope.dsQuanHuyen = [];
        $scope.quanHuyenSelected = {
            'TenQuanHuyen': '',
            'QuanHuyenID': null
        };

        $scope.loaiGiayToSet_inst = null;
        $scope.dsLoaiGiayTo = [];
        $scope.loaiGiayToSelected = {
            'TenLoaiGiayTo': '',
            'LoaiGiayToID': null
        };

        $scope.roleEdit = !false;

        $scope.getMaster = function() {
            // huyen
            //$scope.dsQuanHuyen = [];
            MasterFtr.getDSQuanHuyen().then(function(rep) {
                //$scope.dsQuanHuyen = rep;
                var data = rep || [];
                for (var i = 0; i < data.length; i++) {
                    var item = {
                        "value": data[i].QuanHuyenID,
                        "text": data[i].TenQuanHuyen
                    }
                    $scope.dsQuanHuyen.push(item);
                }
            }, null);

            MasterFtr.getLoaiGiayTo().then(function(rep) {
                $scope.dsLoaiGiayTo = rep;
                // $scope.loaiGiayToSet_inst.setVal($scope.form.DungTenLoaiGiayToID);
            }, null);
        };

        $scope.getDetail = function() {

            if ($scope.mode === 'detail') {
                var _params = {
                    hoSoID: $scope.hoSoID,
                    soBienNhan : $scope.soBienNhan || '',
                    maTraCuu :  $scope.maTraCuu || ''
                        // soBienNhan : $scope.hoSo.SoBienNhan || '',
                        // maTraCuu : $scope.hoSo.MaTraCuu || ''
                };
                DocumentFtr.getChiTiet(_params).then(function(rep) {
                    // $scope.detail = rep || {};
                    $scope.form = rep || {};
                    if($scope.form.HoSoID != null) {
                        $scope.form.birthday = new Date(
                            $scope.form.DungTenNamSinh + '-' +
                            $scope.form.DungTenThangSinh + '-' +
                            $scope.form.DungTenNgaySinh
                        );
                        if (isNaN($scope.form.birthday.getTime())) {
                            $scope.form.birthday = null;
                        }
                        $scope.strDiaChiDangKy = $scope.getStringConvert($scope.form.SoNhaDangKy, $scope.form.TenPhuongXaDangKy, $scope.form.TenQuanHuyenDangKy);
                        $scope.roleEdit = (rep.TinhTrang === 'VTN' || rep.TinhTrang === 'BSH');
                        $scope.$broadcast('scroll.refreshComplete');
    
                        $scope.roleEdit&&$scope.getMaster();
                    }
                    else {
                        Popup.w("Không tìm thấy hồ sơ hợp lệ", function() {
                            $state.go("app.home");
                        });
                    }
                }, function(err) {
                    Popup.e(err);
                    $scope.$broadcast('scroll.refreshComplete');
                });
                //console.log($scope.form.TenPhuongXaDangKy);
                DocumentFtr.getDSFilePhaiNop($scope.hoSoID).then(function(rep) {
                    // $scope.form.DsHoSoKemTheo = rep || [];
                    $scope.DsHoSoKemTheo = rep || [];
                }, function(err) {
                    Popup.e(err);
                });

                DocumentFtr.getDSFileKQ($scope.hoSoID).then(function(rep) {
                    $scope.filesKetQua = rep || [];
                }, function(err) {
                    Popup.e(err);
                });
            } else {
                $scope.roleEdit = true;
                $scope.form = DocumentFtr.initHoSo($scope.thuTuc);
                $scope.form.birthday = new Date(
                    $scope.form.DungTenNamSinh + '-' +
                    $scope.form.DungTenThangSinh + '-' +
                    $scope.form.DungTenNgaySinh
                );
                // $scope.loaiGiayToSelected = {
                //     'TenLoaiGiayTo': '', 'LoaiGiayToID': null
                // };
                // $scope.quanHuyenSelected = {
                //     'TenQuanHuyen': '', 'QuanHuyenID': null
                // };
                // $scope.phuongXaSelected={
                //     'TenPhuongXa': '', 'PhuongXaID': null
                // };
                $scope.form.DiaChiDangKy = $scope.form.SoNhaDangKy + ',' +
                    $scope.quanHuyenSelected.TenQuanHuyen + ',' +
                    $scope.phuongXaSelected.TenPhuongXa;
                $scope.strDiaChiDangKy = $scope.getStringConvert($scope.form.SoNhaDangKy, $scope.form.TenPhuongXaDangKy, $scope.form.TenQuanHuyenDangKy);
                $scope.DsHoSoKemTheo = $scope.form.DsHoSoKemTheo;

				$scope.getMaster();
            }
            // console.log();
        };

        $scope.addfile = function(file, item) {
            if (file.length > 0) {
                var formdataFile = new FormData();
                formdataFile.append('filedata', file[0]);
                MasterFtr.uploadFile(formdataFile).then(function(rep) {
                    if (rep) {
                        // $scope.DsHoSoKemTheo.push(rep[0]);
                        item.Action = 'ADD';
                        item.UploadName = rep[0].UploadName;
                        item.OriginalName = rep[0].OriginalName;
                        item.FileSize = rep[0].FileSize;

                        $scope.update('DRAFT');

                        Popup.t('Tải file lên thành công.');
                    }
                }, function(err) {
                    Popup.e(err);
                });
            }
        };

        $scope.delfile = function(file) {
            MasterFtr.deleteFile(file.UploadName).then(function(rep) {
                file.Action = 'REMOVE';
                $scope.update('DRAFT');

                Popup.t('Xoá file thành công.');
            }, function(err) {
                Popup.e(err);
            });
        };

        $scope.doRefresh = function() {
            // $scope.mode = 'detail';
            $scope.detail = {};

            $scope.getDetail();
        };
        $scope.getStringConvert = function(str1, str2, str3) {
            var str = "";
            if (str1)
                str = str1;
            if (str2) {
                if (str)
                    str += "," + str2;
                else
                    str = str2
            }

            if (str3) {
                if (str)
                    str += "," + str3;
                else
                    str = str3
            }
            return str;
        };

        $scope.update = function(status) {
            // validation
            $scope.form.Action = status;
            if ($scope.form.Action === 'SUBMIT' && ($scope.quanHuyenSelected.QuanHuyenID == null || $scope.phuongXaSelected.PhuongXaID == null)) {
                Popup.e("Chưa chọn phường xã/quận huyện!")
            } else {
                if ($scope.form.Action === 'SUBMIT') $scope.form.TinhTrang = 'THS';
                $scope.form.DungTenLoaiGiayToID = $scope.loaiGiayToSelected.LoaiGiayToID;
                $scope.form.QuanIDDangKy = $scope.quanHuyenSelected.QuanHuyenID;
                $scope.form.PhuongIDDangKy = $scope.phuongXaSelected.PhuongXaID;
                $scope.form.DiaChiDangKy = $scope.quanHuyenSelected.TenQuanHuyen;
                $scope.strDiaChiDangKy = $scope.getStringConvert($scope.form.SoNhaDangKy, $scope.quanHuyenSelected.TenQuanHuyen, $scope.phuongXaSelected.TenPhuongXa);
                var t = moment($scope.form.birthday);
                //var x = moment($scope.form.birthday);
                $scope.form.DungTenNgaySinh = t.format('DD');
                $scope.form.DungTenThangSinh = t.format('MM');
                $scope.form.DungTenNamSinh = t.format('YYYY');
                if ($scope.form.DungTenNgayCap)
                    $scope.form.DungTenNgayCap = new Date();

                $scope.form.DsHoSoKemTheo = $scope.DsHoSoKemTheo;

                DocumentFtr.update($scope.form).then(function(rep) {
                    // console.log(JSON.stringify(rep));
                    // $scope.form.HoSoID = rep.HoSoID;
                    // doRefresh
                    if (rep) {
                        $scope.mode = 'detail';
                        $scope.hoSoID = rep.HoSoID;
                        $scope.doRefresh();
                    }
                }, function(err) {
                    Popup.e(err)
                });

                if ($scope.customerEditModal) $scope.customerEditModal.hide();
                if ($scope.diaChiEditModal) $scope.diaChiEditModal.hide();
            }

        };

        $scope.saveToProfile = false;

        $scope.customerEditModal = null;
        $scope.diaChiEditModal = null;
        $scope.onEditChanged = function(name, item) {
            //$scope.getMaster();
            switch (name) {
                case 'edit-dung-ten':
                    if (!$scope.customerEditModal) {
                        $ionicModal.fromTemplateUrl('app/quan-ly-ho-so/customer-edit.modal.html', {
                            scope: $scope
                        }).then(function(modal) {
                            $scope.customerEditModal = modal;
                            $scope.customerEditModal.show();
                            $scope.loaiGiayToSet_inst.setVal($scope.form.DungTenLoaiGiayToID, true);
                        });
                    } else{
                        $scope.loaiGiayToSet_inst.setVal($scope.form.DungTenLoaiGiayToID, true);
                        $scope.customerEditModal.show();
                    }

                    break;
                case 'edit-dia-chi':
                    if (!$scope.diaChiEditModal) {
                        $ionicModal.fromTemplateUrl('app/quan-ly-ho-so/dia-chi-edit.modal.html', {
                            scope: $scope
                        }).then(function(modal) {
                            $scope.diaChiEditModal = modal;
                            $scope.diaChiEditModal.show();

                            // $scope.quanHuyenSet_inst.setVal($scope.form.QuanIDDangKy, true);
                            // $scope.phuongXaSet_inst.setVal($scope.form.PhuongIDDangKy, true);
                        });
                    } else {
                        // $scope.quanHuyenSet_inst.setVal($scope.form.QuanIDDangKy, true);
                        // $scope.phuongXaSet_inst.setVal($scope.form.PhuongIDDangKy, true);
                        $scope.diaChiEditModal.show();
                    }
                    break;
            }
        };

        $scope.getCodeName = function(item) {
            if (!item || !item.MaTraCuu)
                return 'Chưa cấp số BN';
            return item.MaTraCuu + " | " + item.SoBienNhan;
        };

        $scope.documentDetail = {};
        $scope.tempRegister = {}
        $scope.tempUserInfor = {}
        $scope.tempRegister.SoNha = '';
        $scope.isShowSenderInfo = false;
        $scope.onShowSenderInfoBtnTap = function(isShow) {
            $scope.isShowSenderInfo = isShow;
        }
        $scope.isShowRegisterAddress = false;
        $scope.onShowRegisterAddressBtnTap = function(isShow) {
            $scope.isShowRegisterAddress = isShow;
        }
        $scope.LstGiayToTuyThan = [];
        $scope.selectedGiayToTuyThan = {};

        $scope.getFileType = function(filename) {
            if (filename) {
                var _ext = filename.split('.').slice(-1)[0].toLowerCase();
                switch (_ext) {
                    case 'pdf':
                        return 'pdf';
                    case 'jpge':
                    case 'jpg':
                    case 'png':
                        return 'image';
                    case 'doc':
                    case 'docx':
                        return 'word';
                    case 'xls':
                    case 'xlsx':
                        return 'excel';
                    case 'ppt':
                    case 'pptx':
                        return 'powerpoint';
                    default:
                        return 'alltype';
                }
            }
        };

        $scope.provinceId = 63;
        $scope.listDistrictRegisterAddress = [];
        $scope.listWardRegisterAddress = []
        $scope.listStreetRegisterAddress = [];
        $scope.listDistrict = [];
        $scope.listWard = []
        $scope.listStreet = [];
        $scope.selectedWard = {};
        $scope.selectedDistrict = {};
        $scope.selectedStreet = {};

        $scope.ApplyToUserProfile = false;
        $scope.onCheckboxChange = function(isCheck) {
            $scope.ApplyToUserProfile = isCheck;
        }

        $scope.selectedProvinceRegisterAddress = {};
        $scope.selectedDistrictRegisterAddress = {};
        $scope.selectedWardRegisterAddress = {};
        $scope.selectedStreetRegisterAddress = {};
        $scope.showFullConntent = function(title, content) {
            Popup.showContent($scope, title, content, true);
        };
        $scope.onDocumentItemTapped = function(item) {};

        $scope.openFile = function(fileName, fileID) {
            var _url = encodeURI(API.base + '/common/DownLoadFileDVC?fileName=' + fileID);
            File.open2(_url, fileName);
        };

        $scope.changeSex = function(type) {
            $scope.form.DungTenGioiTinh = type;
        }
        $scope.updateCustomer = function() {
            $scope.customerEditModal.hide();
        };

        $scope.updateDiaChi = function() {
            $scope.diaChiEditModal.hide();
        };

        var now = new Date(),
            minDate = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate()),
            maxDate = new Date(now.getFullYear() + 30, now.getMonth(), now.getDate());

        $scope.setDatetime = {
            theme: 'mobiscroll',
            display: CONST.isTablet ? 'bubble' : 'center',
            lang: 'vi',
            headerText: 'Chọn ngày tháng',
            // timeWheels: 'HHii',
            min: minDate,
            max: maxDate,
            onSet: function(event, inst) {
                // console.log('sdasd');
            }
        };

        $scope.quanHuyenSet = {
            lang: 'vi',
            theme: 'mobiscroll',
            filter: true,
            display: CONST.isTablet ? 'bubble' : 'center',
            placeholder: "Chọn Quận/Huyện",
            // dataText: 'TenQuanHuyen',
            // dataValue: 'QuanHuyenID',
            data: $scope.dsQuanHuyen,
            headerText: 'Chọn Quận/Huyện',
            onInit: function(event, inst) {
                $scope.quanHuyenSet_inst = inst;
            },
            onSet: function(event, inst) {
                $scope.quanHuyenSelected = {
                    'TenQuanHuyen': event.valueText,
                    'QuanHuyenID': inst.getVal()
                };
                MasterFtr.getDSPhuongXa($scope.quanHuyenSelected.QuanHuyenID).then(function(rep) {
                    //$scope.dsPhuongXa = rep;
                    var data = rep || [];
                    for (var i = 0; i < data.length; i++) {
                        var item = {
                            "value": data[i].PhuongXaID,
                            "text": data[i].TenPhuongXa
                        }
                        $scope.dsPhuongXa.push(item);
                    }
                    //$scope.dsPhuongXa = dstemp;
                }, null);

                $scope.phuongXaSet_inst.clear();
            }
        };

        $scope.phuongXaSet = {
            lang: 'vi',
            theme: 'mobiscroll',
            filter: true,
            display: CONST.isTablet ? 'bubble' : 'center',
            placeholder: "Chọn Phường/Xã",
            // dataText: 'TenPhuongXa',
            // dataValue: 'PhuongXaID',
            data: $scope.dsPhuongXa,
            headerText: 'Chọn Phường/Xã',
            onInit: function(event, inst) {
                $scope.phuongXaSet_inst = inst;
            },
            onSet: function(event, inst) {
                $scope.phuongXaSelected = {
                    'TenPhuongXa': event.valueText,
                    'PhuongXaID': inst.getVal()
                };
            }
        };

        $scope.loaiGiayToSet = {
            lang: 'vi',
            theme: 'mobiscroll',
            filter: !true,
            display: CONST.isTablet ? 'bubble' : 'center',
            placeholder: "Chọn...",
            dataText: 'TenLoaiGiayTo',
            dataValue: 'LoaiGiayToID',
            headerText: 'Chọn Phường/Xã',
            onInit: function(event, inst) {
                $scope.loaiGiayToSet_inst = inst;
            },
			onBeforeShow: function (event, inst) {
                // Your custom event handler goes here
            },
            onSet: function(event, inst) {
                $scope.loaiGiayToSelected = {
                    'TenLoaiGiayTo': event.valueText,
                    'LoaiGiayToID': inst.getVal()
                };
            }
        };


        $scope.filesKetQuaSet_inst = null;
        $scope.filesKetQuaSelected = {};
        $scope.filesKetQuaSet = {
            lang: 'vi',
            theme: 'mobiscroll',
            // display: CONST.isTablet ? 'bubble' : 'center',
            display: 'center',
            headerText: 'Tệp kết quả',
            // buttons: [],
            dataText: 'OriginalName',
            dataValue: 'UploadName',
            onInit: function(event, inst) {
                $scope.filesKetQuaSet_inst = inst;
            },
            onSet: function(event, inst) {
                $scope.filesKetQuaSelected = {
                    'OriginalName': event.valueText,
                    'UploadName': inst.getVal()
                };
                // console.log(inst.getVal());
                $scope.openFile(event.valueText, inst.getVal());
            }
        };

        // $scope.showFilesKetQua = function() {
        //     $scope.filesKetQuaSet_inst.show();
        // };

        $scope.$on('$ionicView.loaded', function() {});

        $scope.$on('$ionicView.enter', function() {
            // $scope.getMaster();
            $scope.doRefresh();
        });

        $scope.$on('$ionicView.leave', function() {
            if ($scope.customerEditModal) $scope.customerEditModal.remove();
            if ($scope.diaChiEditModal) $scope.diaChiEditModal.remove();
        });

        // $scope.showBtnPickImg = !false;
        // if( ionic.Platform.isIOS() ){
        //   $scope.showBtnPickImg=true;
        // }
        // $scope.getImgageFromGalary = function(item) {
        //   Native.getImgageFromGalary().then(function(results){
        //     if(results.length>0){
        //       item.FilleUrl = results[0];
        //     }
        //   });
        // }

    }


})();
