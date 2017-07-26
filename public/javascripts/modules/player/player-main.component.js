/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('player').
component('playerMain', {
    templateUrl: '/components/player.php',
    controller: ['Song','$timeout','Emotion','$cookies', function PlayListController(Song, $timeout, Emotion, $cookies) {
        this.emotionSelected = false;
        this.mood = [];
        this.currentMoods = [];
        this.moodString = "";

        var elem = angular.element(document.querySelector('[ng-app]'));
        //get the injector.
        var injector = elem.injector();
        //get the service.
        var angularPlayer = injector.get('angularPlayer');

        var songs = [];
        var getSongsByEmotion = function (selectedEmotion) {
            var res = Song.getSongsByEmo.get({emotion: selectedEmotion});
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
                                angularPlayer.addTrack(filteredSong);
                                angularPlayer.playTrack(songs[0].id);

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
        this.checkLoggedIn = function () {
            var data = $cookies.getObject('userData');
            if(data) this.loggedIn = true;
        }

        this.EmoBarInput = function handleClick(item) {
            console.log('here');
            this.emotionSelected = true;
            var currentMood = item.attributes["name"].value;
            var index = this.currentMoods.indexOf(currentMood);
            if (index === -1) { // check whether the current mood is already in the currentMoods arrray
                this.currentMoods.push(currentMood); // if not value is pushed to array
                this.mood[currentMood] = true;
            }
            else if (this.currentMoods.length > 1) {
                this.mood[currentMood] = false;
                this.currentMoods.splice(index, 1);
            }
            if (this.currentMoods.length > 3) {
                var removeMood = this.currentMoods.shift();
                this.mood[removeMood] = false;
            }
            var currentMoodString = "";
            var currentMoodsCp = this.currentMoods.slice();
            currentMoodsCp.sort();
            currentMoodsCp.forEach(function (emotion) {
                currentMoodString += emotion.concat('0');
            })
            this.moodString = currentMoodString;
            this.displayMoodString = this.moodString.replace(/0/g, "  ");
        }

        this.rateSong = function () {
            var currentSong =  {id: angularPlayer.currentTrackData().id};
            songs.forEach( function (song)
            {
               if(currentSong.id === song.id) currentSong = song;

            });
            if(currentSong[this.moodString]<0) currentSong[this.moodString] -= 1;
            else currentSong[this.moodString] = -1;
            console.log(currentSong);
            var res = Song.rateSong.post(currentSong);
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used

                console.log(dataRes);
                //$state.go('uploadSuccess');
            });
            //this.moodString
        }

        this.dislikeSong = function () {
            var currentSong =  {id: angularPlayer.currentTrackData().id};
            var res = Song.rateSong.post(currentSong);
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used

                console.log(dataRes);
                //$state.go('uploadSuccess');
            });
            //this.moodString
        }

        this.reportSong = function () {
            var currentSong =  {id: angularPlayer.currentTrackData().id};
            var res = Song.rateSong.post(currentSong);
            res.$promise.then(function(dataRes){
                //casting the retrieved song object apropriate object type, that casn be used
                console.log(dataRes);
                //$state.go('uploadSuccess');
            });
            //this.moodString
        }
    }]
});