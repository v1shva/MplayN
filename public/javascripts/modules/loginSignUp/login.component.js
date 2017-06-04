/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('loginSignUp').
component('login', {
    templateUrl: '/components/login',
    controller: ['User', function LoginController(User) {
        this.testValue = "Hello";
        this.username = "";
        this.password = "";
        this.auth = function () {
            var res = User.getUserByEmail.get({email:this.username});
            res.$promise.then(function(dataRes){
                //casting the retrieved song object appropriate object type, that can be used
                var dataRes = dataRes;
                console.log(dataRes.items);

            });
            console.log(this.username);
        }
    }]
});
