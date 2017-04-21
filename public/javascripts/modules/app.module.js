'use strict';

// Define the `phonecatApp` module
var MPlayApp = angular.module('MPlayApp', [
    // ...which depends on the MPlayApp module
    'player',
    'loginSignup',
    'userMenu',
    'ngRoute'
]);

MPlayApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home.php', {
                templateUrl: '/partials/home',
                controller: 'MainCtrl'
            })
            .when('/login.php', {
                templateUrl: '/partials/login',
                controller: 'LoginController'
            })
            .when('/MyAccount.php', {
                templateUrl: '/partials/myAccount',
                controller: 'MyAccountController'
            })
            .when('/', {
                templateUrl: '/partials/home',
                controller: 'MainCtrl'
            })
            .when('/*', {
                templateUrl: '/partials/home',
                controller: 'MainCtrl'
            });

        $locationProvider.html5Mode(true);
    }]);

MPlayApp.controller('MainCtrl', ['$route', '$routeParams', '$location',
    function MainCtrl($route, $routeParams, $location) {
        this.$route = $route;
        this.$location = $location;
        this.$routeParams = $routeParams;
    }]);