'use strict';

angular.
module('core.song').
factory('Song', ['$resource',
    function Song($resource) {
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
                    isArray: false
                }
            }),

        }
    }
]);
