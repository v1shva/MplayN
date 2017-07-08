'use strict';

// Define the `phonecatApp` module
var MPlayApp = angular.module('MPlayApp', [
    // ...which depends on the MPlayApp module
    'player',
    'core',
    'userMenu',
    'home',
    'songUpload',
    'loginSignUp',
    'details',
    'angularSoundManager',
    'angularFileUpload',
    'ngAnimate',
    'rx',
    'ui.router',
    'core.auth'
]);

MPlayApp.config(
    function($stateProvider, $urlServiceProvider) {
        $urlServiceProvider.rules.otherwise({ state: 'home' });
        $stateProvider.state('home', {
            url: '/home.php',
            component: 'home',

        });

        $stateProvider.state('login', {
            url: '/login.php',
            component: 'login',

        });

        $stateProvider.state('myAccount', {
            url: '/myAccount.php',
            component: 'myAccount',

        });

        $stateProvider.state('songUploadForm', {
            url: '/songUpload.php',
            component: 'songUploadForm',

        });

        $stateProvider.state('aboutUs', {
            url: '/aboutUs.php',
            component: 'aboutUs',

        });

        $stateProvider.state('uploadSuccess', {
            url: '/uploadSuccess.php',
            templateUrl: '/messages/uploadSuccess',

        });

        $stateProvider.state('loading', {
            url: '/loading.php',
            templateUrl: '/messages/loading',
        });
        /*var homeState = {
            url: '/home.php',
            template: '/partials/home'
        }



        var loginState = {
            url: '/login.php',
            template: '/partials/login'
        }

        var accountState = {
            url: '/MyAccount.php',
            template: '/partials/myAccount'
        }

        $stateProvider.state(homeState);
        $stateProvider.state(loginState);
        $stateProvider.state(accountState);
*/
    });

MPlayApp.controller('MainCtrl',
    function MainCtrl(AuthDetails, $scope) {
        $scope.loggedIn = false;
        var subscription = AuthDetails.subscribe(function onNext(d) {
            if(d.success){
                console.log('success');
                $scope.loggedIn = true;
                $scope.userEmail = d.user.email;
                $scope.userImageURL = d.user.imageURL;
                $scope.userName = d.user.username;
            }
        });
    });
