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
                name: 'Nexus S',
                snippet: 'Fast just got faster with Nexus S.'
            }, {
                name: 'Motorola XOOM™ with Wi-Fi',
                snippet: 'The Next, Next Generation tablet.'
            }, {
                name: 'MOTOROLA XOOM™',
                snippet: 'The Next, Next Generation tablet.'
            }
        ];
    }
});