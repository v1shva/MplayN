/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('player').
component('playerMain', {
    templateUrl: '/player.php',
    controller: function PlayListController() {

        this.songs = [
            {
                id: 'one',
                title: 'Rain',
                artist: 'Drake',
                url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
            },
            {
                id: 'two',
                title: 'Walking',
                artist: 'Nicki Minaj',
                url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/walking.mp3'
            },
            {
                id: 'three',
                title: 'Barrlping with Carl (featureblend.com)',
                artist: 'Akon',
                url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3'
            },
            {
                id: 'four',
                title: 'Angry cow sound?',
                artist: 'A Cow',
                url: 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3'
            },
            {
                id: 'five',
                title: 'Things that open, close and roll',
                artist: 'Someone',
                url: 'http://www.freshly-ground.com/data/audio/binaural/Things%20that%20open,%20close%20and%20roll.mp3'
            },
            {
                id: 'six',
                title: 'Summer Mix',
                artist: 'Someone',
                url: 'http://yt-files.com/yt-dd.php?id=UPftsIwGNoQ&hash=70d0d3a2411975488bf0ceef84384489&name=Feeling%20Happy%20%27%20Stay%20See%20Summer%20Mix%202015%20%E2%99%9B'
            }
        ];

    }
});