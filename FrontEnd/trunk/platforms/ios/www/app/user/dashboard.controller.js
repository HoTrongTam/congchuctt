
/**
 * Dashboard controller
 * ThanhTN
 * @2017
 **/



(function() {
'use strict';


angular
	.module('FTravel.user')
	.controller('DashboardCtrl', dashboardCtrl)
;

dashboardCtrl.$inject = [
	'$scope', '$rootScope', '$state', '$ionicSlideBoxDelegate','CitizenCameraFtr',
	'BriefManagementFtr'
];

function dashboardCtrl (
	$scope, $rootScope, $state, $ionicSlideBoxDelegate,CitizenCameraFtr,
	BriefManagementFtr
) {
	$scope.title = 'CÔNG DÂN ĐIỆN TỬ';

	$scope.$on('$ionicView.loaded', function() {
	});

	$scope.$on('$ionicView.enter', function() {
	});

	$scope.$on('$ionicView.leave', function() {
	});
	$scope.listPost=[];
	$scope.listBrief=[];
	$scope.onTapReport=function(item){
		$rootScope.detailReport=item;
		$state.go('app.detail-post', {
			'reportId': item.reportId
		});
	}
	//debugger;
	// BriefManagementFtr.getAllBrief().then(function(data){
	// 	//debugger;
	// 	$scope.listBrief=data;
	// });
	$scope.pageNumber=1;
	$scope.onLoadMore=false;
	CitizenCameraFtr.getAllPost({
		"page":$scope.pageNumber
	}
	).then(function(data){
		//debugger;
		$scope.listPost=data;
		if (data.length==5) {
			$scope.onLoadMore=true;

		}
	});

	$scope.addMoreItem=function(){

		$scope.pageNumber=$scope.pageNumber+1;
		$scope.onLoadMore=false;
		CitizenCameraFtr.getAllPost({
			"page":$scope.pageNumber
		}
		).then(function(data){

			//debugger;
			if (data.length==5) {
				$scope.onLoadMore=true;

			}
			data.forEach(function(ele){
				$scope.listPost.push(ele);
			});
		});
	}




	$scope.onAddPostTap=function(){
		$state.go('app.add-comment', {
			'reportId': 'new'
		});
	}
	$scope.onTapFollow=function(post){
		if(post.isFollowed==0){
			post.isFollowed=1;
		}else{
			post.isFollowed=0;
		}
		CitizenCameraFtr.updatePost(post);
	}



	$scope.onTapComment=function(post){
		$state.go('app.add-comment', {
			'reportId': post.reportId
		});
	}

	$scope.getClassImage=function(number){
		//debugger;
		if (number > 5) {

			return 'count-5 more';
		} else {
			return 'count-' + number;
		}
	}

	$scope.imageShowInGalary=[];

	$scope.show_imgcomment_fullscreen = function(b, idGallery, items) {
		//update items
		$scope.imageShowInGalary=items;
		$ionicSlideBoxDelegate.update();
      if (b) {
        var gal = document.getElementById(idGallery);
        gal.className += " show";
      } else {
        var gal = document.getElementById(idGallery);
        gal.className = gal.className.replace(" show", "");
      }
    };
	//start: thao
	$scope.nextSlide = function(sSlide) {
      $ionicSlideBoxDelegate.$getByHandle(sSlide).next();
    };
    $scope.prevSlide = function(sSlide) {
      $ionicSlideBoxDelegate.$getByHandle(sSlide).previous();
    };
	$scope.show_gallery_fullscreen = function(b, idGallery, items) {
		//update items
		//$ionicSlideBoxDelegate.update(); update lai slide
      if (b) {
        var gal = document.getElementById(idGallery);
        gal.className += " show";
      } else {
        var gal = document.getElementById(idGallery);
        gal.className = gal.className.replace(" show", "");
      }
    };
	//end: thao
}


})();
