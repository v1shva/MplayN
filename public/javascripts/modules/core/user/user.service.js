'use strict';

angular.
module('core.user').
factory('User', ['$resource',
    function User($resource) {
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

        }
    }
]);
