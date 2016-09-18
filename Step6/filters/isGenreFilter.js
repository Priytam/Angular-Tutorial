(function () {
    'use strict';

    angular
        .module('tvSeriesApp')
        .filter('isGenre', isGenreFilter)

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
})();