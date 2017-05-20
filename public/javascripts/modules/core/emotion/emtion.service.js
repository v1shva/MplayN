'use strict';

angular.
module('core.emotion').
factory('Emotion', [
    function() {
        this.emotion = "";

        this.getEmotion = function () {
            return this.emotion;
        };

        this.setEmotion = function (emo) {
            this.emotion= emo;
        };
    }
]);
