/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('adminMenu').
component('users', {
    templateUrl: '/components/adminMenu/users',
    controller:['$cookies','Users', function UsersController($cookies, Users) {
        var controller = this;
        this.getUsers = function () {
            var res = Users.getAllUsers.post();
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used
                controller.users = dataRes.entities;
            });
        }
        this.getUsers();
    }]
});