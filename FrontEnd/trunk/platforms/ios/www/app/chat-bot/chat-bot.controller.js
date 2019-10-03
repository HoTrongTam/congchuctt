/**
 * @2017
 **/



(function() {
'use strict';


angular
    .module('FTravel.ChatBot')
    .controller('ChatBotCtrl', chatBotCtrl);

chatBotCtrl.$inject = [
    '$scope', '$rootScope', '$state', '$timeout',
    'CONST', 'LSFtr', 'Popup'
];

function chatBotCtrl(
    $scope, $rootScope, $state, $timeout,
    CONST, LSFtr, Popup
) {
    $scope.title = 'Chat bot';

    $scope.$on('$ionicView.loaded', function() {
    });

    $scope.$on('$ionicView.enter', function() {});

    $scope.$on('$ionicView.leave', function() {});

}


})();
