/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('player').
component('playerMain', {
    templateUrl: '/components/player.php',
    controller: ['Song','$timeout','Emotion', function PlayListController(Song, $timeout, Emotion) {

        var elem = angular.element(document.querySelector('[ng-app]'));
        //get the injector.
        var injector = elem.injector();
        //get the service.
        var angularPlayer = injector.get('angularPlayer');

        var songs = [];
        var getSongsByEmotion = function (selectedEmotion) {
            var res = Song.get({emotion: selectedEmotion});
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used
                var dataRes = dataRes;
                console.log(dataRes.items);
                $timeout(function() {
                    angularPlayer.clearPlaylist(function(data) {
                        //add songs to playlist
                        dataRes.items.forEach( function (song)
                        {
                            let filteredSong = (({ id, title, artist, url}) => ({ id, title, artist, url}))(song);
                            songs.push(filteredSong);
                            $timeout(function() {
                                angularPlayer.addTrack(filteredSong)
                            }, 0);
                        });
                        songs = dataRes.items;
                        angularPlayer.play();

                    });
                }, 0);


            });
        }
        getSongsByEmotion('happy0');
        var subscription = Emotion.subscribe(function onNext(d) {
            console.log(d);
            getSongsByEmotion(Emotion.get());
        });

        this.songs = songs;

    }]
});