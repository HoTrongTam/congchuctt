/*
 * document module
 */


(function() {
"use strict";


angular
    .module("FTravel.lichcongtac", [])
    .config(function($stateProvider) {

        $stateProvider

            .state("app.lichcongtac",{
				url: "/lichcongtac",
				cache: true,
				views: {
					"menuContent": {
						templateUrl: "app/lich-cong-tac/ds-lichcongtac.view.html",
						controller: "LichCongTacListCtrl"
					}
				}
			})
			.state("app.lichcongtaccanhan",{
				url: "/lichcongtaccanhan",
				cache: true,
				views: {
					"menuContent": {
						templateUrl: "app/lich-cong-tac/ds-lichcongtaccanhan.view.html",
						controller: "LichCongTacCaNhanListCtrl"
					}
				}
			})
            .state("app.chitietlichcongtac", {
                url: "/chitietlichcongtac",
                cache: false,
                params: { lichcongtacid: null, lichcongtaccnid: null },
                views: {
                    "menuContent": {
                        templateUrl: "app/lich-cong-tac/chitietlichcongtac.view.html",
                        controller: "ChiTietLichCongTacCtrls"
                    }
                }
            })

        ;

    });

})();
