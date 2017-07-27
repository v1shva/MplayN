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
            playCount : $resource('/api/song/playCount', {}, {
                post: {
                    method: 'POST',
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
            getLikedSongs : $resource('/api/song/getLikedSongs', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            getDislikedSongs : $resource('/api/song/getDislikedSongs', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            getReportedSongs : $resource('/api/song/getReportedSongs', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            getUploadedSongs : $resource('/api/song/getUploadedSongs', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            getAllReported : $resource('/api/song/getAllReported', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            deleteReported : $resource('/api/song/deleteReported', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),

        }
    }
]);
