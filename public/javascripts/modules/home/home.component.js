/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('home').
component('home', {
    templateUrl: '/components/home',
    controller: ['AuthDetails', function HomeController() {
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
    }]

});
