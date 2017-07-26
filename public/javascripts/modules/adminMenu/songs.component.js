/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('adminMenu').
component('songs', {
    templateUrl: '/components/adminMenu/songs',
    controller:['$cookies', function SongsController($cookies) {
        var data = $cookies.getObject('userData');
        this.userName = data.user.username;
        this.userEmail = data.user.email;
        this.EditBasic = function () {
            //
        }
    }]
});