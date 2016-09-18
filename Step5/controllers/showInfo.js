(function () {
    'use strict';

    angular
        .module('tvSeriesApp')
        .controller('ShowInfo', ShowInfoCtrl);

    function ShowInfoCtrl($scope, $log, $routeParams, showInfo, showSessions) {
        $log.debug('ShowInfoCtrl: created for show ' + $routeParams.showId);
        $scope.showInfo = showInfo;
        $scope.showSessions = showSessions;
        $log.debug('ShowInfoCtrl: showInfo', showInfo);
        $log.debug('ShowInfoCtrl: showSessions', showSessions);

        for (var i = 0 ; i < showSessions.length ; i++) {
            showSessions[i].images.poster.thumb = showSessions[i].images.poster.thumb || 'images/imageNotFound.jpg';
        }
    }
})();
