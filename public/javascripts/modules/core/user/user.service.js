'use strict';

angular.
module('core.user').
factory('User', ['$resource', '$cookies',
    function User($resource, $cookies) {
        var getToken = function () {
            var loggedIn = $cookies.get('loggedIn');
            if(loggedIn) var token = $cookies.getObject('userData').token;
            else var token = "none"
            return token;
        };

        return {
            getUserByEmail : $resource('/api/user/byUserEmail', {}, {
                post: {
                    method: 'POST',
                    isArray: false
                }
            }),
            getUserByUsername : $resource('/api/user/byUsername', {}, {
                post: {
                    method: 'POST',
                    isArray: false
                }
            }),
            authUser  : $resource('/api/user/authUser', {}, {
                post: {
                    method: 'POST',
                    isArray: false
                }
            }),
            addNewUser : $resource('/api/user/addNew', {}, {
                post: {
                    method: 'post',
                    isArray: false
                }
            }),
            updateUser : $resource('/api/user/updateUser', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            getAllUsers : $resource('/api/user/getAllUsers', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            deleteUsers : $resource('/api/user/deleteUsers', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            makeAdmin : $resource('/api/user/makeAdmin', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
            makeMod : $resource('/api/user/makeMod', {}, {
                post: {
                    method: 'post',
                    headers: {'Authorization': getToken},
                    isArray: false
                }
            }),
        }


    }
]);
