/**
 * Created by Vishva on 4/4/2017.
 */
var songs;
$(document).ready(function(){
    $("#show").click(function(){
        $("#playlist").slideToggle();
    });
    var manualList = [{
        title:"Cro Magnon Man",
        artist:"The Stark Palace",
        mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
        oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
        poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
    }]
    songs = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    }, manualList , {
        swfPath: "jplayer",
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true
    });


});
