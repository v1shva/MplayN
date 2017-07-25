'use strict';

angular.
module('core.song').
factory('Song', ['$resource','$cookies',
    function Song($resource, $cookies) {
        var loggedIn = $cookies.get('loggedIn');
        if(loggedIn) var token = $cookies.getObject('userData').token;
        return {
            getSongsByEmo : $resource('/api/song/byEmotion', {}, {
                get: {
                    method: 'GET',
                    params: {emotion: 'in-love'},
                    isArray: false
                }

            }),
            rateSong : $resource('/api/song/rateSong', {}, {
                get: {
                    method: 'POST',
                    headers: {'Authorization': token},
                    isArray: false
                }
            }),
            reportSong : $resource('/api/song/reportSong', {}, {
                get: {
                    method: 'POST',
                    headers: {'Authorization': token},
                    isArray: false
                }
            }),
            dislikeSong : $resource('/api/song/dislikeSong', {}, {
                get: {
                    method: 'POST',
                    headers: {'Authorization': token},
                    isArray: false
                }
            }),
            addNewSong : $resource('/api/song/addNew', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': token},
                    isArray: false
                }
            }),

        }
    }
]);
