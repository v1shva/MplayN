/**
 * Created by Vishva on 4/25/2017.
 */
angular.
module('player').
component('emoBar', {
    templateUrl: 'player/emobar.php',
    controller: function EmoController() {
        this.mood= [];
        this.mood["happy"] = true;
        this.currentMoods = ["happy"];

        this.handleClick = function handleClick(item){
            var currentMood = item.attributes["name"].value;
            if(this.currentMoods.indexOf(currentMood)===-1){ // check whether the current mood is already in the currentMoods arrray
                this.currentMoods.push(currentMood); // if not value is pushed to array
                this.mood[currentMood] = true;
            }
            if(this.currentMoods.length>3){
                var removeMood = this.currentMoods.shift();
                this.mood[removeMood] = false;
            }
            if()

        }


    }
});