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
        this.loginSuccess = true;
        this.loading = false;
        this.loginSuccess = true, this.loginMsg;
        var controller = this;

        // authentication function for the project
        this.auth = function () {
            var user = {email:this.email, password:this.password}
            var res = User.authUser.post(user);
            controller.loading = true;
            //$state.go('loading');
            res.$promise.then(function(dataRes){
                if(dataRes.success == true){
                    console.log(dataRes);
                    AuthDetails.set(dataRes);
                    $state.go('home');
                    controller.loading = false;
                    controller.loginSuccess = true;
                }
                else{
                    controller.loginSuccess = false;
                    controller.loginMsg = dataRes.msg;
                    console.log(controller.loginMsg);
                    controller.loading = false;
                }
            });

        }

        this.signUp = function () {
            var user = {email:this.signUpEmail, username: this.signUpUserName, password: this.signUpPassword, country: this.signUpCountry}
            var res = User.addNewUser.post(user);
            $state.go('loading');
            res.$promise.then(function(dataRes){
                console.log(dataRes);
                if(dataRes.success == true){
                    $state.go('signUpSuccess');
                }
                else{
                    $state.go('signUpError');
                }
                //$state.go('uploadSuccess');
            });
        }
        
        this.verifyUsername = function () {
            var res = User.getUserByUsername.post({username:this.signUpUserName});
            res.$promise.then(function(dataRes){
                if(dataRes.success == true){
                    controller.userFoundUsername = true;
                }
                else{
                    controller.userFoundUsername = false;
                }
            });
        }

        this.verifyEmail = function () {
            var res = User.getUserByEmail.post({email:this.signUpEmail});
            res.$promise.then(function(dataRes){
                if(dataRes.success == true){
                    controller.userFoundEmail = true;
                }
                else{
                    controller.userFoundEmail = false;
                }
            });
        }
    }]
});
