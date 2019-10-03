/*
* const module
* Auth: ThanhTN
* MTQ @2017
*/


(function() {
'use strict';



angular
	.module('FTravel.directive', [])
	// .directive('ionSelect', function (Helpers, $ionicScrollDelegate) {
	.directive('ionSelect', ionSelectFnc)
;

ionSelectFnc.$inject = [
	// '$ionicScrollDelegate'
];
function ionSelectFnc(
) {
	return{
		restrict: 'E',
		scope: {
			label: '@',
			labelField: '@',
			provider: '=?',
			ngModel: '=?',
			placeholder: '@',
			valueField: '@'
		},
		require: 'ngModel',
		transclude: false,
		replace: false,
		templateUrl: 'app/common/views/select_search.html',
		link: function (scope, ele, attrs, ngModelCtrl) {
			var labelField = scope.labelField || 'id';
			var valueField = scope.valueField || scope.labelField;
			var selectedItem = {};
			scope.searchString = '';
			if (scope._provider) {
				var i=0, len = scope.provider.length;
				for(; i < len; ++i) {
					if (scope.provider[i][valueField] == scope.ngModel) {
						selectedItem = scope.provider[i];
						scope.searchString = scope.ngModel[labelField];
						break;
					}
				}
			}
			scope.selecionar = function (item) {
				selectedItem = item;
				ngModelCtrl.$setViewValue(item[valueField]);
				scope.searchString = item[labelField];
				//$ionicScrollDelegate.scrollBy(0,ele[0].offsetTop);
				scope.showHide = false;
			};

			scope.open = function () {
				scope.searchString = selectedItem[labelField];
				// $ionicScrollDelegate.resize();
				scope.searchAll = true;
				return (scope.showHide = !scope.showHide);
			};

			scope.myFilter = function (item) {
				if (scope.searchAll)
					return true;
				var temp = Helpers.removeUnicode((item[labelField] || '').toLowerCase());
				var string = Helpers.removeUnicode(scope.searchString.toLowerCase());
				return temp.search(string) > -1;
			};

			scope.onKeyUp = function () {
				scope.searchAll = false;
				scope.showHide = !scope.searchString ? false:true;
			};

			scope.$watch('ngModel', function () {
				if (!scope.ngModel) {
					scope.searchString = '';
					selectedItem = {};
				}
			});

		}
	};
}


})();
