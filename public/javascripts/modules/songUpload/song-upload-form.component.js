/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('songUpload').
component('songUploadForm', {
    templateUrl: '/components/songUpload',
    controller: function SongUploadController() {
        this.testValue = "Hello";
        this.songUpload = true;
    }
});
