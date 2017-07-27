/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('adminMenu').
component('users', {
    templateUrl: '/components/adminMenu/users',
    controller:['$cookies','User', function UsersController($cookies, User) {
        this.users = "";
        var controller = this;
        this.getUsers = function () {
            var res = User.getAllUsers.post();
            console.log(controller.users);
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used
                controller.users = dataRes.items;
                console.log(controller.users);
            });
        }
        this.getUsers();
        this.checkedUsers = [];
        this.checked = function (item) {
            this.checkedUsers.push(item.attributes["name"].value);
        }
    }]
});