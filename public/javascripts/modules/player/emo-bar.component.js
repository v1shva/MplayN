/**
 * Created by Vishva on 4/25/2017.
 */
angular.
module('player').
component('emoBar', {
    templateUrl: 'player/emobar.php',
    controller: function EmoController() {
        this.handleClick = function(item){
            var id = item.attributes['data-name'].value;
            console.log(id);
        }


    }
});