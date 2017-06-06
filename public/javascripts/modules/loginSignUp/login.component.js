/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('loginSignUp').
component('login', {
    templateUrl: '/components/login',
    controller: ['User','AuthDetails', function LoginController(User, AuthDetails) {
        this.testValue = "Hello";
        this.showSignIn = true;
        this.username = "";
        this.password = "";
        this.auth = function () {
            var res = User.authUser.get({email:this.username,password:this.password});
            res.$promise.then(function(dataRes){
                //casting the retrieved song object appropriate object type, that can be used
                if(dataRes.items.length ==1){
                    authData['status'] = 'Success';
                    authData['user'] = dataRes.items[0];
                }
                console.log(dataRes.items);

            });
            console.log(this.username);
        }
    }]
});
