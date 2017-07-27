/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('adminMenu').
component('songs', {
    templateUrl: '/components/adminMenu/songs',
    controller:['Song', function SongsController( Song) {

        this.getSongs = function () {
            var res = Song.getAllReported.post();
            res.$promise.then(function(dataRes){
                controller.users = dataRes.items;

            });
        }
    }]
});