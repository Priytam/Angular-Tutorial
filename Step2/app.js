(function (angular) {
    'use strict';

    //// JavaScript Code ////
    function TvSeriesCtrl($scope, $http, $log) {
      var clinet_id = 'e707d7a4f294acf3207768f86c8b8a5c9e84d13badd342dad324f735fa02e729';

      $http.get('https://api-v2launch.trakt.tv/shows/popular?extended=images,full', {
        headers: {
          'trakt-api-key' : clinet_id
        }
      }).then(saveTvShows).catch(displayError);

      function saveTvShows(res) {
        $log.debug('TvSeries: Got TV Shows from API', res);
        $scope.tvSeries = res.data;
      }

      function displayError(err) {
        $log.error('TvSeries: Error during fetching TV Shows from API', err);
        alert('Error during fetching TV Shows from API');
      }
    }


    //// Angular Code ////
    angular.module('tvSeriesApp', []).controller('TvSeries', TvSeriesCtrl);

})(angular);
