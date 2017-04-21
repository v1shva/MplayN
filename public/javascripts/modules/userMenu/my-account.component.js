/**
 * Created by Vishva on 4/20/2017.
 */
'use strict';
angular.
module('userMenu').
component('myAccount', {
    templateUrl: '/components/userMenuMain',
    controller: function UserMenuController() {
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