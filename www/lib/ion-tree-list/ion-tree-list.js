"use strict";
/* global angular */

var CONF = {
    baseUrl: 'lib/ion-tree-list',
    digestTtl: 35
};

function addDepthToTree(obj, depth, collapsed) {
    for (var key in obj) {
        if (obj[key] && typeof(obj[key]) == 'object') {
            obj[key].depth = depth;
            obj[key].collapsed = collapsed = false;
            addDepthToTree(obj[key], key === 'congviecs' ? ++ depth : depth, collapsed)
        }
    }
    return obj;
}

function toggleCollapse(obj) {
    for (var key in obj) {
        if (obj[key] && typeof(obj[key]) == 'object') {
            obj[key].collapsed = !obj[key].collapsed;
            toggleCollapse(obj[key]);
        }
    }
    return obj;
}

angular.module('ion-tree-list', [], ['$rootScopeProvider', function($rootScopeProvider){
    $rootScopeProvider.digestTtl(CONF.digestTtl);
}])
.directive('ionTreeList', [function() {
    return {
        restrict: 'E',
        scope: {
            items: '=',
            collapsed: '=',
            templateUrl: '@',
            showReorder: '='
            //templateUrl:''
        },
        templateUrl: CONF.baseUrl + '/ion-tree-list.tmpl.html',
        controller: ['$scope', function($scope) {
            $scope.baseUrl = CONF.baseUrl;

            $scope.toggleCollapse = function(item) {
                if (item && item.collapsible !== false) {
                    toggleCollapse(item);
                }
            };
            $scope.getClassStatusHXL=function(tinhtrangquahan){
              //debugger;
             //  if(item.TrangThai=='C'){
             //    return '';
             //  }else{
             //    var today =new Date((new Date()).setHours(0, 0, 0, 0));
          			// var twoDayAfter=new Date(today);
          			// twoDayAfter.setDate(twoDayAfter.getDate()+2);
          			// if((today-item.HanXuLy)>0){
          			// 	return 'status-1';
          			// }else{
          			// 	if((twoDayAfter-item.HanXuLy)>=0 && (item.HanXuLy-today) >=0){
          			// 		return 'status-2';
          			// 	}else{
          			// 		return 'status-3';
          			// 	}
          			// }
             //  }

              if(tinhtrangquahan=== -1){
                return 'status-1';
              }else if(tinhtrangquahan===0){
                return 'status-2';
              }
              else if(tinhtrangquahan===1){
                return 'status-3';
              }
              else
                return '';

            }

            $scope.emitEvent = function(item){
                $scope.$emit('$ionTreeList:ItemClicked', item)
            };

            $scope.moveItem = function(item, fromIndex, toIndex) {
                $scope.items.splice(fromIndex, 1);
                $scope.items.splice(toIndex, 0, item)
            };

            $scope.$watch('collapsed', function() {
                $scope.toggleCollapse($scope.items);
            });

            $scope.$watch('items', function() {
                $scope.items = addDepthToTree($scope.items, 1, $scope.collapsed);
                $scope.$emit('$ionTreeList:LoadComplete', $scope.items);
            })
        }],
        compile: function(element, attrs){
          //debugger;
            attrs.templateUrl = attrs.templateUrl ? attrs.templateUrl : 'item_default_renderer';
        }
    }
}]);
