/*
 * loader factory
 * @2017
 */


(function() {
'use strict';


angular
    .module('FTravel.factory')
    .service('Loader', loader)
;

loader.$inject = [
    '$ionicLoading', '$timeout', 'CONST'
];

function loader(
    $ionicLoading, $timeout, CONST
) {
    var self = this;
    self.count = 0;

    self.setTitle = function(title) {
        title = title;
    };

    self.show = function(title) {
        ++self.count;

        title = title || 'Đang tải...';
        $timeout(function() {
            $ionicLoading.show({
                template: '<p>' + title + '</p><ion-spinner></ion-spinner>'
            });
        }, 10);

      // $timeout(function () {
      // 	if(CONST.isLoading)
      // 		$ionicLoading.hide();
      // }, CONST.timeout);
    };

    self.hide = function() {
        if(self.count > 0) --self.count;

        if(self.count === 0) {
            $timeout(function() {
                $ionicLoading.hide();
            }, 10);
        }
    };

    return self;
};


})();
