'use strict';

// Define the `phonecatApp` module
var MPlayApp = angular.module('MPlayApp', [
    // ...which depends on the MPlayApp module
    'player',
    'core',
    'userMenu',
    'adminMenu',
    'home',
    'songUpload',
    'loginSignUp',
    'details',
    'angularSoundManager',
    'angularFileUpload',
    'ngAnimate',
    'rx',
    'ui.router',
    'ngCookies'
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

        $stateProvider.state('adminSongs', {
            url: '/adminMenu/songs.php',
            component: 'songs',

        });

        $stateProvider.state('adminUsers', {
            url: '/adminMenu/users.php',
            component: 'users',

        });
        $stateProvider.state('mySongs', {
            url: '/mySongs.php',
            component: 'mySongs',

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

        $stateProvider.state('signUpSuccess', {
            url: '/signUpSuccess.php',
            templateUrl: '/messages/signUpSuccess',

        });

        $stateProvider.state('signUpError', {
            url: '/signUpError',
            templateUrl: '/messages/signUpError',
        });

        $stateProvider.state('loading', {
            url: '/loading.php',
            templateUrl: '/messages/loading',
        });
    });

MPlayApp.controller('MainCtrl',
    function MainCtrl(AuthDetails, $scope, $cookies, $state, $window) {
        $scope.loggedIn = false;
        var loggedIn = $cookies.get('loggedIn');
        if(loggedIn){
            var data = $cookies.getObject('userData');
            $scope.loggedIn = true;
            $scope.userEmail = data.user.email;
            $scope.userImageURL = data.user.imageURL;
            $scope.userName = data.user.username;

        }
        var subscription = AuthDetails.subscribe(function onNext(d) {
            if(d.success){
                console.log('success');
                $scope.loggedIn = true;
                $scope.userEmail = d.user.email;
                $scope.userImageURL = d.user.imageURL;
                $scope.userName = d.user.username;
                $scope.userLevel = d.user.userLevel;
                $cookies.put("loggedIn", "true");
                $cookies.putObject('userData', d);
            }
        });
        $scope.logOut = function () {
            $cookies.remove("loggedIn");
            $cookies.remove("userData");
            $window.location.href = '';
            $state.go('home');
        }
    });
