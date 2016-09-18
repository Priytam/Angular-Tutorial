(function () {
    'use strict';

    angular
        .module('tvSeriesApp')
        .factory('tvSeriesService', tvSeriesService);

    function tvSeriesService($http, $log, CLIENT_ID) {
        var api_base = 'https://api-v2launch.trakt.tv/';
        var service = {
            getTvSeries : getTvSeries,
            getTvShowInfo:  getTvShowInfo,
            getTvShowSessions : getTvShowSessions
        };

        return service;

        //////////////////////////////////////

        function getTvSeries() {
            return $http.get(api_base + 'shows/popular?extended=images,full', {
                headers: {
                    'trakt-api-key' : CLIENT_ID
                }
            }).then(processResponse).catch(createErrorMessage('Failed to get Popular Shows'))
        }

        function getTvShowInfo(showId) {
            return $http.get(api_base + 'search?id_type=trakt-show&id=' + showId, {
                headers: {
                    'trakt-api-key' : CLIENT_ID
                }
            }).then(processResponse)
                .then(extractShow)
                .catch(createErrorMessage('Failed to get Show Info'));

            function extractShow(array) {
                return array[0].show;
            }
        }
        function getTvShowSessions(showId) {
            return $http.get(api_base + 'shows/' + showId + '/seasons?extended=images,full', {
                headers: {
                    'trakt-api-key' : CLIENT_ID
                }
            }).then(processResponse).catch(createErrorMessage('Failed to get Sessions'))
        }

        function processResponse(res) {
            $log.debug('tvSeriesService: Got response from API', res);
            return res.data;
        }

        function createErrorMessage(msg) {
            return function processError(err) {
                $log.error('tvSeriesService: Error from API', err);
                alert(msg);
                return err;
            }
        }
    }
})();
