/**
 * Created by Vishva on 4/8/2017.
 */
'use strict';
angular.
module('songUpload').
component('songUploadForm', {
    templateUrl: '/components/songUpload',
    controller: ['FileUploader','$scope','Song', function SongUploadController(FileUploader, $scope, Song) {
        this.showUpload = true;
        this.uploadFormValid = true;
        this.showUploadOrURLMsg = false;
        this.emotionSelected = false;
        this.mood = [];
        this.currentMoods = [];
        this.moodString = "";
        var uploader = $scope.uploader = new FileUploader({
            url: '/api/song/uploadSong',
            method: 'POST'
        });
        // FILTERS
/*        $scope.uploader.filters.push({
            name: 'customFilter',
            fn: function(item /!*{File|FileLikeObject}*!/, options) {
                return this.queue.length < 10;
            }
        });*/

        // CALLBACKS
        this.clearQ = function () {
            $scope.uploader.clearQueue();
            $scope.selectedItem = "";
        }
        $scope.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
           // console.info('onWhenAddingFileFailed', item, filter, options);
        };
        $scope.uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            $scope.fileLink = window.URL.createObjectURL(fileItem._file);
            $scope.selectedItem = fileItem;
            var audioElement =  document.getElementById('filePreview');
            audioElement.src = $scope.fileLink;
            $scope.$apply();
        };

/*        $scope.uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };*/
        $scope.uploader.onBeforeUploadItem = function(item) {
            //$scope.uploader.formData = [song];
            //console.info('onBeforeUploadItem', this);
            //console.log(song);
        };
       /* $scope.uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        $scope.uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };*/




        //console.info('uploader', uploader);


        this.EmoBarInput = function handleClick(item) {
            this.emotionSelected = true;
            var currentMood = item.attributes["name"].value;
            var index = this.currentMoods.indexOf(currentMood);
            if (index === -1) { // check whether the current mood is already in the currentMoods arrray
                this.currentMoods.push(currentMood); // if not value is pushed to array
                this.mood[currentMood] = true;
            }
            else if (this.currentMoods.length > 1) {
                this.mood[currentMood] = false;
                this.currentMoods.splice(index, 1);
            }
            if (this.currentMoods.length > 3) {
                var removeMood = this.currentMoods.shift();
                this.mood[removeMood] = false;
            }
            var currentMoodString = "";
            var currentMoodsCp = this.currentMoods.slice();
            currentMoodsCp.sort();
            currentMoodsCp.forEach(function (emotion) {
                currentMoodString += emotion.concat('0');
            })
            this.moodString = currentMoodString;
            this.displayMoodString = this.moodString.replace(/0/g, "  ");
        }


        this.submitForm = function (isValid) {
            var title = {title: uploadForm.songTitle.value};
            var artist = {artist: uploadForm.songArtist.value};
            var url = {url : "none"};
            var moodS = {};
            moodS[this.moodString] = -1;

            if(this.showUpload && isValid){
                // check to make sure the form is completely valid
                console.log(uploadForm);
                $scope.selectedItem.formData = [title,artist,url,moodS];
                $scope.selectedItem.upload();
            }
            else if(isValid){
                url = {url: uploadForm.songURL.value};
                var currentSong =  [title,artist,url,moodS];
                Song.addNewSong.post(currentSong);
            }
        }

        this.previewLink = function () {
            //var link = input.value;
            var audioElement =  document.getElementById('urlPreview');
            audioElement.src = this.URLlink;
            $scope.audioLoadedFromURL = false;
        }

    }]
})

.directive('audioEvents', function () {
    return function ($scope, $element) {
        $element[0].addEventListener("loadeddata", function () {
            console.log('loadeddata');
            $scope.audioLoadedFromURL = true;
            // you can $rootScope.$broadcast...
        });

    }
});