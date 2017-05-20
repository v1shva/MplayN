/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('player').
component('playerMain', {
    templateUrl: '/components/player.php',
    controller: ['Song','$timeout', function PlayListController(Song, $timeout) {
        var elem = angular.element(document.querySelector('[ng-app]'));
        //get the injector.
        var injector = elem.injector();
        //get the service.
        var angularPlayer = injector.get('angularPlayer');

        var songs = [];
        //var res = Song.query();
        var res = Song.get({emotion: 'happy0'});
        res.$promise.then(function(data){
            data.items.forEach( function (song)
            {
                let filteredSong = (({ id, title, artist, url}) => ({ id, title, artist, url}))(song);
                songs.push(filteredSong);
                $timeout(function() {
                    angularPlayer.addTrack(filteredSong)
                }, 0);
            });
            songs = data.items;
        });

        this.songs = songs;

    }]
});