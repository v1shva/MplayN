'use strict';

angular.
module('core.user').
factory('User', ['$resource',
    function User($resource) {
        return {
            getUserByEmail : $resource('/api/user/byUserEmail', {}, {
                get: {
                    method: 'GET',
                    params: {email: '',},
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
