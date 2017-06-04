'use strict';

// Define the `phonecatApp` module
var MPlayApp = angular.module('MPlayApp', [
    // ...which depends on the MPlayApp module
    'player',
    'core',
    'loginSignup',
    'userMenu',
    'home',
    'songUpload',
    'angularSoundManager',
    'angularFileUpload',
    'ngAnimate',
    'rx',
    'ui.router'
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

MPlayApp.controller('MainCtrl', [
    function MainCtrl() {

    }]);

