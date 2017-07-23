/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('userMenu').
component('myAccount', {
    templateUrl: '/components/userMenu/MyAccount',
    controller:['$cookies', function UserMenuController($cookies) {
        var data = $cookies.getObject('userData');
        this.userName = data.user.username;
        this.userEmail = data.user.email;

    }]
});