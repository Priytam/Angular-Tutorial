(function (angular) {
    'use strict';

    //// JavaScript Code ////
    function TvSeriesCtrl($scope) {
        $scope.tvSeries = ['Game Of Thrones', 'Suites', 'Dexter', 'Breaking Bed']
    }


    //// Angular Code ////
    angular.module('tvSeriesApp', []).controller('TvSeries', TvSeriesCtrl);

})(angular);
