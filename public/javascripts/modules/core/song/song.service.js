'use strict';

angular.
module('core.song').
factory('Song', ['$resource',
    function($resource) {
        return $resource('/api/song', {}, {
            query: {
                method: 'GET',
                params: {phoneId: 'phones'},
                isArray: true
            }
        });
    }
]);
