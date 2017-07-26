/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('userMenu').
component('mySongs', {
    templateUrl: '/components/userMenu/MySongs',
    controller:['$cookies', function MySongsController($cookies) {
        this.showLiked = true;
        var data = $cookies.getObject('userData');
        this.userName = data.user.username;
        this.userEmail = data.user.email;
        this.EditBasic = function () {
            //
        }
        
        this.getLikeSongs = function () {
            
        }
    }]
});