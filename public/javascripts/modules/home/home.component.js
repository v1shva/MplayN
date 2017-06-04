/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('home').
component('home', {
    templateUrl: '/components/home',
    controller: function HomeController() {
        this.testValue = "Hello";
    }
});
