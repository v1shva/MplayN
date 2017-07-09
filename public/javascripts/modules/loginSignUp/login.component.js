/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('loginSignUp').
component('login', {
    templateUrl: '/components/login',
    controller: ['User','$state', 'AuthDetails', function LoginController(User, $state, AuthDetails) {
        this.testValue = "Hello";
        this.showSignIn = true;
        this.email = "";
        this.password = "";
        this.auth = function () {
            var user = {email:this.email, password:this.password}
            var res = User.authUser.post(user);
            $state.go('loading');
            res.$promise.then(function(dataRes){
                
                console.log(dataRes);
                AuthDetails.set(dataRes);
                $state.go('uploadSuccess');
            });
        }
        this.signUp = function () {
            var user = {email:this.signUpEmail, username: this.signUpUserName, password: this.signUpPassword}
            var res = User.addNewUser(user);
            $state.go('loading');
            res.$promise.then(function(dataRes){
                console.log(dataRes);
                $state.go('uploadSuccess');
            });
        }

    }]
});
