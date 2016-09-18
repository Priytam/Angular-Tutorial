(function () {
    'use strict';

    angular
        .module('tvSeriesApp')
        .directive('showSeason', showSeason);

    function showSeason() {
        var directive = {
            scope: {
                session: '='
            },
            restrict: 'E',
            templateUrl : 'templates/sessionInfo.html'
        };
        return directive;

    }
})();