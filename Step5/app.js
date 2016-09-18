(function (angular) {
    'use strict';

    //// JavaScript Code ////
    function configRoutes($routeProvider) {
        console.log('config: $routeProvider configed');
        $routeProvider.when('/show/:showId',{
            templateUrl: 'templates/showInfo.html',
            controller : 'ShowInfo',
            resolve: {
                showInfo : getShowInfo,
                showSessions : getShowSession
            }
        }).when('/',{
            templateUrl: 'templates/selectShow.html'
        }).otherwise({redirectTo: '/' });
    }

    function getShowInfo($log, tvSeriesService, $route) {
        $log.debug('Resolve: getShowInfo called');
        return tvSeriesService.getTvShowInfo($route.current.params.showId);
    }

    function getShowSession($log, tvSeriesService, $route) {
        $log.debug('Resolve: getShowSession called');
        return tvSeriesService.getTvShowSessions($route.current.params.showId);
    }

    //// Angular Code ////
    angular.module('tvSeriesApp', ['ngRoute', 'angular-loading-bar', 'ngAnimate'])
        .constant('CLIENT_ID', 'e707d7a4f294acf3207768f86c8b8a5c9e84d13badd342dad324f735fa02e729')
        .config(configRoutes);

})(angular);
