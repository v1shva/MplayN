/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('adminMenu').
component('songs', {
    templateUrl: '/components/adminMenu/songs',
    controller:['Song', function SongsController( Song) {
        var controller = this;
        controller.songs = "";
        this.getSongs = function () {
            var res = Song.getAllReported.post();
            res.$promise.then(function(dataRes){
                console.log(dataRes);
                controller.songs = dataRes.items;
            });
        }


        this.checkedSongs = [];
        this.checked = function (item) {
            if(item.checked) this.checkedSongs.push(item.attributes["name"].value);
            else {
                var index = this.checkedSongs.indexOf(item.attributes["name"].value);
                if (index > -1) {
                    this.checkedSongs.splice(index, 1);

                }
            }
        }

        this.deleteSongs = function () {
            $(".modal-backdrop").hide();
            $state.go('loading');
            var res = Song.deleteReported.post({songs: this.checkedSongs});
            res.$promise.then(function(dataRes){
                $state.go('adminSongs');
            });
        }
    }]
});