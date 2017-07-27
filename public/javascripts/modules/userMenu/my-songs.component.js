/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('userMenu').
component('mySongs', {
    templateUrl: '/components/userMenu/MySongs',
    controller:['$cookies','Song', function MySongsController($cookies, Song) {
        this.showLiked = true;
        var data = $cookies.getObject('userData');
        this.userName = data.user.username;
        this.userEmail = data.user.email;
        var controller = this;
        this.EditBasic = function () {
            //
        }
        
        this.getLikedSongs = function () {
            var res = Song.getLikedSongs.post();
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used
                dataRes.entities.forEach( function (song)
                {
                    getEmotionProperty(song);
                });
                controller.likedSongs = dataRes.entities;
            });
        };

        this.getDislikedSongs = function () {
            var res = Song.getDislikedSongs();
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used
                dataRes.entities.forEach( function (song)
                {
                    getEmotionProperty(song);
                });
                controller.likedSongs = dataRes.entities;
            });
        };

        this.getReportedSongs = function () {
            var res = Song.getReportedSongs.post();
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used
                dataRes.entities.forEach( function (song)
                {
                    getEmotionProperty(song);
                });
                controller.likedSongs = dataRes.entities;
            });
        };

        this.getUploadedSongs = function () {
            var res = Song.getUploadedSongs.post();
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used
                dataRes.entities.forEach( function (song)
                {
                    getEmotionProperty(song);
                });
                controller.likedSongs = dataRes.entities;
            });
        };

        function getEmotionProperty(obj) {
            var re = new RegExp("0$"), key;
            obj.moods = [];
            for (key in obj)
                if (re.test(key)) {
                    key.concat(": rank=");
                    key.concat(obj[key]);
                    obj.moods.push(key.concat)
                }
            return null; // This should not be possible
        };

        this.getLikedSongs();
        this.getDislikedSongs();
        this.getReportedSongs();
        this.getUploadedSongs();
    }]
});