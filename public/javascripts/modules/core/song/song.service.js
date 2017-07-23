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
            getSongsByUserID : $resource('/api/song/byUser', {}, {
                get: {
                    method: 'GET',
                    params: {userID: '123'},
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
