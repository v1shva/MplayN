'use strict';

angular.
module('core.emotion').
factory('Emotion', [
    function() {
        var emotion='happy';
        return {
            getEmotion: function () {
                return emotion;
            },

            setEmotion: function (Emotion) {
                emotion = Emotion;
                //$rootScope.$broadcast("updates");
            }
        }
    }
]);
