(function (angular) {
    'use strict';

    //// JavaScript Code ////
    function TvSeriesCtrl($scope, $log, tvSeriesService) {

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

    function tvSeriesService($http, $log, CLIENT_ID) {
      var service = {
        getTvSeries : getTvSeries
      };

      return service;

      //////////////////////////////////////

      function getTvSeries() {
        return $http.get('https://api-v2launch.trakt.tv/shows/popular?extended=images,full', {
          headers: {
            'trakt-api-key' : CLIENT_ID
          }
        }).then(processTvShow);

        function processTvShow(res) {
          $log.debug('tvSeriesService: Got TV Shows from API', res);
          return res.data;
        }
      }
    }

    function isGenreFilter($log) {
      $log.debug('isGenreFilter: Created the filter');
      return function (input, genre) {
        if (!genre) {
            return input;
        } else {
            var out = [];
            for (var i = 0; i < input.length; i++) {
              if (input[i].genres.indexOf(genre) !== -1) {
                out.push(input[i]);
              }
            }
            return out;
        }
      };
    }

    //// Angular Code ////
    angular.module('tvSeriesApp', [])
      .constant('CLIENT_ID', 'e707d7a4f294acf3207768f86c8b8a5c9e84d13badd342dad324f735fa02e729')
      .factory('tvSeriesService', tvSeriesService)
      .filter('isGenre', isGenreFilter)
      .controller('TvSeries', TvSeriesCtrl);

})(angular);
