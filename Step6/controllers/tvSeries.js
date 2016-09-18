(function () {
    'use strict';

    angular
        .module('tvSeriesApp')
        .controller('TvSeries', TvSeriesCtrl);

    function TvSeriesCtrl($scope, $log, tvSeriesService) {
        $log.debug('TvSeriesCtrl: created');
        tvSeriesService.getTvSeries().then(saveTvShows).catch(displayError);

        function saveTvShows(shows) {
            $log.debug('TvSeries: Got TV Shows from API', shows);
            $scope.tvSeries = shows;
            $scope.allGenres = [];
            for (var i = 0; i < shows.length; i++) {
                for (var j = 0; j < shows[i].genres.length; j++) {
                    if ($scope.allGenres.indexOf(shows[i].genres[j].toLowerCase()) === -1) {
                        $scope.allGenres.push(shows[i].genres[j].toLowerCase());
                    }
                }
            }
        }

        function displayError(err) {
            $log.error('TvSeries: Error during fetching TV Shows from API', err);
            alert('Error during fetching TV Shows from API');
        }
    }
})();
