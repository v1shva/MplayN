'use strict';

angular.
module('core.song').
factory('Song', ['$resource','$cookies',
    function Song($resource, $cookies) {
        var getToken = function () {
            var loggedIn = $cookies.get('loggedIn');
            if(loggedIn) var token = $cookies.getObject('userData').token;
            else var token = "none"
            return token;
        };
        return {
            getSongsByEmo : $resource('/api/song/byEmotion', {}, {
                get: {
                    method: 'GET',
                    params: {emotion: 'in-love'},
                    isArray: false
                }

            }),
            rateSong : $resource('/api/song/rateSong', {}, {
                post: {
                    method: 'POST',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            reportSong : $resource('/api/song/reportSong', {}, {
                post: {
                    method: 'POST',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            dislikeSong : $resource('/api/song/dislikeSong', {}, {
                post: {
                    method: 'POST',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            addNewSong : $resource('/api/song/addNew', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),

        }
    }
]);
