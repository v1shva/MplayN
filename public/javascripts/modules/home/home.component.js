/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('home').
component('home', {
    templateUrl: '/components/home',
    controller: ['AuthDetails', function HomeController(AuthDetails) {
        this.testValue = "Hello";
        var subscription = AuthDetails.subscribe(function onNext(d) {
            console.log(d);
            if(d.success){
                this.loggedIn = true;
                this.userEmail = d.user.email;
                this.userImageURL = d.user.imageURL;
                this.userName = d.user.username;
            }
        });
/*        var s = Snap("#svg");
// Lets create big circle in the middle:
        var bigCircle = s.circle(150, 150, 100);*/
    }]

});
